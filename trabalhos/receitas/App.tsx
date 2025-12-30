import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TelaInicial from './src/screens/TelaInicial';
import Cadastro from './src/screens/Cadastro';
import Receitas from './src/screens/Receitas';

export type RootStackParamList = {

  TelaInicial: undefined;
  Cadastro: undefined;
  Receitas: { categoria?: string };

};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  
  return (

    <NavigationContainer>

      <Stack.Navigator initialRouteName="TelaInicial">

        <Stack.Screen name="TelaInicial" component={TelaInicial} options={{ title: 'Tela inicial' }} />
        <Stack.Screen name="Cadastro" component={Cadastro} options={{ title: 'Nova receita' }} />
        <Stack.Screen name="Receitas" component={Receitas} options={{ title: 'Receitas' }} />
     
      </Stack.Navigator>

    </NavigationContainer>
  );
}