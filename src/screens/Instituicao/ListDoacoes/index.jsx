import { StyleSheet, FlatList, RefreshControl, Text, View, TouchableOpacity, StatusBar } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardDoacao from "../../../components/CardDoacao";
import api from "../../../services/api";
import * as Animatable from "react-native-animatable";
import { UserContext } from "../../../contexts/UserContext";
import { Dropdown } from "react-native-element-dropdown"
import { Feather } from "@expo/vector-icons"
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useFocusEffect } from '@react-navigation/native';

export default function ListDoacoes() {
  const [data, setData] = useState([]);
  const [originaldata, setOriginalData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);
  const [selectedValue, setSelectedValue] = useState(0)
  const [show, setShow] = useState(false)

  const { user } = useContext(UserContext);

  const combodata = [
    { label: "Estado atual dos Pacotes", value: 0 },
    { label: "A Caminho", value: 1 },
    { label: "Entregue", value: 2 },
  ];

  const fetchData = async () => {
    try {
      const response = await api.get(`/Doacoes/Inst/${user.Email}`);
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

  const filterData = () => {
    api.get(`/Doacoes/Inst/${user.Email}`).then(response => {
      if (selectedValue === 0){
        setData(response.data.dados)
      } else if (selectedValue === 1){
        setData(response.data.dados.filter(item => item.trajetoria === "0"))
      } else if (selectedValue === 2) {
        setData(response.data.dados.filter(item => item.trajetoria === "1"))
      }
      setOriginalData(response.data.dados)
    })
  };

  useEffect(() => {filterData()}, [selectedValue])
  useEffect(() => {filterData()}, [])

  const onRefresh = async () => {
    try{
      setRefreshing(true)
      filterData()
      await fetchData();
    }catch(error){
      setError(error)
    }finally{
      setRefreshing(false)
    }
  };

  const onChange = (selectedDate) => {
    setShow(false);
    const day = selectedDate.getDate().toString();
    const month = (selectedDate.getMonth() + 1).toString();
    const year = selectedDate.getFullYear().toString();
    const string_date = day + '/' + month + '/' + year
    api.get(`/Doacoes/Inst/${user.Email}`).then(response => {
      setData(response.data.dados.filter((item) => item.data_doacao.indexOf(string_date.toString()) > -1))
      setOriginalData(response.data.dados)
    })
    console.log(string_date, data)
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation="fadeInDown" style={styles.containerHeader}>
        <Text style={styles.title}> Doações requisitas</Text>
      </Animatable.View>

      <Animatable.View animation="fadeInUp">

      <FlatList
          data={data}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          renderItem={({ item }) => (
            <CardDoacao
              id={item.id}
              produto={item.produto}
              data_doacao={item.data_doacao}
              trajetoria={item.trajetoria}
            />
          )}
          ListHeaderComponent={
            <View>
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
              <Text style={styles.totaldonation}>Total doações: {originaldata.length}</Text>
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
  totaldonation:{
    alignSelf:'flex',
    padding: 7,
    marginTop:5,
    marginHorizontal:20,
    borderWidth:1,
    borderColor:'grey',
    borderRadius:12,
  },
});