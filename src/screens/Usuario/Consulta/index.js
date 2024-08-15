import { StyleSheet, Text, View,FlatList } from 'react-native'
import React,{useState,useEffect} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardDoacao from '../../../components/CardDoacao'
import api from '../../../services/api'

export default function ListDoacoes() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get('/Doacoes')
      .then(response => {
        setData(response.data.dados);
      });
  }, []);
  return (
    <SafeAreaView>
      <FlatList
        style={styles.cards}
        data={data}
        renderItem={({ item }) => (
          <CardDoacao
            id = {item.id}
            produto = {item.produto}
            data_doacao = {item.data_data}
            trajetoria = {item.trajetoria}
          />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#f9f7f8'
  },
  cards:{
    padding:10
  }
})