import react from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
  const CustomButton = ({onPress , text , type= 'PRIMARY', bgcolor, fgcolor})  => {
    return (
        <TouchableOpacity 
         style={[
            styles.container, 
            styles[`container_${type}`],
            bgcolor ? {backgroundColor:bgcolor}:{} 
        ]}
         onPress={onPress}>
        <Text 
        style={[
            styles.text, 
            styles[`text_${type}`],
            fgcolor ? {color:fgcolor}: {}
        ]}>
                {text}
            </Text>
      </TouchableOpacity>
    );
};
const styles = StyleSheet.create({
    container: {
      width:'100%',
      padding: 15,
      borderRadius: 5,
      alignItems: 'center',
      justifyContent: 'center',

      marginVertical: 5,
    },
    container_PRIMARY:{
        backgroundColor: '#6d8aa8',

    },
    container_TERTIARY:{
        

    },
    container_SECONDARY:{
        borderColor: '#52A8F2',
        borderWidth: 2,

    },

    text_PRIMARY: {
      color: '#FFFFFF',
      
    },
    text_SECONDARY: {
      color: '#52A8F2',
      
    },
    text_TERTIARY: {
        color: '#8C501C',
        
       
    },
    text: {
        fontWeight: 'bold',
    },
});
export default CustomButton;