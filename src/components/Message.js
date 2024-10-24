import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Message({ type, msg }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!msg) {
      setVisible(false);
      return;
    }

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, [msg]);

  return (
    <View>
      {visible && (
        <View style={[styles.message, styles[type]]}>
          <Text>{msg}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    width: '100%',
    padding: 16,
    borderColor: '#000',
    borderWidth: 1,
    marginHorizontal: 0,
    textAlign: 'center',
    marginBottom: 32,
    borderRadius: 5,
  },
  success: {
    color: '#155724',
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  error: {
    color: '#721c24',
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
});