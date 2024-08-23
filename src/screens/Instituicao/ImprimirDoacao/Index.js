import React, {useContext,useState} from 'react';
import { View, StyleSheet, Button, Platform, Text } from 'react-native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserContext } from '../../../contexts/UserContext';
import QRCode from 'react-native-qrcode-svg';


export default function ImprimirDoacao() {
    const { user } = useContext(UserContext)
    const [selectedPrinter, setSelectedPrinter] = useState();
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>QR Code Fixo</title>
  <style>
    #qrcode {
      width: 200px;
      height: 200px;
      margin: 20px;
      border: 1px solid #ccc;
    }
  </style>
</head>
<body>
  <h1>QR Code Fixo</h1>
  <div id="qrcode"></div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js"></script>
  <script>
    var qrcode = new QRCode(document.getElementById("qrcode"), {
      text: "https://example.com", // conteúdo fixo
      width: 200,
      height: 200,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  </script>
</body>
</html>
`


    const print = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      await Print.printAsync({
        html,
        printerUrl: selectedPrinter?.url, // iOS only
      });
    };
  
    const printToFile = async () => {
      // On iOS/android prints the given html. On web prints the HTML from the current page.
      const { uri } = await Print.printToFileAsync({ html });
      console.log('File has been saved to:', uri);
      await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    };
  
    const selectPrinter = async () => {
      const printer = await Print.selectPrinterAsync(); // iOS only
      setSelectedPrinter(printer);
    };
  
    return (
      <View style={styles.container}>
        <Button title="Print" onPress={print} />
        <View style={styles.spacer} />
        <Button title="Print to PDF file" onPress={printToFile} />
        {Platform.OS === 'ios' && (
          <>
            <View style={styles.spacer} />
            <Button title="Select printer" onPress={selectPrinter} />
            <View style={styles.spacer} />
            {selectedPrinter ? (
              <Text style={styles.printer}>{`Selected printer: ${selectedPrinter.name}`}</Text>
            ) : undefined}
          </>
        )}
      </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
      flexDirection: 'column',
      padding: 8,
    },
    spacer: {
      height: 8,
    },
    printer: {
      textAlign: 'center',
    },
  });