import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
  Relacao: undefined;
  Cadastro: undefined;
  Faltas: undefined;
};

type FaltasScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList, 'Faltas'
>;

type Aluno = {
  id: string;
  nome: string;
  faltas: number;
};

export default function Faltas() {

  const navigation = useNavigation<FaltasScreenNavigationProp>();
  const [alunos, setAlunos] = useState<Aluno[]>([]);

  async function carregarFaltas() {

    const querySnapshot = await getDocs(collection(db, 'alunos'));

    const lista: Aluno[] = querySnapshot.docs.map(doc => ({
      id: doc.id,
      nome: doc.data().nome,
      faltas: doc.data().faltas,
    }));

    setAlunos(lista);
  }

  useEffect(() => {
    carregarFaltas();
  }, []);

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}> Faltas dos Alunos </Text>

      <FlatList data={alunos} keyExtractor={item => item.id} renderItem={({ item }) => (
          <Text style={styles.item}> {item.nome} — {item.faltas} faltas </Text>
        )}
      />

      <TouchableOpacity style={styles.botaoVoltar} onPress={() => navigation.goBack()}>
        <Text style={styles.botaoTexto}>← Voltar</Text>
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

  botaoTexto: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  botaoVoltar: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#8567ffff',
    padding: 15,
    borderRadius: 5,
  },
});
