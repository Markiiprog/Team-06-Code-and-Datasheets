import {View,Text,ScrollView,Image,TextInput,TouchableOpacity, Alert, KeyboardAvoidingView, Platform } from "react-native";
import React, { useContext, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons"; /* link for expo vector icons lang to*/
import { useNavigation } from "@react-navigation/native";
import { authentication, database } from "../../FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";
import uuid from 'react-native-uuid';
import { AuthContext } from "../../navigation/AuthProvider";
import { TextInput as PaperTextInput, Button} from 'react-native-paper';
// Icons

import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Terms from "./Terms"

// Custom Fonts ********************

import { useFonts } from 'expo-font'


// dimension fix
import { ScaledSheet } from 'react-native-size-matters';
const Register = () => {
  const {signup} = useContext(AuthContext);

  const [isVisible, setisVisible] =
    useState(true); /* gamit for toggle ng eye yung sa password */
  const nav = useNavigation(); /* for navigation */

  const [userCredentials, setuserCredentials] = useState({
    name: "", 
    email: "",
    password: "",
  });


  // fonts ********************

  const [ fontsLoaded ] = useFonts({
    'PTSans-Bold' : require ('../assets/fonts/PTSans-Bold.ttf'),
    'PTSans-BoldItalic' : require ('../assets/fonts/PTSans-BoldItalic.ttf'),
    'PTSans-Italic' : require ('../assets/fonts/PTSans-Italic.ttf'),
    'PTSans-Regular' : require ('../assets/fonts/PTSans-Regular.ttf'),

  })

  if (!fontsLoaded){
    return undefined ;
  }


  const { email, password, name } = userCredentials;

  // const uid=uuid.v4()
  const userAccountSignup = () => {
    createUserWithEmailAndPassword(authentication, email, password) /* RN FIREBASE*/
      .then(() => {
        // nav.navigate('Login')
        Alert.alert("User account succesfully created!");
        setDoc( doc(database, "users", authentication.currentUser.uid), {
          fullname: name,
          email: email,
          id: authentication.currentUser.uid, 
        });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          console.log("That email address is already in use!");
          Alert.alert("That email address is already in use!");
        }

        if (error.code === "auth/invalid-email") {
          console.log("That email address is invalid!");
          Alert.alert("That email address is invalid!");
        }

        console.error(error);
      });
  };

  return (

        <ScrollView style = {{ backgroundColor: 'white', flex: 1 }}>
        <View style={styles.mainContainer}>
        <Text style={styles.subscreenHeading}> Register Here </Text>
        <Text style={styles.leftscreenTexts}> Enter your data to complete your </Text>
        <Text style={styles.leftscreenTexts}> account registration.</Text>

        <Text style={styles.placeholderLabel}>Full Name</Text>
        <View>
        <View style={styles.iconContainer}>
         <AntDesign name="user" size={25} color='#003153'/>
         </View>
          <PaperTextInput
            label="       Please enter full name"
            value={name}
            onChangeText={(value) => 
              setuserCredentials({...userCredentials, name: value})
              }
            keyboardType="name-phone-pad"
            mode="outlined"
            activeOutlineColor="#003153"
            style={styles.textInput}
            left={<AntDesign name="user" />}
          />
          </View>
        
          <Text style={styles.placeholderLabel}>Email</Text>
          <View>
          <View style={styles.iconContainer}>
        <MaterialIcons name="email" size={25} color='#003153'/>
         </View>
          <PaperTextInput
            label="       Please enter your email"
            value={email}
            onChangeText={(value) => {
              setuserCredentials({ ...userCredentials, email: value });
            }}
            keyboardType="email-address"
            mode="outlined"
            activeOutlineColor="#003153"
            style={styles.textInput}
            left={ <MaterialIcons name="email" />}
          />
          </View>

          <Text style={styles.placeholderLabel}>Password</Text>
          <View>
            <View style={styles.iconContainer}>
              <FontAwesome5 name="key" size={25} color='#003153' />
            </View>
            <PaperTextInput
              label="       Please create a password"
              value={password}
              onChangeText={(value) => {
                setuserCredentials({ ...userCredentials, password: value });
              }}
              secureTextEntry={isVisible}
              maxLength={20}
              keyboardType="ascii-capable"
              mode="outlined"
              activeOutlineColor="#003153"
              style={styles.textInput}
              left={<FontAwesome5 name="key" />}
              right={
                <PaperTextInput.Icon
                  icon={isVisible ? 'eye' : 'eye-off'}
                  onPress={() => setisVisible(!isVisible)}
                  color="black"
                />
              }
            />
          </View>

         <View>
         <TouchableOpacity onPress={() => {
                nav.navigate("Terms");
              }}>
            <Text numberOfLines={2}
            style={styles.subtext}>By continuing, you agree to our <Text style={styles.textClickable}> Terms of Service<Text style={styles.subtext}> and<Text style={styles.textClickable}> Privacy Policy</Text>
            </Text></Text></Text>
          </TouchableOpacity>
         </View>
         

         <TouchableOpacity
      onPress={() => signup(email, password, name)}
      style={styles.buttonContainer}
    >
      <View style={styles.buttonContent}>
      <Icon name="person" size={20} color="white" style={styles.icon} />
      <Text style={styles.buttonText}>Sign up</Text>
      </View>
    </TouchableOpacity>
           {/* <Button
            mode="contained"
            onPress={() => signup(email, password, name)}
            style={styles.buttonStyle}
            >
              Sign up
          </Button> */}

          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 5, gap: 5 }}>
          <Text style={styles.screenTexts}>Already have an account? </Text>
          <TouchableOpacity onPress={() => {
                nav.navigate("login");
              }}>
          <Text style={styles.textClickable}>Sign in</Text>
          </TouchableOpacity>
          </View>
          
        </View>

        </ScrollView>

  );
};

