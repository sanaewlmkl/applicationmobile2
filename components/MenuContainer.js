import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MenuContainer = () => {
  const navigation = useNavigation();

  const goToDiscover = () => {
    navigation.navigate('Discover');
  };

  return (
    <View style={{ marginTop: 16 }}>
      <TouchableOpacity onPress={goToDiscover}>
        <View style={{ backgroundColor: 'lightgray', padding: 16 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Discover</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MenuContainer;