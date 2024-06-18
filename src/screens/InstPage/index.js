import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import {useRoute} from '@react-navigation/native'
import {QrCodeSvg} from 'react-native-qr-svg';

export default function InstPage() {
  const route = useRoute();
  const { cnpj,nome_inst,rua,numero,bairro,cidade,estado,cep,descricao } = route.params;

  const SIZE = 170
  const CONTENT = `${cnpj}`
  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>{nome_inst}</Text>
        
      
      </Animatable.View>

      <Animatable.View style={styles.containerForm}>
        <Animatable.View animation='fadeInUp' delay={600}>
          <Animatable.Text animation='slideInLeft' delay={900}>{cnpj}</Animatable.Text>
          <Animatable.Text animation='slideInRight' delay={900}>{rua}</Animatable.Text>
          <Animatable.Text animation='slideInLeft' delay={900}>{numero}</Animatable.Text>
          <Animatable.Text animation='slideInRight' delay={900}>{bairro}</Animatable.Text>
          <Animatable.Text animation='slideInLeft' delay={900}>{cidade}</Animatable.Text>
          <Animatable.Text animation='slideInRight' delay={900}>{estado}</Animatable.Text>
          <Animatable.Text animation='slideInLeft' delay={900}>{cep}</Animatable.Text>
          <Animatable.Text animation='slideInRight' delay={900}>{descricao}</Animatable.Text>
        </Animatable.View>
        
        <Animatable.View animation='fadeInUp' delay={1200} style={styles.root}>
          <View style={styles.content}>
            <QrCodeSvg
                style={styles.qr}
                gradientColors={['#ba55d3','#000']}
                backgroundColor='#f9f8f7'
                value={CONTENT}
                frameSize={SIZE}
              />
          </View>
        </Animatable.View>
        
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
  qr: {
    padding: 15,
  },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
})