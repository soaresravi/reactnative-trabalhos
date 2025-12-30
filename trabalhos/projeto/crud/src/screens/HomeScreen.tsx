import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, FlatList} from 'react-native';
import { useFocusEffect, DrawerActions, useNavigation } from '@react-navigation/native';

export default function HomeScreen() {

    const navigation = useNavigation();
    const [contatos, setContatos] = useState([]);

    useFocusEffect (useCallback(() => {
        fetch ('http://127.0.0.1/api.php')
        .then((response) => response.json())
        .then((data) => setContatos(data))
        .catch((error) => console.error(error));
    }, []));

    const renderItem = ({ item }) => (
        <View style={styles.contato}>
            <Text style={styles.texto}>Nome: {item.nome} </Text>
            <Text style={styles.texto}> Telefone: {item.telefone} </Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={contatos}
                renderItem={renderItem}
                keyExtractor={(item)=>item.id.toString()}
            />    
        </View>
    );
}

const styles = StyleSheet.create( {
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
    },

    contato
});