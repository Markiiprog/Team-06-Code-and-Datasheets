import { View, Text, StyleSheet, Image } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native';

// dimension fix
import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font'

const about = () => {

  // fonts **************************

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



        {/* HEADER SECTION !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
      
        <View style = {styles.headerContainer}>
        <View style={styles.logoContainer}>
            
            <Image
              source={require('../assets/MBraillelogo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style = {styles.headerAboutUs}>About Us</Text>
            <Text style = {styles.subheaderAboutUs}>Meet the developers of M.Braille</Text>
        </View>
      </View>


      {/* CARDDDDDDDD DEVELOPERSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS */}

      <View style = {styles.developers}>


  
              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={styles.imagesCard} source={require('../assets/DEVELOPERS/GOMEZ.jpg')} />
                  <Text style = {styles.text}>Rafael Gomez</Text>
                  <Text style = {styles.electives}>Data Science</Text>
                </View>
              </View>


              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={styles.imagesCard} source={require('../assets/DEVELOPERS/MACADANGDANG.jpg')} />
                  <Text style = {styles.text}>Aldrich Macadangdang</Text>
                  <Text style = {styles.electives}>Railway Engineering</Text>
                </View>
              </View>


              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={styles.imagesCard} source={require('../assets/DEVELOPERS/AGUINALDO.jpg')} />
                <Text style = {styles.text}>David Aguinaldo</Text>
                <Text style = {styles.electives}>Railway Engineering</Text>
                  
                </View>
                </View>


              <View style = {styles.box}>
                <View style = {styles.inner}>
                <Image style={styles.imagesCard} source={require('../assets/DEVELOPERS/PASCUA.jpg')} />
                  <Text style = {styles.text}>Mark Pascua</Text>
                  <Text style = {styles.electives}>System Administration</Text>

                </View>
              </View>


            
        </View>


         {/* Crorrrrrrrrrrrrrr */}

         <Text style = {styles.Header}>Contact Us</Text>

              <Text style = {styles.textOne}>

              If you have any questions about these Terms, please email and contact us at rbi.pdproject@gmail.com / 09454310672.

              </Text>









      


       

    </View>

  )
}


const styles = ScaledSheet.create({

  // MAIN*****************************************


  mainContainer: {
   
  },

  // headerrrrrrrrrrrrrr COntainer ***********

  headerContainer: {
    padding: 12,
    alignContent: 'center',
    alignItems: 'center'


  },

  //Logo *******************************************

  logo: {
    bottom: '20@s',
    width: '80@s', // Adjust the width as needed
    height: '180@s', // Adjust the height as needed
    tintColor: 'white',
    alignSelf: 'center',
    

  
  },

  // HEADER*****************************************


  headerContainer: {
    backgroundColor: '#003153',
    height: '35%',
    // padding: '1@s',
    alignItems: 'center',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
 
  },

  headerAboutUs: {
    fontSize: '30@s',
    fontFamily: "PTSans-Bold",
    bottom: '70@s',
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center'


  },

  subheaderAboutUs: {
    fontSize: '10@s',
    bottom: '75@s',
    color: 'white',
    alignItems: 'center',
    alignSelf: 'center',
    fontFamily: "PTSans-Regular"


  },

  // developers ***********************************

  developers: {
    width: '100%',
    height: '45%',
    padding: '20@s',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'center',
    paddingTop: '15@s'
  },

  imagesCard: {
    height: '40@s',
    width: '40@s' , 
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#003153',
  },

  box: {
    width: '50%',
    height: '55%',
    padding: '5@s',
    borderRadius: 8, 
  
  },
  
  inner: {
    flex: 1,
    backgroundColor: "#EBF0F5",
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#003153'

  },
  
  text: {
  
    color: '#003153',
    fontFamily: "PTSans-Bold",
    fontSize: '12@s',
  
  },

  electives: {
    fontFamily: "PTSans-Italic",
    color: '#003153',
    fontSize: '12@s'
  },

  // CONTENTTTTTTTTTTT


  content: {
    marginTop: '12@s',
    padding: '8@s',
   

  },

  contentbg: {
    backgroundColor: '#003153',
    padding: '8@s',
    borderRadius: 8,
    color: 'white',
    textAlign: 'justify'


  },
  textOne: {
    textAlign: 'justify',
    fontFamily: "PTSans-Regular",
    fontSize: 14,
    marginLeft: '15@s',
    marginRight: '20@s',
    backgroundColor: '#003153',
    color: 'white',
    padding: '8@s',
    borderRadius: 8,
    marginBottom: '15@s'
  },

  Header: {
    fontSize: '16@s',
    fontWeight: 'bold',
    marginBottom: '10@s',
    marginLeft: '5@s',
    fontFamily: "PTSans-Bold"

  },


})




export default about