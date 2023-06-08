import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, Image, ScrollView, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import { Avatar } from "../assets";
import { useNavigation, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Discoverg = () => {
  
  const navigation = useNavigation();
  const [guides, setGuides] = useState([]);


  const route = useRoute();
  const { cityName } = route.params;
  console.log({cityName});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3556/api/guido/${cityName}`);
      const data = response.data;
      setGuides(data);
    } catch (error) {
      console.log(error);
    }
  };
  

  const handleGuidePress = (guide) => {
    navigation.navigate('Guide', { guide });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Discover</Text>
          <Text style={styles.subtitle}>with our guides</Text>
        </View>
        <View style={styles.avatarContainer}>
          <Image 
            source={Avatar}
            style={styles.avatar}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        {guides.map((guide) => (
          <TouchableOpacity
            key={guide.id}
            style={styles.guideContainer}
            onPress={() => handleGuidePress(guide)}
          >
            <View style={styles.guideContent}>
              <Image source={{ uri: guide.photourl }} style={styles.guideImage} />
              <Text style={styles.guideName}>{guide.fullName}</Text>
              <View style={styles.ratingContainer}>
                <FontAwesome name="star" size={16} color="gold" />
                <FontAwesome name="star" size={16} color="gold" />
                <FontAwesome name="star" size={16} color="gold" />
                <FontAwesome name="star" size={16} color="gold" />
                <FontAwesome name="star" size={16} />
              </View>
              <Text style={styles.guideDescription}>{guide.description}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 35,
    marginTop: 5,
    color: '#0c120f44',
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 25,
    color: '#0c120f44',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    backgroundColor: 'gray',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  scrollViewContent: {
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  guideContainer: {
    backgroundColor: '#1c6ef2',
    borderRadius: 8,
    marginBottom: 16,
  },
  guideContent: {
    padding: 16,
  },
  guideImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  guideName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  guideDescription: {
    color: 'white',
  },
});

export default Discoverg;

