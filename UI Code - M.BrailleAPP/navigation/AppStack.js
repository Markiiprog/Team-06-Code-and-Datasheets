
// Dito yung mga bottom tab nav
import { StyleSheet, Text, View, Modal, Image} from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { colors } from '../src/utils/colors';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

import { AuthContext } from './AuthProvider'; 

// Icons for botnav
import { Ionicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Screens for bot nav import
import Home from '../src/screen/home';
import Main from '../src/screen/main';
import About from '../src/screen/about';
import Profile from '../src/screen/profile';
import Faq from '../src/screen/faq';
import setting from '../src/screen/setting';
import ViewPostScreen from '../src/screen/ViewPostScreen';
import AddPostScreen from '../src/screen/AddPostScreen';
import SubmittedPostScreen from '../src/screen/SubmittedPostScreen';

// dimension fix
import { ScaledSheet } from 'react-native-size-matters';

// Custom Fonts ********************

import { useFonts } from 'expo-font'


// icons for drawer hihi
import navHeaderImage from '../assets/navheader.png';
import { AntDesign } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons'; 
import { SimpleLineIcons } from '@expo/vector-icons';
import historyScreen from '../src/screen/historyScreen';

//testing ng bot nav quoh-dibid 
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useContext } from 'react'
import { Button } from 'react-native';
import Terms from '../src/screen/Terms';

const Stack = createNativeStackNavigator();
const BotTab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

// for drawer design -Aru

const homedrawerIcon = ({ focused, color, size, }) => <AntDesign name="home" size={25} color="#003153" />
const maindrawerIcon = ({ focused, color, size }) => <MaterialCommunityIcons name="transcribe" size={25} color="#003153" />
const profiledrawerIcon = ({ focused, color, size }) => <Feather name="user" size={25} color="#003153" />
const faqdrawerIcon = ({ focused, color, size }) => <MaterialCommunityIcons name="comment-question-outline" size={25} color="#003153"  />
const aboutdrawerIcon = ({ focused, color, size }) => <Ionicons name="people-outline" size={25} color="#003153" />
const settingdrawerIcon = ({ focused, color, size }) => <Feather name="settings" size={25} color="#003153" />
const termsdrawerIcon = ({ focused, color, size }) => <AntDesign name="checksquare" size={25} color="#003153"/>
const logoutdrawerIcon = ({ focused, color, size }) => <SimpleLineIcons name="logout" size={25} color="#003153"/>


const HistoryStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="History"
      component={historyScreen}
      options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen 
      name="ViewPostScreen"
      component={ViewPostScreen}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        title: 'View Post',
      }}
    />
  </Stack.Navigator>
);

const AboutStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="About"
      component={About}
      options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen
      name="Terms"
      component={Terms}
      options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    
  </Stack.Navigator>
)


const HomeStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="Home"
      component={MainTab}
      options={{
        headerShown: false,

      }}
    />
    <Stack.Screen
      name="Profile"
      component={Profile}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
      }}
    />
    <Stack.Screen 
      name= "History"
      component={HistoryStack}
      options={{
        headerShown: true,
      }}
    />
    <Stack.Screen 
      name="ViewPostScreen"
      component={ViewPostScreen}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        title: 'View Post',
      }}
    />
  </Stack.Navigator>
);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const CustomDrawerHeader = () => {
  return (
    <View style={styles.header}>
    <Image source={navHeaderImage} style={styles.logo} />
    </View>
  );
};

const CustomDrawerContent = (props) => {
  const { user, logout } = useContext(AuthContext);

  // fonts*******************************************************

  const [ fontsLoaded ] = useFonts({
    'PTSans-Bold' : require ('../src/assets/fonts/PTSans-Bold.ttf'),
    'PTSans-BoldItalic' : require ('../src/assets/fonts/PTSans-BoldItalic.ttf'),
    'PTSans-Italic' : require ('../src/assets/fonts/PTSans-Italic.ttf'),
    'PTSans-Regular' : require ('../src/assets/fonts/PTSans-Regular.ttf'),
    

  })

  if (!fontsLoaded){
    return undefined ;
  }
  return (

    <DrawerContentScrollView {...props}>
      <CustomDrawerHeader />
      <DrawerItemList {...props} />
      <View style={styles.logoutButton}>
        <Button color='#003153'  title="Logout" onPress={() => logout()} />
      </View>
    </DrawerContentScrollView>
  );
};

const HomeDrawerStack = ({}) => (
  
  <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}
     drawerContent={(props) => <CustomDrawerContent {...props} />}>

    <Drawer.Screen name="Home" component={Home} options={{drawerIcon:homedrawerIcon}}  />

    <Drawer.Screen name="Transcribe" component={MainStack} options={{headerShown: true, drawerIcon:maindrawerIcon}}  />
    
    <Drawer.Screen name="Profile" component={Profile} options={{headerShown: true, drawerIcon:profiledrawerIcon}} />

    <Drawer.Screen name="F.A.Q" component={Faq} options={{headerShown: true, drawerIcon:faqdrawerIcon }} />

    <Drawer.Screen name="About" component={AboutStack} options={{headerShown: true, drawerIcon:aboutdrawerIcon }}  />

    <Drawer.Screen name="Terms" component={Terms} options={{headerShown: true, drawerIcon:termsdrawerIcon }} />

    {/*<Drawer.Screen name="Settings" component={setting} options={{headerShown: true, drawerIcon:settingdrawerIcon }} /> */}

   
    {/* Add other screens you want in the drawer navigator */}

  </Drawer.Navigator>
);

