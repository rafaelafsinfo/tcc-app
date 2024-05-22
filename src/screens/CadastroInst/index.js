import React,{useState} from 'react'
import api from '../../services/api'
import { View,Text,StyleSheet,TextInput,TouchableOpacity, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'



export default function CadastroInst() {
  const [cnpj,setCnpj] = useState('')
  const [nome_inst,setNome] = useState('')
  const [email,setEmail] = useState('')
  const [senha,setSenha] = useState('')
  const [rua,setRua] = useState('')
  const [numero,setNumero] = useState('')
  const [bairro,setBairro] = useState('')
  const [cidade,setCidade] = useState('')
  const [estado,setEstado] = useState('')
  const [CEP,setCEP] = useState('')
  const [descricao,setDescricao] = useState('')
  const [error,setError] = useState(null)
  const navigation = useNavigation()
  const handleSubmit = async () =>{
    try{
      const response = await api.post('/Instituicao',{
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
      if (response.status){
        navigation.navigate('MainPage')
      }else{
        setError('email ou senha invalidos')
        console.log(error)
      }
    }catch(error){
      setError('erro ao cadastrar')
      console.log(error)
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
    console.log(formattedCnpj)

  }

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' delay={600} style={styles.containerForm}>
        <ScrollView>
          <Text style={styles.title}>Cnpj</Text>
          <TextInput
            value={cnpj}
            style={styles.input}
            placeholder='informe o cnpj da instituição'
            autoCapitalize='words'
            autoComplete='name'
                        
            onChangeText={handleCnpjChange}
            />
          <Text style={styles.title}>nome_inst</Text>
          <TextInput
            value={nome_inst}
            style={styles.input}
            placeholder='Digite seu nome_inst'
            autoCapitalize='words'
            autoComplete='nickname'

            onChangeText={text => setNome(text)}
            />
          <Text style={styles.title}>E-mail</Text>
          <TextInput
            value={email}
            style={styles.input}
            placeholder='Digite seu E-mail'
            keyboardType='email-address'
            autoCapitalize='none'
            autoComplete='email'
            
            onChangeText={text => setEmail(text)}
            />
          <Text style={styles.title}>Senha</Text>
          <TextInput
            value={senha}
            style={styles.input}
            placeholder='Digite sua Senha'
            autoCapitalize='none'
            secureTextEntry
            autoComplete='password-new'
            onChangeText={text => setSenha(text)}
          />
          <Text style={styles.title}>CEP</Text>
          <TextInput
            value={CEP}
            style={styles.input}
            placeholder='Digite o CEP'
            autoCapitalize='none'
            autoComplete='postal-code'
            keyboardType='number-pad'
            onChangeText={text => setCEP(text)}
            />
          <Text style={styles.title}>Estado</Text>
          <TextInput
            value={estado}
            style={styles.input}
            placeholder='Digite o Estado'
            autoCapitalize='none'
            onChangeText={text => setEstado(text)}
          />
          <Text style={styles.title}>Cidade</Text>
          <TextInput
            value={cidade}
            style={styles.input}
            placeholder='Digite a Cidade'
            autoCapitalize='none'
            
            onChangeText={text => setCidade(text)}
          />
          <Text style={styles.title}>Bairro</Text>
          <TextInput
            value={bairro}
            style={styles.input}
            placeholder='Digite o bairro'
            autoCapitalize='none'
            
            onChangeText={text => setBairro(text)}
          />
          <Text style={styles.title}>rua</Text>
          <TextInput
            value={rua}
            style={styles.input}
            placeholder='Digite a Rua'
            autoCapitalize='none'
            autoComplete='street-address'
            
            onChangeText={text => setRua(text)}
            />
          <Text style={styles.title}>Numero</Text>
          <TextInput
            value={numero}
            style={styles.input}
            placeholder='Digite a numero da sede ex:300/301'
            autoCapitalize='none'
            autoComplete='street-address'
            
            onChangeText={text => setNumero(text)}
            />
          <Text style={styles.title}>Numero</Text>
          <TextInput
            value={descricao}
            style={styles.input}
            placeholder='descreva a instituicao'
            autoCapitalize='none'
            autoComplete='street-address'
            
            onChangeText={text => setDescricao(text)}
            />
        </ScrollView>

        <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity> 
        {error && <Text style={{color:'red'}}>{error}</Text>}
      </Animatable.View>
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