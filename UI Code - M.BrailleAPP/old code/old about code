import { View, Text, ScrollView, StyleSheet, Image, Button } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';

// lottie
import LottieView from 'lottie-react-native';

// DIMENSION COMPATIBILITY
import { ScaledSheet } from 'react-native-size-matters';








const about = () => {


  const [text, setText] = React.useState("");



  return (


    <ScrollView style = {styles.main} showsVerticalScrollIndicator={false} >

      <View style = {styles.lottie}>

      <LottieView style = {{ paddingTop: 35, height: '30@s', alignSelf: 'center', alignItems: 'center', alignContent: 'center' }} source={require('../assets/lottie/about.json')} autoPlay loop />

      </View>


      <View style = {styles.headerDeveloper}>

        <Text style = {styles.headerTitleDeveloper}>DEVELOPERS</Text>

         <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} >


                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style= {styles.cardfavorites} source={require('../assets/DEVELOPERS/AGUINALDO.jpg')} />
                  <Text style = {styles.name}>David Aguinaldo</Text>
                  <Text style = {styles.electives}>Railway Engineering</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style= {styles.cardfavorites} source={require('../assets/DEVELOPERS/PASCUA.jpg')} />
                  <Text style = {styles.name}>Mark Pascua</Text>
                  <Text style = {styles.electives}>System Administration</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style= {styles.cardfavorites} source={require('../assets/DEVELOPERS/GOMEZ.jpg')} />
                  <Text style = {styles.name}>Rafael Gomez</Text>
                  <Text style = {styles.electives}>Data Science</Text>
                </View>

                <View style = {[styles.card, styles.cardElevated]}>
                  <Image style={styles.cardfavorites} source={require('../assets/DEVELOPERS/MACADANGDANG.jpg')} />
                  <Text style = {styles.name}>Aldrich Macadangdang</Text>
                  <Text style = {styles.electives}>Railway Engineering</Text>
                </View>

            </ScrollView>


          </View>

            


           <View>

              <Text style = {styles.mobileBraille}>Mobile Braille is an mobile application where we empower users to convert multiple modes of input
              into Braille seamlessly. Our mission is to enhance accessibility for individuals
              with visual impairments by providing a user-friendly and efficient transcription tool.</Text>



           </View>


          
           
        





      
      
      
    </ScrollView>



    
  )
}

const styles = ScaledSheet.create({


// MAIN CONTAINER


main: {
  padding: '8@s' ,
  backgroundColor: 'white'

},




// DEVELOPERS ****************************************

headerDeveloper: {
  paddingTop: '5@s',
  alignContent: 'center',
  alignItems:'center',

  
},

headerTitleDeveloper: { // HEADER TITLEEEEEEEEEEEE
  fontSize: '24@s',
  fontWeight: 'bold',
  color: '#003153',
  paddingBottom: '15@s',
  paddingTop: '15@s'


},

name: {
  fontSize: "10@s",
  fontWeight: 'bold', 
  color: 'white',


},


electives: {
  fontSize: "9@s",
  fontStyle: 'italic',
  color: 'white',
  top: '-5@s'

},

cardfavorites: {
  height: '40@s',
  width: '40@s',
  borderRadius: 8,


},

card: {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  width: '80@s',
  height: '95@s',
  borderRadius: 8, 
  margin: "2@s",
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

// what is mobile braille

mobileBraille: {
  textAlign: 'justify',
  fontSize: '15@s',
  marginTop: '10@s',
  color: '#003153'
},

// QUICK CONTACT

quickContact: {
  paddingTop: '0@s',
  alignContent: 'center',
  alignItems:'center',

},

quickContactHeader: {

  fontSize: '24@s',
  fontWeight: 'bold',
  color: '#003153',
  paddingBottom: '12@s',
  paddingTop: '10@s'
  
},

// form and input ******************

form: {
  padding: '8@s' ,

},

input: {
  backgroundColor: "#EBF0F5" ,

  height: 35,

},

inputMessage: {

  borderColor: '#003153',
  backgroundColor: "#EBF0F5" ,


},

MultilineText: {
  minHeight: 100,
  textAlignVertical: "top",

},

//line 
lineContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  marginVertical: '10@s',
},
orContactUsText: {
  marginHorizontal: "10@s",
  fontSize: '12@s',
},
line: {
  flex: 1,
  height: 1,
  backgroundColor: 'black',
},








  
})
    

export default about