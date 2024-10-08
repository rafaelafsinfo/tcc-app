import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable'
import { UserContext } from '../../../contexts/UserContext';
import api from '../../../services/api'


export default function OpcoesUsuario(){

    const navigation = useNavigation()
    const { user } = useContext(UserContext)
    const [id, Set_id] = useState(user.id)
    const [p_nome, Setp_nome] = useState(user.p_nome)
    const [sobrenome, Setsobrenome] = useState(user.sobrenome)
    const [username, Setusername] = useState(user.username)
    const [cidade, Setcidade] = useState(user.cidade)
    const [estado, Setestado] = useState(user.estado)
    const [error, setError] = useState('')

    const Submit = async () =>{
        try{
            
            const response = await api.put('/Usuario',{
                id,
                p_nome,
                sobrenome,
                username,
                cidade,
                estado
            })
            console.log(response.data)

        }catch(error){
            setError('erro ao logar')
            console.log(error)
        }
    }

    return(
        <SafeAreaView style={styles.maincontainer}>

            <Animatable.View animation='fadeInDown' style={styles.containerHeader}>
                <Text style={styles.textmessage}>Alterar Usuário</Text>
            </Animatable.View>

            <Animatable.View animation='fadeInUp'style={styles.containeropcoes}>
                
                <Text style={styles.entradas}>Primeiro nome:</Text>
                <TextInput
                    style={styles.input}
                    placeholder= {user.p_nome
                    }
                    autoCapitalize='none'
                    onChangeText={text => Setp_nome(text)}
                />
                <Text style={styles.entradas}>Sobrenome:</Text>
                <TextInput
                    style={styles.input}
                    placeholder= {user.sobrenome}
                    autoCapitalize='none'
                    onChangeText={text => Setsobrenome(text)}
                />
                <Text style={styles.entradas}>Username:</Text>
                <TextInput
                    style={styles.input}
                    placeholder= {user.username}
                    autoCapitalize='none'
                    onChangeText={text => Setusername(text)}
                />
                <Text style={styles.entradas}>Cidade:</Text>
                <TextInput
                    style={styles.input}
                    placeholder= {user.cidade}
                    autoCapitalize='none'
                    onChangeText={text => Setcidade(text)}
                />
                <Text style={styles.entradas}>Estado:</Text>
                <TextInput
                    style={styles.input}
                    placeholder= {user.estado}
                    autoCapitalize='none'
                    onChangeText={text => Setestado(text)}
                />
                
                <TouchableOpacity
                onPress={Submit}>
                    <Text 
                    style={styles.botaosubmeter}>
                        Submeter
                    </Text>
                </TouchableOpacity>

            </Animatable.View>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    maincontainer:{
        flex:1,
        backgroundColor: '#f6f7f9'
    },
    containerHeader: {
        height: 120,
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        backgroundColor:'#4e0189',
        alignItems: 'center',
        justifyContent: 'center',
      },
    textmessage:{
        fontSize:28,
        color: '#fff'
    },
    botaovoltar:{
        position: 'absolute',
        top: 10,
        left:10,
        padding: 10,
    },
    containeropcoes:{
        flex: 1,
        marginTop:'5%',
        paddingStart:'5%',
        paddingEnd:'5%',
      },
    botaosubmeter:{
        fontSize:17,
        color: '#fff',
        backgroundColor: '#4e0189',
        margin:'5%',
        padding:15,
        borderRadius: 25,
        alignSelf:'center'
    },
    entradas:{
        fontSize:17
    },
    input:{
        borderWidth:1,
        borderRadius:10,
        paddingStart:8,
        paddingEnd:8,
        height:40,
        marginBottom:12,
        fontSize:16,
        borderColor:'#cdd1e0'
    }

})