import React, { useEffect, useContext, useState } from 'react';
import { RefreshControl } from 'react-native';
import { DrawerActions } from '@react-navigation/native';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { Feather } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../../navigation/AuthProvider';
import { getDoc, doc, where } from 'firebase/firestore';
import { getDocs, collection, query, orderBy } from 'firebase/firestore';
import { database } from '../../FirebaseConfig';
import FilterModal from './FilterModal';
import HistoryCard from '../assets/Cards/HistoryCard';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Card } from 'react-native-paper';

// DIMENSION COMPATIBILITY

import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font'


// **********************************************************

const home = ({ navigation }) => {

  const images = [
    require('../assets/Cards/Images/1.png'),
    require('../assets/Cards/Images/2.png'),
    require('../assets/Cards/Images/3.png'),
    require('../assets/Cards/Images/4.png'),
    require('../assets/Cards/Images/5.png'),
    require('../assets/Cards/Images/6.png')
    // Add more image sources as needed
  ];
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  const handleTap = (direction) => {
    if (direction === 'prev') {
      const prevIndex = (currentCardIndex - 1 + images.length) % images.length;
      setCurrentCardIndex(prevIndex);
    } else {
      const nextIndex = (currentCardIndex + 1) % images.length;
      setCurrentCardIndex(nextIndex);
    }
  };
  // const navigateToNextCard = () => {
  //   const nextIndex = (currentCardIndex + 1) % images.length;
  //   setCurrentCardIndex(nextIndex);
  // };

  // const navigateToPrevCard = () => {
  //   const prevIndex = (currentCardIndex - 1 + images.length) % images.length;
  //   setCurrentCardIndex(prevIndex);
  // };

  


  const { user } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const [historyData, setHistoryData] = useState([]);

  const fetchHistoryData = async () => {
    try {
      // const q = query(collection(database, 'posts'), orderBy('postTime', 'desc'));
      const q = query(
        collection(database, 'posts'),
        where('userId', '==', user.uid), // Filter by userId
        orderBy('postTime', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setHistoryData(data);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };

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
    fetchHistoryData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    try {
      await getUser(); // Refresh user data or perform any other refresh action
      await fetchHistoryData();
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

  // fonts *********************************
  const [ fontsLoaded ] = useFonts({
    'PTSans-Bold' : require ('../assets/fonts/PTSans-Bold.ttf'),
    'PTSans-BoldItalic' : require ('../assets/fonts/PTSans-BoldItalic.ttf'),
    'PTSans-Italic' : require ('../assets/fonts/PTSans-Italic.ttf'),
    'PTSans-Regular' : require ('../assets/fonts/PTSans-Regular.ttf'),

  })

  if (!fontsLoaded){
    return undefined ;
  }




  // **********************************************************


  return (

      <View style = {styles.headerContainer}>
        <TouchableOpacity
                  onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
                >
                  <Image
                    source={require('../iconPNG/homeMenuBar.png')}
                    style={{
                      
                      height: 18,
                      width: 18,
                      marginTop: 28,
                      tintColor: '#003153'
                    }}
                  />
                </TouchableOpacity>

                <View style={{
                   flexDirection:"row",
                   alignItems:"center",
                   marginTop: 10 ,
                   width:"100%"
               }}>

                {/***************** PROFILE ************************/}
              

                   <View style={{ width:"75%" }}>
                        <Text style={{
                            fontSize: 18,
                            color:"#003153",
                            fontFamily: "PTSans-Regular"


                        }}>Welcome ,  </Text>
                        <Text style = {{ fontSize: 17, color:'#003153', fontFamily: "PTSans-Bold" }}>{userData ? userData.fullname : "Loading..."}</Text>
                   </View>

                   <View style={{ alignItems:"flex-end", }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                        <Image
                            source={{
                              uri: userData ? userData.userImg ||
                                  'https://firebasestorage.googleapis.com/v0/b/mbraille-54f34.appspot.com/o/profileImage%2FProfilePlaceholder.png?alt=media&token=3c29faf9-dd75-4f3e-b62a-0615db9e7ebc'
                                : 'https://firebasestorage.googleapis.com/v0/b/mbraille-54f34.appspot.com/o/profileImage%2FProfilePlaceholder.png?alt=media&token=3c29faf9-dd75-4f3e-b62a-0615db9e7ebc',
                            }}

                            style={{height: 75 ,width:75, borderRadius: 8, borderWidth: 3, borderColor: '#003153', marginBottom:15}}
                            resizeMode='contain' 

                        />  
                        </TouchableOpacity>
                   </View>
               </View>


            {/***************** carddddddddddddddddd ************************/}


      <View style={styles.container}>
        <View style={styles.cardContainer}>
          <Card>
            <TouchableOpacity onPress={() => handleTap('prev')} style={styles.leftArrow}>
              <Icon name="arrow-left" size={30} style={styles.arrow} />
            </TouchableOpacity>

            <Card.Cover source={images[currentCardIndex]} />

            <TouchableOpacity onPress={() => handleTap('next')} style={styles.rightArrow}>
              <Icon name="arrow-right" size={30} style={styles.arrow} />
            </TouchableOpacity>
          </Card>
        </View>
    </View>

           {/***************** favorites ************************/}
{/* 
           <View style = {styles.mostlyUsedContainer}>

            <Text style = {styles.mostlyUsedHeader}>Mostly Used Transcription</Text> */}

            {/***************** SCROLLVIEW HORIZONTAL CARD FOR FAVORITES ************************/}

            {/* <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >


                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style= {styles.cardfavorites} source={require('../assets/maineIcons/picture.png')} />
                  <Text style = {styles.name}>Image</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style= {styles.cardfavorites} source={require('../assets/maineIcons/text.png')} />
                  <Text style = {styles.name}>Text</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style= {styles.cardfavorites} source={require('../assets/maineIcons/file.png')} />
                  <Text style = {styles.name}>File</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={styles.cardfavorites} source={require('../assets/maineIcons/video.png')} />
                  <Text style = {styles.name}>Video</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={styles.cardfavorites} source={require('../assets/maineIcons/video.png')} />
                  <Text style = {styles.name}>Video</Text>
                </View>
   
            </ScrollView>
           </View>
 */}

           {/********************** LATEST TRANSCRIPTION ***************************/ }


            <View style = {styles.containerforHeader}>

              <Text style = {styles.latestHeader}>Latest Transcription</Text>
              <TouchableOpacity 
                onPress={() => navigation.navigate('History')}
                style = {{ backgroundColor: '#003153', borderRadius: 8,}}>
                <Text style = {styles.latestSubheader}>View All</Text>
              </TouchableOpacity>

            </View>
             


            <View style = {styles.latestContainer}>
                <View style = {styles.historyVertical}>

            {/********************** cards latest transcription ***************************/ }

            {/* <ScrollView>               */}
                  {/* <TouchableOpacity style = {styles.historyColorButon}>


                    <Image style={styles.historyPics} source={require('../assets/maineIcons/picture.png')} ></Image>   
                    <Text style = {styles.historyTextTitle}>Audio to Braille</Text>

                    <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
                    

                  </TouchableOpacity>

                  <TouchableOpacity style = {styles.historyColorButon}>


                    <Image style={styles.historyPics} source={require('../assets/maineIcons/audio.png')} ></Image>   
                    <Text style = {styles.historyTextTitle}>Hatdog to Braille</Text>

                    <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
                    

                  </TouchableOpacity>

                  <TouchableOpacity style = {styles.historyColorButon}>


                    <Image style={styles.historyPics} source={require('../assets/maineIcons/video.png')} ></Image>   
                    <Text style = {styles.historyTextTitle}>Video to Braille</Text>

                    <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
                    

                  </TouchableOpacity> */}
                  
                  <FlatList
                    data={historyData.slice(0, 5)} // Slice the array to display only the first 5 items
                    showsVerticalScrollIndicator={false}
                    // style={{ flex: 1}}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <TouchableOpacity onPress={() => {
                                    try {
                                      navigation.navigate('ViewPostScreen', {
                                        title: item.title,
                                        imageUrl: item.postUrl,
                                        transcription: item.Transcription || '',
                                        braille: item.Braille || '',
                                        braille_g2: item.Braille_G2 || '',
                                        transcriptionType: item.transcriptionType,
                                        downloadLinks: item.downloadLinks,
                                        date: item.postTime
                                      });
                                    } catch (error) {
                                      console.error('Error navigating to ViewPostScreen:', error);
                                    }
                                  }}>
                                    <HistoryCard item={item} />
                                  </TouchableOpacity> }
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                      }
                    // renderItem={({ item }) => <HistoryCard item={item} />} // Using HistoryCard component
                  />
                  


                  {/* </ScrollView>        */}
                </View>




              

            </View>
            

           

           </View>

  )
}




const styles = ScaledSheet.create({ 
  container: {
    // flex: 1,
    padding: 5,
  },
  cardContainer: {
    // flex: 1,
    position: 'relative',
  },
  arrow: {
    color: '#8DABD6', // Set your desired color
  },
  leftArrow: {
    position: 'absolute',
    top: '50%',
    left: 10,
    zIndex: 1,
  },
  rightArrow: {
    position: 'absolute',
    top: '50%',
    right: 10,
    zIndex: 1,
  },
  //////////
  // arrowContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   paddingHorizontal: 10,
  // },
  // arrow: {
  //   color: '#003153', // Set your desired color
  // },
  // containerCRD: {
  //   flex: 1,
  //   padding: 10,
  // },
  // cardContainerCRD: {
  //   marginRight: 10,
  //   width: 300,
  //   height: 200,
  // },
  /////////////////
  /***************** HEADER ************************/

headerContainer: {
  height:"30%",
  padding: '12@s',
  flex: 1,
  // borderColor: 'red',
  // borderWidth: 1,
},
   /***************** CARD SHOWCASE ************************/
// cardShowcase: {
//   padding: '10@s',
//   shadowColor: '#003153',
//   shadowOffset: 100,
  
// },
   /***************** moslty Useeed Transciption ************************/

  // mostlyUsedContainer: {
  //   paddingTop: '1@s',
    
  // },

  // mostlyUsedHeader: {
  //   fontWeight: 'bold',
  //   fontSize: '17@s'

  // },

  /***************** FAVORITES cardddddddddddddddddd ************************/

  name: {
    fontSize: "8@s",
    fontFamily: "PTSans-Bold",
    paddingHorizontal: "10@s",
    color: 'white'
  
  },

  cardfavorites: {
    height: '20@s',
    width: '20@s',
    borderRadius: 8,
    tintColor: 'white'

  },

  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '50@s',
    height: '70@s',
    borderRadius: 8, 
    margin: "8@s",
    gap: '3@s',
    

  },

  cardElevated: {
    backgroundColor:  '#003153', // bg color of card hehe
    elevation: 5,
    shadowOffset: {
    width: '10@s',
    height: '10@s',

    },

    shadowColor: 'black',
    shadowOpacity: 10 ,
    shadowRadius: 50,

  },

  /***************** LATEST TRANSCRIPTION cardddddddddddddddddd ************************/

  containerforHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '5@s',
  },

  latestContainer: {
    flex: 1,
    paddingTop: '5@s',
    // borderColor: 'red',
    // borderWidth: 1,
  },

  latestHeader: {
    fontFamily: "PTSans-Bold",
    fontSize: '14@s',
    top: '5@s',
  
  },

  latestSubheader:{
    color: 'white',
    fontSize: '12@s',
    padding: '6@s',
    fontFamily: "PTSans-Regular"

  
  },
  

  /****************** History card vertical **********************/

  historyVertical: {
    overflow: 'scroll',
    paddingTop: '2@s',
    marginBottom: '2@s',
    // borderColor: 'red',
    // borderWidth: 1,

 
  },

  historyColorButon: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: "#EBF0F5",
    borderRadius: 8,
    padding: '10@s',
    margin: '5@s',
    
  },

  historyTextTitle: {
    fontSize: '12@s',
    fontFamily: "PTSans-Bold",
    paddingLeft: '30@s',
    paddingTop: '5@s',
    
  
  },

  historydateTitle: {
    fontSize: '12@s',
    fontFamily: "PTSans-Italic",
    paddingTop: '5@s',
    marginLeft: 'auto'

  },

  historyPics: {
    height: '20@s',
    width: '20@s',
    tintColor: '#003153', 

  }



})



export default home