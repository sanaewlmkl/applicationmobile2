import { View, Text, SafeAreaView,Image, TouchableOpacity } from "react-native"
import React, { useLayoutEffect } from 'react'//useLayoutEffect est un hook de React qui permet d'effectuer des effets secondaires après 
                                               //que le rendu soit effectué mais avant que l'interface utilisateur ne soit mise à jour.
import { useNavigation } from '@react-navigation/native';//est un hook fourni par @react-navigation/native qui permet d'accéder à l'objet 
                                                         //de navigation pour la navigation entre les écrans.
                                                         //Un hook est une fonction spéciale fournie par React qui permet d'ajouter des 
                                                         //fonctionnalités spécifiques à un composant fonctionnel
import { HeroImage } from "../assets";
import * as Animatable from 'react-native-animatable';
import Discover from "./Discover";

import { FontAwesome5 } from '@expo/vector-icons';
const HomeScreen = () => {

    const navigation =useNavigation();//useNavigation est utilisé pour obtenir l'objet de navigation à partir du hook useNavigation() et 
                                     //le stocker dans la variable navigation.
    useLayoutEffect(() =>{ //useLayoutEffect est utilisé pour définir les options de navigation, en masquant la barre de navigation en haut 
                            //de l'écran grâce à headerShown: false.
      navigation.setOptions({
        headerShown: false,
      });
    },{});
      return (//L'interface utilisateur est composée de plusieurs éléments View, Text et TouchableOpacity,
             // qui sont utilisés pour structurer et styliser les différents éléments de l'écran d'accueil.
     <SafeAreaView className="bg-white flex-1 relative">
       {/*first section*/}

       <View className="flex-row px-6 mt-8 items-center space-x-2">
        <View className="w-16 h-16 bg-[#f8b628c2] rounded-full items-center space-x-2">
        <Text className="text-[#D2B48C] text-3xl font-semibold mt-4 ">GO</Text>
       </View>
       <Text className="text-[#2A2B4B] text-3xl font-semibold"> Travel</Text>
       </View>
       {/*seconde version */ }
       <View className="px-10 mt-6/*espace du haut au bas */ space-y-3">
       <Text className="text-[#f5ab4a] text-[42px]">Enjoy the trip with our guides</Text>
       <Text className="text-[#b18d49f6] text-[38px]">Good moments</Text>
       </View>
       {/*circle section*/ }
       <View className="w-[380px] h-[400px] bg-[#be8742] rounded-full absolute bottom-5 -right-36"></View>
       <View className="w-[380px] h-[360px] bg-[#ff9615cb] rounded-full absolute bottom-0 -left-36"></View>

      {/*image container*/ }
      <View className="flex-1 relative items-center justify-center">
      <Animatable.Image  animation="fadeIn" easing="ease-in-out"  source={HeroImage} className="w-full h-full object-cover mt-20 " />
      </View>

      
        < TouchableOpacity
        onPress={() =>navigation.navigate("Discover") }
        
        className="absolute bottom-20 w-24 h-20 border-l-2 border-r-2 border-t-4  border-[#b18d49f6] 
         rounded-full items-center justify-center">

         <Animatable.View   
         animation={"pulse"}
          easing="ease-in-out" 
          className="w-20 h-20 items-center justify-center rounded-full bg-[#b18d49f6]">
        <Text className="text-gray-50 text-[36px] font-semibold">Go</Text>
      </Animatable.View>
      </TouchableOpacity> 
      
      
     </SafeAreaView>
  );
};

export default HomeScreen;