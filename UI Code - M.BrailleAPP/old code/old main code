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

  return (


    <View style = {{ backgroundColor: 'white', flex: 1}}>

        <View style={styles.logoContainer}>
          
          <Image
            source={require('../assets/MBraillelogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          <Text style={styles.title}>
            <Text style={styles.blackText}>M.</Text>
            <Text style={styles.blueText}>Braille</Text>
          </Text>
          <Text style={styles.subtitle}>Empowering Access. Transforming Documents.</Text>
        </View>

  
      <View style = {{ backgroundColor: "white",  flex: 1}}>

    
     
        <View style = {styles.container}>
          
     

  
              <TouchableOpacity style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={{ height: 35 , width: 35 , tintColor: 'white' }} source={require('../assets/maineIcons/text.png')} />
                  <Text style = {styles.text}>TEXT TO BRAILLE</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity style = {styles.box} onPress={() => navigateToAddPost('audio')}>
                <View style = {styles.inner}>
                <Image style={{ height: 35, width: 35 ,tintColor: 'white'   }} source={require('../assets/maineIcons/audio.png')} />
                  <Text style = {styles.text}>AUDIO TO BRAILLE</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity style = {styles.box} onPress={() => navigateToAddPost('image')}>
                <View style = {styles.inner}>
                <Image style={{ height: 35, width: 35 , tintColor: 'white' }} source={require('../assets/maineIcons/picture.png')} />
                  <Text style = {styles.text}>IMAGE TO BRAILLE</Text>
                </View>
              </TouchableOpacity>


              <TouchableOpacity style = {styles.box} onPress={() => navigateToAddPost('video')}>
                <View style = {styles.inner}>
                <Image style={{ height: 35, width: 35 , tintColor: 'white'   }} source={require('../assets/maineIcons/video.png')} />
                  <Text style = {styles.text}>VIDEO TO BRAILLE</Text>

                </View>
              </TouchableOpacity>


              <TouchableOpacity style = {styles.box} onPress={() => navigateToAddPost('document')}>
                <View style = {styles.inner}>
                <Image style={{ height: 35, width: 35 , tintColor: 'white'}} source={require('../assets/maineIcons/file.png')} />
                  <Text style = {styles.text}>DOCUMENT TO BRAILLE</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity style = {styles.box} onPress={() => navigation.navigate('Faq')}>
                <View style = {styles.faq}>
                <Image style={{ height: 35, width: 35 , tintColor: 'white'  }} source={require('../assets/maineIcons/faq.png')} />
                  <Text style = {{color: "white", fontWeight: 'bold',}}>F.A.Q</Text>
                </View>
              </TouchableOpacity>




            
        </View>
      </View>


        {/*FAQ HEHEHEHEHEHEHEHE*/ }


        <View>



        </View>


          
        

        


    </View>

    
  )
}

export default main

const styles = ScaledSheet.create({

// LOGO ***********************

logoContainer: {
  alignItems: 'center',
  backgroundColor: '#062CD4',
  borderBottomLeftRadius: 22,
  borderBottomRightRadius: 22,
  
},
logo: {
  width: 110, // Adjust the width as needed
  height: 180, // Adjust the height as needed
  tintColor: 'white'

},
title: {
  fontSize: 30,
  fontWeight: 'bold',
  marginTop: -35,
},

blackText: {
  color: 'white',
},
blueText: {
  color: 'white',
},
subtitle: {
  fontSize: 15,
  textAlign: 'center',
  marginTop: 5,
  color: 'white',
  paddingBottom: 15
},


// card **************************************

container: {
  width: '60%',
  height: '50%',
  padding: '20@s',
  flexDirection: 'row',
  flexWrap: 'wrap',
  alignSelf: 'center',
  marginTop: 40,

},

box: {

  width: '50%',
  height: '40%',
  padding: 5,
  borderRadius: 8, 


},

inner: {
  flex: 1,
  backgroundColor: "#2e50e2",
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,


},

// faq ******************************

faq: {
  flex: 1,
  backgroundColor: "#2e50e2" ,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 8,

},

// *******************************


text: {
  color: "white",
  fontWeight: 'bold',
  paddingTop: 5,


},

})