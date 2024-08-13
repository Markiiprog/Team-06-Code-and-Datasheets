import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TouchableOpacity,
  TextInput,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import { Video, Audio } from 'expo-av';
import { useNavigation } from '@react-navigation/native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
// import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'expo-image-picker';

import { ref, uploadBytesResumable, uploadString, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { database, storage } from '../../FirebaseConfig';

import { AuthContext } from '../../navigation/AuthProvider';
import * as DocumentPicker from 'expo-document-picker';


import { Button } from 'react-native-paper';

const transcribeFile = async (file, fileType, fileName) => {
  // console.log("String to transcribe: ", file);

  const apiEndpoint = `http://35.201.225.45:8000/transcribe/${fileType}`;

  if (fileType === 'text') {
    if (!file) {
        console.error('Error: file is undefined or null');
        Alert.alert('Error: file is undefined or null');
        return; // Exit the function or handle the error appropriately
    }
    
    try {
      const response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json' // Specify content type as JSON
          },
          body: JSON.stringify({ input_string: file }) // Stringify the data object
      });

      const responseData = await response.json();

      console.log("Transcription: ", responseData.Transcription);
      console.log("BrailleG1: ", responseData.Braille);
      console.log("BrailleG2: ", responseData.Braille_G2);

      return responseData;
    }
      catch (error) {
      console.error(error);
      return null;
    }
  } else {
    // For other file types, handle as usual
    const formData = new FormData();
    let mimeType, extension;

    switch(fileType) {
      case 'image':
        mimeType = 'image/jpeg';
        extension = 'jpg';
        break;
      case 'video':
        mimeType = 'video/mp4';
        extension = 'mp4';
        break;
      case 'audio':
        mimeType = 'audio/mp3';
        extension = 'mp3';
        break;
      case 'document':
        // Assuming PDF, DOC, TXT for documents
        if (file.endsWith('.pdf')) {
          mimeType = 'application/pdf';
          extension = 'pdf';
        } else if (file.endsWith('.doc') || file.endsWith('.docx')) {
          mimeType = 'application/msword';
          extension = 'doc';
        } else if (file.endsWith('.txt')) {
          mimeType = 'text/plain';
          extension = 'txt';
        } else {
          throw new Error('Unsupported document type');
        }
        break;
      default:
        throw new Error('Invalid fileType');
    }

    formData.append('file', {
      uri: file,
      type: mimeType,
      name: `file.${extension}`
    });

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const responseData = await response.json();

      console.log("Transcription: ", responseData.Transcription);
      console.log("BrailleG1: ", responseData.Braille);
      console.log("BrailleG2: ", responseData.Braille_G2);

      return responseData;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
};


