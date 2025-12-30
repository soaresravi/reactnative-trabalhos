import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';

import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';

import { useRoute, RouteProp } from '@react-navigation/native';

type RootStackParamList = {

  TelaInicial: undefined;
  Cadastro: undefined;
  Receitas: { categoria?: string };

};

type ReceitasRouteProp = RouteProp<RootStackParamList, 'Receitas'>;

type Receita = {

  id: string;
  nome: string;
  categoria: string;
  ingredientes: string[];
  formaPreparo: string;
  caminhoImagem: string;

};

export default function Receitas() {

  const route = useRoute<ReceitasRouteProp>();
  const { categoria } = route.params || {};
  
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    carregarReceitas();
  }, []);

  const carregarReceitas = async () => {
    
    try {
     
      const snapshot = await getDocs(collection(db, 'receitas'));
      const todasReceitas: Receita[] = [];
      
      snapshot.forEach((doc) => {

        const data = doc.data();

        todasReceitas.push({

          id: doc.id,
          nome: data.nome || '',
          categoria: data.categoria || '',
          ingredientes: data.ingredientes || [],
          formaPreparo: data.formaPreparo || '',
          caminhoImagem: data.caminhoImagem || ''

        });

      });

      let receitasFiltradas = todasReceitas;

      if (categoria) {

        receitasFiltradas = todasReceitas.filter(r => 
          r.categoria && r.categoria.toLowerCase() === categoria.toLowerCase()
        );

      }

      setReceitas(receitasFiltradas);

    } catch (error) {
      Alert.alert("Erro", "Não foi possível carregar as receitas");
   
    } finally {
      setCarregando(false);
    }

  };

  const filtrarReceitas = () => {
  
    if (!busca.trim()) {
      return receitas;
    }
    
    const termo = busca.toLowerCase();
  
    return receitas.filter(r => r.nome.toLowerCase().includes(termo) || (r.ingredientes && r.ingredientes.some(ing => ing.toLowerCase().includes(termo))) );

  };

  const renderItem = ({ item }: { item: Receita }) => (
   
   <View style={styles.card}>
      
      {item.caminhoImagem ? (
        
        <Image source={{ uri: item.caminhoImagem }} style={styles.imagem} resizeMode="cover" />
      
      ) : (
       
       <View style={[styles.imagem, styles.imagemPlaceholder]}>
          <Text>📷</Text>
        </View>

      )}
      
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.subtitulo}>Ingredientes:</Text>
    
      {item.ingredientes && item.ingredientes.map((ing, idx) => (
        <Text key={idx} style={styles.ingrediente}>• {ing}</Text>
      ))}

      <Text style={styles.subtitulo}>Modo de Preparo:</Text>
      <Text style={styles.preparo}>{item.formaPreparo}</Text>
   
    </View>

  );

  if (carregando) {
   
    return (
      
      <View style={styles.carregandoContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text>Carregando receitas...</Text>
      </View>

    );
  }

  const receitasExibidas = filtrarReceitas();

  return (
  
  <View style={styles.container}>
      
      <TextInput style={styles.busca} placeholder="Buscar receita ou ingrediente..." value={busca} onChangeText={setBusca} />
      <Text style={styles.contador}> {receitasExibidas.length} receita(s) encontrada(s) {categoria && ` na categoria ${categoria}`}</Text>

      {receitasExibidas.length === 0 ? (
        
        <View style={styles.vazio}>
         
          <Text style={styles.vazioTexto}> {busca ? `Nenhuma receita encontrada para "${busca}"` : 'Nenhuma receita cadastrada'} </Text>
         
          <TouchableOpacity style={styles.botaoRecarregar} onPress={carregarReceitas}>
            <Text style={styles.textoBotaoRecarregar}>Recarregar</Text>
          </TouchableOpacity>

        </View>

      ) : (
        
        <FlatList data={receitasExibidas} keyExtractor={item => item.id} renderItem={renderItem} showsVerticalScrollIndicator={false} />
      )}

    </View>
  );
}

const styles = StyleSheet.create({

  container: { 
    flex: 1,
    padding: 10,
    backgroundColor: '#f5f5f5'
  },

  busca: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 10
  },

  contador: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#666'
  },

  card: {
    backgroundColor: 'white',
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
    marginHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },

  imagem: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },

  imagemPlaceholder: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center'
  },

  nome: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#045149'
  },

  categoria: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10
  },

  subtitulo: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 5,
    color: '#1fa698'
  },

  ingrediente: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5
  },

  preparo: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20
  },

  carregandoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  vazio: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },

  vazioTexto: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20
  },

  botaoRecarregar: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5
  },

  textoBotaoRecarregar: {
    color: 'white',
    fontWeight: 'bold'
  }
  
});
