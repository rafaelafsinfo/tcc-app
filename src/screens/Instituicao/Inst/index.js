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
  const [Cnpj,SetCnpj] = useState(user.Cnpj)
  const [Nome,SetNome] = useState(user.NomeInst)
  const [Email,SetEmail] = useState(user.Email)
  const [Rua,SetRua] = useState(user.Rua)
  const [Numero,SetNumero] = useState(user.Numero)
  const [Bairro,SetBairro] = useState(user.Bairro)
  const [Cidade,SetCidade] = useState(user.Cidade)
  const [Estado,SetEstado] = useState(user.Estado)
  const [Cep,SetCEP] = useState(user.CEP)
  const [Descricao,SetDescricao] = useState(user.Descricao)

  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>

      <Text style={styles.title}>cnpj:</Text>
      <TextInput
      value={Cnpj}
      
      
      style={styles.input}
      onChangeText={text => SetCnpj(text)}/>
      <Text style={styles.title}>Nome:</Text>
      <TextInput
      value={Nome}
      
      
      style={styles.input}
      onChangeText={text => SetNome(text)}/>
      <Text style={styles.title}>Email:</Text>
      <TextInput
      value={Email}
      editable={false}
      
      style={styles.input}
      onChangeText={text => SetEmail(text)}/>

      <Text style={styles.title}>Rua:</Text>
      <TextInput
      value={Rua}
      
      
      style={styles.input}
      onChangeText={text => SetRua(text)}/>
      <Text style={styles.title}>Numero:</Text>
      <TextInput
      value={Numero}
      
      
      style={styles.input}
      onChangeText={text => SetNumero(text)}/>
      <Text style={styles.title}>Bairro:</Text>
      <TextInput
      value={Bairro}
      
      
      style={styles.input}
      onChangeText={text => SetBairro(text)}/>
      <Text style={styles.title}>Cidade:</Text>
      <TextInput
      value={Cidade}
      
      
      style={styles.input}
      onChangeText={text => SetCidade(text)}/>
      <Text style={styles.title}>Estado:</Text>
      <TextInput
      value={Estado}
      style={styles.input}
      onChangeText={text => SetEstado(text)}/>
      <Text style={styles.title}>CEP:</Text>
      <TextInput
      value={Cep}
      style={styles.input}
      onChangeText={text => SetCEP(text)}
      />

      <Text style={styles.title}>Descricao:</Text>
      <TextInput
      value={Descricao}
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