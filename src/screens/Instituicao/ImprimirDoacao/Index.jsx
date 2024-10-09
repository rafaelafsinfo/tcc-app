import React, {useContext,useEffect,useState} from 'react';
import { View, StyleSheet, Button, Platform, Text, Touchable, TouchableOpacity } from 'react-native';
import * as Animatable from "react-native-animatable";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { SafeAreaView } from 'react-native-safe-area-context';
import QRCode from 'react-native-qrcode-svg';
import { useRoute } from '@react-navigation/native';
import api from '../../../services/api';


export default function ImprimirDoacao() {
  const route = useRoute()
    const [selectedPrinter, setSelectedPrinter] = useState();
    const {id} = route.params
    const [data,setData] = useState([])
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>QR Code Fixo</title>
  <style>
    #qrcode {
      alignItems: 'center',
      flex:1',
    }
  </style>
</head>
<body>
  
  <div id="qrcode">
    <img src="https://api.qrserver.com/v1/create-qr-code/?data=${id}&amp" alt=""/>
  </div>
</body>
</html>
`


    const print = async () => {
      await Print.printAsync({
        html,
      });
    };
  
    useEffect(()=>{
      api.get(`/Doacoes/${id}`).then((Response)=>{
        setData(Response.data.dados[0])
      })
    },[])
  
    return (
      <SafeAreaView style={styles.container}>
      <TouchableOpacity
      onPress={print}
      style={styles.button}>
        <Animatable.Text style = {styles.buttonText}>Imprimir</Animatable.Text>
      </TouchableOpacity>
        
        <View style={styles.spacer} />
        
        
      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#f7f7f7', 
    flexDirection: 'column',
    padding: 20, 

  },
  spacer: {
    height: 16, 

  },
  printer: {
    textAlign: 'center',
    color: '#ba55d3', 
    fontSize: 16, 
  },
  button: {
    backgroundColor: '#ba55d3', 
    padding: 12, 
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff', 
    fontSize: 16, 
  },
});