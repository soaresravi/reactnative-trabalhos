import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';

export type RootStackParamList = {
  Relacao: undefined;
  Cadastro: undefined;
  Faltas: undefined;
};

type CadastroScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList, 'Cadastro'
>;

export default function Cadastro() {

  const navigation = useNavigation<CadastroScreenNavigationProp>();

  const [nome, setNome] = useState('');
  const [faltas, setFaltas] = useState('');

  async function salvarAluno() {
    if (!nome.trim() || faltas === '') {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    try {
      await addDoc(collection(db, 'alunos'), {
        nome, faltas: parseInt(faltas, 10),
      });

      Alert.alert('Sucesso', 'Aluno cadastrado!');

      setNome('');
      setFaltas('');

      navigation.navigate('Relacao');

    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível salvar.');
    }
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Cadastrar Aluno</Text>

      <TextInput style={styles.input} placeholder="Nome do aluno" placeholderTextColor="gray" value={nome} onChangeText={setNome}/>
      <TextInput style={styles.input} placeholder="Faltas do aluno" placeholderTextColor="gray" keyboardType="numeric" value={faltas} onChangeText={setFaltas}/>

      <TouchableOpacity style={styles.botao} onPress={salvarAluno}>
        <Text style={styles.botaoTexto}>Salvar</Text>
      </TouchableOpacity>

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
    justifyContent: 'center',
    backgroundColor: '#dad9f2ff',
  },

  titulo: {
    fontSize: 22,
    marginBottom: 20,
    textAlign: 'center',
  },

  input: {
    borderWidth: 0,
    marginBottom: 15,
    padding: 10,
    borderRadius: 5,
    boxShadow: '0px 4px 6px rgba(0,0,0,0.3)',
    backgroundColor: '#fff',
  },

  botao: {
    backgroundColor: '#f40d93ff',
    padding: 15,
    borderRadius: 5,
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
  }
});
