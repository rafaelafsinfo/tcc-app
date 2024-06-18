import { StyleSheet, Text, View,FlatList, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import api from '../../services/api';

import {useRoute} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native-web';

export default function Inst() {
    const route = useRoute();
    const {emailinst} = route.params
    const [data,setData] = useState([])
    const [cnpj, setCnpj] = useState('');
    const [nomeInst, setNomeInst] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [rua, setRua] = useState('');
    const [numero, setNumero] = useState('');
    const [bairro, setBairro] = useState('');
    const [cidade, setCidade] = useState('');
    const [estado, setEstado] = useState('');
    const [cep, setCep] = useState('');
    const [descricao, setDescricao] = useState('');
    const [error,setError] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try{
        const response = await api.get(`/instituicao/${emailinst}`)
        setData(response.data.dados)
        
      }catch (error){
          console.error(error)
      }
    }
    fetchData()
  },[])

  const handleSave = async () =>{
    try{
        const response = await api.put('/Instituicao',{
          cnpj,
          nome_inst,
          email,
          senha,
          rua,
          numero,
          bairro,
          cidade,
          estado,
          CEP,
          descricao,
        })
        

    }catch(error){
        setError(`error ao alterar dados: ${error}`)
        console.error(error)
    }
  }


  return (
    <SafeAreaView style={styles.container}>

      
              <FlatList 
              data={data}
              renderItem={({item}) => 
                <View style={styles.containerForm}>

                  <Text style={styles.title}>CNPJ:</Text>
            
                  <TextInput
            
                    style={styles.input}
                    defaultValue={item.Cnpj}
                    onChangeText={setCnpj}
                    readOnly={true}
            
                  />
            
                    <Text style={styles.title}>E-mail:</Text>
            
                    <TextInput
            
                    style={styles.input}
                    defaultValue={item.Email}
                    readOnly={true}
                    onChangeText={(text) => setEmail(text)}
            
                    />
            
                  <Text style={styles.title}>Nome da Instituição:</Text>
            
                  <TextInput
            
                    style={styles.input}
            
                    defaultValue={item.NomeInst}
            
                    onChangeText={(text) => setNomeInst(text)}
            
                  />
            
            
            
            
                  <Text style={styles.title}>Rua:</Text>
            
                  <TextInput
            
                    style={styles.input}
            
                    defaultValue={item.Rua}
            
                    onChangeText={(text) => setRua(text)}
            
            
                  />
            
            
                  <Text style={styles.title}>Número:</Text>
            
                  <TextInput
            
                    style={styles.input}
            
                    defaultValue={item.Numero}
            
                    onChangeText={(text) => setNumero(text)}
            
            
                  />
            
            
                  <Text style={styles.title}>Bairro:</Text>
            
                  <TextInput
            
                    style={styles.input}
            
                    defaultValue={item.Bairro}
            
                    onChangeText={(text) => setBairro(text)}
            
                  />
            
            
                  <Text style={styles.title}>Cidade:</Text>
            
                  <TextInput
            
                    style={styles.input}
            
                    defaultValue={item.Cidade}
            
                    onChangeText={(text) => setCidade(text)}
            
                  />
            
            
                  <Text style={styles.title}>Estado:</Text>
            
                  <TextInput
            
                    style={styles.input}
            
                    defaultValue={item.Estado}
            
                    onChangeText={(text) => setEstado(text)}
            
                  />
            
            
                  <Text style={styles.title}>CEP:</Text>
            
                  <TextInput
            
                    style={styles.input}
            
                    defaultValue={item.CEP}
            
                    onChangeText={(text) => setCep(text)}
            
            
                  />
            
            
                  <Text style={styles.title}>Descrição:</Text>
            
                  <TextInput
            
                    style={styles.input}
            
                    defaultValue={item.Descricao}
                    
                    onChangeText={(text) => setDescricao(text)}
                    

                    multiline={true}
            
                    numberOfLines={4}
            
                  />
            
            
                  <View style={styles.button}>
            
                    <Text style={styles.buttonText} onPress={handleSave}>Salvar</Text>
            
                  </View>
                  <View style={styles.button}>
                        <Text style={styles.buttonText}> Ler qr code</Text>
                  </View>
                  
            </View>
              }
        />

      
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#4e0189'
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