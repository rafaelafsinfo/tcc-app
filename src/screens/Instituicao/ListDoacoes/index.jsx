import { StyleSheet, FlatList, RefreshControl, TextInput, Text, View, ScrollView} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardDoacao from "../../../components/CardDoacao";
import api from "../../../services/api";
import * as Animatable from "react-native-animatable";
import { UserContext } from "../../../contexts/UserContext";

export default function ListDoacoes() {
  const [data, setData] = useState([]);
  const [originaldata, setOriginalData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);

  useEffect( () => {
    
    if(search === ''){
      api.get(`/Doacoes/Inst/${user.Email}`).then((response) => {
        setData(response.data.dados);
      });
    } else{
      console.log(search)
      
      setData(
        data.filter((item) => item.data_doacao.indexOf(search) > -1).sort((a,b)=> b.trajetoria  - a.trajetoria)
      )
    }
  }, [search]);

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await api.get(`/Doacoes/Inst/${user.Email}`);
      setData(response.data.dados);
    } catch (error) {
      setError(error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    api.get(`/Doacoes/Inst/${user.Email}`).then((response) => {
      setData(response.data.dados);
      setOriginalData(response.data.dados)
    });
  }, []);
  return (
    <SafeAreaView>
      <Animatable.View animation="fadeInUp">
      <FlatList
          data={data}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListHeaderComponent={
            <Animatable.View animation="fadeInDown">
              <View style={styles.containerHeader}>
                <Text style={styles.title}> Doações requisitas</Text>
              </View>
              <TextInput
                value={search}
                style={styles.input}
                placeholder="Pequise pela data"
                autoCapitalize="none"
                onChangeText={(text) => setSearch(text)}
              />
              <Text style={styles.totaldonation}>Total doações: {originaldata.length}</Text>
            </Animatable.View>
          }
          renderItem={({ item }) => (
            <CardDoacao
              id={item.id}
              produto={item.produto}
              data_doacao={item.data_doacao}
              trajetoria={item.trajetoria}
            />
          )}
          keyExtractor={item => item.id.toString()}
          style={styles.cards}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
    </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f7f8",
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
  input: {
    fontSize: 17,
    marginHorizontal: 20,
    height: 55,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
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