import react from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'

import{ Controller} from 'react-hook-form';
  const CustomInput = ({control, name, rules = {}, placeholder, secureTextEntry})  => {
    return (
        
           
           <Controller
                control={control}
                name={name}
                rules={rules}
                render={({field:{value, onChange,onBlur}, fieldState:{error}})=> (
                   <>
                    <View style={[styles.container, {borderColor: error ? 'red':'#52A8F2'}]}>
                        <TextInput 
                            value={value}
                            onChangeText={onChange} 
                            onBlur={onBlur} 
                            placeholder={placeholder}  
                            style={[styles.input , {}]}
                            secureTextEntry={secureTextEntry} />
                        </View>
                    {error && (
                         <Text style={{color:'red',alignSelf:'stretch'}}>
                            {error.message || 'Error' }
                        </Text>
                         )}
                        </> 
                       )}
          />
    
        
    );
};
const styles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        width: '100%',
        height:50,
        borderColor:'#52A8F2',
        borderWidth:1,
        borderRadius:13,
        paddingHorizontal:10,
        marginVertical: 5,
        padding:10,
    },
    input:{
    
    },
});
export default CustomInput;