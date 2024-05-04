import React from 'react'
import { 
  View,
  Text,
  StyleSheet ,
  Image,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import * as Animatable from 'react-native-animatable'
import { useNavigation } from '@react-navigation/native'

export default function Home() {
const navigation = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
                <View style={styles.containerLogo}>
          <Animatable.Image
            animation='flipInY'
            source={require('../../assets/logo.png')}
            style={{width:'100%'}}
            resizeMode='contain'
          />
        </View>

        <Animatable.View delay={600} animation='fadeInUp' style={styles.containerForm}>
          <Text style={styles.title}>Doe para todo o Brasil de qualquer lugar!</Text>
          <Text style={styles.text}>Faça seu Login para começar</Text>

          <TouchableOpacity 
          style={styles.button}
          onPress={()=> navigation.navigate('Login')}>
            <Text style={styles.buttonText}>Acessar</Text>
          </TouchableOpacity>
        </Animatable.View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor: '#f6f7f9'
  },
  containerLogo:{
    flex:2,
    backgroundColor: '#f6f7f9',
    justifyContent:'center',
    alignItems:'center'

  },
  containerForm:{
    flex:1,
    backgroundColor:'#4e0189',
    borderTopLeftRadius:25,
    borderTopRightRadius:25,
    paddingStart: '5%',
    paddingEnd:'5%'
  },
  title:{
    fontSize:24,
    color:'#fff',
    fontWeight:'bold',
    marginTop:28,
    marginBottom:12,
  },
  text:{
    color:'#cfc1e0'
  },
  button:{
    position:'absolute',
    backgroundColor:'#ff8c00',
    borderRadius:50,
    paddingVertical:8,
    width:'60%',
    alignSelf:'center',
    bottom:'15%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText:{
    fontSize:18,
    color:'#fff',
    fontWeight:'bold'
  }

})