import { StyleSheet, Text, View, LeftContent, TouchableOpacity, TextInput, Image } from 'react-native'
import React from 'react'
import { colors } from '../utils/colors';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView } from 'react-native';
import { Alert } from 'react-native';

// dimension fix
import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font'


//************************************************

const main = ({navigation}) => {
  const navigateToAddPost = (fileType) => {
    navigation.navigate('AddPost', { fileType });
  };
  
  const uploadFile = async (file, fileType) => {
    const formData = new FormData();
    const apiEndpoint = `http://192.168.0.2:8000/transcribe/${fileType}`;

    formData.append('file', {
      uri: file.uri,
      type: fileType === 'image' ? 'image/jpeg' : (fileType === 'video' ? 'video/mp4' : 'audio/mp3'),
      // name: file.name,
      name: fileType === 'image' ? 'image.jpg' : (fileType === 'video' ? 'video.mp4' : 'audio.mp3'),
    });

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });
  
      // Assuming that the server returns JSON, you can parse the response
      const responseData = await response.json();

      // console.log(`Response for ${fileType}:`, responseData);
      console.log("Transcription: ", responseData.Transcription);
      console.log("Braille: ", responseData.Braille)

      if (response.status === 200) {
        console.log("Success");
      } else {
        console.error("Error Status:", response.status);
        console.error("Error Data:", response.data);
      }

    } catch (error) {
      console.error(error);
    }
  };

  const selectImage = async () => {
    try {
      await ImagePicker.getMediaLibraryPermissionsAsync();
      const image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
      });

      if (!image.canceled) {
        await uploadFile(image.assets[0], 'image');
      } else {
        console.log("User Cancelled the upload");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const selectVid = async () => {
    try {
      await ImagePicker.getMediaLibraryPermissionsAsync();
      const video = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      });

      if (!video.canceled) {
        console.log('VideoINFO:', video.assets[0])
        await uploadFile(video.assets[0], 'video');
      } else {
        console.log("User Cancelled the upload");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const selectAudio = async () => {
    try {
      const audio = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });
  
      if (!audio.canceled) {
        console.log('AudioINFO:', audio.assets[0]);
        // await uploadFile(audio, 'audio');
      } else {
        console.log("User Cancelled the upload");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const selectDocument = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync();
    
      if (!document.canceled) {
        const allowedTypes = ['pdf', 'doc', 'txt'];
        // const fileName = document.assets[0].uri.substring(document.assets[0].uri.lastIndexOf('/') + 1);
        const fileName = document.assets[0].name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        
        if (allowedTypes.includes(fileExtension)) {
          console.log('DocuINFO:', document);
          // await uploadFile(audio, 'audio');
        } else {
          Alert.alert("Selected file format is not allowed");
        }
      } else {
        console.log("User Cancelled the upload");
      }
    } catch (error) {
      console.error(error);
    }
  };

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




  return (

    <View style = {styles.mainContainer}>

       {/********************** HEADER  ***************************/ }

    <View style = {styles.headerContainer}>
      <View style={styles.logoContainer}>
          
          <Image
            source={require('../assets/MBraillelogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
      </View>
    </View>


         {/********************** BODY ***************************/ }


    <View style = {styles.bodyContainer}>

      <Text style = {styles.bodyHeader}>Choose Input</Text>

      <Text style = {styles.bodySubHeader}>Transcribe and convert</Text>


    </View>

         {/********************** MAIN ***************************/ }


         <View style = {styles.container}>
          
     

  
          <TouchableOpacity style = {styles.box} onPress={() => navigateToAddPost('text')}>
            <View style = {styles.inner}>
            <Image style={{ height: 25 , width: 25 , tintColor: 'white' }} source={require('../assets/maineIcons/text.png')} />
              <Text style = {styles.text}>Text to Braille</Text>
              <Text style = {styles.subText}>Text Input</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity style = {styles.box} onPress={() => navigateToAddPost('audio')}>
            <View style = {styles.inner}>
            <Image style={{ height: 25, width: 25 , tintColor: 'white' }} source={require('../assets/maineIcons/audio.png')} />
              <Text style = {styles.text}>Audio to Braille</Text>
              <Text style = {styles.subText}>MP3 File</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity style = {styles.box} onPress={() => navigateToAddPost('image')}>
            <View style = {styles.inner}>
            <Image style={{ height: 25, width: 25 , tintColor: 'white' }} source={require('../assets/maineIcons/picture.png')} />
              <Text style = {styles.text}>Image to Braille</Text>
              <Text style = {styles.subText}>PNG / JPG File</Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity style = {styles.box} onPress={() => navigateToAddPost('video')}>
            <View style = {styles.inner}>
            <Image style={{ height: 25, width: 25 , tintColor: 'white'   }} source={require('../assets/maineIcons/video.png')} />
              <Text style = {styles.text}>Video to Braille</Text>
              <Text style = {styles.subText}>MP4 File</Text>

            </View>
          </TouchableOpacity>


          <TouchableOpacity style = {styles.box} onPress={() => navigateToAddPost('document')}>
            <View style = {styles.inner}>
            <Image style={{ height: 25, width: 25 , tintColor: 'white'}} source={require('../assets/maineIcons/file.png')} />
              <Text style = {styles.text}>File to Braile</Text>
              <Text style = {styles.subText}>Docs / PDF File</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style = {styles.box} onPress={() => navigation.navigate('Faq')}>
            <View style = {styles.inner}>
            <Image style={{ height: 25, width: 25 , tintColor: 'white'  }} source={require('../assets/maineIcons/faq.png')} />
              <Text style = {styles.text}>F.A.Q</Text>
              <Text style = {styles.subText}>Frequently Ask Question</Text>
            </View>
          </TouchableOpacity>

        
    </View>
    </View>

  )
}

const styles = ScaledSheet.create({

  // MAIN*****************************************


  mainContainer: {
    flex: 1,
  },

  //Logo *******************************************

  logo: {
    width: 110, // Adjust the width as needed
    height: 180, // Adjust the height as needed
    tintColor: 'white',
 

  
  },

  // HEADER*****************************************


  headerContainer: {
    backgroundColor: '#003153',
    height: '28%',
    padding: '12@s',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
 
  },

  headerText: {
    color: 'white',
    fontSize: '30@s',
    fontFamily: "PTSans-Bold",
    paddingTop: '70@s',

  },
  subHeaderText: {
    color: 'white',
    fontFamily: "PTSans-Regular",
    fontSize: '15@s',
    paddingBottom: '15@s',
  },

  // BODY CONTAINER *****************************************

    bodyContainer: {
      padding: '12@s',
   
    },

    bodyHeader: {
      color: '#003153',
      fontSize: '20@s',
      fontFamily: "PTSans-Bold"
    },

    bodySubHeader: {
      color: '#003153',
      fontSize: '12@s',
      fontFamily: "PTSans-Regular"
      


    },

    // CARD CONTAINER *******************************************

    container: {
      width: '90%',
      height: '40%',
      padding: '12@s',
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'center',
      marginTop: "5@s",
    
    },
    
    box: {
    
      width: '50%',
      height: '40%',
      padding: '4@s',
      borderRadius: 8, 
    
    
    },
    
    inner: {
      flex: 1,
      backgroundColor: '#003153',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 8,
    
    
    },

    text: {
      color: "white",
      fontFamily: "PTSans-Bold",
      paddingTop: '5@s',
    
    
    },

    subText: {
      color: "white",
      fontSize: '10@s',
      fontFamily: "PTSans-Italic"

    }







})

export default main