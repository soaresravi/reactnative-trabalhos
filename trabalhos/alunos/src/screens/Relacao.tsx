import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Relacao: undefined;
  Cadastro: undefined;
  Faltas: undefined;
};

type RelacaoNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Relacao'>;

type Aluno = {
  id: string;
  nome: string;
  faltas: number;
};

export default function Relacao() {

  const navigation = useNavigation<RelacaoNavigationProp>();
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  async function carregarAlunos() {

    const querySnapshot = await getDocs(collection(db, 'alunos'));

    const lista: Aluno[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...(doc.data() as Omit<Aluno, 'id'>)
    }));

    setAlunos(lista);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarAlunos);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}> Relação de Alunos </Text>

      <FlatList
        data={alunos} keyExtractor={item => item.id} renderItem={({ item }) => (
          <Text style={styles.item}>{item.nome}</Text>
        )}
      />

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Cadastro')}>
        <Text style={styles.botaoTexto}> Cadastrar novo aluno </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, { backgroundColor: '#3712f3ff' }]} onPress={() => navigation.navigate('Faltas')}>
        <Text style={styles.botaoTexto}> Ver Faltas </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#dad9f2ff'
  },
  
  titulo: {
    fontSize: 22,
    marginBottom: 15,
    textAlign: 'center'
  },
  
  item: {
    fontSize: 18,
    marginBottom: 10
  },

  botao: {
    backgroundColor: '#3ceab9ff',
    padding: 15,
    borderRadius: 5,
    marginTop: 10
  },
  
  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold' }
});
