import React, { useState } from 'react';
import { View, Text,  StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import{useForm} from 'react-hook-form';
import axios from 'axios';

const ResetPassword = () => {
  const {control, handleSubmit } =useForm()
 
 
  const navigation= useNavigation();
  const route = useRoute();
  const email  = route.params?.email;
 
  const onResetPressed = async (data) => {
    try {
      const { code, password } = data;
      console.log('Reset Password:', email, code, password);

      const response = await axios.post('http://10.0.2.2:3556/resetpass', {
        email,
        code,
        password,
      });
      console.log('Reset Password Response:', response.data);

      if (response.data.success) {
        // Password reset successfully
        navigation.navigate('SignIn');
      } else {
        // Incorrect code
        console.log('Incorrect code');
        // Display error message to the user
      }
    } catch (error) {
      console.log('Error resetting password:', error);
      // Display error message to the user
    }
  };





  const onSignInPressed = () => {
    console.warn("SignInPressed");
    navigation.navigate('SignIn');
  }
  

  
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={styles.root}> 
       <Text style={styles.title}>Reset your password</Text>
       <CustomInput 
         name="code"
         placeholder="Code" 
         control={control}
         rules={
          {required:'code is required'}
         }
      />
      <CustomInput 
        placeholder="New Password" 
        name="password"  
        secureTextEntry={true}
        control={control}
        rules={{
                required:'Password is required',
                minLength:{value:5, message:'Password should be minimum 5 characters'},
                maxLength:{value:100, message:'Password should be maximum 100 characters'}
                
              
              }}
      />

      <CustomButton
         text="Reset"
         onPress={handleSubmit(onResetPressed)} 
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

export default ResetPassword;
