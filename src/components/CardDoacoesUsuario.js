import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function CardDoacao({NomeInst, data_doacao, produto, trajetoria}) {

    const get_local = (item) =>{
        if (item == 0){
          return 'A caminho'
        }else{
          return 'Entregue'
        }
    }
    return (
        <View style={styles.card}>
            <Text style={styles.text}>
                <Text style={styles.title}>Razao Social</Text>: {NomeInst}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>data</Text>: {data_doacao}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>produto</Text>: {produto}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>trajetoria</Text>: {get_local(trajetoria)}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
  card:{
    padding:'2.5%',
    borderRadius:25,
    borderColor:'#000',
    backgroundColor:'#4e0189',
    marginVertical:8,
    marginHorizontal:16,
    
},
title:{
    fontSize:16,
    color:'#fff',
    fontWeight:'bold',
    marginTop:28,
    marginBottom:12,
},
text:{
    color:'#fff'
}
})