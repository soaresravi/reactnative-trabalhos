import React from 'react';
import { Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {

  TelaInicial: undefined;
  Cadastro: undefined;
  Receitas: { categoria?: string };

};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function TelaInicial() {
  
  const navigation = useNavigation<NavigationProp>();

  return (
   
   <SafeAreaView style={styles.container}>
     
      <Text style={styles.titulo}>Receitas App</Text>
      
      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("Receitas", { categoria: "doce" })}>
        <Text style={styles.textoBotao}>Doces</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("Receitas", { categoria: "salgado" })}>
        <Text style={styles.textoBotao}>Salgados</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.botao, { backgroundColor: '#6a91cd'}]} onPress={() => navigation.navigate("Receitas", {})}>
        <Text style={styles.textoBotao}> Todas as Receitas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.botaoCadastro} onPress={() => navigation.navigate("Cadastro")}>
        <Text style={styles.textoBotao}> + Nova Receita</Text>
      </TouchableOpacity>

    </SafeAreaView>

  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5'
  },

  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#144f5d'
  },

  botao: {
    backgroundColor: '#21c1bc',
    padding: 15,
    borderRadius: 30,
    marginVertical: 5,
    alignItems: 'center',
    marginHorizontal: 20
  },

  botaoCadastro: {
    backgroundColor: '#1615a4',
    padding: 15,
    borderRadius: 30,
    marginVertical: 5,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 20
  },

  textoBotao: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});