const AddPostScreen = ({ route }) => {
  const navigation = useNavigation();

  const { user, logout } = useContext(AuthContext);

  const [fileType, setFileType] = useState(null);

  useEffect(() => {
    if (route.params && route.params.fileType) {
      setFileType(route.params.fileType);
    }
  }, [route.params]);

  const [image, setImage] = useState(null);
  const [fileName, setFilename] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transcribing, setTranscribing] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState('');




  const takePhotoFromCamera = async() => {
    let result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        // aspect: [4, 3],
        quality: 1,
      });
  
      console.log(result.assets[0]);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        const photoUri = result.assets[0].uri;
        const fileName = photoUri.substring(photoUri.lastIndexOf('/') + 1);
        setFilename(fileName);
        console.log(fileName);
      } else {
        console.log("User Cancelled the upload");
      }
  };

  const choosePhotoFromLibrary = async() => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        quality: 1,
      });
  
      console.log(result.assets[0]);
  
      if (!result.canceled) {
        setImage(result.assets[0].uri);
        const photoUri = result.assets[0].uri;
        const fileName = photoUri.substring(videoUri.lastIndexOf('/') + 1);
        setFilename(fileName);
        console.log(fileName);
      } else {
        console.log("User Cancelled the upload");
      }
  };
  const selectFile = async () => {
    if (fileType === 'audio') {
      await selectAudio();
    } else if (fileType === 'video') {
      await selectVideo();
    } else if (fileType === 'document') {
      await selectDocument();
    }
  };

  const selectVideo = async () => {
    // Implement logic from selectVid in Main component
    try {
      await ImagePicker.getMediaLibraryPermissionsAsync();
      const video = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
      });

      if (!video.canceled) {
        console.log('Selected video:', video.assets[0]);
        setImage(video.assets[0].uri);
        const videoUri = video.assets[0].uri;
        const fileName = videoUri.substring(videoUri.lastIndexOf('/') + 1);
        setFilename(fileName);
        // Handle the selected video
      } else {
        console.log("User Cancelled the upload");
      }

    } catch (error) {
      console.error(error);
    }
  };

  const selectAudio = async () => {
    // Implement logic from selectAudio in Main component
    try {
      const audio = await DocumentPicker.getDocumentAsync({
        type: 'audio/*',
      });
  
      if (!audio.canceled) {
        console.log('Selected audio:', audio.assets[0]);
        // Handle the selected audio
        setImage(audio.assets[0].uri);
        // Set the filename here
        setFilename(audio.assets[0].name);
      } else {
        console.log("User Cancelled the upload");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const selectDocument = async () => {
    // Implement logic from selectDocument in Main component
    try {
      const document = await DocumentPicker.getDocumentAsync();
    
      if (!document.canceled) {
        const allowedTypes = ['pdf', 'doc', 'txt'];
        const fileName = document.assets[0].name;
        const fileExtension = fileName.split('.').pop().toLowerCase();
        
        if (allowedTypes.includes(fileExtension)) {
          console.log('Selected document:', document);
          // Handle the selected document
          setFilename(fileName);
          setImage(document.assets[0].uri);
        } else {
          console.log("Selected file format is not allowed");
        }
      } else {
        console.log("User Cancelled the upload");
      }
    } catch (error) {
      console.error(error);
    }
  };

  
  const renderActionButtons = () => {
    if (fileType === 'audio') {
      return (
        <ActionButton buttonColor="#003153" useNativeDriver={true}>
          <ActionButton.Item buttonColor="#8DABD6" title="Select Audio" onPress={selectFile}>
            <Icon name="md-mic-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      );
    } else if (fileType === 'video') {
      return (
        <ActionButton buttonColor="#003153" useNativeDriver={true}>
          <ActionButton.Item buttonColor="#8DABD6" title="Select Video" onPress={selectFile}>
            <Icon name="md-videocam-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      );
    } else if (fileType === 'document') {
      return (
        <ActionButton buttonColor="#003153" useNativeDriver={true}>
          <ActionButton.Item buttonColor="#8DABD6" title="Select Document" onPress={selectFile}>
            <Icon name="md-document-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      );
    } else if (fileType === 'image') {
      return (
        <ActionButton buttonColor="#003153" useNativeDriver={true}>
          <ActionButton.Item buttonColor="#8DABD6" title="Take Photo" onPress={takePhotoFromCamera}>
            <Icon name="md-camera-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
          <ActionButton.Item buttonColor="#8DABD6" title="Select Photo" onPress={choosePhotoFromLibrary}>
            <Icon name="md-images-outline" style={styles.actionButtonIcon} />
          </ActionButton.Item>
        </ActionButton>
      );

    } else {
      // Default action button when no file type is selected
      return (
        // <ActionButton buttonColor="#3498db" useNativeDriver={true}>
        //   <ActionButton.Item buttonColor="#8DABD6" title="Take Photo" onPress={takePhotoFromCamera}>
        //     <Icon name="md-camera-outline" style={styles.actionButtonIcon} />
        //   </ActionButton.Item>
        //   <ActionButton.Item buttonColor="#8DABD6" title="Select Photo" onPress={choosePhotoFromLibrary}>
        //     <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        //   </ActionButton.Item>
        // </ActionButton> 
        null
      );
    }
  };

 
  const submitPost = async () => {
    let transcriptionData;
    let fileUrl;

    if (fileType === 'text') {
      // For text, directly set transcription data
      const filename = 'Text_transcription_' + Date.now();
      setFilename(filename);
      console.log("Check filename: ", fileName);

      setTranscribing(true); // Set transcribing to true when transcribing text
      transcriptionData = await transcribeFile(post, fileType);
      setTranscribing(false); // Set transcribing to false after transcription is done
    } else {
      fileUrl = await uploadFile(image, fileType);
  
      if (!fileUrl) {
        console.error('Failed to upload file');
        setUploading(false);
        return;
      }
      
      console.log('File Url: ', fileUrl);
      console.log('Post: ', post);
  
      // For other file types, transcribe the file
      setTranscribing(true);
      transcriptionData = await transcribeFile(image, fileType, fileName);
      setTranscribing(false);
    }
  
    if (!transcriptionData) {
      console.error('Failed to transcribe file');
      return;
    }
    
    // Upload download links to Firebase storage
    const downloadLinks = transcriptionData.download_links;
    const uploadedLinks = await Promise.all(
      Object.entries(downloadLinks).map(async ([extensionKey, url]) => {
        // Fetch the file data using the provided URL
        // Extract filename from the URL
        // const fileNameWithExtension = url.substring(url.lastIndexOf('/') + 1);
        // const fileName = fileNameWithExtension.split('.').slice(0, -1).join('.'); // Remove the extension from the filename

        // Parse extension from the URL (assuming extension follows conventional format)
        const extension = url.split('.').pop();        

        const response = await fetch(url);
        const blob = await response.blob();

         // Add _g2 to the filename if extensionKey contains 'g2'
        const modifiedFileName = extensionKey.includes('g2') ? `${fileName}_g2` : fileName;

        // Construct a reference to the storage location
        const storageRef = ref(storage, `download_links/${modifiedFileName}.${extension}`);
        console.log("In storage name: ", modifiedFileName);
        try {
          // Upload the blob to Firebase Storage and wait for completion
          const uploadTaskSnapshot = await uploadBytesResumable(storageRef, blob);
    
          // Get the download URL for the uploaded file and return it
          const downloadURL = await getDownloadURL(storageRef);
          console.log(`got file ${extensionKey} to firebase at ${downloadURL}`)
          return { [extensionKey]: downloadURL };
        } catch (error) {
          // Handle upload errors
          console.error('Error occurred during upload:', error);
          return { [extensionKey]: 'Upload failed' };
        }
      })
    );
    
    
    
    

    // Transform the uploaded links into a single object
    const uploadedLinksObject = uploadedLinks.reduce((acc, curr) => ({ ...acc, ...curr }), {});
    
    addDoc(collection(database, 'posts'), {
      userId: user.uid,
      title: post,
      fileName: fileName,
      postUrl: fileType === 'text' ? null : fileUrl,
      postTime: Timestamp.fromDate(new Date()),
      transcriptionType: fileType,
      Transcription: transcriptionData.Transcription || '',
      Braille: transcriptionData.Braille || '',
      Braille_G2: transcriptionData.Braille_G2 || '',
      downloadLinks: uploadedLinksObject,
    })
    .then(() => {
      console.log('Post Added!');
      Alert.alert('Transcription published!', 'Your post has been transcripted successfully!', [
        {
          text: 'OK',
          onPress: () => {
            navigation.navigate('SubmittedPost', {
              title: post,
              imageUrl: fileType === 'text' ? null : fileUrl,
              transcription: transcriptionData.Transcription || '',
              braille: transcriptionData.Braille || '',
              braille_g2: transcriptionData.Braille_G2 || '',
              transcriptionType: fileType,
              downloadLinks: uploadedLinksObject,
              date: Timestamp.fromDate(new Date())
            });
            setPost('');
            setImage(null);
            setFilename(null); 
          },
        },
      ]);
    })
    .catch((error) => {
      console.log('Something went wrong with added post to firestore.', error);
      Alert.alert('Something went wrong with added post to firestore.', error);
    });
  };
  
  


  const uploadImage = async () => {
    if (image == null) {
      return null;
    }
    const uploadUri = image;
    console.log('Upload URI:', uploadUri); // Add this line to check uploadUri
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    console.log('Filename:', filename);
    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    setUploading(true);
    setTransferred(0);

    const response = await fetch(uploadUri);
    const blob = await response.blob();
    const storageRef = ref(storage, `photos/${filename}`);
    const task = uploadBytesResumable(storageRef, blob);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100),
      );
    });

    try {
      await task;

      const url = await getDownloadURL(storageRef);

      setUploading(false);
      setImage(null);

      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  const uploadFile = async (fileUri, fileType) => {
    
    if (fileUri == null) {
      return null;
    }
  
    const uploadUri = fileUri;
    console.log('Upload URI:', uploadUri); // Add this line to check uploadUri
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    console.log('Filename:', filename);
    // Add timestamp to File Name
    const extension = filename.split('.').pop();
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    setFilename(filename)

    console.log("Filename in uploading: ", fileName);
  
    setUploading(true);
    setTransferred(0);
  
    const response = await fetch(uploadUri);
    const blob = await response.blob();
  
    let storageRef;
    switch (fileType) {
      case 'image':
        storageRef = ref(storage, `photos/${filename}`);
        break;
      case 'audio':
        storageRef = ref(storage, `audios/${filename}`);
        break;
      case 'video':
        storageRef = ref(storage, `videos/${filename}`);
        break;
      case 'document':
        storageRef = ref(storage, `documents/${filename}`);
        break;
      default:
        console.log('Unsupported file type');
        return null;
    }
  
    const task = uploadBytesResumable(storageRef, blob);
  
    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}  bytes`,
      );
  
      setTransferred(
        Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100),
      );
    });
  
    try {
      await task;
  
      const url = await getDownloadURL(storageRef);
  
      setUploading(false);
      // setImage(null);
      // setPost(null);
  
      return url;
    } catch (e) {
      console.log(e);
      return null;
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.inputWrapper}>
      {fileType === 'video' && image != null ? (
        <Video
          source={{ uri: image }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
        />
      ) : null}
      {fileType === 'image' && image != null ? (
        <Image source={{ uri: image }} style={styles.addImage} resizeMode='contain' />
      ) : (
        <Text style={styles.fileName}>{fileName}</Text>
      )}

        <TextInput
          style={styles.inputField}
          placeholder={fileType === 'text' ? "Input text to transcribe.." : "Click here to set Transcription title.."}
          multiline
          numberOfLines={4}
          value={post}
          onChangeText={(content) => setPost(content)}
        />

        
        {uploading || transcribing ? (
          <View style={styles.statusWrapper}>
            <Text>{transcribing ? "Transcribing file..." : `${transferred} % Completed!`}</Text>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        ) : (

          <Button icon="refresh" mode="elevated" onPress={submitPost} style={styles.button} textColor="#003153">
              Transcribe
          </Button>
          // <TouchableOpacity style={styles.submitBtn} onPress={submitPost}>
          //   <Text style={styles.submitBtnText}>Transcribe</Text>
          // </TouchableOpacity>
        )}
      </View>
      </TouchableWithoutFeedback>
      {renderActionButtons()}
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  button: {
    width: '70%',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'white',
  },
  inputField: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    textAlign: 'center',
    width: '60%',
    marginBottom: 5,
  },
  addImage: {
    width: '100%',
    height: 250,
    marginBottom: 15,
    // resizeMode:'contain', 
  },
  statusWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#062CD4',
    borderRadius: 8,
    padding: 10,
  },
  submitBtnText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
  fileName: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
  },
  video: {
    width: '100%',
    height: 250,
    marginBottom: 15,
  },
  audio: {
    width: 300,
    height: 40,
  },
});
