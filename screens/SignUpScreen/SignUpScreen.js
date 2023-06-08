import React, { useState } from 'react';
import { View, Text,useWindowDimensions,  StyleSheet, ScrollView } from 'react-native';
import CustomInput from '../../components/CustomInput/CustomInput';
import CustomButton from '../../components/CustomButton/CustomButton';
import { useNavigation , useRoute} from '@react-navigation/native';
import{useForm, Controller} from 'react-hook-form';
import axios from 'axios';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 




const SignUpScreen = () => {
  
  
  const {control, handleSubmit,watch } =useForm();
  const pwd = watch('password');
  const navigation = useNavigation();
  
  const onRegisterPressed = async () => {
    try {
      const user = {
        username: watch('username'),
        email: watch('email'),
        password: watch('password'),
        repeatPassword: watch('repeatPassword'),
      };
  
      await axios.post('http://10.0.2.2:3556/signup', user);
      
      navigation.navigate('ConfirmEmail', { email: user.email });
    } catch (err) {
      console.log(err);
    }
   
    
  };
  

  
  const onTermsOfUsePressed = () => {
    console.warn("onTermsOfUsePressed");
  }
  const OnPrivacyPolicyPressed = () => {
    console.warn("OnPrivacyPolicyPressed");
  }

  

  const onSignInGoogle = () => {
    console.warn("Google");
  }
  const onSignInFacebook = () => {
    console.warn("Facebook");
  }
  const onSignInPressed = () => {
    console.warn("SignIn");
    navigation.navigate('SignIn');
  }
  
  return (
  <ScrollView showsVerticalScrollIndicator={true}>
    <View style={styles.root}> 
       <Text style={styles.title}>Create an account</Text>

       <CustomInput 
       name="username"
       placeholder="Username" 
       control={control} 
       rules={{
        required: 'Username is required',
        minLength: {
          value: 3,
          message: 'Usename should be at least 3 characters long'
        },
        maxLength: {
          value: 24,
          message: 'Usename should be max 24 characters long'
        }
      }}
       
     />
     <CustomInput 
       name="email"
       placeholder="Email" 
       control={control} 
       rules={{
        
        pattern: {
          value: EMAIL_REGEX,
          message:'Email is invalid'
        }
      }}
       
     />

       

     <CustomInput
        name="password"
        placeholder="Password"  
        secureTextEntry={true}
        control={control}
        rules={{
                required:'Password is required',
                minLength:{value:5, message:'Password should be minimum 5 characters'},
                maxLength:{value:100, message:'Password should be maximum 100 characters'}
                
              
              }}
        />

     <CustomInput
        name="repeatPassword"
        placeholder=" Repeat Password"  
        secureTextEntry={true}
        control={control}
        rules={{ 
          validate: value=>
           value === pwd || 'Password do not match'
        }}
        />

       

      <CustomButton
         text="Register"
         onPress={handleSubmit(onRegisterPressed)} 
      />
      <Text style={styles.text}>
        By registerng, you confirm that you accept our <Text style={styles.link} onPress={onTermsOfUsePressed}>Terms of use</Text> and <Text style={styles.link} onPress={OnPrivacyPolicyPressed}>Privacy Policy</Text>
      </Text>
      <CustomButton  
         text="Sign in with Google" 
         onPress={onSignInGoogle}  
         bgcolor="#FAE9EA" 
         fgcolor="#DD4D44" 
      />
      <CustomButton 
         text="Sign in with Facebook"
         onPress={onSignInFacebook} 
         bgcolor="#E7EAF4"
         fgcolor="#4765A9"
     />
    <CustomButton  
      text="Have an account? Sign in" 
      onPress={onSignInPressed}  
      type="TERTIARY"
    />
    
    </View>
  </ScrollView>
  );
}
const styles = StyleSheet.create({
    root:{
        flex: 1,
        alignItems:'center',
        padding:20,
    },
    title:{
      fontSize:26,
      fontWeight: 'bold',
      color:'#051C60',
      margin:10,
      marginTop: 50 ,
    },
    text:{
        color: 'gray',
        marginVertical: 10,
    },
    link:{
      color: '#FDB075',
    }

})

export default SignUpScreen;
