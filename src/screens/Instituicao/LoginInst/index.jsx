import React, { useState, useContext } from "react";
import api from "../../../services/api";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../contexts/UserContext";

export default function LoginInst() {
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const [error, setError] = useState(null);
  const navigation = useNavigation();
  const { signInInst } = useContext(UserContext);

  const handleSubmit = async () => {
    try {
      const response = await api.post("/Login/Instituicao", {
        Email,
        Senha,
      });
      if (response.status) {
        const response2 = await api.get(`/Instituicao/${Email}`);
        signInInst(
          response.data.Cnpj,
          response.data.NomeInst,
          response.data.Email,
          response2.data.dados[0].Rua,
          response2.data.dados[0].Numero,
          response2.data.dados[0].Bairro,
          response2.data.dados[0].Cidade,
          response2.data.dados[0].Estado,
          response2.data.dados[0].CEP,
          response.data.Descricao
        );
      } else {
        setError("Email ou Senha invalidos");
        console.log(error);
      }
    } catch (error) {
      setError("erro ao logar");
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View
        animation="fadeInLeft"
        delay={500}
        style={styles.containerHeader}
      >
        <Text style={styles.message}>Bem-vindo(a)</Text>
      </Animatable.View>

      <Animatable.View
        animation="fadeInUp"
        delay={600}
        style={styles.containerForm}
      >
        <Text style={styles.title}>E-mail</Text>
        <TextInput
          value={Email}
          style={styles.input}
          placeholder="Digite seu E-mail"
          keyboardType="Email-address"
          autoCapitalize="none"
          autoComplete="Email"
          onChangeText={(text) => setEmail(text)}
        />
        <View>
          <Text style={styles.title}>Senha</Text>
          <TextInput
            value={Senha}
            style={styles.input}
            placeholder="Digite sua Senha"
            autoCapitalize="none"
            secureTextEntry
            onChangeText={(text) => setSenha(text)}
          />
          <TouchableOpacity
            style={styles.buttonRec}
            onPress={() => navigation.navigate("RecSenha")}
          >
            <Text style={styles.registerText}>
              Esqueceu sua senha?{" "}
              <Text style={styles.registerSpan}>Recuperar Senha</Text>
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister}>
          <Text
            style={styles.registerText}
            onPress={() => navigation.navigate("CadastroInst")}
          >
            Não possui uma conta?{" "}
            <Text style={styles.registerSpan}>Cadastre-se</Text>
          </Text>
        </TouchableOpacity>
        {error && <Text style={{ color: "red" }}>{error}</Text>}
      </Animatable.View>
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
  buttonRec: {
    position: "relative",
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
