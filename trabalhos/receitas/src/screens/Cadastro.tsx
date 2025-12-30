import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';

import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Cadastro() {

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [ingredientes, setIngredientes] = useState('');
  const [formaPreparo, setFormaPreparo] = useState('');
  const [caminhoImagem, setCaminhoImagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  const salvar = async () => {
    
    if (!nome || !categoria || !ingredientes || !formaPreparo) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios!");
      return;
    }

    setCarregando(true);
   
    try {
     
      await addDoc(collection(db, 'receitas'), {

        nome, 
        categoria: categoria.toLowerCase(), 
        ingredientes: ingredientes.split(',').map(i => i.trim()), 
        formaPreparo, 
        caminhoImagem,
        dataCriacao: new Date()

      });

      Alert.alert("Sucesso", "Receita cadastrada com sucesso!");
      
      setNome(''); 
      setCategoria(''); 
      setIngredientes(''); 
      setFormaPreparo(''); 
      setCaminhoImagem('');

    } catch (error) {
      
      console.error("Erro ao salvar:", error);
      Alert.alert("Erro", "Não foi possível salvar a receita");
   
    } finally {
      setCarregando(false);
    }

  };

  return (
   
   <ScrollView style={styles.container}>
      
      <Text style={styles.titulo}>Nova Receita</Text>
      <Text style={styles.label}>Nome da Receita *</Text>  
      <TextInput style={styles.input} placeholder="Ex: Bolo de Chocolate" value={nome} onChangeText={setNome} />

      <Text style={styles.label}>Categoria *</Text>
      <TextInput style={styles.input} placeholder="doce ou salgado" value={categoria} onChangeText={setCategoria} />

      <Text style={styles.label}>Ingredientes *</Text>
      <TextInput style={[styles.input, styles.textArea]} placeholder="Separados por vírgula" value={ingredientes} onChangeText={setIngredientes} multiline />

      <Text style={styles.label}>Modo de Preparo *</Text>
      <TextInput style={[styles.input, styles.textArea]} placeholder="Descreva o passo a passo..." value={formaPreparo} onChangeText={setFormaPreparo} multiline />

      <Text style={styles.label}>URL da Imagem</Text>
      <TextInput style={styles.input} placeholder="https://exemplo.com/imagem.jpg"value={caminhoImagem} onChangeText={setCaminhoImagem} />

      <TouchableOpacity style={[styles.botao, carregando && styles.botaoDesabilitado]} onPress={salvar} disabled={carregando}>
        <Text style={styles.textoBotao}> {carregando ? 'Salvando...' : 'Salvar Receita'} </Text>
      </TouchableOpacity>

    </ScrollView>

  );

}

const styles = StyleSheet.create({
 
  container: { 
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  
  titulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },

  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    color: '#144f5d',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
    fontSize: 16,
  },

  textArea: {
    height: 80,
    textAlignVertical: 'top',
  },

  botao: {
    backgroundColor: '#21c1bc',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },

  textoBotao: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  botaoDesabilitado: {
    opacity: 0.6,
  },

});