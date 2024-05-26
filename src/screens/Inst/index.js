import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState,useEffect } from 'react';
import api from '../../services/api';
import {useRoute} from '@react-navigation/native'

export default function Inst() {
    const route = useRoute();
    const {emailinst} = route.params
    const [data,setData] = useState(null)

  useEffect(() => {
    api.get(`/Instituicao/${emailinst}`)
    .then(response => {
      setData(response.data.dados)
    })
  })
  return (
    <View>
      <Text>{data}</Text>
    </View>
  )
}

const styles = StyleSheet.create({})