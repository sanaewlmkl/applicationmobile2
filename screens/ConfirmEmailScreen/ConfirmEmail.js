import React, { useState } from 'react';
import { View, Text,  StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import{useForm} from 'react-hook-form';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
const ConfirmEmail = () => {
  const {control, handleSubmit } =useForm();

  const navigation= useNavigation();
 
  const route = useRoute();
  const email  = route.params?.email;


 const onConfirmPressed = async(data) => {
  const{confirmationCode} =data;
  console.log('Email:', email);
  console.log('Confirmation Code:', confirmationCode);
  try {
    const response = await axios.post('http://10.0.2.2:3556/confirmemail/confirm', { email, confirmationCode });

 

      
    if (response.data && response.data.success) {
      console.log('Confirmation successful');
      navigation.navigate('HomeScreen');
    } else {
      console.warn('Invalid confirmation code');
      // Handle the error and display an appropriate error message to the user
    }
  } catch (error) {
    console.error('Error confirming email:', error);
    // Handle the error and display an appropriate error message to the user
  }
};



  const onSignInPressed = () => {
    console.warn("SignInPressed");
    navigation.navigate('SignIn')
  }
  const onResendCodePressed = async() => {
    console.warn('ResendCodePressed');
    console.log({email});
    
    
    // Send a POST request to the backend endpoint to resend the confirmation code
    axios
      .post('http://10.0.2.2:3556/confirmemail/resendcode', {email:email})
      .then(() => {
        // Handle the response from the backend (e.g., show a success message)
        console.log('Confirmation code resent successfully');
      })
      .catch((error) => {
        // Handle any errors that occur during the request
        console.error('Error resending confirmation code:', error);
      });
  };

  

  

 
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}> 
       <Text style={styles.title}>Confirm email</Text>
       <CustomInput 
         name="confirmationCode"
         control={control}
         placeholder="Enter your confirmation code" 
         rules={{required:'confirmation code is required'}}
        
      />

      <CustomButton
         text="Confirm"
         onPress={handleSubmit(onConfirmPressed)} 
      />
     
      
    <CustomButton  
      text="Back to Sign in" 
      onPress={onSignInPressed}  
      type="SECONDARY"
    />
    <CustomButton  
      text="Resend Code" 
      onPress={onResendCodePressed}  
      type="TERTIARY"
    />
    
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    root:{
        alignItems:'center',
        padding:20,
    },
    title:{
      fontSize:26,
      fontWeight: 'bold',
      color:'#051C60',
      margin:10,
      marginTop:150 ,
    },
    text:{
        color: 'gray',
        marginVertical: 10,
    },
    link:{
      color: '#FDB075',
    }

})

export default ConfirmEmail;
