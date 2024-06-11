import { StyleSheet, Text, View,FlatList } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import api from '../../services/api';
import Card from '../../components/Card'

import {useRoute} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Inst() {
    const route = useRoute();
    const {emailinst} = route.params
    const [data,setData] = useState(null)

  useEffect(() => {
    api.get(`/Instituicao/${emailinst}`)
    .then(response => {
      setData(response.data.dados)
    })
  })
  return (
    <SafeAreaView>
      <Text>{JSON.stringify(data)}</Text>

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

const styles = StyleSheet.create({})