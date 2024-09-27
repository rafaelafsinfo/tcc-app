import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, { UseState } from 'react'
import { UserContext } from '../../../contexts/UserContext'
import emailjs from '@emailjs/browser'
import api from '../../../services/api'

export default function index() {
  const [Email, setEmail] = useState('cu')

  const verify_email = async () =>{
    const response =  await api.get(`/Usuario/${Email}`)
    console.log(response.data)
  }

  const send_email = () =>{ 
    const codigo = Math.floor(Math.random() * (99999 - 0 + 1)) + 0;
    const to = Email;
    console.log(codigo);
    console.log(to);
  
    const data = {
      service_id: "service_329817j",
      template_id: "template-bn1nlsg",
      user_id: "wWqMRT6VQkphMFS09",
      template_params: {
          to: to,
          codigo: codigo,
        },
    };

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      data: JSON.stringify(data),
      contentType: 'application/json',
    }).then(function (response){
      if (response.status == 200){
          console.log("enviado" + response);
          resolve(response);
      }
      }).catch(function (err){
        console.error(err);
      });
  }

  return (
    <View style={styles.container}>
      <Text>index</Text>
    </View>
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