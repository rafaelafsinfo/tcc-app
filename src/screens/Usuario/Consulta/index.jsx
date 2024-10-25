import React,{ useState,useEffect, useContext } from 'react'
import { StyleSheet, FlatList, RefreshControl, Text, View, TouchableOpacity, StatusBar } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardDoacao from '../../../components/CardDoacoesUsuario'
import api from '../../../services/api'
import { UserContext } from '../../../contexts/UserContext'
import { Dropdown } from "react-native-element-dropdown"
import { Feather } from "@expo/vector-icons"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useFocusEffect } from '@react-navigation/native';

export default function ListDoacoes() {

  const { user } = useContext(UserContext)
  const [data, setData] = useState(null)
  const [refreshing,setRefreshing] = useState(false)
  const [error, setError] = useState(null)
  const [selectedValue, setSelectedValue] = useState(0)
  const [value, setValue] = useState(null);
  const [show, setShow] = useState(false)
  const [isFocus, setIsFocus] = useState(false);

  const combodata = [
    { label: "Estado atual dos Pacotes", value: 0 },
    { label: "A Caminho", value: 1 },
    { label: "Entregue", value: 2 },
  ];

  const fetchData = async () => {
    try {
      const response = await api.get(`/Doacoes/User/${user.id}`);
      setData(response.data.dados);
    } catch (err) {
      setError(err);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setSelectedValue(0);
      fetchData();
    }, [user.id])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    filterData()
    await fetchData();
    setRefreshing(false);
  };

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

  const onChange = (selectedDate) => {
    setShow(false);
    const day = selectedDate.getDate().toString();
    const month = (selectedDate.getMonth() + 1).toString();
    const year = selectedDate.getFullYear().toString();
    const string_date = day + '/' + month + '/' + year
    setData(data.filter((item) => item.data_doacao.indexOf(string_date.toString()) > -1))
  };

  useEffect(() => {filterData()}, [selectedValue])


  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View style={styles.containerHeader} animation="fadeInDown">
        <Text style={styles.title}>Acompanhamento de pacotes</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp">
        
        <FlatList
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
          ListHeaderComponent={
            <View style={styles.filterContainer}>
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
            <TouchableOpacity style={styles.filter} onPress={() => setShow(!show)}>
              <Feather name="calendar" size={20} />
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={show}
              mode="date"
              onConfirm={onChange}
              onCancel={() => setShow(!show)}
            />
            <StatusBar barStyle="default" />
          </View> 
          }
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
    marginBottom: 3,
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
  filterContainer:{
    flexDirection:'row',
    marginHorizontal:'5%',
  },
  dropdown: {
    flex: 4,
    height: 55,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
  },
  filter:{
    flex:1,
    justifyContent: 'center',
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    alignItems:'center',
  },
  calendar: {
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