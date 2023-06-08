import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, Image, ScrollView, StyleSheet } from 'react-native';
import axios from 'axios';
import ItemCarDontainer from '../components/ItemCarDontainer';
import { Avatar } from "../assets";
import { useNavigation } from '@react-navigation/native';

const Discover = () => {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://10.0.2.2:3556/api/villes');
      const data = response.data;
      setCities(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigation = useNavigation();
  const onCityPressed = (cityName) => {
    // Navigate to the Discoverg screen with the city name
    navigation.navigate('Discoverg', { cityName: cityName });

    console.log(`Pressed city: ${cityName}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>the beauty today</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image 
            source={Avatar}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView>
        <View style={styles.cityContainer}>
          {cities.map((city) => (
            <ItemCarDontainer
              key={city.id}
              id={city.id}
              nom={city.nom}
              description={city.description}
              image={city.image}
              onPress={() => onCityPressed(city.nom)} // Pass the city name as a parameter to onCityPressed
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginTop: 16,
  },
  title: {
    fontSize: 35,
    marginTop: 5,
    color: '#0c120f',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 25,
    color: '#0c120f',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'lightblue',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 24,
  },

});

export default Discover;
