import React, { useState } from 'react'
import api from '../../services/api'
import { View,Text,StyleSheet,TextInput,TouchableOpacity, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'

export default function({cnpj,email,nome_inst,rua,numero,bairro,cidade,estado,cep,descricao}) {
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

    const handleCnpjChange = (text) => {
        const notFormattedCnpj = text.replace(/\D/g, '');
        const formattedCnpj = notFormattedCnpj.replace(/(\d{2})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1.$2')
          .replace(/(\d{3})(\d)/, '$1/$2')
          .replace(/(\d{4})(\d)/, '$1-$2')
          .replace(/(-\d{2})\d+?$/, '$1');
        setCnpj(formattedCnpj)
    }
    return (
    <View style={styles.container}>

      <Text style={styles.label}>CNPJ:</Text>

      <TextInput

        style={styles.input}
        value={cnpj}
        onChangeText={handleCnpjChange}
        readOnly={true}

      />

        <Text style={styles.label}>E-mail:</Text>

        <TextInput

        style={styles.input}
        value={email}
        readOnly={true}
        onChangeText={(text) => setEmail(text)}

        />

      <Text style={styles.label}>Nome da Instituição:</Text>

      <TextInput

        style={styles.input}

        value={nomeInst}

        onChangeText={(text) => setNomeInst(text)}

      />




      <Text style={styles.label}>Rua:</Text>

      <TextInput

        style={styles.input}

        value={rua}

        onChangeText={(text) => setRua(text)}


      />


      <Text style={styles.label}>Número:</Text>

      <TextInput

        style={styles.input}

        value={numero}

        onChangeText={(text) => setNumero(text)}


      />


      <Text style={styles.label}>Bairro:</Text>

      <TextInput

        style={styles.input}

        value={bairro}

        onChangeText={(text) => setBairro(text)}

      />


      <Text style={styles.label}>Cidade:</Text>

      <TextInput

        style={styles.input}

        value={cidade}

        onChangeText={(text) => setCidade(text)}

      />


      <Text style={styles.label}>Estado:</Text>

      <TextInput

        style={styles.input}

        value={estado}

        onChangeText={(text) => setEstado(text)}

      />


      <Text style={styles.label}>CEP:</Text>

      <TextInput

        style={styles.input}

        value={cep}

        onChangeText={(text) => setCep(text)}

        placeholder="00000-000"

      />


      <Text style={styles.label}>Descrição:</Text>

      <TextInput

        style={styles.input}

        value={descricao}

        onChangeText={(text) => setDescricao(text)}

        placeholder=""

        multiline={true}

        numberOfLines={4}

      />


      <View style={styles.buttonContainer}>

        <Text style={styles.button} onPress={handleSave}>Salvar</Text>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({})