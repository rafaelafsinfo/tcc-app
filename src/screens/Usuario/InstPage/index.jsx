import React, { useState, useEffect, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Animatable from "react-native-animatable";
import { useRoute } from "@react-navigation/native";
import api from "../../../services/api";
import { UserContext } from "../../../contexts/UserContext";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Message from "../../../components/Message";

export default function InstPage() {
  const route = useRoute();
  const {
    cnpj,
    nome_inst,
    rua,
    numero,
    bairro,
    cidade,
    estado,
    cep,
    descricao,
  } = route.params;
  const navigation = useNavigation();
  const { user } = useContext(UserContext);
  const [idUsuario, setIdUsuario] = useState("");
  const [idInstituicao, setIdinstituicao] = useState("");
  const [produto, setProduto] = useState("");
  const [data, setData] = useState("");
  const [error, setError] = useState(null);
  const [btn1Visible, setbtn1Visible] = useState(true);
  const [btn2Visible, setbtn2Visible] = useState(false);
  const [isBackgroundDark, setIsBackgroundDark] = useState(false);
  const [message, setMessage] = useState('')
  const [type, setType] = useState('success')

  const today = new Date();
  const formattedDate = formatDate(today, "dd/mm/aaaa");
  useEffect(() => {
    setData(formattedDate);
    setIdUsuario(user.id);
    setIdinstituicao(cnpj);
  }, []);

  function formatDate(date, format) {
    const map = {
      mm: date.getMonth() + 1,
      dd: date.getDate(),
      aaaa: date.getFullYear(),
    };
    return format.replace(/dd|mm|aaaa/gi, (matched) => map[matched]);
  }

  const handlepress = () => {
    setbtn1Visible(!btn1Visible);
    setbtn2Visible(!btn2Visible);
    setIsBackgroundDark(!isBackgroundDark);
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/Doacoes", {
        id_usuario: idUsuario,
        id_instituicao: idInstituicao,
        produto,
        data,
      });
      if (response.status) {
        setMessage('Doação Realizada com suceso!')
        setType('success')
        navigation.navigate("MainPage",{
          message:message,
          type:type
        });
      } else {
        setError("email ou senha invalidos");
        console.log(error);
      }
    } catch (error) {
      setError("erro ao logar");
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        <Animatable.View
          animation="fadeInLeft"
          delay={500}
          style={styles.containerHeader}
        >
          <Feather
            style={styles.BackButton}
            name="arrow-left"
            size={25}
            onPress={() => navigation.navigate("MainPage")}
          />
          <Text style={styles.InstitutionName}>{nome_inst}</Text>
        </Animatable.View>

        <Animatable.View
          animation="fadeInUp"
          delay={600}
          style={styles.containerForm}
        >
          <Animatable.Text animation="slideInLeft" delay={900}>
            <Text style={styles.detailstext}>Cnpj:{"\n"}</Text>
            {cnpj}
          </Animatable.Text>
          <Animatable.Text animation="slideInRight" delay={900}>
            <Text style={styles.detailstext}>Endereço:{"\n"}</Text>
            {rua}, {numero}
          </Animatable.Text>
          <Animatable.Text animation="slideInLeft" delay={900}>
            <Text style={styles.detailstext}>Bairro:{"\n"}</Text>
            {bairro}
          </Animatable.Text>
          <Animatable.Text animation="slideInRight" delay={900}>
            <Text style={styles.detailstext}>Cidade:{"\n"}</Text>
            {cidade} - {estado}
          </Animatable.Text>
          <Animatable.Text animation="slideInLeft" delay={900}>
            <Text style={styles.detailstext}>CEP:{"\n"}</Text>
            {cep}
          </Animatable.Text>
          <Animatable.Text animation="slideInRight" delay={900}>
            <Text style={styles.detailstext}>Descrição:{"\n"}</Text>
            {descricao}
          </Animatable.Text>
          {btn1Visible && (
            <TouchableOpacity style={styles.button} onPress={handlepress}>
              <Text style={styles.buttonText}>doar</Text>
            </TouchableOpacity>
          )}
        </Animatable.View>
      </ScrollView>
      {isBackgroundDark && (
        <>
          <View style={styles.darkOverlay} />
          {btn2Visible && (
            <Animatable.View
              animation="slideInUp"
              style={styles.containerDonation}
            >
              <TextInput
                value={produto}
                style={styles.input}
                placeholder="Digite o produto a ser doado"
                keyboardType="default"
                onChangeText={(text) => setProduto(text)}
              />
              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>doar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button} onPress={handlepress}>
                <Text style={styles.buttonText}>cancelar</Text>
              </TouchableOpacity>
            </Animatable.View>
          )}
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f7f8",
  },
  darkOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    zIndex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  containerForm: {
    flexGrow: 1,
    backgroundColor: "#f6f7f9",
    paddingTop: "10%",
    paddingStart: "7%",
    paddingEnd: "7%",
    paddingBottom: "100%",
  },
  detailstext: {
    fontSize: 18,
    fontWeight: "bold",
  },
  //---------------------------------------
  containerDonation: {
    position: "absolute",
    top: "35%",
    left: "10%",
    right: "10%",
    backgroundColor: "#4e0189",
    borderRadius: 20,
    alignItems: "center",
    padding: 23,
    paddingBottom: 60,
    zIndex: 2,
  },
  button: {
    backgroundColor: "#ff8c00",
    borderRadius: 50,
    paddingVertical: 10,
    marginTop: 20,
    width: "50%",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderRadius: 10,
    paddingStart: 8,
    paddingEnd: 8,
    marginTop: 20,
    height: 40,
    marginBottom: 12,
    fontSize: 16,
    borderColor: "#cdd1e0",
    backgroundColor: "#f9f7f8",
  },

  //--------------------------------------
  containerHeader: {
    width: "100%",
    height: 120,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    backgroundColor: "#4e0189",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  BackButton: {
    color: "#fff",
  },
  InstitutionName: {
    left: "50%",
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
  },
});
