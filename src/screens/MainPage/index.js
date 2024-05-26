import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '../../components/Card'
import { ScrollView } from 'react-native-web';
import api from '../../services/api';

export default function MainPage() {
  const [data,setData] = useState(null)
  useEffect(() => {
    api.get('/Instituicao')
    .then(response => {
      setData(response.data.dados)
    })
  })
  return (
    <SafeAreaView style={styles.container}>
        <FlatList style={styles.cards}
        data={data}
        renderItem={({item}) => <Card
        cnpj={item.cnpj}
        nome_inst={item.nome_inst}
        rua={item.rua}
        numero={item.numero}
        bairro={item.bairro}
        cidade={item.cidade}
        estado={item.estado}
        cep={item.CEP}
        descricao={item.descricao}
        />}
        keyExtractor={item => item.cnpj}
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f9f7f8'
  },
  cards:{
    padding:10
  }
})