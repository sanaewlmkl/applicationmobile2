import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const ItemCarDontainer = ({ id, nom, description, image, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.content}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{nom}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    marginBottom: 16,
  },
  content: {
    backgroundColor: 'lightgray',
    padding: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'brown',
  },
  description: {
    marginTop: 8,
  },
});

export default ItemCarDontainer;
