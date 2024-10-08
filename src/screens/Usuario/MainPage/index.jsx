import React from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  RefreshControl,
  TextInput,
  View,
} from "react-native";
import { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Card from "../../../components/Card";
import api from "../../../services/api";
import * as Animatable from "react-native-animatable";
import { Dropdown } from "react-native-element-dropdown";
import { Feather } from "@expo/vector-icons";

export default function MainContent() {
  const estados = [
    { label: "todos", sigla: "" },
    { label: "Acre", sigla: "AC" },
    { label: "Alagoas", sigla: "AL" },
    { label: "Amapá", sigla: "AP" },
    { label: "Amazonas", sigla: "AM" },
    { label: "Bahia", sigla: "BA" },
    { label: "Ceará", sigla: "CE" },
    { label: "Distrito Federal", sigla: "DF" },
    { label: "Espírito Santo", sigla: "ES" },
    { label: "Goiás", sigla: "GO" },
    { label: "Maranhão", sigla: "MA" },
    { label: "Mato Grosso", sigla: "MT" },
    { label: "Mato Grosso do Sul", sigla: "MS" },
    { label: "Minas Gerais", sigla: "MG" },
    { label: "Pará", sigla: "PA" },
    { label: "Paraíba", sigla: "PB" },
    { label: "Paraná", sigla: "PR" },
    { label: "Pernambuco", sigla: "PE" },
    { label: "Piauí", sigla: "PI" },
    { label: "Rio de Janeiro", sigla: "RJ" },
    { label: "Rio Grande do Norte", sigla: "RN" },
    { label: "Rio Grande do Sul", sigla: "RS" },
    { label: "Rondônia", sigla: "RO" },
    { label: "Roraima", sigla: "RR" },
    { label: "Santa Catarina", sigla: "SC" },
    { label: "São Paulo", sigla: "SP" },
    { label: "Sergipe", sigla: "SE" },
    { label: "Tocantins", sigla: "TO" },
  ];

  const combodata = [
    { label: "Razao Social", value: "1" },
    { label: "Cidade", value: "2" },
    { label: "Estado", value: "3" },
    { label: "Cep", value: "4" },
  ];
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [selectedValue, setSelectedValue] = useState("");
  const [SelectedEstado, setSelectedEstado] = useState("");

  useEffect(() => {
    const filterData = () => {
      if (selectedValue === "1") {
        search == ""
          ? api.get(`/Instituicao`).then((response) => {
              setData(response.data.dados);
            })
          : setData(data.filter((item) => item.NomeInst.indexOf(search) > -1));
      } else if (selectedValue === "2") {
        search == ""
          ? api.get(`/Instituicao`).then((response) => {
              setData(response.data.dados);
            })
          : setData(data.filter((item) => item.Cidade.indexOf(search) > -1));
      } else if (selectedValue === "3") {
        SelectedEstado == ""
          ? api.get(`/Instituicao`).then((response) => {
              setData(response.data.dados);
            })
          : setData(
              data.filter((item) => item.Estado.indexOf(SelectedEstado.toLowerCase()) > -1)
            );
      } else if (selectedValue === "4") {
        // Filter by CEP
        search == ""
          ? api.get(`/Instituicao`).then((response) => {
              setData(response.data.dados);
            })
          : setData(data.filter((item) => item.CEP.indexOf(search) > -1));
      }
    };

    filterData();
  }, [selectedValue, search, SelectedEstado]);

  /*useEffect(() => {
    if (search === "") {
      api.get(`/Instituicao`).then((response) => {
        setData(response.data.dados);
      });
    } else {
      console.log(search);
      setData(data.filter((item) => item.Descricao.indexOf(search) > -1));
    }
  }, [search]);*/

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      const response = await api.get(`/Instituicao`);
      setData(response.data.dados);
    } catch (error) {
      setError(error);
    } finally {
      setRefreshing(false);
    }
  };
  useEffect(() => {
    api.get("/Instituicao").then((response) => {
      setData(response.data.dados);
    });
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Animatable.View style={styles.containerHeader} animation="fadeInDown">
        <Text style={styles.title}>Para quem deseja doar hoje?</Text>
      </Animatable.View>

      <Animatable.View style={styles.listcontainer} animation="fadeInUp">
        <View>
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={combodata}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={
              selectedValue != ""
                ? combodata[selectedValue - 1].label
                : "Selecione um Filtro"
            }
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item) => {
              setSelectedValue(item.value);
              setIsFocus(false);
            }}
            renderRightIcon={() => <Feather name="filter" size={20} />}
          />
        </View>
        {selectedValue != "" && (
          <View>
            {selectedValue != 3 && (
              <TextInput
                value={search}
                style={styles.filterinput}
                placeholder="Pesquise a instituição ..."
                autoCapitalize="none"
                onChangeText={(text) => setSearch(text)}
              />
            )}
            {selectedValue == 3 && (
              <Dropdown
                style={[styles.dropdown, isFocus && { borderColor: "blue" }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={estados}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={
                  SelectedEstado != "" ? SelectedEstado : "Selecione um Estado"
                }
                searchPlaceholder="Search..."
                value={SelectedEstado}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item) => {
                  setSelectedEstado(item.sigla);
                  setIsFocus(false);
                }}
                renderLeftIcon={() => <Feather name="home" size={20} />}
              />
            )}
          </View>
        )}

        <FlatList
          style={styles.cards}
          data={data}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={({ item }) => (
            <Card
              cnpj={item.Cnpj}
              nome_inst={item.NomeInst}
              rua={item.Rua}
              numero={item.Numero}
              bairro={item.Bairro}
              cidade={item.Cidade}
              estado={item.Estado}
              cep={item.CEP}
              descricao={item.Descricao}
            />
          )}
          keyExtractor={(item) => item.Cnpj}
        />
      </Animatable.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f7f8",
  },
  containerHeader: {
    height: 120,
    borderBottomLeftRadius:25,
    borderBottomRightRadius:25,
    backgroundColor:'#4e0189',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#fff",
  },
  filterinput: {
    fontSize: 20,
    borderColor: "rgba(0, 0, 0, 0.3)",
    padding: 5,
    borderWidth: 2,
    borderRadius: 15,
    marginTop: 15,
    marginHorizontal: 10,
  },
  cards: {
    padding: 10,
  },
  dropdown: {
    marginHorizontal: 20,
    height: 55,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 8,
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
});