const MainStack = ({ navigation }) => (
  <Stack.Navigator>
    <Stack.Screen
      name="main"
      component={Main}
      options={{
        headerShown: false,
      }}
    />
    <Stack.Screen
      name="Faq"
      component={ Faq }  
      options={{
        headerShown: false,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
          
        },
      }}
    />
    <Stack.Screen
  name="AddPost"
  component={AddPostScreen}
  options={{
    headerShown: true,
    headerStyle: {
      backgroundColor: '#fff',
      shadowColor: '#fff',
      elevation: 0,
    },
    title: 'Transcription', // Add this line to set the screen label
  }}
/>
    <Stack.Screen
      name="SubmittedPost"
      component={SubmittedPostScreen}
      options={{
        headerShown: true,
        headerStyle: {
          backgroundColor: '#fff',
          shadowColor: '#fff',
          elevation: 0,
        },
        title: 'Transcribed',
      }}
    />
  </Stack.Navigator>
);

//////////////////////////////////////////////////////////////drawer sa gedli ng meralco/////////////////////////////////////////////////////////////////////









//////////////////////////////////////////////////////////////bulutong nav /////////////////////////////////////////////////////////////////////
// const AppStack = () => {
//   const [index, setIndex] = React.useState(0);
//   const [routes] = React.useState([
//     { key: 'home', title: 'Home', icon: 'home', customIcon: AntDesign },
//     { key: 'main', title: 'Main', icon: 'transcribe', customIcon: MaterialCommunityIcons },
//     { key: 'about', title: 'About', icon: 'people-outline', customIcon: Ionicons },
//   ]);
//   const renderScene = BottomNavigation.SceneMap({
//     home: HomeStack,
//     main: Main,
//     about: About,
//   });
//   const renderIcon = ({ route, color, focused }) => {
//     const CustomIcon = route.customIcon;
//     const iconSize = focused ? 25 : 30; // Adjust the sizes based on your preference
//     const iconColor = focused ? '#003153' : color; // Highlight color when pressed
//     return (
//       <CustomIcon
//         name={route.icon}
//         size={iconSize}
//         color={iconColor}
        
//       />
//     );
//   };
//   return (

//     <SafeAreaProvider>
//        <View style={styles.container}>
//     <BottomNavigation
//       navigationState={{ index, routes }}
//       onIndexChange={setIndex}
//       renderScene={renderScene}
//       barStyle={styles.bottomBar}
//       inactiveColor='white'
//       activeColor='white'
//       renderIcon={renderIcon}
//       shifting={true}
//       labelStyle={{ color: 'white' }} // Set label text color to white
      
//     />
//     </View>
//     </SafeAreaProvider>

//   );
// };

// export default AppStack;

////////////////////////////////////////////////////////////LUMANG BOT NAV/////////////////////////////////////////////////////////////////////

const MainTab = () => {
  return(
    <BotTab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.secondary,
        tabBarStyle: { position: 'center',
          backgroundColor: colors.primary, 
          width: '90%', 
          alignSelf: 'center', 
          marginBottom: 5,
          borderTopLeftRadius: 25, 
          borderTopRightRadius: 25, 
          borderBottomLeftRadius: 25, 
          borderBottomRightRadius: 25,},
        tabBarAllowFontScaling: 10 ,
      }}
    >
      <BotTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={30} color={color}/>
          ),
        }}
      />
      <BotTab.Screen
        name="Transcribe"
        component={MainStack}
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="transcribe" size={30} color={color} />
          ),
        }}
      />
      <BotTab.Screen
        name="About"
        component={ AboutStack }
        options={{
          headerShown: true,
          tabBarIcon: ({ color }) => (
            <Ionicons name="people-outline" size={30} color={color} />
          ),
        }}
      />
    </BotTab.Navigator>
  );
}

const AppStack = () => {
  return (
    <Drawer.Navigator initialRouteName="Home" screenOptions={{ headerShown: false,
      drawerPosition: 'left', // Display the drawer on the left side
      drawerType: 'slide', // Show the drawer as a sliding panel
      }}
     drawerContent={(props) => <CustomDrawerContent {...props} />}>

    <Drawer.Screen name="Home" component={HomeStack} options={{drawerIcon:homedrawerIcon}}  />

    <Drawer.Screen name="Transcribe" component={MainStack} options={{headerShown: true, drawerIcon:maindrawerIcon}}  />
    
    <Drawer.Screen name="Profile" component={Profile} options={{headerShown: true, drawerIcon:profiledrawerIcon}} />

    <Drawer.Screen name="F.A.Q" component={Faq} options={{headerShown: true, drawerIcon:faqdrawerIcon }} />

    <Drawer.Screen name="About" component={AboutStack} options={{headerShown: true, drawerIcon:aboutdrawerIcon }}  />

    <Drawer.Screen name="Terms" component={Terms} options={{headerShown: true, drawerIcon:termsdrawerIcon }} />

      {/* <Drawer.Screen name="Settings" component={setting} options={{headerShown: true, drawerIcon:settingdrawerIcon }} />  */}

   
    {/* Add other screens you want in the drawer navigator */}

  </Drawer.Navigator>
  );
}
export default AppStack;



const styles = StyleSheet.create({
  logoutButton: {
    marginTop: 10,
    paddingHorizontal: 15, 
    
  },
  header: {
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    alignItems: 'center',
  },

  logo: {
    width: 300, // Adjust the width and height as needed
    height: 150,
  },

 
  
});
