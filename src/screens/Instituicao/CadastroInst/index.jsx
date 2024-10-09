import React, { useContext, useState, useEffect } from "react";
import api from "../../../services/api";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "../../../contexts/UserContext";
import { Dropdown } from "react-native-element-dropdown";
import { Feather } from "@expo/vector-icons";
import axios from "axios";

export default function CadastroInst() {
  const { signInInst } = useContext(UserContext);
  const [Cnpj, setCnpj] = useState("");
  const [NomeInst, setNome] = useState("");
  const [Email, setEmail] = useState("");
  const [Senha, setSenha] = useState("");
  const [Rua, setRua] = useState("");
  const [Numero, setNumero] = useState("");
  const [Bairro, setBairro] = useState("");
  const [Cidade, setCidade] = useState("");
  const [Estado, setEstado] = useState("");
  const [CEP, setCEP] = useState("");
  const [Descricao, setDescricao] = useState("");
  const [error, setError] = useState(null);
  const [estados, setEstados] = useState(() => {});
  const [cidades, setCidades] = useState([]);
  const [isFocus, setIsFocus] = useState(false);
  const jsoncidades =
    "https://gist.githubusercontent.com/letanure/3012978/raw/6938daa8ba69bcafa89a8c719690225641e39586/estados-cidades.json";
  useEffect(() => {
    axios.get(jsoncidades).then((response) => {
      console.log(JSON.stringify(response.data.estados));
      setEstados(response.data.estados);
    });
  }, []);

  async function handleEstadoChange(item) {
    setEstado(item.sigla);
    setCidades(item.cidades);
    setCidade("");
  }

  const navigation = useNavigation();
  const handleSubmit = async () => {
    try {
      const response = await api.post("/Instituicao", {
        Cnpj,
        NomeInst,
        Email,
        Senha,
        Rua,
        Numero,
        Bairro,
        Cidade,
        Estado,
        CEP,
        Descricao,
      });
      if (response.status) {
        signInInst(
          response.data.dados[0].Cnpj,
          response.data.dados[0].NomeInst,
          response.data.dados[0].Email,
          response.data.dados[0].Rua,
          response.data.dados[0].Numero,
          response.data.dados[0].Bairro,
          response.data.dados[0].Cidade,
          response.data.dados[0].Estado,
          response.data.dados[0].CEP,
          response.data.dados[0].Descricao
        );
        navigation.navigate("Inst");
      } else {
        setError("email ou senha invalidos");
        console.log(error);
      }
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  const handleCnpjChange = (text) => {
    const notFormattedCnpj = text.replace(/\D/g, "");
    const formattedCnpj = notFormattedCnpj
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
    setCnpj(formattedCnpj);
    console.log(formattedCnpj);
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
        <ScrollView>
          <Text style={styles.title}>Cnpj</Text>
          <TextInput
            value={Cnpj}
            style={styles.input}
            placeholder="informe o cnpj da instituição"
            autoCapitalize="words"
            autoComplete="name"
            onChangeText={handleCnpjChange}
          />
          <Text style={styles.title}>Razao Social</Text>
          <TextInput
            value={NomeInst}
            style={styles.input}
            placeholder="Digite seu nome_inst"
            autoCapitalize="words"
            autoComplete="nickname"
            onChangeText={(text) => setNome(text)}
          />
          <Text style={styles.title}>E-mail</Text>
          <TextInput
            value={Email}
            style={styles.input}
            placeholder="Digite seu E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            onChangeText={(text) => setEmail(text)}
          />
          <Text style={styles.title}>Senha</Text>
          <TextInput
            value={Senha}
            style={styles.input}
            placeholder="Digite sua Senha"
            autoCapitalize="none"
            secureTextEntry
            autoComplete="password-new"
            onChangeText={(text) => setSenha(text)}
          />
          <Text style={styles.title}>CEP</Text>
          <TextInput
            value={CEP}
            style={styles.input}
            placeholder="Digite o CEP"
            autoCapitalize="none"
            autoComplete="postal-code"
            keyboardType="number-pad"
            onChangeText={(text) => setCEP(text)}
          />
          <Text style={styles.title}>Estado</Text>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={estados || []}
            search
            maxHeight={300}
            labelField="nome"
            valueField="sigla"
            placeholder={Estado != "" ? Estado : "Selecione um Estado"}
            value={Estado}
            searchPlaceholder="Search..."
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              handleEstadoChange(item);
              setIsFocus(false);
            }}
            renderRightIcon={() => <Feather name="filter" size={20} />}
          />

          {Estado != "" && (
            <View>
              <Text style={styles.title}>Cidade</Text>
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={cidades.map((city) => ({ label: city, value: city }))}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={Cidade != "" ? Cidade : "Selecione uma cidade"}
                searchPlaceholder="Search..."
                value={Cidade}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setCidade(item.value);
                  setIsFocus(false);
                }}
                renderRightIcon={() => <Feather name="filter" size={20} />}
              />
            </View>
          )}
          <Text style={styles.title}>Bairro</Text>
          <TextInput
            value={Bairro}
            style={styles.input}
            placeholder="Digite o bairro"
            autoCapitalize="none"
            onChangeText={(text) => setBairro(text)}
          />
          <Text style={styles.title}>rua</Text>
          <TextInput
            value={Rua}
            style={styles.input}
            placeholder="Digite a Rua"
            autoCapitalize="none"
            autoComplete="street-address"
            onChangeText={(text) => setRua(text)}
          />
          <Text style={styles.title}>Numero</Text>
          <TextInput
            value={Numero}
            style={styles.input}
            placeholder="Digite a numero da sede ex:300/301"
            autoCapitalize="none"
            autoComplete="street-address"
            onChangeText={(text) => setNumero(text)}
          />
          <Text style={styles.title}>Descrição</Text>
          <TextInput
            value={Descricao}
            style={styles.inputdesc}
            multiline
            placeholder="descreva a instituicao"
            autoCapitalize="none"
            autoComplete="street-address"
            onChangeText={(text) => setDescricao(text)}
          />
        </ScrollView>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Cadastrar</Text>
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
  inputdesc: {
    borderWidth: 1,
    borderRadius: 10,
    paddingStart: 8,
    paddingEnd: 8,
    height: 80,
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
    color: "#cdd1e0",
  },
  dropdown: {
    height: 50,
    borderColor: "#cdd1e0",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  scrollContainer: {
    paddingBottom: 50,
  },
});
