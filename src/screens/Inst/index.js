import { StyleSheet, Text, View,FlatList, ScrollView, TextInput } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import api from '../../services/api';

import {useRoute} from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

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
    <SafeAreaView>
      <ScrollView>
              <FlatList style={styles.form}
              data={data}
              renderItem={({item}) => 
                <View style={styles.container}>

              <Text style={styles.label}>CNPJ:</Text>
        
              <TextInput
        
                style={styles.input}
                defaultValue={item.Cnpj}
                onChangeText={setCnpj}
                readOnly={true}
        
              />
        
                <Text style={styles.label}>E-mail:</Text>
        
                <TextInput
        
                style={styles.input}
                defaultValue={item.Email}
                readOnly={true}
                onChangeText={(text) => setEmail(text)}
        
                />
        
              <Text style={styles.label}>Nome da Instituição:</Text>
        
              <TextInput
        
                style={styles.input}
        
                defaultValue={item.nomeInst}
        
                onChangeText={(text) => setNomeInst(text)}
        
              />
        
        
        
        
              <Text style={styles.label}>Rua:</Text>
        
              <TextInput
        
                style={styles.input}
        
                defaultValue={item.Rua}
        
                onChangeText={(text) => setRua(text)}
        
        
              />
        
        
              <Text style={styles.label}>Número:</Text>
        
              <TextInput
        
                style={styles.input}
        
                defaultValue={item.Numero}
        
                onChangeText={(text) => setNumero(text)}
        
        
              />
        
        
              <Text style={styles.label}>Bairro:</Text>
        
              <TextInput
        
                style={styles.input}
        
                defaultValue={item.Bairro}
        
                onChangeText={(text) => setBairro(text)}
        
              />
        
        
              <Text style={styles.label}>Cidade:</Text>
        
              <TextInput
        
                style={styles.input}
        
                defaultValue={item.Cidade}
        
                onChangeText={(text) => setCidade(text)}
        
              />
        
        
              <Text style={styles.label}>Estado:</Text>
        
              <TextInput
        
                style={styles.input}
        
                defaultValue={item.Estado}
        
                onChangeText={(text) => setEstado(text)}
        
              />
        
        
              <Text style={styles.label}>CEP:</Text>
        
              <TextInput
        
                style={styles.input}
        
                defaultValue={item.CEP}
        
                onChangeText={(text) => setCep(text)}
        
        
              />
        
        
              <Text style={styles.label}>Descrição:</Text>
        
              <TextInput
        
                style={styles.input}
        
                defaultValue={item.Descricao}
                
                onChangeText={(text) => setDescricao(text)}
                

                multiline={true}
        
                numberOfLines={4}
        
              />
        
        
              <View style={styles.buttonContainer}>
        
                <Text style={styles.button} onPress={handleSave}>Salvar</Text>
        
              </View>
        
            </View>
              }
              
              />
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({

})