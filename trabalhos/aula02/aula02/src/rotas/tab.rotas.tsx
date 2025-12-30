import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from '@expo/vector-icons';

const { Screen, Navigator } = createBottomTabNavigator();

import { TelaC } from '../telas/telaC';
import { TelaB } from '../telas/telaB';
import { TelaA } from '../telas/telaA';



export function TabRotas() {
    return (
        <Navigator>
            <Screen
                name = 'Batata1' 
                component={TelaA}
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='home' color={color} size={size} />
                    )
                }}    
            />
            <Screen 
                name = 'Tela B' 
                component={TelaB} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='checkmark-circle-outline' color={color} size={size} />
                    )
                }}
            />
            <Screen 
                name = 'Tela C' 
                component={TelaC} 
                options={{
                    tabBarIcon: ({color, size}) => (
                        <Ionicons name='checkmark-circle-outline' color={color} size={size} />
                    )
                }}
            />
        </Navigator>
    )
}