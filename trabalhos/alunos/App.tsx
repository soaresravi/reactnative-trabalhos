import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Relacao from './src/screens/Relacao';
import Faltas from './src/screens/Faltas';
import Cadastro from './src/screens/cadastro';

export type RootStackParamList = {
  Relacao: undefined;
  Cadastro: undefined;
  Faltas: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Relacao" component={Relacao} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Faltas" component={Faltas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
