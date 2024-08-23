import { Camera, useCameraPermissions,CameraView } from "expo-camera"
import { useState,useEffect } from "react"
import { Alert, Button, StyleSheet,Text, View } from "react-native"
import api from "../../services/api";
import { useNavigation } from "@react-navigation/native";

type Prop = {
    type: string;
    data: string;
  };

export default function Rastreio() {
    const [permission,requestPermission] = useCameraPermissions();
    const [scanned,setScanned] = useState(false);
    useEffect(()=>{
        (async()=>{
            const {status} = await Camera.requestCameraPermissionsAsync()

            if(status !== "granted"){
                alert('Desculpe, precisamos da permissão da camera')
            }
        })()
    },[])

    const  handleBarCodeScanned = async ({ type, data }: Prop) => {
        setScanned(true);
        const response = await api.put('/Doacoes/trajetoria',{
          id:data
        })
        try{
          Alert.alert(
            `Código ${type} Scaneado com sucesso`, 
            `Dados: ${response.data.msg}`,      
            [
              {
                text: 'OK',      
                onPress: () => setScanned(false),  
              }
            ],
            { cancelable: false } 
          );
          
        }catch(error){
          console.log(error)
        }
       
    };

    if (!permission?.granted) {
        // Camera permissions are still loading or denied.
        return (
          <View style={styles.container}>
            <Text style={styles.permissionText}>Permissão da câmera não concedida.</Text>
            <Button title="Solicitar Permissão" onPress={requestPermission} />
          </View>
        );
      }

      return (
        <CameraView
          style={styles.camera}
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        >
          <View style={styles.layerContainer}>
            <View style={styles.layerTop} />
            <View style={styles.layerCenter}>
              <View style={styles.layerLeft} />
              <View style={styles.focused} />
              <View style={styles.layerRight} />
            </View>
            <View style={styles.layerBottom} />
          </View>
        </CameraView>
        );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
      },
      permissionText: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
      },
      camera: {
        flex: 1,
        justifyContent: 'flex-end',
      },
      layerContainer: {
        flex: 1,
      },
      layerTop: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      layerCenter: {
        flexDirection: 'row',
      },
      layerLeft: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      focused: {
        width: 200,
        height: 200,
        borderWidth: 2,
        borderColor: '#00FF00',
      },
      layerRight: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      layerBottom: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
      },
      resultContainer: {
        padding: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
      },
      resultText: {
        fontSize: 18,
        marginVertical: 10,
      },
      button: {
        backgroundColor: '#00FF00',
        padding: 10,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontSize: 16,
      },
})