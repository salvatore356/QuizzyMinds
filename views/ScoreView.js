import { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';

import Palette from '../styles/Palette';
import Style from '../styles/Style';
import Utils from '../utils/Utils';

export default function ScoreView(props) {

    const navigation = useNavigation();
    const lottie = useRef()
    const [scoreValues, setScoreValues] = useState({
        correct: 0,
        incorrect: 0
    })

    useEffect(() => {
        setScoreValues(props.route.params)
    })

    const achievementMessage = () =>{
        let score = (scoreValues.correct / (scoreValues.correct + scoreValues.incorrect));

        if (score < 0.5) return "Try again"
        else if (score >= 1) return "Perfect"
        else return "Good work!"
        
    }
    return (
      <View style= {[Style.container, localStyle.bg]}>
        <View style={localStyle.contentContainer}>
            <View style={localStyle.mainInfoContainer}>
                <Text style={localStyle.performanceText}>
                    { achievementMessage()}
                </Text>
                <LottieView
                    autoPlay
                    loop={false}
                    ref = {lottie}
                    height={200}
                    source={require('../assets/animations/scoreAnimation.json')}
                />
                <Text style={localStyle.yourScore}>Your Score</Text>
                <Text style={localStyle.yourScoreNumeric}>{(100*(scoreValues.correct / (scoreValues.correct + scoreValues.incorrect))).toFixed(2)}%</Text>
            </View>
            
            <View style={localStyle.scoreInfoContainer}>
                
                <View style={[localStyle.scoreContainer, localStyle.scoreContainerQuestion]}>
                    <Text style={localStyle.scoreNumber}>{scoreValues.correct + scoreValues.incorrect}</Text>
                    <Text style={localStyle.scoreText}>Questions</Text>
                </View>

                <View style={[localStyle.scoreContainer, localStyle.scoreContainerGood]}>
                    <Text style={localStyle.scoreNumber}>{scoreValues.correct}</Text>
                    <Text style={localStyle.scoreText}>Correct</Text>
                </View >

                <View style={[localStyle.scoreContainer, localStyle.scoreContainerWrong]}>
                    <Text style={localStyle.scoreNumber}>{scoreValues.incorrect}</Text>
                    <Text style={localStyle.scoreText}>Incorrect</Text>
                </View>

            </View>

            <View style={localStyle.buttonContainer}>
                <TouchableOpacity 
                    style={[localStyle.button, localStyle.buttonTryAgain]}
                    onPress={() => navigation.navigate("Questions")}
                >
                    <Text style={localStyle.buttonText}>
                        Try Again
                    </Text>
                    
                </TouchableOpacity>
                <TouchableOpacity
                    style={[localStyle.button, localStyle.buttonDone]}
                    onPress={() => navigation.navigate("Home")}
                >
                    <Text style={localStyle.buttonText}>
                        Done
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
      </View>
    );
  }
  const localStyle = StyleSheet.create({
    contentContainer: {
        position: 'absolute',
        left: '2%',
        top: '16%',
        height: '68%',
        width: '96%',
        backgroundColor: Palette.colors.background,
        borderRadius: 25,
        //opacity: 0.4
    },
    mainInfoContainer: {
        alignSelf: 'center',
        marginTop: 30,
        height: '40%'
    },
    scoreInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignSelf: 'center',
        width: '82%',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    scoreContainer: {
        width:'30%',
        height: 62,
        padding: 10,
        borderRadius: 10,
    },
    scoreNumber: {
        textAlign: 'center',
        fontSize: Utils.normalize(27),
        fontFamily: 'Pelita-Bold',
        color: Palette.colors.whiteText
    },
    scoreText: {
        textAlign: 'center',
        fontFamily: 'Pelita',
        fontSize: Utils.normalize(13),
        color: Palette.colors.whiteText,
    },
    scoreContainerWrong: {
        backgroundColor: Palette.colors.wrongAnswer
    },
    scoreContainerGood: {
        backgroundColor: Palette.colors.goodAnswer
    },
    scoreContainerQuestion: {
        backgroundColor: Palette.colors.scoreQuestion
    },
    button: {
        alignSelf: 'center',
        width: '75%',
        height: 60,
        marginTop: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    buttonText: {
        color: Palette.colors.whiteText,
        fontFamily: 'Pelita-Bold',
        alignSelf: 'center',
        fontSize: Utils.normalize(16),
    },
    buttonContainer: {
        marginTop: 35,
    },
    buttonTryAgain: {
        backgroundColor: Palette.colors.tryAgain
    },
    buttonDone: {
        backgroundColor: Palette.colors.primary
    },
    performanceText: {
        color: Palette.colors.primary,
        fontFamily: 'Pelita-Bold',
        textTransform: 'uppercase',
        fontSize: Utils.normalize(40),
    },
    yourScore: {
        fontFamily: 'Pelita-Bold',
        fontSize: Utils.normalize(20),
        marginTop: 130,
        alignSelf: 'center',
    },
    yourScoreNumeric: {
        fontFamily: 'Pelita-Bold',
        marginTop: 10,
        fontSize: Utils.normalize(20),
        alignSelf: 'center',
    },
    bg: {
        backgroundColor: Palette.colors.primary
    }

  });