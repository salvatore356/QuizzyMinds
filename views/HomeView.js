

import { Dimensions, Platform, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import Palette from '../styles/Palette';
import Style from '../styles/Style';
import Utils from '../utils/Utils';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default function HomeView() {
    
    const navigation = useNavigation();

    return (
        <View style= {Style.container}>
            { /* Header */ }
            <View style = {styles.header}>
                <View style = {styles.innerCircle}>
                    <LottieView
                        autoPlay
                        style={styles.animation}
                        source={require('../assets/animations/homeAnimation.json')}
                    />
                </View>    
            </View>
             {/* Information container */}
            <View style={styles.contentContainer}>
                {/* Title */}
                <Text style={styles.title}> 
                    Quizzy Minds
                </Text>
                {/* Description */}
                <Text style={styles.paragraph}> 
                    Are you ready to prove your trivia prowess? Start the quiz and let the quest for knowledge begin?
                </Text>
                {/* Button */}
                <TouchableOpacity 
                    style={[Style.bigButton, styles.bigButton]}
                    onPress={
                        () => {navigation.navigate("Questions")}
                    }
                > 
                    <Text style={Style.bigButtonText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
      
    );
  }
    
  const styles = StyleSheet.create({
    container: {
      height: '100%',
      width: '100%',
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    header: {
        position: 'absolute',
        display: 'flex',
        width: '100%',
        height: '49%',
        backgroundColor: Palette.colors.primary,
        borderRadius: 20,
        top: 0,
        justifyContent: 'center',
        //opacity: 0.5
    },
    innerCircle : {
        height: (windowHeight > windowWidth ? windowWidth * 0.5 : windowHeight * 0.5),
        width: (windowHeight > windowWidth ? windowWidth * 0.5 : windowHeight * 0.5),
        alignSelf: 'center',
        borderRadius: 9999,
        backgroundColor: Palette.colors.secondary,
    },
    animation: {
        width: '100%',
        height: '100%',
        alignSelf: 'center'
    },
    title: {
        marginTop: '15%',
        fontSize: Utils.normalize(28),
        fontWeight: 'bold',
        textAlign: 'center',
        fontFamily: 'Pelita-Bold'
    },
    paragraph: {
        paddingTop: 50,
        fontSize: Utils.normalize(17),
        fontWeight: 'bold',
        textAlign: 'center',
        marginLeft: '10%',
        marginRight: '10%',
        lineHeight: 22,
        fontFamily: 'Pelita'
    },
    contentContainer: {
        position: 'absolute',
        left: 0,
        bottom: 0,
        marginTop: '49%',
        height: '51%',
        width: '100%',
    },
    bigButton: {
        bottom: '10%',
    }
  });