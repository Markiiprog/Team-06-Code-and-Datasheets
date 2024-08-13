import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';

import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font'



const formatDate = (timestamp) => {
  const date = new Date(timestamp.seconds * 1000); // Convert seconds to milliseconds
  return date.toLocaleDateString(); // Format date as desired
};



const HistoryCard = ({ item }) => {
  // Function to select the icon based on transcription type
  const selectIcon = (transcriptionType) => {
    switch (transcriptionType) {
      case 'audio':
        return require('../maineIcons/audio.png');
      case 'image':
        return require('../maineIcons/picture.png');
      case 'document': // Changed from 'pdf' to 'document'
        return require('../maineIcons/file.png'); // Using the file icon for documents
      case 'video':
        return require('../maineIcons/video.png')
      case 'text':
        return require('../maineIcons/text.png')
      default:
        return null;
    }
  };

  

  const icon = selectIcon(item.transcriptionType);


  // fonts*******************************************************

  const [ fontsLoaded ] = useFonts({
    'PTSans-Bold' : require ('../fonts/PTSans-Bold.ttf'),
    'PTSans-BoldItalic' : require ('../fonts/PTSans-BoldItalic.ttf'),
    'PTSans-Italic' : require ('../fonts/PTSans-Italic.ttf'),
    'PTSans-Regular' : require ('../fonts/PTSans-Regular.ttf'),
   


  })

  if (!fontsLoaded){
    return undefined ;
  }

  // Format title to add ellipses if it's longer than 20 characters
  let formattedTitle = item.title ? item.title : '';
  if (formattedTitle.length > 20) {
    formattedTitle = formattedTitle.substring(0, 30) + '...';
  }

  return (
    // <TouchableOpacity 
    //   style={{
    //     height: 170,
    //     elevation: 2,
    //     backgroundColor: "#EBF0F5",
    //     marginLeft: 20,
    //     marginTop: 20,
    //     borderRadius: 8,
    //     marginBottom: 10,
    //     width: 190,
    //   }}
    // >
    //   <Image
    //     source={icon}
    //     style={{ width: 100, height: 100, alignSelf: 'center' }}
    //   />
    //   <View style={{ flexDirection: "row", paddingTop: 10, paddingHorizontal: 10 }}>
    //     <Text style={{ fontWeight: "bold" }}>{item.title}</Text>
    //     <Text style={{ fontWeight: "bold", color: '#062CD4', paddingLeft: 20, fontStyle: 'italic' }}>{formatDate(item.postTime)}</Text>
    //   </View>
    //   {/* <Text style={{ paddingHorizontal: 10, color: '#062CD4', paddingTop: 3 }}>{item.fileName}</Text> //comment ko muna wala pang logic to eh*/} 
    // </TouchableOpacity>
    
    <View style = {styles.historyColorButon}>

      <Image style={styles.historyPics} source={icon} ></Image>   
      <Text style = {styles.historyTextTitle}>{formattedTitle}</Text>

      <Text style = {styles.historydateTitle}>{formatDate(item.postTime)}</Text>
      

    </View>
  );
};

const styles = ScaledSheet.create({
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
  historyPics: {
    height: '30@s',
    width: '30@s',
    tintColor: '#003153', 

  },
  historydateTitle: {
    fontSize: '12@s',
    fontFamily: "PTSans-Italic",
    paddingTop: '4@s',
    marginLeft: 'auto'

  },
})

export default HistoryCard;
