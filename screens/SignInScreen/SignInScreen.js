import React, { useState } from 'react';
import { View, Text,useWindowDimensions, Image, StyleSheet, ScrollView, TextInput } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import Logo from './images/logo2.png' ;
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation } from '@react-navigation/native';
import{useForm, Controller} from 'react-hook-form';

import { Alert } from 'react-native';

const SignInScreen = () => {
 

  const {height}= useWindowDimensions();

  const navigation = useNavigation();

  const {control, handleSubmit,formState:{errors} } =useForm();

  const onSignInPressed = (data) => {
    console.log({data});
    fetch('http://10.0.2.2:3556/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          // Sign-in successful, navigate to the next screen
          navigation.navigate('HomeScreen');
        } else {
          // Sign-in failed, show an error message
          Alert.alert('Sign-in Failed', data.message);
        }
      })
      .catch((error) => {
        console.error('Error signing in:', error);
        Alert.alert('Error', 'An error occurred while signing in. Please try again later.');
      });
  };
   
  const onForgotPasswordPressed =() =>{
    console.warn("ForgotPassword");
    navigation.navigate('ForgotPassword');
  };
  const onSignInGoogle = () => {
    console.warn("Google");
  }
  const onSignInFacebook = () => {
    console.warn("Facebook");
  }
  const onSignUpPressed = () => {
    console.warn("SignUp");
    navigation.navigate('SignUp');
  }
  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}> 
      <Image source={Logo} style={[styles.logo, {height: height*0.5}]} resizeMode='contain'/>
       
       


     <CustomInput 
       name="username"
       placeholder="Username" 
       control={control} 
       rules={{required: 'Username is required'}}
       
     />

     <CustomInput
        name="password"
        placeholder="Password"  
        secureTextEntry={true}
        control={control}
        rules={{required:'Password is required', minLength:{value:3, message:'Password should be minimum 3 characters'}}}
        />


      <CustomButton  text="Sign In" onPress={handleSubmit(onSignInPressed)} />
      <CustomButton  text="Forgot Password ?" onPress={onForgotPasswordPressed}  type="TERTIARY"/>
      <CustomButton  text="Sign in with Google" onPress={onSignInGoogle}  bgcolor="#FAE9EA" fgcolor="#DD4D44" />
      <CustomButton  text="Sign in with Facebook" onPress={onSignInFacebook} bgcolor="#E7EAF4" fgcolor="#4765A9" />
      <CustomButton  text="Don't have an account? Sign up" onPress={onSignUpPressed}  type="TERTIARY"/>
    </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    root:{
        alignItems:'center',
        padding:20,
    },
    logo:{
        width:250,
        maxWidth:500,
        height: 250,
        maxHeight:265,
        width: '100%',

        
  
        
    }

})

export default SignInScreen;
