import { StyleSheet, FlatList, RefreshControl, TextInput, Text, ScrollView} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CardDoacao from "../../../components/CardDoacao";
import api from "../../../services/api";
import * as Animatable from "react-native-animatable";
import { UserContext } from "../../../contexts/UserContext";
import { View } from "react-native-animatable";

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
      <Animatable.View style={styles.filtercontainer} animation="fadeInUp">
        <TextInput
          value={search}
          style={styles.input}
          placeholder="Pesquise ..."
          autoCapitalize="none"
          onChangeText={(text) => setSearch(text)}
        />
      </Animatable.View>
        <Text> total de doaçoes: {originaldata.length}</Text>
        <FlatList
          style={styles.cards}
          data={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <CardDoacao
              id={item.id}
              produto={item.produto}
              data_doacao={item.data_doacao}
              trajetoria={item.trajetoria == 0 ? "chegou" : "a caminho"}
            />
          )}
          //keyExtractor={(item) => item.id}
          
        />
        
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f7f8",
  },
  cards: {
    padding: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingStart: 8,
    paddingEnd: 8,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    borderColor: "#cdd1e0",
  },
});