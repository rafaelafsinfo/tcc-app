import { StyleSheet, Text, TouchableOpacity,TextInput } from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import api from "../../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

export default function RecSenha() {
  const navigation = useNavigation()
  const { signInUser } = useContext(UserContext)
  const [Email, setEmail] = useState("");
  const [Senha,setSenha] = useState("")
  const [TestSenha,setTestSenha] = useState("")
  const [Codigo, setCodigo] = useState("");
  const [Codigoemail, setCodigoemail] = useState("");
  const [Visible, setVisible] = useState(true);
  const [Visible2, setVisible2] = useState(false);
  const [Visible3, setVisible3] = useState(false);

  const verify_email = async () => {
    await api.get(`/Usuario/${Email}`).then((response) => {
      console.log(response.data);
      response.status == 200 ? send_email : console.log("email não encontrado")
    })
    
  };

  const send_email = async () => {
    setVisible(!Visible)
    setVisible2(!Visible2)
    setCodigoemail(Math.floor(Math.random() * (99999 - 0 + 1)) + 0);
    const to = Email;
    console.log(Codigoemail);
    console.log(to);

    const data = {
      service_id: "service_329817j",
      template_id: "template-bn1nlsg",
      user_id: "wWqMRT6VQkphMFS09",
      template_params: {
        to: to,
        codigo: Codigoemail,
      },
    };

    await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      data: JSON.stringify(data),
      contentType: "application/json",
    })
      .then(function (response) {
        if (response.status == 200) {
          console.log("enviado" + response);
          resolve(response);
        }
      })
      .catch(function (err) {
        console.error(err);
      });
  };

  const verify_code = async () => {
    if(Codigo == Codigoemail){
      setVisible2(!Visible2)
      setVisible3(!Visible3)
    }else{
      console.error("codigo invalido")
    }
  }

  const alter_Senha = async ()=>{
    try {
      const senhadiferente = true
      const setUsuario = async ()=>{
        const response = await api.get(`/Usuario/${email}`)
        signInUser(response.data.id,
          response.data.dados[0].p_nome,
          response.data.dados[0].sobrenome,
          response.data.dados[0].email,
          response.data.dados[0].cidade,
          response.data.dados[0].estado,
          response.data.dados[0].username)
      }
      if(Senha==TestSenha){
        api.post("Login/Usuario",{
          email:Email,
          senha:Senha
        }).then((response) =>{
          response.status == 200 ? console.error("a senha não pode ser igual a anterior") : senhadiferente = false
        }).catch((err) =>{
          console.error(err)
        })
        if (senhadiferente == true){
          await api.post('/sendrec/Usuario',{
            email:Email,
            senha:Senha
          }).then((response)=>{
            response.status == 200 ? setUsuario : console.error("erro ao alterar senha "+response.data.dados)
          })
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      {Visible && (
        <SafeAreaView>
          <TextInput
            value={Email}
            style={styles.input}
            placeholder="Digite o email da conta"
            keyboardType="default"
            onChangeText={(text) => setEmail(text)}
          />

          <TouchableOpacity style={styles.button} onPress={verify_email}>
            <Text style={styles.buttonText}>enviar email</Text>
          </TouchableOpacity>

        </SafeAreaView>
      )}
      {Visible2 && (
        <SafeAreaView>
        <TextInput
          value={Codigo}
          style={styles.input}
          placeholder="Digite o codigo recebido no email"
          keyboardType="default"
          onChangeText={(text) => setCodigo(text)}
        />

        <TouchableOpacity style={styles.button} onPress={verify_code}>
          <Text style={styles.buttonText}>definir código</Text>
        </TouchableOpacity>
      </SafeAreaView>
      )}
      {Visible3 && (
        <SafeAreaView>
        <TextInput
          value={Senha}
          style={styles.input}
          placeholder='Digite sua Nova Senha'
          autoCapitalize='none'
          secureTextEntry
          onChangeText={text => setSenha(text)}
        />
        <TextInput
          value={TestSenha}
          style={styles.input}
          placeholder='Confirme sua Nova Senha'
          autoCapitalize='none'
          secureTextEntry
          onChangeText={text => setTestSenha(text)}
        />

        <TouchableOpacity style={styles.button} onPress={alter_Senha}>
          <Text style={styles.buttonText}>enviar</Text>
        </TouchableOpacity>

        
      </SafeAreaView>
      )}
      <TouchableOpacity style={styles.button} onPress={navigation.navigate("Login")}>
          <Text style={styles.buttonText}>cancelar</Text>
        </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4e0189",
  },
  containerHeader: {
    marginTop: "13%",
    marginBottom: "8%",
    paddingStart: "5%",
  },
  message: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
  containerForm: {
    flex: 1,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingStart: "5%",
    paddingEnd: "5%",
    backgroundColor: "#f6f7f9",
  },
  title: {
    fontSize: 20,
    marginTop: 28,
    color: "#4E0189",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingStart: 8,
    paddingEnd: 8,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    borderColor: "#cdd1e0",
  },
  button: {
    backgroundColor: "#4e0189",
    width: "100%",
    borderRadius: 10,
    paddingVertical: 8,
    marginTop: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonRegister: {
    position: "absolute",
    bottom: "5%",
    alignSelf: "center",
  },
  registerText: {
    color: "#999ea1",
  },
  registerSpan: {
    color: "#4e0189",
  },
});
