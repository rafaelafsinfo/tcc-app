import React from "react";
import { TouchableOpacity,Text,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function({id_usuario,nome_usuario,data,produto,trajetoria}){
const navigation = useNavigation()
    return(
        <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('Rastreio', {
            id_usuario:id_usuario, 
            nome_usuario: nome_usuario,
            data: data, 
            produto: produto, 
            trajetoria: trajetoria, 
            })}>
            <Text style={styles.text}>
                <Text style={styles.title}>id_usuario</Text> : {id_usuario}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>nome</Text>: {nome_usuario}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>data</Text>: {data}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>produto</Text>: {produto}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>trajetoria</Text>: {trajetoria}
            </Text>
            
        </TouchableOpacity>
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