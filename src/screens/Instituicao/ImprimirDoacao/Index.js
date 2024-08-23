import React, { useState } from 'react';
import { Button, View } from 'react-native';
import * as Print from 'expo-print';
import QRCode from 'react-native-qrcode-svg';

export default function App() {
  const [pdfUri, setPdfUri] = useState(null);

  const generatePdf = async () => {
    const data = 'https://www.exemplo.com'; // Substitua por seus dados
    await generatePdf(data);
    setPdfUri(uri);
  };

  return (
    <View>
      <Button title="Gerar PDF com QR Code" onPress={generatePdf} />
      {pdfUri && <Text>PDF salvo em: {pdfUri}</Text>}
    </View>
  );
}