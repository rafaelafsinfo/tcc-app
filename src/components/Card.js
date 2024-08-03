import React from "react";
import { TouchableOpacity,Text,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
export default function({cnpj,nome_inst,rua,numero,bairro,cidade,estado,cep,descricao}){
const navigation = useNavigation()
    return(
        <TouchableOpacity 
        style={styles.card}
        onPress={() => navigation.navigate('InstPage', {
            cnpj:cnpj, 
            nome_inst: nome_inst,
            rua: rua, 
            numero: numero, 
            bairro: bairro, 
            cidade: cidade, 
            estado: estado, 
            cep: cep, 
            descricao: descricao})}>
            <Text style={styles.text}>
                <Text style={styles.title}>cnpj</Text> : {cnpj}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>nome</Text>: {nome_inst}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>rua</Text>: {rua}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>numero</Text>: {numero}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>bairro</Text>: {bairro}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>cidade</Text>: {cidade}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>estado</Text>: {estado}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>cep</Text>: {cep}
            </Text>
            <Text style={styles.text}>
                <Text style={styles.title}>descricao</Text>: {descricao}
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