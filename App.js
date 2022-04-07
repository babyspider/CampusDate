
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert, SafeAreaView, TouchableOpacity, Image} from 'react-native';
import { backgroundColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';

const Separator = () => <View style={styles.separator} />;

const App = () => (

    // <SafeAreaView style={styles.container}> 

    <View style={styles.screen}>
      <View style = {styles.box1}>
        <TouchableOpacity

          style={styles.roundButtonLeft}
          onPress ={() => Alert.alert('Simple Button pressed')} >
        </TouchableOpacity>

        <TouchableOpacity

          style={styles.roundButtonRight}
          onPress ={() => Alert.alert('Simple Button pressed')} >

        </TouchableOpacity>

        <Image         
          style={styles.profilePic}         
          source={ {uri: 'https://reactnative.dev/img/tiny_logo.png',
        }} />

      </View>
     
    </View>
    // </SafeAreaView> 
  );


/// Just some styles
const styles = StyleSheet.create({
  screen: { //the background 
    flex: 1,
    backgroundColor: '#FFB6C1',
    justifyContent: 'center',
    alignContent:'center',
    alignItems:"center",
  },
  box1:{ // the border, where all the buttons, etc go inside
    padding: 50,
    borderWidth: 3,
    borderColor: "white",
    borderRadius: 20, // rounded edges or no -- higher = more round
    width: "93%",
    aspectRatio: 1/2,
    backgroundColor: "pink",
  },
  separator: {
    marginVertical: 0,
    borderBottomColor: '#FFB6C1',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  roundButtonLeft:{
    marginTop:"220%",
    width: "30%",
    aspectRatio: 1,
    /* justifyContent: 'center',
    alignItems: 'center', */
    padding: 20,
    borderRadius: 100,
    backgroundColor: '#DC6248',
  },
  roundButtonRight: {
    //marginTop: -110,
    marginTop: "-30%",
    marginLeft: "70%",
    width: "30%",
    aspectRatio: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    padding: 20,
    borderRadius: 100,
    backgroundColor: '#84DC48',
  },
  profilePic:{
    width: 66,
    height: 58,
    marginTop: "-200%",
    alignSelf:"center",
  }
});

export default App;