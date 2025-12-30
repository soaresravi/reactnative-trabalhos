import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export  function TelaB() {
  const Dados = [
    { id: '1', title:'Primeiro', subtitle:'Segunda linha do primeiro'},
    { id: '2', title:'Segundo', subtitle:'Segunda linha do segundo'},
    { id: '3', title:'Terceiro', subtitle:'Segunda linha do terceiro'},

  ]
  return (
    <View style={styles.container}>
      <FlatList
        data={Dados}
        renderItem={({item, index, separators}) =>
        (
          <View style={styles.lista}>
            <Text style={styles.texto}>
              {item.id} - {item.title}
            </Text>
            <Text style={styles.subtext}>
              {item.subtitle}
            </Text>
          </View>
        )}
      />
      <StatusBar style="inverted" />
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  texto: {
    fontSize: 20
  },
  subtext: {
    fontSize: 15
  },
  img: {
    width: 50,
    height: 50
  },
  lista: {
    borderRadius: 10,
    paddingLeft: 8,
    width: 300,
    height: 70,
    marginTop: 10,
    backgroundColor: '#87CEFA',
    justifyContent: 'center'
  }
});
