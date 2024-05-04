import React,{useState} from 'react'
import axios from 'axios'
import { View,Text,StyleSheet,TextInput,TouchableOpacity} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'


export default function Login() {
  const [email,setEmail] = useState('')
  const [senha,setSenha] = useState('')
  const [error,setError] = useState(null)
  
  const handleSubmit = async () =>{
    try{
      const response = await axios.post('http://15.228.203.122:3000/Login/Usuario',{
        email,
        senha,
      })
      if (response.data.success){
        console.log('login realizado com sucesso')
      }else{
        setError('email ou senha invalidos')
        console.log(email,senha)
      }
    }catch(error){
      setError('erro ao logar')
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View animation='fadeInLeft' delay={500} style={styles.containerHeader}>
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View animation='fadeInUp' delay={600} style={styles.containerForm}>
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
          onChangeText={text => setSenha(text)}
        />

        <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.buttonRegister}>
          <Text style={styles.registerText}>Não possui uma conta? <Text style={styles.registerSpan}>Cadastre-se</Text ></Text>
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
    marginTop:'15%',
    marginBottom:'10%',
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