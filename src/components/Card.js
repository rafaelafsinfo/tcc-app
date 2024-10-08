import React from "react";
import { TouchableOpacity,Text,StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function({cnpj,nome_inst,rua,numero,bairro,cidade,estado,cep,descricao}){
const navigation = useNavigation()

    /*<Text style={styles.text}>
    <Text style={styles.title}>descricao</Text>: {descricao}
    </Text>*/     
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
                <Text style={styles.title}>{nome_inst}</Text>
            </Text>
            
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card:{
        padding:'5%',
        borderRadius:25,
        backgroundColor:'#4e0189',
        marginVertical:8,
        marginHorizontal:16,
        shadowColor:"#000",
        shadowOpacity:0.5,
        shadowRadius:3.84,
        elevation:5
        
    },
    title:{
        fontSize:16,
        color:'#fff',
        fontWeight:'bold',
        marginTop:28,
        marginBottom:12,
    },
    text:{
        color:'#fff',
        alignSelf:'center'
    }
    
})