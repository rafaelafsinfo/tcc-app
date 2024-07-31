import { StatusBar } from 'expo-status-bar';
import React, { useContext } from 'react'
import { StyleSheet, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { UserContext } from '../../contexts/UserContext';

export default function Profile() {
const { user } = useContext(UserContext)

  return (
    
    <SafeAreaView style={styles.container}>

      <Animatable.View animation='fadeInDown' delay={600} style={styles.containerHeader}>
        <Text style={styles.textmessage}>{user.p_nome}</Text>
      </Animatable.View>


      <Animatable.View animation='fadeInUp' delay={500} style={styles.containerbuttoms}>

      <TouchableOpacity style={styles.containerbuttom}>
        <Text style={styles.textbuttom}>Account Manegment</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.containerbuttom}>
        <Text style={styles.textbuttom}>Permitions</Text>
      </TouchableOpacity>

      </Animatable.View>
      
    </SafeAreaView>
    
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f6f7f9'
  },
  textmessage:{
    fontSize:28,
    color: '#fff'
  },
  textbuttom:{
    fontSize:20,
    padding: 10
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
  containerbuttoms:{
    flex: 1,
    marginTop:'10%',
  },
  containerbuttom: {
    width: '100%',
    paddingLeft: '5%',
    borderWidth: 4,
    borderColor:'#cdd1e0',
    marginTop: '2%',
    borderRadius: 20
  }
});

    