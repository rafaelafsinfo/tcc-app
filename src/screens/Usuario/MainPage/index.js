import React from 'react'
import { FlatList, StyleSheet, Text } from 'react-native'
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '../../../components/Card';
import api from '../../../services/api';

export default function MainContent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/Instituicao')
      .then(response => {
        setData(response.data.dados);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Para quem deseja doar hoje?</Text>
      <FlatList
        style={styles.cards}
        data={data}
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