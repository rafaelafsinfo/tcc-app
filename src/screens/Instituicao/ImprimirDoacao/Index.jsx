import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  Platform,
  Text,
  Touchable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Animatable from "react-native-animatable";
import * as Print from "expo-print";
import { SafeAreaView } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import api from "../../../services/api";

export default function ImprimirDoacao() {
  const navigation = useNavigation();
  const route = useRoute();
  const [selectedPrinter, setSelectedPrinter] = useState();
  const { id } = route.params;
  const [data, setData] = useState([]);
  const html = `
<!DOCTYPE html>
<html>
<head>
  <title>QR Code Fixo</title>
  <style>
    #qrcode {
      alignItems: 'center',
      flex:1',
    }
  </style>
</head>
<body>
  
  <div id="qrcode">
    <img src="https://api.qrserver.com/v1/create-qr-code/?data=${id}&amp" alt=""/>
  </div>
</body>
</html>
`;

  const print = async () => {
    await Print.printAsync({
      html,
    });
  };

  useEffect(() => {
    api.get(`/Doacoes/${id}`).then((Response) => {
      setData(Response.data.dados[0]);
      console.log(data);
    });
  }, []);

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
            onPress={() => navigation.navigate("ListDoacoes")}
          />
          <Text style={styles.InstitutionName}>{data.NomeInst}</Text>
        </Animatable.View>
        <Animatable.View
          animation="fadeInUp"
          delay={600}
          style={styles.containerForm}
        >
          <Animatable.Text animation="slideInLeft" delay={900}>
            <Text style={styles.detailstext}>id de rastreio:{"\n"}</Text>
            {data.id}
          </Animatable.Text>
          <View style={styles.spacer} />
          <Animatable.Text animation="slideInLeft" delay={900}>
            <Text style={styles.detailstext}>produto:{"\n"}</Text>
            {data.produto}
          </Animatable.Text>
          <View style={styles.spacer} />
          <Animatable.Text animation="slideInLeft" delay={900}>
            <Text style={styles.detailstext}>data da Doação:{"\n"}</Text>
            {data.data_doacao}
          </Animatable.Text>
          <View style={styles.spacer} />

          <Animatable.Text animation="slideInLeft" delay={900}>
            <Text style={styles.detailstext}>trajetoria:{"\n"}</Text>
            {data.trajetoria == 1 ? "entregue" : "a caminho"}
          </Animatable.Text>
          <View style={styles.spacer} />

          <Animatable.Text animation="slideInLeft" delay={900}>
            <Text style={styles.detailstext}>primeiro nome:{"\n"}</Text>
            {data.p_nome}
          </Animatable.Text>
          <View style={styles.spacer} />

          <Animatable.Text animation="slideInLeft" delay={900}>
            <Text style={styles.detailstext}>sobrenome:{"\n"}</Text>
            {data.sobrenome}
          </Animatable.Text>
          <View style={styles.spacer} />

          <Animatable.Text animation="slideInLeft" delay={900}>
            <Text style={styles.detailstext}>username:{"\n"}</Text>
            {data.username}
          </Animatable.Text>
          <View style={styles.spacer} />

          <TouchableOpacity onPress={print} style={styles.button}>
            <Animatable.Text style={styles.buttonText}>
              Imprimir
            </Animatable.Text>
          </TouchableOpacity>
        </Animatable.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f7f8",
  },
  spacer: {
    height: 16,
  },
  printer: {
    textAlign: "center",
    color: "#4e0189",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#4e0189",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
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
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
});
