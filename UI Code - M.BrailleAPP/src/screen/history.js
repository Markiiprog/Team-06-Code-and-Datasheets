// for see more history

import { View, Text } from 'react-native'
import React from 'react'
import { ScrollView } from 'react-native-web'

// Custom Fonts ********************

import { useFonts } from 'expo-font'

const history = () => {

    
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

    <ScrollView 
                    showsVerticalScrollIndicator={false}
                    style={{height:200}}
                >         
                    <TouchableOpacity 
                        style={{
                            height:170,
                            elevation:2,
                            backgroundColor: "white",
                            marginLeft:20,
                            marginTop:20,
                            borderRadius: 8 ,
                            marginBottom:10,
                            width: 190,
                        }}
                    >
                        <Image
                            source={require('../assets/maineIcons/audio.png')}
                            style = {{ width: 50, height: 50, alignSelf: 'center', }}
                        />
                        <View style={{
                            flexDirection:"row",
                            paddingTop:10,
                            paddingHorizontal:10,

                        }}>
                            <Text style={{
                                fontFamily: "PTSans-Bold"
                            }}>Audio to Braille</Text>
                            <Text style={{
                                fontFamily: "PTSans-Bold",
                                color:'#062CD4',
                                paddingLeft:20,
                                fontStyle: 'italic'
                            }}>02/22/24</Text>
                        </View>
                        <Text style={{
                            paddingHorizontal:10 ,
                            color: '#062CD4' ,
                            paddingTop:3
                        }}>
                            Lyrics.mp4
                        </Text>
                    </TouchableOpacity>
    </ScrollView>
  )
}

export default history

