import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TextInput,
  View,
} from "react-native";
import React, { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import api from "../../../services/api";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import emailjs, { EmailJSResponseStatus } from "@emailjs/react-native";
import * as Animatable from "react-native-animatable";
import { Feather } from "@expo/vector-icons";

export default function RecSenha() {
  const navigation = useNavigation();
  const { signInUser } = useContext(UserContext);
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const [TestSenha, setTestSenha] = useState("");
  const [Codigo, setCodigo] = useState("");
  const [Codigoemail, setCodigoemail] = useState("");
  const [Visible, setVisible] = useState(true);
  const [Visible2, setVisible2] = useState(false);
  const [Visible3, setVisible3] = useState(false);

  const verify_email = async () => {
    await api.get(`/Usuario/${Email}`).then((response) => {
      console.log(response.data);
      response.status == 200
        ? send_email()
        : console.log("email não encontrado");
    });
  };

  async function send_email() {
    setVisible(!Visible);
    setVisible2(!Visible2);
    const codigo = Math.floor(Math.random() * (99999 - 0 + 1)) + 0;
    const to = Email;
    setCodigoemail(codigo);
    console.log(codigo);
    console.log(to);

    const templateParams = {
      to: to,
      message: codigo,
    };

    try {
      emailjs.send('service_329817j','template_bn1nlsg',templateParams,{
        publicKey:'sZEdmnqG5MHXZdaUD',
      }).then((response) => {
        console.log('SUCCESS!', response.status, response.text);
      },(err)=>{
        console.log('FAILED...', err);
      })
    } catch (err) {
      err instanceof EmailJSResponseStatus ? console.error('EMAILJS FAILED...', err) : console.error(err)
    }
  }

  const verify_code = async () => {
    if (Codigo == Codigoemail) {
      setVisible2(!Visible2);
      setVisible3(!Visible3);
    } else {
      console.error("codigo invalido");
    }
  };

  const alter_Senha = async () => {
    try {
      if (Senha == TestSenha) {
        await api
          .post("/sendrec/Usuario", {
            email: Email,
            senha: Senha,
          })
          .then((response) => {
            response.status == 200
              ? navigation.navigate("Home")
              : console.error("erro ao alterar senha " + response.data.dados);
          });
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <View style={styles.containerText}>
          <Feather
            style={styles.arrow}
            name="arrow-left"
            size={30}
            onPress={() => navigation.navigate("Login")}
          />
          <Text style={styles.message}>Recuperação de senha</Text>
        </View>
      </Animatable.View>
      {Visible && (
        <View style={styles.containerForm}>
          <Text style={styles.title}>Digite o email da conta</Text>
          <TextInput
            value={Email}
            style={styles.input}
            placeholder="exemplo@exemplo.com"
            keyboardType="default"
            onChangeText={(text) => setEmail(text)}
          />

          <TouchableOpacity style={styles.button} onPress={verify_email}>
            <Text style={styles.buttonText}>enviar email</Text>
          </TouchableOpacity>
        </View>
      )}
      {Visible2 && (
        <View style={styles.containerForm}>
          <Text style={styles.title}>Digite o codigo recebido no email</Text>
          <TextInput
            value={Codigo}
            style={styles.input}
            placeholder="00000"
            keyboardType="default"
            onChangeText={(text) => setCodigo(text)}
          />

          <TouchableOpacity style={styles.button} onPress={verify_code}>
            <Text style={styles.buttonText}>definir código</Text>
          </TouchableOpacity>
        </View>
      )}
      {Visible3 && (
        <View style={styles.containerForm}>
          <Text style={styles.title}>Digite sua Nova Senha</Text>
          <TextInput
            value={Senha}
            style={styles.input}
            placeholder="nova senha"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) => setSenha(text)}
          />
          <TextInput
            value={TestSenha}
            style={styles.input}
            placeholder="Confirme sua Nova Senha"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) => setTestSenha(text)}
          />

          <TouchableOpacity style={styles.button} onPress={alter_Senha}>
            <Text style={styles.buttonText}>enviar</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>enviar</Text>
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
  containerText: {
    flexDirection: "row",
  },
  arrow: {
    alignItems: "center",
    color: "#fff",
  },
  message: {
    alignItems: "center",
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
