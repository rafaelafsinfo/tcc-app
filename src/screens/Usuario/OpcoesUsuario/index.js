import React, { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput } from "react-native";
import * as Animatable from 'react-native-animatable'
import Icon from 'react-native-vector-icons/Feather';
import { UserContext } from '../../../contexts/UserContext';


export default function OpcoesUsuario(){

    const navigation = useNavigation()
    const { user } = useContext(UserContext)
    const [p_nome, Setp_nome] = useState('')
    const [sobrenome, Setsobrenome] = useState('')
    const [cidade, Setcidade] = useState('')
    const [estado, Setestado] = useState('')

    return(
        <SafeAreaView style={styles.maincontainer}>

            <Animatable.View animation='fadeInDown' delay={600} style={styles.containerHeader}>

                <TouchableOpacity
                style={styles.botaovoltar}
                onPress={()=>navigation.navigate('Profile')}>
                    <Icon name="arrow-left" size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.textmessage}>Alterar Usuário</Text>

            </Animatable.View>

            <Animatable.View animation='fadeInUp' dalay={500} style={styles.containeropcoes}>
                
                <Text style={styles.entradas}>Primeiro nome:</Text>
                <TextInput
                    value={user.p_nome}
                    style={styles.input}
                    placeholder= 'nome'
                    autoCapitalize='none'
                    autoComplete='nome'
                    onChangeText={text => Setp_nome(text)}
                />
                <Text style={styles.entradas}>Sobrenome:</Text>
                <TextInput
                    value={user.sobrenome}
                    style={styles.input}
                    placeholder= 'sobrenome'
                    autoCapitalize='none'
                    autoComplete='nome'
                    onChangeText={text => Setp_nome(text)}
                />
                <Text style={styles.entradas}>Username:</Text>
                <TextInput
                    value={p_nome}
                    style={styles.input}
                    placeholder= 'nome'
                    autoCapitalize='none'
                    autoComplete='nome'
                    onChangeText={text => Setp_nome(text)}
                />
                <Text style={styles.entradas}>Email:</Text>
                <TextInput
                    value={user.email}
                    style={styles.input}
                    placeholder= 'nome'
                    autoCapitalize='none'
                    autoComplete='nome'
                    onChangeText={text => Setp_nome(text)}
                />
                <Text style={styles.entradas}>Cidade:</Text>
                <TextInput
                    value={user.cidade}
                    style={styles.input}
                    placeholder= 'nome'
                    autoCapitalize='none'
                    autoComplete='nome'
                    onChangeText={text => Setp_nome(text)}
                />
                <Text style={styles.entradas}>Estado:</Text>
                <TextInput
                    value={user.estado}
                    style={styles.input}
                    placeholder= 'nome'
                    autoCapitalize='none'
                    autoComplete='nome'
                    onChangeText={text => Setp_nome(text)}
                />
                <TouchableOpacity>
                    <Text style={styles.botaosubmeter}>Submeter</Text>
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
    containerHeader:{
        width: '100%',
        height: '20%',
        borderBottomLeftRadius:25,
        borderBottomRightRadius:25,
        alignItems: 'center',
        paddingTop: '25%',
        backgroundColor:'#4e0189'
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
        zIndex: 1000  
    },
    containeropcoes:{
        flex: 1,
        marginTop:'10%',
        paddingStart:'10%',
        paddingEnd:'10%',
      },
    botaosubmeter:{
        fontSize:17,
        color: '#fff',
        backgroundColor: '#4e0189',
        paddingRight:20,
        paddingLeft:20,
        paddingTop: 10,
        paddingBottom: 10,
        borderRadius: 20,
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