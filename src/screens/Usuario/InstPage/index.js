import React, { useState,useEffect,useContext } from 'react'
import { StyleSheet, Text, View,TouchableOpacity,TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import {useRoute} from '@react-navigation/native'
import api from '../../../services/api'
import { UserContext } from '../../../contexts/UserContext';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'

export default function InstPage() {
  const route = useRoute()
  const { cnpj,nome_inst,rua,numero,bairro,cidade,estado,cep,descricao } = route.params
  const navigation = useNavigation()
  const { user } = useContext(UserContext)
  const[btn1Visible,setbtn1Visible] = useState(true)
  const[btn2Visible,setbtn2Visible] = useState(false)
  const [idUsuario,setIdUsuario] = useState("")
  const [idInstituicao,setIdinstituicao] = useState("")
  const [produto,setProduto] = useState('')
  const [data,setData] = useState('')
  const [error,setError] = useState(null)

  function formatDate(date,format){
    const map = {
        mm: date.getMonth()+1,
        dd: date.getDate(),
        aaaa: date.getFullYear()
      }
      return format.replace(/mm|dd|aaaa/gi, matched => map[matched])
  }

  const today = new Date()
  const formattedDate = formatDate(today,'mm-dd-aaaa')
  useEffect(() => {
    setData(formattedDate)
    setIdUsuario(user.id)
    setIdinstituicao(cnpj)
  },[])

  const handlepress = () => {
    setbtn1Visible(!btn1Visible)
    setbtn2Visible(!btn2Visible)
  }

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

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <TouchableOpacity
            style={styles.botaovoltar}
            onPress={()=>navigation.navigate('MainPage')}>
          <Icon name="arrow-left" size={20} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.message}>{nome_inst}</Text>
      </Animatable.View>

      <Animatable.View style={styles.containerForm}>
        <Animatable.View animation='fadeInUp' delay={600}>
          <Animatable.Text animation='slideInLeft' delay={900}>
            <Text style={styles.detailstext}>Cnpj:{'\n'}</Text>
            {cnpj}
          </Animatable.Text>
          <Animatable.Text animation='slideInRight' delay={900}>
            <Text style={styles.detailstext}>Endereço:{'\n'}</Text>
            {rua}, {numero}
          </Animatable.Text>
          <Animatable.Text animation='slideInLeft' delay={900}>
            <Text style={styles.detailstext}>Bairro:{'\n'}</Text>
            {bairro}
            </Animatable.Text>
          <Animatable.Text animation='slideInRight' delay={900}>
            <Text style={styles.detailstext}>Cidade:{'\n'}</Text>
            {cidade} - {estado}
          </Animatable.Text>
          <Animatable.Text animation='slideInLeft' delay={900}>
          <Text style={styles.detailstext}>CEP:{'\n'}</Text>
            {cep}
          </Animatable.Text>
          <Animatable.Text animation='slideInRight' delay={900}>
            <Text style={styles.detailstext}>Descrição:{'\n'}</Text>
            {descricao}
          </Animatable.Text>
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
    width: '100%',
    height: '20%',
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
    alignItems: 'center',
    paddingTop: '25%',
    backgroundColor:'#4e0189' 
  },
  containerForm:{
    flex:1,
    backgroundColor: '#f6f7f9',
    marginTop:'10%',
    paddingStart:'7%',
    paddingEnd:'7%',
  },
  message:{
    fontSize:28,
    fontWeight:'bold',
    color:'#fff',
  },
  title:{
    fontSize:20,
    marginTop:28,
    color:'#ff8c00'
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
  botaovoltar:{
    position: 'absolute',
    top: 10,
    left:10,
    padding: 10,
    zIndex: 1000  
  },
  detailstext:{
    fontSize:18,
    fontWeight:'bold'
  }

})