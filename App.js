import { StatusBar } from 'expo-status-bar';//composant fourni par Expo qui permet de gérer la barre d'état (status bar) sur les appareils mobiles
import {  SafeAreaView, Text, View } from 'react-native';//sont des composants fournis par React Native pour structurer l'interface utilisateur.
import { TailwindProvider } from 'tailwindcss-react-native';// composant fourni par Tailwind CSS pour fournir les styles de Tailwind aux composants
                                                           // React Native.
import { NavigationContainer } from '@react-navigation/native';//composant fourni par React Navigation pour gérer la navigation entre les
                                                               // différentes écrans de l'application.
import { createNativeStackNavigator } from '@react-navigation/native-stack';// fonction fournie par React Navigation pour créer une pile de 
                                                                            //navigation basée sur des écrans natifs.
import HomeScreen from './screens/HomeScreen';
import Discover from './screens/Discover';
import Guide from './screens/Guide';
import Discoverg from './screens/Discoverg';


import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ConfirmEmail from './screens/ConfirmEmailScreen';
import ResetPassword from './screens/ResetPasswordScreen';
import ForgotPassword from './screens/ForgotPasswordScreen';


const Stack = createNativeStackNavigator();// création d'un objet Stack est réalisée en utilisant la fonction createNativeStackNavigator()

export default function App() {//Dans la fonction principale App(), l'interface utilisateur de l'application est définie
  return (
    // composant fourni par Tailwind CSS qui enveloppe l'application pour fournir les styles de Tailwind
      <TailwindProvider> 
      {/*utilisé pour encapsuler les écrans de l'application dans un conteneur de navigation.*/}
      <NavigationContainer>
     {/* utilisé pour définir une pile de navigation dans laquelle les écrans peuvent être empilés et dé-pilés. */}
      <Stack.Navigator  screenOptions={{headerShown:false}} >
        {/*utilisé pour définir chaque écran de l'application. Les écrans sont nommés (name) et associés à leurs composants correspondants (component). */}
       
        <Stack.Screen  name="SignIn" component={SignInScreen} />
        <Stack.Screen  name="SignUp" component={SignUpScreen} />
        <Stack.Screen  name="ConfirmEmail" component={ConfirmEmail} />
        <Stack.Screen  name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen  name="ResetPassword" component={ResetPassword} />
       
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="Discover" component={Discover} />

        <Stack.Screen name="Discoverg" component={Discoverg} />
        <Stack.Screen name="Guide" component={Guide} />
   
       
       
      </Stack.Navigator>
    </NavigationContainer>
        
     
   </TailwindProvider>
  );
}


