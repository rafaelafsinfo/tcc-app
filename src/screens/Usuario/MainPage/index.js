import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context'
import Card from '../../../components/Card';
import { ScrollView } from 'react-native-web';
import api from '../../../services/api';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Inst from '../../Instituicao/Inst';
import InstPage from '../InstPage';

const Tab = createBottomTabNavigator();

function MainContent() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/Instituicao')
      .then(response => {
        setData(response.data.dados);
      });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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

export default function MainPage() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={MainContent}/>
      <Tab.Screen name="Inst" component={Inst} />
      <Tab.Screen name="InstPage" component={InstPage} />
    </Tab.Navigator>
  );
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