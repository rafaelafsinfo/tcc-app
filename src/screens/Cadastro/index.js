import React,{useState} from 'react'
import api from '../../services/api'
import { View,Text,StyleSheet,TextInput,TouchableOpacity, ScrollView} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'



export default function CadastroInst() {
  const [p_nome,setPNome] = useState('')
  const [sobrenome,setSobrenome] = useState('')
  const [username,setUsername] = useState('')
  const [email,setEmail] = useState('')
  const [senha,setSenha] = useState('')
  const [cidade,setCidade] = useState('')
  const [estado,setEstado] = useState('')
  const [error,setError] = useState(null)
  const navigation = useNavigation()
  const handleSubmit = async () =>{
    try{
      const response = await api.post('/Usuario',{
        p_nome,
        sobrenome,
        username,
        email,
        senha,
        cidade,
        estado,
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

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' delay={600} style={styles.containerForm}>
        <ScrollView>
          <Text style={styles.title}>Primeiro Nome</Text>
          <TextInput
            value={p_nome}
            style={styles.input}
            placeholder='Digite seu Primeiro Nome'
            autoCapitalize='words'
            autoComplete='name'
            
            onChangeText={text => setPNome(text)}
            />
          <Text style={styles.title}>Sobrenome</Text>
          <TextInput
            value={sobrenome}
            style={styles.input}
            placeholder='Digite seu Sobrenome'
            autoCapitalize='words'
            autoComplete='name-family'

            onChangeText={text => setSobrenome(text)}
            />
          <Text style={styles.title}>Username</Text>
          <TextInput
            value={username}
            style={styles.input}
            placeholder='Escolha um nome de Usuario'
            autoCapitalize='none'
            autoComplete='username'
            
            onChangeText={text => setUsername(text)}
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
          <Text style={styles.title}>Cidade</Text>
          <TextInput
            value={cidade}
            style={styles.input}
            placeholder='Digite sua Cidade'
            autoCapitalize='none'
            onChangeText={text => setCidade(text)}
          />
          <Text style={styles.title}>Estado</Text>
          <TextInput
            value={estado}
            style={styles.input}
            placeholder='Digite sua Estado'
            autoCapitalize='none'
            onChangeText={text => setEstado(text)}
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