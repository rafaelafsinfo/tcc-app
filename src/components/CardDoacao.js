import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'

export default function CardDoacao({id,produto,data_doacao,trajetoria}) {
  const navigation = useNavigation()
  return (
    <TouchableOpacity
    onPress={() => navigation.navigate('Rastreio', {
      id:id, 
      produto: produto,
      data_doacao: data_doacao, 
      trajetoria: trajetoria})}>
        <Text style={styles.text}>
                <Text style={styles.title}>id</Text> : {id}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>produto</Text>: {produto}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>data</Text>: {data_doacao}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>trajetoria</Text>: {trajetoria}
            </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})