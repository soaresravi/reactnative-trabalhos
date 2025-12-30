import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TextInput, Button, FlatList, SafeAreaView, KeyboardAvoidingView, Platform } from 'react-native';
import { db } from "./src/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export default function App() {
  const [dados, setDados] = useState<any[]>([]);
  const [nome, setNome] = useState('');
  const [telefone, setTelefone] = useState('');

  const carregarDados = async () => {
    const querySnapshot = await getDocs(collection(db, "usuarios"));
    const lista: any[] = [];
    querySnapshot.forEach((doc) => {
      lista.push({ id: doc.id, ...doc.data() });
    });
    setDados(lista);
  };

  const adicionarUsuario = async () => {
    if (nome.trim() === '' || telefone.trim() === '') {
      alert("Preencha todos os campos");
      return;
    }

    await addDoc(collection(db, "usuarios"), {
      nome,
      telefone,
      criadoEm: new Date(),
    });

    setNome('');
    setTelefone('');
    carregarDados();
  };

  useEffect(() => {
    carregarDados();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
        <View style={styles.form}>
          <Text style={styles.title}>Cadastrar Usuário</Text>

          <TextInput
            style={styles.input}
            placeholder="Nome"
            value={nome}
            onChangeText={setNome}
          />

          <TextInput
            style={styles.input}
            placeholder="Telefone"
            keyboardType="phone-pad"
            value={telefone}
            onChangeText={setTelefone}
          />

          <Button title="Adicionar" onPress={adicionarUsuario} />
        </View>

        <View style={styles.lista}>
          <Text style={styles.subtitulo}>Lista de Usuários</Text>
          <FlatList
            data={dados}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>{item.nome}</Text>
                <Text style={styles.itemSubText}>{item.telefone}</Text>
              </View>
            )}
          />
        </View>
        <StatusBar style="auto" />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  form: {
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  lista: {
    flex: 1,
  },
  item: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemSubText: {
    fontSize: 14,
    color: '#555',
  },
});
