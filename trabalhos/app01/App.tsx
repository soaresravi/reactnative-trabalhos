import { StatusBar } from 'expo-status-bar'; //não é obrigatório. controla aquela barrinha de cima da tela. altera o estilo
import React, { useState } from 'react'; //useState praticamente obrigatório pra qualquer coisa com banco de dados, sem ele não armazena o que o usuário digita
import { StyleSheet, Text, View, Alert, Button, TextInput } from 'react-native'; //stylesheet é como se fosse o css, a view é como se fosse um div

export default function App() {

  //useState permite o componente guardar o valor e atualizar quando necessário
  const [nome, setNome] = useState(''); //variável tipo const, (não pode ser alterada e não tem outro tipo no react),
  const [telefone, setTelefone] = useState(''); //e o useState define que o valor inicial é uma string vazia. como não pode ser alterado, o useState que faz isso, guardando o valor p ser alterado depois

  const funcaoEnviar = async () => { //por ser uma função assíncrona faz com que realize tarefas demoradas sem travar o app. então promete que a função pode esperar ao clicar no botão enviar

  if (!nome || !telefone) { //se não tiver nada no campo nome ou não tiver nada no campo telefone...

    Alert.alert('Erro, ', 'Preencha todos os campos!'); //aviso bonitinho de alerta
    return //interrompe a execução, pois algun campo, ou os dois estão vazios

  }

  try {
    const response = await fetch('http://192.168.0.105/app01/index.php', { //função que faz uma requisição http (fetch) e o await faz o app esperar a resposta antes de continuar, ai acha o caminho php que vai receber os dados   
      method: 'POST', //requisição tipo post (é mais seguro, a get mostra dados sensíveis no url)

      headers: {
        'Content-Type': 'application/json', //indica que os dados enviados são tipo json, e o php precisa pra entender o conteúdo
       },

      body: JSON.stringify({ nome, telefone }), //transforma os dados (nome e telefone) em texto json. e ai o fetch envia esse json pro php, que pode ler e salvar no banco
    })

    const data = await response.json(); //aguarda a resposta (que ficou na variável response) e converte em json
    Alert.alert('Sucesso', data.message); // o php enviou uma resposta de erro ou sucesso, ai o await response json transforma em objeto javascript, então o data.message pega esse valor (resposta de erro ou sucesso) e exibe no aviso bonitinho
    
    setNome(''); //limpa os campos (deixa vazio que nem no início)
    setTelefone('');

   } catch (error) {
    Alert.alert('Erro', JSON.stringify(error)); //o json.stringify transforma qualquer objeto (javascript) em texto json, pra ser exibido como uma string legível, já que o alert também só aceita strings
  }
}

  return ( //em react o return é usado pra renderizar a interface do usuário, ou seja, tudo que está dentro do return define que será exibido na tela
    <View style={styles.container}> {/* literalmente igual ao div. styles é o objeto do estilo feito com styleSheet.create, que contém as propriedades do estilo, e o .container é uma referência definida depois (tipo css)*/}

      <Text style={styles.titulo}> Nome: </Text>
      <TextInput

      style={styles.entrada}
      value={nome} //mostra o valor do nome
      onChangeText={setNome} //atualiza o campo nome com o que o usuário digita
      placeholder='Digite seu nome'
      
      ></TextInput>

      <Text style={styles.titulo}> Telefone: </Text>
      <TextInput

      style={styles.entrada}
      value={telefone}
      onChangeText={setTelefone}
      placeholder='Digite seu telefone'

      ></TextInput>

      <Button title='Enviar' onPress={funcaoEnviar}/> {/* chama a funcaoEnviar que fiz lá em cima, ao botão ser pressionado */}

      <StatusBar style="auto" /> {/* define que a barra de status vai ser padrão (pra isso que tem o import expo-status-bar e etc*/}
    </View>
  );
}

const styles = StyleSheet.create({ //styles é o objeto do estilo que o StyleSheet criou e que eu referenciei lá em cima

  container: {
    flex: 1, //ocupa toda a tela
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20,
  },

   titulo: {
    marginBottom: 5,
    fontSize: 18,
  },
  
  entrada: {
    padding: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
  }
});