import { StyleSheet, FlatList,RefreshControl } from 'react-native'
import React,{useState,useEffect, useContext} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CardDoacao from '../../../components/CardDoacao'
import api from '../../../services/api'
import { UserContext } from '../../../contexts/UserContext'

export default function ListDoacoes() {
  const [data, setData] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [error,setError] = useState(null)

  const { user } = useContext(UserContext)


  const onRefresh = async () => {
    try{
      setRefreshing(true)
      const response = await api.get(`/Doacoes/Inst/${user.Email}`)
      setData(response.data.dados)
    }catch(error){
      setError(error)
    }finally{
      setRefreshing(false)
    }
  };
  useEffect(() => {
    api.get(`/Doacoes/Inst/${user.Email}`)
      .then(response => {
        setData(response.data.dados);
      });
  }, []);
  return ( 
    <SafeAreaView>
      <FlatList
        style={styles.cards}
        data={data}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
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