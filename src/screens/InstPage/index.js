<<<<<<< Updated upstream:src/screens/InstPage/index.js
import React, { useState,useEffect,useContext } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import {useRoute} from '@react-navigation/native'
import api from '../../services/api'
import {QrCodeSvg} from 'react-native-qr-svg';
import { UserContext } from '../../contexts/UserContext';


export default function InstPage() {
  const { user } = useContext(UserContext)
  const[btn1Visible,setbtn1Visible] = useState(true)
  const[btn2Visible,setbtn2Visible] = useState(false)
  const route = useRoute();
  const { cnpj,nome_inst,rua,numero,bairro,cidade,estado,cep,descricao } = route.params;
  const [idUsuario,setIdUsuario] = useState("")
  const [idInstituicao,setIdinstituicao] = useState("")
  const [produto,setProduto] = useState('')
  const [data,setData] = useState('')
  const [error,setError] = useState(null)
  function formatDate(date,format) {
    const map = {
      mm: date.getMonth()+1,
      dd: date.getDate(),
      aaaa: date.getFullYear()
    }
    return format.replace(/mm|dd|aaaa/gi, matched => map[matched])
  }
  const today = new Date()
  const formattedDate = formatDate(today,'mm/dd/aaaa')
  useEffect(() => {
    setData(formattedDate)
    setIdUsuario(user.id)
    setIdinstituicao(cnpj)
  },[])
  console.log(formattedDate)
  const handleSubmit = async () =>{
    try{
      const response = await api.post('/Doacoes',{
        id_usuario: idUsuario,
        id_instituicao: idInstituicao,
        produto,
        data

      })
      if (response.status){
        //navigation.navigate('MainPage')
      }else{
        setError('email ou senha invalidos')
        console.log(error)
      }
    }catch(error){
      setError('erro ao logar')
      console.log(error)
    }
  }

  const SIZE = 170
  const CONTENT = `${cnpj}`

  const handlepress = () => {
    setbtn1Visible(!btn1Visible)
    setbtn2Visible(!btn2Visible)
  }
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

            
          {btn1Visible && ( <TouchableOpacity 
          style={styles.button}
          onPress={handlepress}>
            <Text style={styles.buttonText}>doar</Text>
          </TouchableOpacity>)}

          {btn2Visible && (
            <SafeAreaView>
              <TextInput
                value={produto}
                style={styles.input}
                placeholder='Digite o produto a ser doado'
                keyboardType='default'
                autoCapitalize='none'
                autoComplete='email'
                
                
                onChangeText={text => setProduto(text)}
                />
                
              <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit}>
              <Text style={styles.buttonText}>doar</Text>
            </TouchableOpacity>
            
              <TouchableOpacity 
            style={styles.button}
            onPress={handlepress}>
              <Text style={styles.buttonText}>cancelar</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}

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
  button:{
    position:'relative',
    backgroundColor:'#ff8c00',
    borderRadius:50,
    paddingVertical:8,
    width:'60%',
    alignSelf:'center',
    marginBottom:'2.5%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:18,
    color:'#fff',
    fontWeight:'bold'
  },
  input:{
    borderWidth:1,
    borderRadius:10,
    paddingStart:8,
    paddingEnd:8,
    height:40,
    marginBottom:12,
    fontSize:16,
    borderColor:'#cdd1e0'
  },
  
=======
import React, {useState,useEffect,useContext} from 'react'
import { StyleSheet, Text, View,TextInput,TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import {useRoute} from '@react-navigation/native'
import { UserContext } from '../../../contexts/UserContext'
import api from '../../../services/api'
import {QrCodeSvg} from 'react-native-qr-svg';

export default function InstPage() {
  const route = useRoute()
  const { cnpj,nome_inst,rua,numero,bairro,cidade,estado,cep,descricao } = route.params
  const { user } = useContext(UserContext)
  const[btn1Visible,setbtn1Visible] = useState(true)
  const[btn2Visible,setbtn2Visible] = useState(false)
  const [idUsuario,setIdUsuario] = useState("")
  const [idInstituicao,setIdinstituicao] = useState("")
  const [produto,setProduto] = useState('')
  const [data,setData] = useState('')
  const [error,setError] = useState(null)

  const SIZE = 170
  const CONTENT = `${cnpj}`

  function formatDate(date,format) {
    const map = {
      mm: date.getMonth()+1,
      dd: date.getDate(),
      aaaa: date.getFullYear()
    }
    return format.replace(/mm|dd|aaaa/gi, matched => map[matched])
  }
  const today = new Date()
  const formattedDate = formatDate(today,'mm/dd/aaaa')
  useEffect(() => {
    setData(formattedDate)
    setIdUsuario(user.id)
    setIdinstituicao(cnpj)
  },[])
  const handleSubmit = async () =>{
    try{
      const response = await api.post('/Doacoes',{
        id_usuario: idUsuario,
        id_instituicao: idInstituicao,
        produto,
        data

      })
      if (response.status){
        //navigation.navigate('MainPage')
      }else{
        setError('email ou senha invalidos')
        console.log(error)
      }
    }catch(error){
      setError('erro ao logar')
      console.log(error)
    }
  }

  const handlepress = () => {
    setbtn1Visible(!btn1Visible)
    setbtn2Visible(!btn2Visible)
  }
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

            
          {btn1Visible && ( <TouchableOpacity 
          style={styles.button}
          onPress={handlepress}>
            <Text style={styles.buttonText}>doar</Text>
          </TouchableOpacity>)}

          {btn2Visible && (
            <SafeAreaView>
              <TextInput
                value={produto}
                style={styles.input}
                placeholder='Digite o produto a ser doado'
                keyboardType='default'
                autoCapitalize='none'
                autoComplete='email'
                
                onChangeText={text => setProduto(text)}
                />
                
              <TouchableOpacity 
            style={styles.button}
            onPress={handleSubmit}>
              <Text style={styles.buttonText}>doar</Text>
            </TouchableOpacity>
            
              <TouchableOpacity 
            style={styles.button}
            onPress={handlepress}>
              <Text style={styles.buttonText}>cancelar</Text>
            </TouchableOpacity>
          </SafeAreaView>
        )}

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
  button:{
    position:'relative',
    backgroundColor:'#ff8c00',
    borderRadius:50,
    paddingVertical:8,
    width:'60%',
    alignSelf:'center',
    marginBottom:'2.5%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:18,
    color:'#fff',
    fontWeight:'bold'
  },
  input:{
    borderWidth:1,
    borderRadius:10,
    paddingStart:8,
    paddingEnd:8,
    height:40,
    marginBottom:12,
    fontSize:16,
    borderColor:'#cdd1e0'
  },
  
>>>>>>> Stashed changes:src/screens/Usuario/InstPage/index.js
})