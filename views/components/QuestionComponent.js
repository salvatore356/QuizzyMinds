import { useState, useEffect, useRef } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Style from '../../styles/Style';
import Palette from '../../styles/Palette';
import Utils from '../../utils/Utils';

export default function QuestionComponent(props) {

    const answers = useRef([]);

    const [optionSelected, setOptionSelected] = useState(-1)

    useEffect(()=>{
        answers.current = answers.current.slice(0, props.options.length);
    }, [props.options])

    const getIndexCorrect = () => {
        return props.correctAnswer.charCodeAt(0) - 'a'.charCodeAt(0)
    }

    const currentInfoIcon = (i) => {
        let indexCorrect = getIndexCorrect();
        if (optionSelected == -1) return ""
        else if (optionSelected == i && i != indexCorrect) return "close-circle"
        else if (i == indexCorrect) return "md-checkmark-circle"
        else return ""  
    }

    const currentColorIcon = (i) => {
        let indexCorrect = getIndexCorrect();
        if (optionSelected != i && i == indexCorrect)
            return Palette.colors.goodAnswer
        else return Palette.colors.whiteText  
    }

    const buttonCurrentStyle = (i) => {
        if(optionSelected == -1) return localStyle.optionButton
        
        let indexCorrect = getIndexCorrect();
        if (optionSelected == i && i != indexCorrect) 
            return localStyle.optionWrongButton
        else if (optionSelected == i && i == indexCorrect)
            return localStyle.optionRightButton
        else if (optionSelected != i && i == indexCorrect)
            return localStyle.optionHintButton
        else return localStyle.optionButton  
    }


    const textCurrentStyle = (i) => {
        if (optionSelected == i) {
            return localStyle.optionSelectedText;  
        }
        else return localStyle.optionButtonText;
    }

    const onOptionClick = (selectedOption) => {
        if(optionSelected != -1) return;
        setOptionSelected(selectedOption);
    }

    return (
        <View style= {[localStyle.bg]}>
            <Text style={localStyle.questionText}>
                {props.question}
            </Text>

            <View style={localStyle.optionsContainer}>
                {
                props.options.map((item, i) => (
                    <TouchableOpacity 
                        key={i} 
                        style={ buttonCurrentStyle(i) }
                        ref={el => answers.current[i] = el} 
                        onPress = {
                            () => {onOptionClick(i)}
                        }
                    >
                        <View>
                            <Text style={ textCurrentStyle(i) }> {item} </Text> 
                            <Ionicons 
                                style = {localStyle.infoIcon}
                                name={currentInfoIcon(i)}
                                size={25} 
                                color={currentColorIcon(i)} 
                            />
                        </View>
                        
                    </TouchableOpacity>
                    
                ))
        }
            </View>

            <TouchableOpacity 
                style={[Style.bigButton, localStyle.nextButton]}
                onPress = {()=> {
                    let indexCorrect = getIndexCorrect();
                    props.onNextClicked(indexCorrect == optionSelected)
                    setOptionSelected(-1);
                }}
            >
                <Text style={Style.bigButtonText}>
                    {props.isLastQuestion ? "Finish" : "Next"}
                </Text>
            </TouchableOpacity>

            
        </View>
    )

}

const localStyle = StyleSheet.create({
    bg: {
        position: 'absolute',
        top: '18%',
        height: '82%',
        width: '100%',
        backgroundColor: Palette.colors.background,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
    },
    questionText: {
        fontFamily: 'Pelita-Bold',
        fontSize: Utils.normalize(20),
        marginLeft: '5%',
        marginTop: 60,
        width: '90%',
        marginRight: '5%',
        textAlign: 'center',
    },
    optionsContainer:{
        top: '5%',
    },
    optionButton: {
        marginTop: 15,
        width: '85%',
        height: 60,
        backgroundColor: Palette.colors.questionBullet,
        alignSelf: 'center',
        borderRadius: 10,
    },
    optionButtonText: {
        marginLeft: 17,
        fontFamily: 'Pelita',
        fontSize: Utils.normalize(15),
        lineHeight: 60,
        color: Palette.colors.blackText,
        display: 'flex',
        flexDirection: 'row',
    },
    nextButton: {
        width: '85%',
        bottom: '18%'
    },
    
    optionWrongButton: {
        marginTop: 15,
        width: '85%',
        height: 60,
        backgroundColor: Palette.colors.wrongAnswer,
        alignSelf: 'center',
        borderRadius: 10,
    },
    optionRightButton: {
        marginTop: 15,
        width: '85%',
        height: 60,
        backgroundColor: Palette.colors.goodAnswer,
        alignSelf: 'center',
        borderRadius: 10,
    },
    optionHintButton: {
        marginTop: 15,
        width: '85%',
        height: 60,
        backgroundColor: Palette.colors.questionBullet,
        borderColor: Palette.colors.goodAnswer,
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: 10,
    },
    optionSelectedText: {
        marginLeft: 17,
        fontFamily: 'Pelita-Bold',
        fontSize: Utils.normalize(15),
        lineHeight: 60,
        color: Palette.colors.whiteText
    },
    infoIcon:{
        position: 'absolute',
        right: 20,
        top: 17.5,
      }
})