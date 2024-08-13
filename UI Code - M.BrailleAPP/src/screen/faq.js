import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import LottieView from 'lottie-react-native';
import { Searchbar } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

// DIMENSION COMPATIBILITY
import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font'


const Faq = () => {

  
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
    
    <ScrollView style = {styles.mainContainer}>

        <View style = {styles.lottie}>

            <LottieView style = {{ height: 225, alignSelf: 'center', alignItems: 'center', alignContent: 'center', }} source={require('../assets/lottie/faq.json')} autoPlay loop />


        </View>

        <View>

            <Searchbar style = {styles.search} placeholder="Search Frequently Asked Question"/>


        </View>

        <View style = {styles.faqContainer}>

          <Text style = {styles.faqHeader}>Top Frequently Asked Question: </Text>

          <Text style = {styles.faqSubHeader}>We're trying to help you with anything and everything on Mobile Braille, we are here to help you. We have got
          you covered share your concern or check our frequently asked question listed below.</Text>


          
          <TouchableOpacity style = {styles.faqList}>

              <Text style = {styles.question} > What is Mobile Braille? </Text>

          </TouchableOpacity>

          <TouchableOpacity style = {styles.faqList}>

              <Text style = {styles.question} > What services does Mobile Braille Offer? </Text>

          </TouchableOpacity>

          <TouchableOpacity style = {styles.faqList}>

              <Text style = {styles.question} > See More!</Text>

          </TouchableOpacity>

    

      </View>

    </ScrollView>
    

  )
}

const styles = ScaledSheet.create({

//MAIN CONTAINER ****************************


mainContainer: {
    padding: '18@s',
    backgroundColor: 'white',
    flex: 1
},

// SEARCH *********************************

search: {
    backgroundColor: "#EBF0F5",
    height: '52@s',
    borderRadius: 8,
    
  },

  // FAQ Header **********************

  faqHeader: {
    fontSize: '22@s',
    fontFamily: "PTSans-Bold",
    color: '#003153',
    marginTop: '10@s',
    marginBottom: '1@s',

  },

  faqSubHeader: {
    fontFamily: "PTSans-Regular",
    color: '#818589',
    textAlign: 'justify',
    fontSize: '12@s'

  },

  // FAQ LIST ************************

  faqList: {
    borderRadius: 8,
    borderWidth: 1 ,
    borderColor: '#003153',
    padding: '15@s',
    backgroundColor: 'white',
    margin: '8@s'
  },

  
  faqListSeemore :{
    borderRadius: 8,
    borderWidth: 1 ,
    borderColor: '#003153',
    padding: '15@s',
    backgroundColor: '#003153',
    margin: '8@s'
  },

  // question and see more

  question: {
    color: '#003153',
    fontFamily: "PTSans-Bold"


  },

 
  
    
    
    
      
    
    
    
})
      

export default Faq