// mga design to call ko nalang -david -------------------------
const styles = ScaledSheet.create({

  // Main Container ************************

  mainContainer: {
    padding: 20,
  },

  screenTexts:{
    textAlign: 'center',
    fontSize: '14@s', 
    color: '#003153', 
    
  },
  subtext:{
    fontSize: '14@s',
    fontFamily: "PTSans-Regular",
    fontWeight: "400",
    color: "black",
    marginTop: 15,
    letterSpacing: 0.1,
    lineHeight: 25,
    width: "95%",
    opacity: 0.7,
  },
  iconContainer: {
    position: 'absolute',
    top: '20@s', // Adjust as needed
    left: '20@s', // Adjust as needed
    zIndex: '1@s',
  },
  righticonContainer: {
    position: 'center',
    top: 23, // Adjust as needed
    right: 20, // Adjust as needed

  },
  leftscreenTexts:{
    fontSize: '14@s', 
    color: 'black' ,
    fontFamily: "PTSans-Regular"
  },
  placeholderLabel: {
    fontSize: '14@s',
    fontWeight: '500',
    color: '#003153',
    marginTop: '10@s',
    paddingLeft: '15@s',
  },
  textInput: {
    marginTop: '5@s',
    backgroundColor: 'white',
    width: '305@s',
    margin: '10@s',
    
  },
  textClickable:{
    fontSize: '14@s', 
    color: '#003153', 
    fontWeight: '500' ,
    fontFamily: "PTSans-Bold"
  },
  subscreenHeading:{
    textAlign:'left',
    fontFamily: "PTSans-Bold",
    fontSize: '28@s', 
    color: '#003153', 
    paddingTop: '80@s' 
  },

  buttonContainer: {
    backgroundColor: '#003153',
    borderRadius: '30@s',
    height: '50@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '15@s',
    width: '320@s', // Set an appropriate width
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
export default Register;
