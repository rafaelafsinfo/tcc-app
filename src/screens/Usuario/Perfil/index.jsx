import React, { useState, useContext, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, TextInput, RefreshControl, ScrollView } from "react-native";
import * as Animatable from 'react-native-animatable';
import { UserContext } from '../../../contexts/UserContext';
import api from '../../../services/api';

export default function OpcoesUsuario() {
    const navigation = useNavigation();
    const { user } = useContext(UserContext);
    const [id, setId] = useState(user.id);
    const [p_nome, setPNome] = useState(user.p_nome);
    const [sobrenome, setSobrenome] = useState(user.sobrenome);
    const [username, setUsername] = useState(user.username);
    const [cidade, setCidade] = useState(user.cidade);
    const [estado, setEstado] = useState(user.estado);
    const [error, setError] = useState('');
    const [refreshing, setRefreshing] = useState(false);

    const fetchUserData = useCallback(() => {
        setId(user.id);
        setPNome(user.p_nome);
        setSobrenome(user.sobrenome);
        setUsername(user.username);
        setCidade(user.cidade);
        setEstado(user.estado);
    }, [user]);

    const onRefresh = async () => {
        setRefreshing(true);
        fetchUserData();
        setRefreshing(false);
    };

    const submit = async () => {
        try {
            const response = await api.put('/Usuario', {
                id,
                p_nome,
                sobrenome,
                username,
                cidade,
                estado
            });
            console.log(response.data);
        } catch (error) {
            setError('Erro ao atualizar usuário');
            console.log(error);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchUserData();
        }, [fetchUserData])
    );

    return (
        <SafeAreaView style={styles.maincontainer}>
            <Animatable.View animation='fadeInDown' style={styles.containerHeader}>
                <Text style={styles.textmessage}>Alterar Usuário</Text>
            </Animatable.View>

            <ScrollView
                style={styles.containeropcoes}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                <Animatable.View animation='fadeInUp'>
                    <Text style={styles.entradas}>Primeiro nome:</Text>
                    <TextInput
                        style={styles.input}
                        value={p_nome}
                        autoCapitalize='none'
                        onChangeText={text => setPNome(text)}
                    />
                    <Text style={styles.entradas}>Sobrenome:</Text>
                    <TextInput
                        style={styles.input}
                        value={sobrenome}
                        autoCapitalize='none'
                        onChangeText={text => setSobrenome(text)}
                    />
                    <Text style={styles.entradas}>Username:</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        autoCapitalize='none'
                        onChangeText={text => setUsername(text)}
                    />
                    <Text style={styles.entradas}>Cidade:</Text>
                    <TextInput
                        style={styles.input}
                        value={cidade}
                        autoCapitalize='none'
                        onChangeText={text => setCidade(text)}
                    />
                    <Text style={styles.entradas}>Estado:</Text>
                    <TextInput
                        style={styles.input}
                        value={estado}
                        autoCapitalize='none'
                        onChangeText={text => setEstado(text)}
                    />

                    <TouchableOpacity onPress={submit}>
                        <Text style={styles.botaosubmeter}>
                            Atualizar
                        </Text>
                    </TouchableOpacity>

                    {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}
                </Animatable.View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    maincontainer: {
        flex: 1,
        backgroundColor: '#f6f7f9'
    },
    containerHeader: {
        height: 120,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: '#4e0189',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textmessage: {
        fontSize: 28,
        color: '#fff'
    },
    containeropcoes: {
        flex: 1,
        marginTop: '5%',
        paddingStart: '5%',
        paddingEnd: '5%',
    },
    botaosubmeter: {
        fontSize: 17,
        color: '#fff',
        backgroundColor: '#4e0189',
        margin: '5%',
        padding: 15,
        borderRadius: 25,
        alignSelf: 'center'
    },
    entradas: {
        fontSize: 17
    },
    input: {
        borderWidth: 1,
        borderRadius: 10,
        paddingStart: 8,
        paddingEnd: 8,
        height: 40,
        marginBottom: 12,
        fontSize: 16,
        borderColor: '#cdd1e0'
    }
});
