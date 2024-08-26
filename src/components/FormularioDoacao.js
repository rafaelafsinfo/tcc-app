import { StyleSheet, Text, View, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

export default function FormularioDoacao(idUsuario, idInstituicao, data) {
  const [produto, setProduto] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await api.post("/Doacoes", {
        id_usuario: idUsuario,
        id_instituicao: idInstituicao,
        produto,
        data,
      });
      if (response.status) {
        navigation.navigate("MainPage");
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
    <SafeAreaView
    style={styles.container}>
      <Text>FormularioDoacao</Text>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderColor: "#f00",
  },
});
