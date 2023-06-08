import React, { useState } from 'react';
import { View, Text,  StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation , useRoute} from '@react-navigation/native';
import{useForm} from 'react-hook-form';
import axios from 'axios';

const ForgotPassword = () => {
  const {control, handleSubmit } =useForm()
  const navigation= useNavigation();

 
  const onSendCodePressed = async(data) => {
    try{
      
      
      console.warn(data)
      const email =data;
      const response =await axios.post("http://10.0.2.2:3556/forgotpass", email)
      navigation.navigate('ResetPassword',email)
    }catch (error) {
      console.log('Error sending confirmation code:', error);
    }
    
  };


  const onSignInPressed = () => {
    console.warn("SignInPressed");
    navigation.navigate('SignIn')
  }
  

  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}> 
       <Text style={styles.title}>Reset your password</Text>
       <CustomInput 
         placeholder=" Email" 
         name="email"
         control={control}
         rules={{required:'email is required'}}
        
      />

      <CustomButton
         text="Send Code"
         onPress={handleSubmit(onSendCodePressed)} 
      />
 
      <CustomButton  
      text="Back to Sign in" 
      onPress={onSignInPressed}  
      type="TERTIARY"
     />
    
    </View>
  </ScrollView>
  );
}


const styles = StyleSheet.create({
    root:{
        flex:1,
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

export default ForgotPassword;
