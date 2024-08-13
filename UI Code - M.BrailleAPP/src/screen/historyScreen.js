import { View, Text, ScrollView, StyleSheet, Image, TextInput, Alert, RefreshControl} from 'react-native'
import { TouchableOpacity } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { FlatList } from 'react-native';

import HistoryCard from '../assets/Cards/HistoryCard';

import React, { useEffect, useContext, useState } from 'react'

//Firebase call
import { getDocs, collection, query, orderBy, deleteDoc, where } from 'firebase/firestore';
import { database } from '../../FirebaseConfig'; 


// navigation to another screen
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../navigation/AuthProvider';

// DIMENSION COMPATIBILITY

import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font'








const historyScreen = () => {
  const { user } = useContext(AuthContext);
  const [refreshing, setRefreshing] = useState(false);
  const [filteredData, setFilteredData] = useState([]);
  const [historyData, setHistoryData] = useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();

  const fetchHistoryData = async () => {
    try {
      // const q = query(collection(database, 'posts'), orderBy('postTime', 'desc'));
      const q = query(
        collection(database, 'posts'),
        where('userId', '==', user.uid), // Filter by userId matching current user's uid
        orderBy('postTime', 'desc')
      );
      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setHistoryData(data);
      setFilteredData(data);
    } catch (error) {
      console.error('Error fetching history data:', error);
    }
  };
  
  useEffect(() => {
    fetchHistoryData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true); // Set refreshing state to true
    try {
      await fetchHistoryData();
    } catch (error) {
      console.error('Error refreshing data:', error);
      // Handle error
    } finally {
      setRefreshing(false); // Set refreshing state back to false after refreshing
    }
  };

  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = historyData.filter(item => 
      item.title && item.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const navigateToViewPost = (item) => {
    try {
      // Navigate to view post screen, passing necessary parameters received by ViewPostScreen
      // navigation.navigate('ViewPostScreen')
      navigation.navigate('ViewPostScreen', {
        title: item.title,
        imageUrl: item.postUrl,
        transcription: item.Transcription || '',
        braille: item.Braille || '',
        braille_g2: item.Braille_G2 || '',
        transcriptionType: item.transcriptionType,
        downloadLinks: item.downloadLinks,
        date: item.postTime
        // Add other necessary parameters if needed
      });
    } catch (error) {
      console.error('Error navigating to ViewPostScreen:', error);
    }
  };

  const handleLongPress = item => {
    setSelectedItem(item);
    console.log(item);
    // setShowDeleteConfirmation(true);
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this item?',
      [
        {
          text: 'Cancel',
          // onPress: () => setShowDeleteConfirmation(false),
          style: 'cancel',
        },
        { text: 'Delete', onPress: handleDelete },
      ],
      { cancelable: false }
    );
  };  

  const handleDelete = async () => {
    if (selectedItem) {
      try {
        // Perform deletion from the database
        await deleteDoc(collection(database, 'posts', selectedItem.id));
        // Remove the item from the state
        const updatedData = historyData.filter(item => item.id !== selectedItem.id);
        console.log("Successfully deleted");
        setHistoryData(updatedData);
        setFilteredData(updatedData);
      } catch (error) {
        console.error('Error deleting item:', error);
      }
    }
    setSelectedItem(null);
    // setShowDeleteConfirmation(false);
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

    <View style = {styles.mainContainer}>

      <View>

        <Text style = {styles.header}>Recent Transcription</Text>

          <Searchbar 
            style = {styles.search} 
            placeholder="Search Transcription Here" 
            onChangeText={handleSearch}
            value={searchQuery}/>

      </View>

     

  


  <View style = {styles.latestContainer}>
      <View style = {styles.historyVertical}>
        <FlatList
          data={filteredData}
          showsVerticalScrollIndicator={true}
          // style={{ flex: 1}}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigateToViewPost(item)}
              onLongPress={ () => handleLongPress(item) }
              >
            {/* // <TouchableOpacity onPress={() => console.log("pressed")}> */}
              <HistoryCard item={item} />
            </TouchableOpacity>
          )} // Using HistoryCard component
          refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
        />
        {/* <ScrollView>       
          <TouchableOpacity style = {styles.historyColorButon}>


              <Image style={styles.historyPics} source={require('../assets/maineIcons/picture.png')} ></Image>   
              <Text style = {styles.historyTextTitle}>Audio to Braille</Text>

              <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
              

            </TouchableOpacity>

            <TouchableOpacity style = {styles.historyColorButon}>


              <Image style={styles.historyPics} source={require('../assets/maineIcons/audio.png')} ></Image>   
              <Text style = {styles.historyTextTitle}>Hatdog to Braille</Text>

              <Text style = {styles.historydateTitle}> 01 / 11 / 2024 </Text>
            

            </TouchableOpacity>

        
      
        </ScrollView>         */}
      </View>
  </View>
  </View>



  )
}

const styles = ScaledSheet.create({

  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
    padding: '12@s'
  },

  // SEARCH **************

  search: {
    backgroundColor: "#EBF0F5",
    height: '52@s',
    borderRadius: 8,
    
  },

  // HEADER *****************
 header: {
  fontSize: '20@s',
  marginBottom: '8@s',
  fontFamily: "PTSans-Bold"
 },

 // HISTORY **********************

 containerforHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingTop: '12@s',
  

},

latestContainer: {
  flex: 1,
  paddingTop: '8@s',
  // borderColor: 'red',
  // borderWidth: 1,
},

latestHeader: {
  fontFamily: "PTSans-Bold",
  fontSize: '17@s',
  top: '4@s',

},

latestSubheader:{
  color: 'white',
  fontSize: '12@s',
  padding: '5@s',
  fontFamily: "PTSans-Regular"
  


},


/****************** History card vertical **********************/

historyVertical: {
  overflow: 'scroll',
  paddingTop: '12@s',
  marginBottom: '5@s',
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
  paddingLeft: '30@s',
  paddingTop: '5@s',
  fontFamily: "PTSans-Regular"
  

},

historydateTitle: {
  fontSize: '12@s',
  fontFamily: "PTSans-Italic",
  paddingTop: '4@s',
  marginLeft: 'auto'

},

historyPics: {
  height: '30@s',
  width: '30@s',
  tintColor: '#003153', 

}




 


  
  
  
    
  
  
  
  })
    
  
  

export default historyScreen;