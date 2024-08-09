import { StyleSheet, Text, View,FlatList, ScrollView, TextInput } from 'react-native'
import React,{ useState,useEffect,useContext } from 'react'
import api from '../../../services/api';
import { useNavigation } from '@react-navigation/native';
import {useRoute} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-web';
import { UserContext } from '../../../contexts/UserContext';

export default function Inst() {
  const { user } = useContext(UserContext)
  const [Cnpj,SetCnpj] = useState('')
  const [Nome,SetNome] = useState('')
  const [Email,SetEmail] = useState('')
  const [Rua,SetRua] = useState('')
  const [Numero,SetNumero] = useState('')
  const [Bairro,SetBairro] = useState('')
  const [Cidade,SetCidade] = useState('')
  const [Estado,SetEstado] = useState('')
  const [CEP,SetCEP] = useState('')
  const [Descricao,SetDescricao] = useState('')
  useEffect(()=>{
    SetCnpj(user.Cnpj)
    SetNome(user.NomeInst)
    SetEmail(user.Email)
    SetRua(user.Rua)
    SetNumero(user.Numero)
    SetBairro(user.Bairro)
    SetCidade(user.Cidade)
    SetEstado(user.Estado)
    SetCEP(user.CEP)
    SetDescricao(user.Descricao)
  })
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      <Text style={styles.title}>cnpj: {Cnpj}</Text>
      <TextInput
      value={Cnpj}
      defaultValue={Cnpj}
      
      style={styles.input}
      onChangeText={text => SetCnpj(text)}/>
      <Text style={styles.title}>Nome: {Nome}</Text>
      <TextInput
      value={Nome}
      defaultValue={Nome}
      
      style={styles.input}
      onChangeText={text => SetNome(text)}/>
      <Text style={styles.title}>Email: {Email}</Text>
      <TextInput
      value={Email}
      defaultValue={Email}
      
      style={styles.input}
      onChangeText={text => SetEmail(text)}/>

      <Text style={styles.title}>Rua: {Rua}</Text>
      <TextInput
      value={Rua}
      defaultValue={Rua}
      
      style={styles.input}
      onChangeText={text => SetRua(text)}/>
      <Text style={styles.title}>Numero: {Numero}</Text>
      <TextInput
      value={Numero}
      defaultValue={Numero}
      
      style={styles.input}
      onChangeText={text => SetNumero(text)}/>
      <Text style={styles.title}>Bairro: {Bairro}</Text>
      <TextInput
      value={Bairro}
      defaultValue={Bairro}
      
      style={styles.input}
      onChangeText={text => SetBairro(text)}/>
      <Text style={styles.title}>Cidade: {Cidade}</Text>
      <TextInput
      value={Cidade}
      defaultValue={Cidade}
      
      style={styles.input}
      onChangeText={text => SetCidade(text)}/>
      <Text style={styles.title}>Estado: {Estado}</Text>
      <TextInput
      value={Estado}
      defaultValue={Estado}
      
      style={styles.input}
      onChangeText={text => SetEstado(text)}/>
      <Text style={styles.title}>CEP: {CEP}</Text>
      <TextInput
      value={CEP}
      defaultValue={CEP}
      
      style={styles.input}
      onChangeText={text => SetCEP(text)}/>
      <Text style={styles.title}>Descricao: {Descricao}</Text>
      <TextInput
      value={Descricao}
      defaultValue={Descricao}
      multiline
      style={styles.input}
      numberOfLines={4}
      onChangeText={text => SetDescricao(text)}/>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    //backgroundColor:'#4e0189'
  },
  containerHeader:{
    marginTop:'13%',
    marginBottom:'8%',
    paddingStart:'5%',
    
  },
  message:{
    fontSize:28,
    fontWeight:'bold',
    color:'#fff',
  },
  containerForm:{
    flex:1,
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    paddingStart:'5%',
    paddingEnd:'5%',
    backgroundColor: '#f6f7f9'

  },
  title:{
    fontSize:20,
    marginTop:28,
    color:'#4E0189'
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
  button:{
    backgroundColor:'#4e0189',
    width:'100%',
    borderRadius:10,
    paddingVertical:8,
    marginTop:14,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonText:{
    color:'#fff',
    fontSize:18,
    fontWeight:'bold'
  },
buttonRegister:{
  position:'absolute',
  bottom:'5%',
  alignSelf:'center'
  },
  registerText:{
    color:'#999ea1'
  },
  registerSpan:{
    color:'#4e0189'
  }
})