import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import {useRoute} from '@react-navigation/native'
export default function InstPage() {
  const route = useRoute();
  const { cnpj,nome_inst,rua,numero,bairro,cidade,estado,cep,descricao } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>{nome_inst}</Text>
      </Animatable.View>
      <Animatable.View animation='fadeInUp' delay={600} style={styles.containerForm}>
        <Text>{cnpj}</Text>
        <Text>{rua}</Text>
        <Text>{numero}</Text>
        <Text>{bairro}</Text>
        <Text>{cidade}</Text>
        <Text>{estado}</Text>
        <Text>{cep}</Text>
        <Text>{descricao}</Text>
      </Animatable.View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f9f7f8'
  },
  containerHeader:{
    marginTop:'15%',
    marginBottom:'10%',
    paddingStart:'5%',  
  },
  containerForm:{
    flex:1,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    paddingStart:'5%',
    paddingEnd:'5%',
    backgroundColor: '#f6f7f9'

  },
  message:{
    fontSize:28,
    fontWeight:'bold',
    color:'#000',
  },
  title:{
    fontSize:20,
    marginTop:28,
    color:'#4E0189'
  },
})