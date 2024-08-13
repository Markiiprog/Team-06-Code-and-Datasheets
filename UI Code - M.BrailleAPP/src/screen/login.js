import {View, Text, ScrollView, TouchableOpacity, Alert, ActivityIndicator} from "react-native";
import React, { useContext, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { AuthContext } from "../../navigation/AuthProvider";

// MATS
import { TextInput as PaperTextInput, Button } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

// dimension fix
import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font';

const Login = () => {
  const {login, loading} = useContext(AuthContext);
  const nav = useNavigation();
  const [loginCredentials, setloginCredentials] = useState({
    email: "",
    password: "",
  });
  const [isVisible, setisVisible] = useState(true);
  // const [loading, setLoading] = useState(false); // Loading state
  const { email, password } = loginCredentials;

  // fonts

  const [ fontsLoaded ] = useFonts({
    'PTSans-Bold' : require ('../assets/fonts/PTSans-Bold.ttf'),
    'PTSans-BoldItalic' : require ('../assets/fonts/PTSans-BoldItalic.ttf'),
    'PTSans-Italic' : require ('../assets/fonts/PTSans-Italic.ttf'),
    'PTSans-Regular' : require ('../assets/fonts/PTSans-Regular.ttf'),
  })

  if (!fontsLoaded){
    return undefined ;
  }

  const handleLogin = async () => {
    // console.log("Before login:", loading);
    await login(email, password);
    // console.log("After login:", loading);
  };

  
  return (
      <ScrollView style = {{backgroundColor: 'white', flex: 1}}>
        <View style={{ paddingHorizontal: 15 }}>
        <Text style={styles.screenHeading}> Hey there! </Text>
          <Text style={styles.screenTexts}>
            Welcome, please enter your credentials.
          </Text>

          <Text style={styles.placeholderLabel}>Email</Text>
          <View>
          <View style={styles.iconContainer}>
          <MaterialIcons name="email" size={25} color='#003153' />
          </View>
          <PaperTextInput //7 spaces para sakto lang -david 
            label="       Please enter your email"
            value={email}
            onChangeText={(value) => setloginCredentials({ ...loginCredentials, email: value })}
            mode="outlined"
            activeOutlineColor="#003153"
            style={styles.textInput}
            left={ <MaterialIcons name="email"/>}
          />
          </View>

          
          <Text style={[styles.placeholderLabel, { marginTop: 10 }]}>Password</Text>
          <View>
          <View style={styles.iconContainer}>
          <FontAwesome5 name="key" size={25} color= '#003153' />
          </View>
          <PaperTextInput
            label="       Enter your password"
            value={password}
            onChangeText={(value) => setloginCredentials({ ...loginCredentials, password: value })}
            secureTextEntry={isVisible}
            mode="outlined"
            activeOutlineColor="#003153"
            style={styles.textInput}
            left={<FontAwesome5 name="key"/>}
            right={
              <PaperTextInput.Icon
                icon={isVisible ? 'eye' : 'eye-off'}
                onPress={() => setisVisible(!isVisible)}
                color="black"
              />
            }
          />
          </View>
        

          <TouchableOpacity
           onPress={() => {
             }}
           >
            <Text style={styles.textForgot}>
            Forgot Password?
          </Text> 

           </TouchableOpacity>

           <TouchableOpacity
            // onPress={() => login(email, password)}
            onPress={handleLogin}
            style={[styles.buttonContainer, { opacity: loading ? 0.6 : 1 }]}
            disabled={loading} // Disable the button when loading is true
          >
            <View style={styles.buttonContent}>
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Icon name="login" size={20} color="white" style={styles.icon} />
            )}
            <Text style={styles.buttonText}>Log In</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.lineContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>or</Text>
            <View style={styles.line} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, gap: 5 }}>
            <Text style={styles.screenTexts}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={() => nav.navigate('register')}>
            <Text style={styles.textClickable}>Register here</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
  );
};

// mga design to call ko nalang -david -------------------------
const styles = ScaledSheet.create({
  iconContainer: {
    position: 'absolute',
    top: '20@s', // Adjust as needed
    left: '20@s', // Adjust as needed
    zIndex: '1@s',
  },
  righticonContainer: {
    marginRight: '10@s',
  },
  screenTexts:{
    textAlign: 'center',
    fontSize: '14@s', 
    color: '#003153', 
    fontFamily: "PTSans-Regular"
  },
  placeholderLabel: {
    fontSize: '14@s',
    fontFamily: "PTSans-Bold",
    color: '#003153',
    marginTop: '15@s',
    paddingLeft: '15@s',
  },
  lineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '10@s',
  },
  orText: {
    marginHorizontal: "10@s",
    fontSize: '16@s',
    fontFamily: "PTSans-Regular"
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'black',
  },

  textInput: {
    marginTop: '5@s',
    backgroundColor: 'white',
    width: '305@s',
    margin: '10@s',
    
  },

  textForgot:{
    fontSize: '14@s', 
    color: '#003153', 
    fontWeight: '500', 
    textAlign: 'right',
    fontFamily: "PTSans-Regular"
  },

  textClickable:{
    fontSize: '14@s', 
    color: '#003153', 
    fontFamily: "PTSans-Bold"
  },
  
  screenHeading:{
    textAlign:'center',
    fontSize: '40@s', 
    color: '#003153',
    paddingTop: '85@s',
    alignSelf: "center",
    fontFamily: "PTSans-Bold"
  },
  buttonContainer: {
    backgroundColor: '#003153',
    borderRadius: '30@s',
    height: '50@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15@s',
    width: '100%', // Set an appropriate width
  },
  buttonText:{
    color: 'white',
    fontSize: '12@s',
    fontFamily: "PTSans-Bold"
     
  },
  icon: {
    marginRight: '5@s',
     // Adjust the margin as needed
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Login;

