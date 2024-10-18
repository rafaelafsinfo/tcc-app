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
  const [selectedValue, setSelectedValue] = useState(0)
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const combodata = [
    { label: "Estado atual dos Pacotes", value: 0 },
    { label: "A Caminho", value: 1 },
    { label: "Entregue", value: 2 },
  ];


  const filterData = () => {
    api.get(`/Doacoes/User/${user.id}`).then(response => {
      if (selectedValue === 0){
        setData(response.data.dados)
      } else if (selectedValue === 1){
        setData(response.data.dados.filter(item => item.trajetoria === "0"))
      } else if (selectedValue === 2) {
        setData(response.data.dados.filter(item => item.trajetoria === "1"))
      }
    })
  };


  useEffect(() => {filterData()}, [selectedValue])


  const onRefresh = async () => {
    try{
      setRefreshing(true)
<<<<<<< Updated upstream
      filterData()
=======
      const response = await api.get(`/Doacoes/User/${user.id}`)
      setData(response.data.dados)
      console.log(selectedValue)
      if (selectedValue != "") {
        setData(data.filter((item) => item.trajetoria === selectedValue));
      }
      
>>>>>>> Stashed changes
    }catch(error){
      setError(error)
    }finally{
      setRefreshing(false)
    }
  };


  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View style={styles.containerHeader} animation="fadeInDown">
        <Text style={styles.title}>Acompanhamento de pacotes</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp">
        <View>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={combodata}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={combodata[selectedValue].label}
            value={selectedValue}
            onChange={(item) => setSelectedValue(item.value)}
            renderRightIcon={() => <Feather name="filter" size={20} />}
          />
        </View> 
        <FlatList
          style={styles.cards}
          data={data}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <CardDoacao
              NomeInst={item.NomeInst}
              data_doacao={item.data_doacao}
              produto={item.produto}
              trajetoria={item.trajetoria}
            />
          )}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </Animatable.View>
    </SafeAreaView>
  );
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
