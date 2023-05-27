import { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Style from '../styles/Style';
import Palette from '../styles/Palette';
import QuestionComponent from './components/QuestionComponent';
import ProgressComponent from './components/ProgressComponent';

export default function QuestionsView() {
    const navigation = useNavigation();

    const data = require('../assets/questions.json');
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [questions, setQuestions] = useState(data.questions);

    const onNextClicked = (userAnswer) => {
        setQuestions(current => {
            let newValue = [...current];
            newValue[currentQuestion]["userAnswer"] = userAnswer
            return newValue;
        });

        if (currentQuestion + 1 >= data.questions.length) {
            navigation.navigate("Score", createScoreValues())
            clearAnswers()
            setCurrentQuestion(0)
        }
            
        else setCurrentQuestion(currentQuestion + 1)
    }

    const createScoreValues = () =>{
        
        let correctAnswers = 0;
        let incorrectAnswers = 0;

        for (let i = 0; i < questions.length; ++i){
            if(questions[i]["userAnswer"] == true)
                ++correctAnswers;
            else ++incorrectAnswers;
        }
        let score = {
            correct: correctAnswers,
            incorrect: incorrectAnswers
        }
        return score;

    }

    const clearAnswers = () => {
        setQuestions(current => {
            let newValue = [...current];
            for (let i = 0; i < newValue.length; ++i )
                newValue[i]["userAnswer"] = undefined;
            return newValue;
        });
    }

    return (
        <View style= {[Style.container, localStyle.bg]}>
                
            <ProgressComponent
                questions = {questions}
                currentQuestion = {currentQuestion}
            ></ProgressComponent>
                
            <QuestionComponent 
                question = {questions[currentQuestion].question}
                options = {questions[currentQuestion].options}
                correctAnswer = {questions[currentQuestion].answer}
                isLastQuestion = {currentQuestion == questions.length - 1}
                onNextClicked = {onNextClicked}
            ></QuestionComponent>
            <TouchableOpacity 
                style={[Style.bigButton, localStyle.abortButton]}
                onPress={() => {
                    Alert.alert('Quizzy Minds', 'Wait! Are you sure? Your progress will be lost! ', [
                        {text: 'OK', onPress: () => {
                            clearAnswers();
                            navigation.navigate("Home");
                        }},
                        {text: 'Cancel', onPress: () => {} },
                    ])
                    
                }}
            >
                <Text style={Style.bigButtonText}>
                    <Ionicons name="close-outline" size={32} color={Palette.colors.blackText} />
                </Text>
            </TouchableOpacity>
        </View>
    )

}

const localStyle = StyleSheet.create({
    bg: {
        backgroundColor: Palette.colors.primary,
    },
    abortButton: {
        width: 50,
        height: 50,
        borderRadius: 9999,
        bottom: '6%',
        backgroundColor: Palette.colors.questionBullet,
        color: Palette.colors.blackText
    },
})