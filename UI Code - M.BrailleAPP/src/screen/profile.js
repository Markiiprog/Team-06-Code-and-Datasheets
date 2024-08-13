import { ScrollView, TextInput, Switch, Alert } from "react-native";
import {SafeAreaView,View,Text,StyleSheet,Image,TouchableOpacity, Modal, } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import * as ImagePicker from "expo-image-picker";
import FeatherIcon from "react-native-vector-icons/Feather";
import { Feather } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { AuthContext } from "../../navigation/AuthProvider";
import { database, storage, authentication } from "../../FirebaseConfig";
import { getDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ActivityIndicator } from "react-native";
import {
  reauthenticateWithCredential,
  updatePassword,
  EmailAuthProvider,
} from "firebase/auth";

// react paper ******

import { TextInput as PaperTextInput, Button} from 'react-native-paper';

// DIMENSION COMPATIBILITY

import { ScaledSheet } from "react-native-size-matters";

// Custom Fonts ********************

import { useFonts } from 'expo-font'




const Profile = ({ navigation }) => {
  const { user, logout } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("Name");
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [uploading, setUploading] = useState(false);

  //for password changing
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Perform save action to firebase
    setIsSaving(true); // Set isSaving to true before saving
    try {
      await updateDoc(doc(database, "users", user.uid), {
        fullname: name, // Assuming 'fullname' is the field in Firestore where you store the user's display name
      });
      console.log("User data updated successfully");
      setIsEditing(false); // Update the editing state
    } catch (error) {
      console.error("Error updating user data:", error);
      // Handle error
    } finally {
      setIsSaving(false); // Set isSaving back to false after saving
    }
  };

  const handleLogout = () => {
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    logout();
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

  const getUser = async () => {
    try {
      const userDoc = await getDoc(doc(database, "users", user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log("User does not exist");
      }
    } catch (error) {
      console.error("Error getting user", error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // console.log(userData)

  useEffect(() => {
    if (userData) {
      setName(userData.fullname || "Name");
    }
  }, [userData]);

  const handleChangePassword = async () => {
    setIsChangingPassword(true); // Set loading state to true
    try {
      // Perform password change using Firebase Authentication
      const user = authentication.currentUser;
      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      Alert.alert("Password changed successfully");
      console.log("Password changed successfully");
      setCurrentPassword(""); // Clear current password input
      setNewPassword(""); // Clear new password input
    } catch (error) {
      console.error("Error changing password:", error.message);
      // Handle error
    } finally {
      setIsChangingPassword(false); // Set loading state back to false
    }
  };


  

  // UI components for password change
  const passwordChangeUI = (
    <View style={styles.changeInfo}>
      <Text style={styles.infoHeader}>Change Password</Text>
      <View style={styles.inputWrapper}>
        <FontAwesome5
          name="key"
          size={18}
          color="blue"
          style={styles.iconStyle}
        />
        <TextInput
          style={styles.input}
          placeholder="Current Password"
          secureTextEntry
          value={currentPassword}
          onChangeText={(text) => setCurrentPassword(text)}
        />
      </View>
      <View style={styles.inputWrapper}>
        <FontAwesome5
          name="key"
          size={18}
          color="blue"
          style={styles.iconStyle}
        />
        <TextInput
          style={styles.input}
          placeholder="New Password"
          secureTextEntry
          value={newPassword}
          onChangeText={(text) => setNewPassword(text)}
        />
      </View>
      <TouchableOpacity onPress={handleChangePassword}>
        {isChangingPassword ? (
          <ActivityIndicator color="Blue" size="small" />
        ) : (
          <AntDesign name="edit" size={20} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );

  const pickImageFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
      setModalVisible(false);
      // updateUserImg();
    }
  };

  const takeImageFromCamera = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.assets[0].uri);
      console.log(result.assets[0].uri);
      setModalVisible(false);
      // updateUserImg();
    }
  };

  // Call updateUserImg() when image changes
  useEffect(() => {
    if (image) {
      updateUserImg();
    }
  }, [image]);

  const uploadImage = async (uri) => {
    setUploading(true);
    let filename = uri.substring(uri.lastIndexOf("/") + 1);
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, `profileImages/${filename}`);

    const task = uploadBytesResumable(storageRef, blob);

    // Set transferred state
    task.on("state_changed", (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`
      );

      // setTransferred(
      //   Math.round((taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) * 100),
      // );
    });

    // Await the completion of the upload task
    try {
      await task;
      console.log("Upload successful");
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploading(false); // Reset uploading state
      return null;
    }

    try {
      const url = await getDownloadURL(storageRef);
      // console.log(url)
      // Update user data with image URL
      return url;
    } catch (e) {
      console.log(e);
      setUploading(false);
      return null;
    }
  };

  const updateUserImg = async () => {
    if (!image) {
      console.error("Image URI is null or undefined");
      return;
    }

    const fileUrl = await uploadImage(image);
    await updateDoc(doc(database, "users", user.uid), { userImg: fileUrl })
      .then(() => {
        console.log("Profile Picture Added!");
        Alert.alert(
          "Picture Uploaded!",
          "Your profile picture has been changed Successfully!"
        );
        // setPost(null);
      })
      .catch((error) => {
        console.log(
          "Something went wrong with added post to firestore.",
          error
        );
      });
    setUploading(false);
  };

  const [isVisible, setisVisible] =
    useState(true);  /* gamit for toggle ng eye yung sa password */

  // fonts ************************************

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

    <View style={styles.mainContainer}>

      {/* PROFILEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}

      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.profileAvatarWrapper}>
            <Image
              source={{
                uri: image
                  ? image
                  : userData
                  ? userData.userImg ||
                    "https://firebasestorage.googleapis.com/v0/b/mbraille-54f34.appspot.com/o/profileImage%2FProfilePlaceholder.png?alt=media&token=3c29faf9-dd75-4f3e-b62a-0615db9e7ebc"
                  : "https://firebasestorage.googleapis.com/v0/b/mbraille-54f34.appspot.com/o/profileImage%2FProfilePlaceholder.png?alt=media&token=3c29faf9-dd75-4f3e-b62a-0615db9e7ebc",
              }}
              style={styles.profileAvatar}
              resizeMode="contain"
            />
            
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.profileAction}>
                <FeatherIcon color="#003153" name="edit-3" size={20} />
              </View>
            </TouchableOpacity>
            

            
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => setModalVisible(!modalVisible)}
            >
              <View style={styles.modalContainerProfile}>
                <View style={styles.modalContentProfile}>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={pickImageFromGallery}
                  >
                    <Feather name="folder" size={20} color="white" />
                    <Text style={styles.iconText}>Gallery</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={takeImageFromCamera}
                  >
                    <Feather name="camera" size={20} color="white" />
                    <Text style={styles.iconText}>Camera</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={() => setModalVisible(false)}
                  >
                    <Feather name="x" size={20} color="white" />
                    <Text style={styles.iconText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </TouchableOpacity>
        <Text style = {{ paddingTop: 8, fontSize: 17 , color:'white', fontFamily: "PTSans-Bold" }}>{userData ? userData.fullname : "Loading..."}</Text>
      </View>

      
    



    {/* CHANGE PROFILE NAME AND PASSSSSSSSSSSSSWORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRD */}

      <View style = {styles.changeInfo}>

        <Text style = {styles.headerChangeInfo}>Change Profile Name and Password </Text>


        {/* NAMEEEEEEEEEEEE CHANGEEEEEEEEEEEEEEEEEEEEEEEEEEEEE */}

          <Text style={styles.placeholderLabel}>Enter Full Name</Text>
            <View>
              <View style={{ position: 'absolute',top: 24, left: 15,  zIndex: 10 }}>
              <AntDesign name="user" size={25} color='#003153'/>
              </View>
                <PaperTextInput
                  label="       Enter Name"
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


            <Text style={styles.placeholderLabel}>Enter New Password</Text>
            <View>
              <View style={{position: 'absolute',top: 24, left: 15,  zIndex: 10  }}>
                <FontAwesome5 name="key" size={25} color='#003153' />
              </View>
              <PaperTextInput
                label="           Enter New Password"
                value={""}
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

            <Text style={styles.placeholderLabel}>Re-enter New Password</Text>
            <View>
              <View style={{ position: 'absolute',top: 24, left: 15,  zIndex: 10 }}>
                <FontAwesome5 name="key" size={25} color='#003153' />
              </View>
              <PaperTextInput
                label="           Re-enter New Password"
                value={""}
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


          <TouchableOpacity onPress={() => signup(email, password, name)} style={styles.buttonContainer} >
              <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
            

            


      </View>

    



    </View>
  );
};

const styles = ScaledSheet.create({
  mainContainer: {
    height: "28%",
    backgroundColor: "#003153",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },

  // PROFILEEE **************

  profileContainer: {
    padding: "30@s",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  profileAvatar: {
    width: "100@s" ,
    height: "100@s" ,
    borderRadius: 8 ,
    borderWidth: 2 ,
    borderColor: "white" ,
  },
  profileAvatarWrapper: {
    position: "relative",
  },

  profileAction: {
    position: "absolute",
    right: "-4@s",
    bottom: "-5@s",
    alignItems: "center",
    justifyContent: "center",
    width: "28@s",
    height: "28@s",
    borderRadius: 25,
    backgroundColor: "white",
  },

  // modal change PROFILE

  modalContentProfile: {
    backgroundColor: "#003153",
    padding: "12@s",
    borderRadius: 8,
    flexDirection: "row",
    gap: "30@s",
  },

  modalContainerProfile: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  iconContainer: {
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 25,
    padding: "10@s",
    flexDirection: "column",
    alignItems: "center",
    marginVertical: "5@s",
  },

  iconText: {
    color: "white",
    fontSize: "12@s",
    fontFamily: "PTSans-Bold"
  },


  // CHANGE NAME *******************

  changeInfo: {
    padding: '18@s',

  },

  headerChangeInfo: {
    fontSize: '16@s',
    fontWeight: "bold"

  },

  placeholderLabel: {
    fontSize: '14@s',
    fontFamily: "PTSans-Bold",
    color: '#003153',
    marginTop: '15@s',
    paddingLeft: '15@s',
  },

  
  //iconContainer: { // may cause hereeeeeeeeeeeeeeeeeeeeeeeeee
    //position: 'absolute',
    //top: '20@s', // Adjust as needed
    //left: '20@s', // Adjust as needed
    //zIndex: '1@s',
  //},


  textInput: {
    marginTop: '1@s',
    backgroundColor: 'white',
   
  },


  // Button ***********


   buttonContainer: {
    backgroundColor: '#003153',
    borderRadius: '30@s',
    height: '40@s',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '10@s',
    // Set an appropriate width
  },
  buttonText:{
    color: 'white',
    fontSize: '12@s',
    fontFamily: "PTSans-Bold"
     
  },

  headerChangeInfo: {
    color: '#003153',
    fontFamily: "PTSans-Bold"
    
  }



});

export default Profile;
