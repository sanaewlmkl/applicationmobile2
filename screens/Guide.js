import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import axios from 'axios';

const Guide = ({ route, navigation }) => {
  const { guide } = route.params;
  const [additionalInfo, setAdditionalInfo] = useState(null);
  const [reservation, setReservation] = useState({
    guideId: guide.id,
    clientName: '',
    reservationDate: '',
    reservationTime: '',
  });

  useEffect(() => {
    fetchAdditionalInfo();
  }, []);

  const fetchAdditionalInfo = async () => {
    try {
      const response = await axios.get(`http://10.0.2.2:3556/api/guides/${guide.fullName}`);
      const data = response.data;
      setAdditionalInfo(data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToGuideDetails = () => {
    navigation.navigate('GuideDetails', { guide: guide });
  };

  const handleReservation = async () => {
    try {
      const response = await axios.post('http://10.0.2.2:3556/api/reservations', reservation);
      // Handle the response or perform any necessary actions
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.header} onPress={navigateToGuideDetails}>
        <Text style={styles.title}>Guide Details</Text>
      </TouchableOpacity>
      <View style={styles.detailsContainer}>
        <Image source={{ uri: guide.photourl }} style={styles.image} />
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{guide.fullName}</Text>
        <Text style={styles.label}>Description:</Text>
        <Text style={styles.value}>{guide.description}</Text>
        {additionalInfo && (
          <>
            <Text style={styles.label}>Phone:</Text>
            <Text style={styles.value}>{additionalInfo.phoneNumber}</Text>
            <Text style={styles.label}>Location:</Text>
            <Text style={styles.value}>{additionalInfo.location}</Text>
          </>
        )}
        <Text style={styles.label}>Client Name:</Text>
        <TextInput
          style={styles.input}
          value={reservation.clientName}
          onChangeText={(text) => setReservation({ ...reservation, clientName: text })}
        />
        <Text style={styles.label}>Reservation Date:</Text>
        <TextInput
          style={styles.input}
          value={reservation.reservationDate}
          onChangeText={(text) => setReservation({ ...reservation, reservationDate: text })}
        />
        <Text style={styles.label}>Reservation Time:</Text>
        <TextInput
          style={styles.input}
          value={reservation.reservationTime}
          onChangeText={(text) => setReservation({ ...reservation, reservationTime: text })}
        />
        <TouchableOpacity style={styles.button} onPress={handleReservation}>
          <Text style={styles.buttonText}>Make Reservation</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: '#0c120f44',
    padding: 16,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },
  detailsContainer: {
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  value: {
    fontSize: 16,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#0c120f',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Guide;
