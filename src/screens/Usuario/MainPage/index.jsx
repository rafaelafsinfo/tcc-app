import React from 'react'
import { FlatList, StyleSheet, Text,RefreshControl ,TextInput} from 'react-native'
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '../../../components/Card';
import api from '../../../services/api';
import * as Animatable from 'react-native-animatable'

export default function MainContent() {
  const [data, setData] = useState([]);
  const [search , setSearch] = useState('')
  const [refreshing, setRefreshing] = useState(false);


  useEffect( () => {
     
    if(search === ''){
      api.get(`/Instituicao`).then((response) => {
        setData(response.data.dados);
      });
    } else{
      console.log(search)
      setData(
        data.filter((item) => item.Descricao.indexOf(search) > -1)
      )
    }
  }, [search])

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await api.get(`/Instituicao`);
      setData(response.data.dados);
    } catch (error) {
      setError(error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    api.get('/Instituicao')
      .then(response => {
        setData(response.data.dados);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Para quem deseja doar hoje?</Text>
      <Animatable.View style={styles.filtercontainer} animation="fadeInUp">
        <TextInput
          value={search}
          style={styles.input}
          placeholder="Pesquise a instituição ..."
          autoCapitalize="none"
          onChangeText={(text) => setSearch(text)}
        />
      </Animatable.View>
      <FlatList
        style={styles.cards}
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item }) => (
          <Card
            cnpj={item.Cnpj}
            nome_inst={item.NomeInst}
            rua={item.Rua}
            numero={item.Numero}
            bairro={item.Bairro}
            cidade={item.Cidade}
            estado={item.Estado}
            cep={item.CEP}
            descricao={item.Descricao}
          />
        )}
        keyExtractor={item => item.Cnpj}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f9f7f8'
  },
  cards:{
    padding:10
  },
  title:{
    paddingTop: 15,
    alignSelf:'center',
    fontSize: 25,
    fontWeight:'bold'
  }
})