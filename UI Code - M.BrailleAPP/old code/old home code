import React, { useEffect, useContext, useState } from 'react';
import { RefreshControl } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { getDoc, doc } from 'firebase/firestore';
import { database } from '../../FirebaseConfig';
import FilterModal from './FilterModal';
import HistoryCard from '../assets/Cards/HistoryCard';

//fix dimensions
import { ScaledSheet } from 'react-native-size-matters';





const Home = ({ navigation }) => {
  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  const getUser = async () => {
    try {
      const userDoc = await getDoc(doc(database, 'users', user.uid));
      if (userDoc.exists()) {
        console.log('User Data', userDoc.data());
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

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    try {
      await getUser(); // Refresh user data or perform any other refresh action
    } catch (error) {
      console.error('Error refreshing data:', error);
      // Handle error
    } finally {
      setRefreshing(false); // Set refreshing state back to false after refreshing
    }
  };
  

  // Function to handle applying the selected filter
  const applyFilters = () => {
    setModalVisible(false);
    
    // Perform filtering logic here based on the selected filters
    console.log('Selected filters:', selectedFilters);
  };

  // Function to handle selecting/deselecting filters
  const toggleFilter = (filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters(selectedFilters.filter(f => f !== filter)); // Deselect filter
    } else {
      setSelectedFilters([...selectedFilters, filter]); // Select filter
    }
  };

  const data = [
    { 
      id: '1', 
      transcriptionType: 'audio',
      title: 'Audio to Braille', 
      date: '02/22/24', 
      fileName: 'Lyrics.mp4' 
    },
    { 
      id: '2', 
      transcriptionType: 'image',
      title: 'Image to Braille', 
      date: '02/21/24', 
      fileName: 'CamScanner.jpg' 
    },
    { 
      id: '3', 
      transcriptionType: 'document', // Changed from 'pdf' to 'document'
      title: 'Document to Braille', // Updated title
      date: '02/02/24', 
      fileName: 'CALCULUS1.PDF' // Keeping the filename as an example
    },
    // Add more data objects as needed
  ];


  return (

    <ScrollView 
      style={{ flex: 1, backgroundColor: "#FFF" }}
      refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
        colors={['#062CD4']} // Customize the color of the refresh indicator
      />
    }>


      <View style={{
            flex:1
        }}>
           <View style={{
               backgroundColor: '#062CD4',
               height:"28%@s",
               borderBottomLeftRadius:20,
               borderBottomRightRadius:20,
               paddingHorizontal:20
           }}>
              <TouchableOpacity
                onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
              >
                <Image
                  source={require('../iconPNG/homeMenuBar.png')}
                  style={{
                    height: 12,
                    width: 20,
                    marginTop: 50
                  }}
                />
              </TouchableOpacity>

               <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop:25,
                   width:"100%"
               }}>

                {/* PROFILE---------------------------------------------------------- */}
              

                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontSize: 20,
                            color:"#FFF",
                            fontWeight:"bold"


                        }}>HELLO,  </Text>
                        <Text style = {{ fontSize: 17, color:"#FFF", fontWeight:"bold" }}>{userData ? userData.fullname : "Loading..."}</Text>
                   </View>

                   <View style={{width:"50%",top: -15, alignItems:"flex-end", }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image
                            source={{
                              uri: userData ? userData.userImg ||
                                  'https://firebasestorage.googleapis.com/v0/b/mbraille-54f34.appspot.com/o/profileImage%2FProfilePlaceholder.png?alt=media&token=3c29faf9-dd75-4f3e-b62a-0615db9e7ebc'
                                : 'https://firebasestorage.googleapis.com/v0/b/mbraille-54f34.appspot.com/o/profileImage%2FProfilePlaceholder.png?alt=media&token=3c29faf9-dd75-4f3e-b62a-0615db9e7ebc',
                            }}

                            style={{height:100 ,width:100, borderRadius: 50, borderWidth: 3, borderColor: 'white'}}
                            resizeMode='contain' 

                        />  
                        </TouchableOpacity>
                   </View>
               </View>
           </View>



                {/* SEARCH --------------------------------------------------------- */}        

               <View style={{
                   backgroundColor: "#EBF0F5" ,
                   paddingVertical: 10,
                   paddingHorizontal:10,
                   marginHorizontal: 20,
                   borderRadius: 8,
                   marginTop:25,
                   flexDirection:"row",
                   alignItems:"center"
               }}>
                   <TextInput
                        placeholder="Search Here"
                        placeholderTextColor= 'grey'
                        style={{
                            fontSize:12,
                            width: 230
                        }}
                   />
                   <Image
                    source={require('../iconPNG/search.png')}
                    
                    style={{ height: 20, width:20, left: 50, tintColor: '#062CD4'}}
                   />
               </View>

              {/* HISTORY--------------------------------------------------------- */}   
              

               <View style={{
                   flexDirection:"row",
                   paddingTop: 15,
                   paddingHorizontal:20,
                   width:"100%",
                   alignItems:"center"
               }}>
                   <View style={{width:"50%"}}>
                        <Text style={{
                            fontWeight: "bold",
                            fontSize: 15,
                            color: '#062CD4'
                        }}> History </Text>
                        <View style={{
                            height:4,
                            width:115,
                            marginTop:-5
                        }}>

                        </View>
                   </View>

              {/* SEE MOREE--------------------------------------------------------- */}   



                   <View style={{width:"50%", alignItems:"flex-end"}}>
                        <TouchableOpacity>
                        <View style={{
                            backgroundColor: '#062CD4',
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius: 8
                        }}>

                            <Text style={{
                                fontWeight:"bold",
                                fontSize:13,
                                color:"#FFF"
                            }}>See More</Text>

                        </View>
                        </TouchableOpacity>
                   </View>
               </View>



                {/* CARD VIEW --------------------------------------------------------- */}   

          
                <FlatList
                    data= {data}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ height: 195}}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <HistoryCard item={item} />} // Using HistoryCard component
                />


                 {/* FAVORITES --------------------------------------------------------- */}            

              
               <View style={{
                   flexDirection:"row",
                   paddingHorizontal: 20,
                   width:"100%",
                   alignItems:"center",
                   top: 10
               }}>
                   <View style={{width:"50%",}}>
                        <Text style={{
                            fontWeight:"bold",
                            fontSize:17,
                            color: '#062CD4'
                        }}>Favorites Transcription </Text>
                        <View style={{
                            height:4,
                            width:115,
                        }}>

                        </View>

                   </View>

                   <View style={{width:"50%", alignItems:"flex-end"}}>
                      <TouchableOpacity onPress={() => navigation.navigate('Main')}>
                        <View style={{
                            backgroundColor: '#062CD4',
                            paddingHorizontal:20,
                            paddingVertical:5,
                            borderRadius: 8
                        }}>
                            <Text style={{
                                fontWeight:"bold",
                                fontSize:13,
                                color:"#FFF"
                            }}>View All</Text>
                        </View>
                      </TouchableOpacity>
                   </View>
               </View>


               {/*favoriteeeeeeeee cardddddddddddddddddddddddddddddddssssss hori*/}

                <ScrollView  showsHorizontalScrollIndicator={false} horizontal={true} style = { styles.container }>


                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={{ height: 50, width: 50, borderRadius: 8, tintColor: 'white'}} source={require('../assets/maineIcons/picture.png')} />
                  <Text style = {styles.name}>Image to Braille</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={{ height: 50, width: 50, borderRadius: 8, tintColor: 'white'}} source={require('../assets/maineIcons/text.png')} />
                  <Text style = {styles.name}>Text to Braille</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={{ height: 50, width: 50, borderRadius: 8, tintColor: 'white'}} source={require('../assets/maineIcons/file.png')} />
                  <Text style = {styles.name}>Audio to Braille</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={{ height: 50, width: 50, borderRadius: 8, tintColor: 'white'}} source={require('../assets/maineIcons/video.png')} />
                  <Text style = {styles.name}>Video to Braille</Text>
                </View>


            

              </ScrollView>

                   
        </View>


        </ScrollView>
        



   
 );
};

const styles = ScaledSheet.create({


  //favorites icon scrollview hori ************************************

  container: {
   top: '15@s',
  },
  
 name: {
    fontSize: "10@s",
    fontWeight: 'bold', 
    paddingHorizontal: "10@s",
    color: 'white'
  
  },

  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '73@s',
    height: '80@s',
    borderRadius: 8, 
    margin: "14@s",
    gap: 3,
    

  },
  cardElevated: {
    backgroundColor:  "#2e50e2", // bg color of card hehe
    elevation: 4,
    shadowOffset: {
    width: 10,
    height: 10,

    },

    shadowColor: 'black',
    shadowOpacity: 10 ,
    shadowRadius: 50,

  },

  


  
  
});

export default Home;
