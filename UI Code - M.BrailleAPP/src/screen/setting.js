import { ScrollView, TextInput, Switch, Alert } from "react-native";
import { SafeAreaView, View, Text, StyleSheet, Image, TouchableOpacity, Modal } from "react-native";
import React, { useContext, useState, useEffect } from "react";
import * as ImagePicker from 'expo-image-picker';
import FeatherIcon from "react-native-vector-icons/Feather";
import { Feather } from '@expo/vector-icons';
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from "../../navigation/AuthProvider";
import { database, storage, authentication } from "../../FirebaseConfig";
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { ActivityIndicator } from 'react-native';
import { reauthenticateWithCredential, updatePassword, EmailAuthProvider } from 'firebase/auth';

// DIMENSION COMPATIBILITY
import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font'

const SECTIONS = [
  {
    header: 'Preferences',
    icon: 'settings',
    items: [
      { icon: 'globe', color: '#062CD4' , label: 'Language', type: 'link' },
    ],
  },
  {
    header: 'Help',
    icon: 'help-circle',
    items: [
      { icon: 'flag', color: '#062CD4', label: 'Report Bug', type: 'link' },
      { icon: 'mail', color: '#062CD4' , label: 'Contact Us', type: 'link' },
    ],
  },
  {
    header: 'Other Actions',
    icon: 'align-center',
    items: [
      { icon: 'save', color: '#062CD4', label: 'Saved', type: 'link' },
    ],
  },
];

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
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleEditPress = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    // Perform save action to firebase
    setIsSaving(true); // Set isSaving to true before saving
    try {
      await updateDoc(doc(database, 'users', user.uid), {
        fullname: name // Assuming 'fullname' is the field in Firestore where you store the user's display name
      });
      console.log('User data updated successfully');
      setIsEditing(false); // Update the editing state
    } catch (error) {
      console.error('Error updating user data:', error);
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
      const userDoc = await getDoc(doc(database, 'users', user.uid));
      if (userDoc.exists()) {
        setUserData(userDoc.data());
      } else {
        console.log('User does not exist');
      }
    } catch (error) {
      console.error('Error getting user', error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

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
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, newPassword);

      Alert.alert('Password changed successfully');
      console.log('Password changed successfully');
      setCurrentPassword(''); // Clear current password input
      setNewPassword(''); // Clear new password input
    } catch (error) {
      console.error('Error changing password:', error.message);
      // Handle error
    } finally {
      setIsChangingPassword(false); // Set loading state back to false
    }
  };

  // fonts*******************************************************

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
    
    <SafeAreaView style={{ backgroundColor: "white", flex: 1 }}>
      <ScrollView style={styles.container}>

      <View style={styles.logoContainer}>
          
          <Image
            source={require('../assets/MBraillelogo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
      </View>


        {/* Other Sections */}
        <View style={{ flex: 1 }}>
          {SECTIONS.map(({ header, items }) => (
            <View style={styles.section} key={header}>
              <Text style={styles.sectionHeader}>{header}</Text>
              {items.map(({ label, icon, type, value, color }, index) => (
                <TouchableOpacity key={label} onPress={() => { /* handle onPress */ }}>
                  <View style={styles.row}>
                    <View style={[styles.rowIcon, { backgroundColor: '#003153' }]}>
                      <FeatherIcon color="white" name={icon} size={14 } />
                    </View>
                    <Text style={styles.rowLabel}>{label}</Text>
                    <View style={styles.rowSpacer} />
                    {type === 'boolean' && <Switch value={value} />}
                    {type === 'link' && <FeatherIcon color="#0c0c0c" name="chevron-right" size={20} />}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          ))}
        </View>

        {/* Logout Button */}
        <View style={{ flex: 1, paddingBottom: '100@s', paddingHorizontal: 50 }}>
          <TouchableOpacity
            onPress={handleLogout}
            style={{
              flexDirection: "row",
              backgroundColor: '#003153',
              marginTop: 15,
              height: 50,
              borderRadius: 30,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                fontWeight: "bold",
              }}>
              Log Out
            </Text>
          </TouchableOpacity>
          <Modal
            animationType="fade"
            transparent={true}
            visible={showLogoutModal}
            onRequestClose={() => setShowLogoutModal(false)}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalText}>Are you sure you want to log out?</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.cancelButton]}
                    onPress={cancelLogout}>
                    <Text style={styles.modalButtonText}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[styles.modalButton, styles.confirmButton]}
                    onPress={confirmLogout}>
                    <Text style={styles.modalButtonText}>Confirm</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({


// logo
logoContainer: {
  alignItems: 'center',
  borderBottomLeftRadius: 22,
  borderBottomRightRadius: 22,
  backgroundColor: '#003153'
  
},
logo: {
  width: 110, // Adjust the width as needed
  height: 180, // Adjust the height as needed
  tintColor: 'white',
},

// section
  section: {
    paddingHorizontal: '8@s',
    marginTop: '6@s',
  },
  
  sectionHeader: {
    // paddingVertical: 5,
    fontSize: "12@s",
    fontFamily: "PTSans-Bold",
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: "50@s",
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: '5@s',
    paddingLeft: '10@s',
    paddingRight: '10@s',
  },
  rowIcon: {
    width: '50@s',
    height: '32@s',
    borderRadius: 8,
    marginRight: '12@s',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowLabel: {
    fontSize: '15@s',
    fontWeight: '500',
    color: 'black',
    paddingHorizontal: 190,
    paddingLeft: .5
  },
  rowSpacer: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },

  // logout

  // for Logout modal
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: '20@s',
    borderRadius: 8,
    alignItems: "center",
  },
  modalText: {
    fontSize: '17@s',
    marginBottom: '25@s',
    fontFamily: "PTSans-Bold",

  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "center",
  },
  modalButton: {
    paddingVertical: '10@s',
    paddingHorizontal: '20@s',
    marginHorizontal: '10@s',
    borderRadius: 8,
  },
  cancelButton: {
    backgroundColor: "#003153",
  },
  confirmButton: {
    backgroundColor: "#003153",
  },
  modalButtonText: {
    fontSize: '14@s',
    color: "white",
    fontFamily: "PTSans-Regular"
  },
  modalContainerProfile: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContentProfile: {
    backgroundColor: 'white',
    padding: '20@s',
    borderRadius: '10@s',
    flexDirection: 'row',
    gap: 10
  },
  iconContainer: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 25,
    padding: '10@s',
    flexDirection: 'column',
    alignItems: 'center',
    marginVertical: '10@s',
  },
  iconText: {
    color: 'grey',
    fontFamily: "PTSans-Regular"

  },


});

export default Profile;
