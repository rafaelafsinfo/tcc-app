import React,{ useState,useEffect, useContext } from 'react'
import { StyleSheet, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardDoacao from '../../../components/CardDoacoesUsuario'
import api from '../../../services/api'
import { UserContext } from '../../../contexts/UserContext'

export default function ListDoacoes() {

  const { user } = useContext(UserContext)
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get(`/Doacoes/User/${user.id}`)
    .then(response => {
      setData(response.data.dados)
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
            NomeInst = {item.NomeInst}
            data_doacao = {item.data_doacao}
            produto = {item.produto}
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