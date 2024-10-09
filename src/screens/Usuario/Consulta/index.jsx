import React,{ useState,useEffect, useContext } from 'react'
import { StyleSheet, FlatList, RefreshControl, Text, View} from 'react-native'
import * as Animatable from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardDoacao from '../../../components/CardDoacoesUsuario'
import api from '../../../services/api'
import { UserContext } from '../../../contexts/UserContext'
import { Dropdown } from "react-native-element-dropdown"
import { Feather } from "@expo/vector-icons"

export default function ListDoacoes() {

  const { user } = useContext(UserContext)
  const [data, setData] = useState(null)
  const [refreshing,setRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [selectedValue, setSelectedValue] = useState("")
  const [value, setValue] = useState(null);

  const combodata = [
    { label: "A Caminho", value: "0" },
    { label: "Entregue", value: "1" },
  ];

  const onRefresh = async () => {
    try{
      setRefreshing(true)
      const response = await api.get(`/Doacoes/User/${user.id}`)
      setData(response.data.dados)
    }catch(error){
      setError(error)
    }finally{
      setRefreshing(false)
    }
  };

  useEffect(() => {
    api.get(`/Doacoes/User/${user.id}`)
    .then(response => {
      setData(response.data.dados)
    }).catch(error => {
      setError(error)
    })
  }, [])

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInUp">
        <FlatList
          data={data}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListHeaderComponent={
            <Animatable.View animation="fadeInDown">
              <View style={styles.containerHeader}>
                <Text style={styles.title}>Acompanhamento de pacotes</Text>
              </View>
              <Dropdown
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={combodata}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  selectedValue != ""
                    ? combodata[selectedValue].label
                    : "Estado atual do Pacote"
                }
                value={value}
                onChange={(item) => {
                  setSelectedValue(item.value);
                  setIsFocus(false);
                }}
                renderRightIcon={() => <Feather name="filter" size={20} />}
              />
            </Animatable.View>
            
          }
          renderItem={({ item }) => (
            <CardDoacao
              NomeInst={item.NomeInst}
              data_doacao={item.data_doacao}
              produto={item.produto}
              trajetoria={item.trajetoria === 1 ? "Entregue" : "A caminho"}
            />
          )}
          keyExtractor={item => item.id.toString()}
          style={styles.cards}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </Animatable.View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f9f7f8'
  },
  containerHeader:{
    height: 120,
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
    backgroundColor:'#4e0189',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title:{
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  choices:{
    width:160,
    height:50,
    backgroundColor:'red',
  },
  dropdown: {
    marginHorizontal: 20,
    height: 55,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
})
