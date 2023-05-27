import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useEffect, useRef } from 'react'
import {Dimensions} from 'react-native';

import Palette from '../../styles/Palette';
import Utils from '../../utils/Utils';

const windowWidth = Dimensions.get('window').width;

export default function ProgressComponent(props) {

    const answers = useRef([]);
    const scrollRef = useRef(0);

    useEffect(()=>{
        answers.current = answers.current.slice(0, props.questions.length);
        setTimeout(()=>{
            if (scrollRef.current != null)
                scrollRef.current.scrollTo({x: (props.currentQuestion * 55 + 27.5) })
        }, 200)
    }, [props.questions])

    const styleByUserAnswer = (index) => {
        
        let userAnswer = props.questions[index]["userAnswer"];
        
        if (userAnswer == undefined )
            return localStyle.questionBullet
        else if(userAnswer) {
            return localStyle.questionGoodAnswerBullet
        }
        return localStyle.questionWrongAnswerBullet
        
    }

    return (
        <View style={localStyle.bg}>
            <Text style={localStyle.mainText}>Question {props.currentQuestion + 1}</Text>
            <ScrollView 
                ref={scrollRef}
                style = {localStyle.scroll}
                showsHorizontalScrollIndicator={false}
                horizontal= {true} 
            >
                <View style={localStyle.scrollBumper}></View>
                {
                    props.questions.map((item, i) => ( 
                        <View 
                            key={i}
                            style={styleByUserAnswer(i)}
                        ></View>
                    ))
                }
                <View style={localStyle.scrollBumper}></View>
            </ScrollView>
        </View>
    );
}

const localStyle = StyleSheet.create({
    bg: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '18%',
    },
    mainText: {
        color: Palette.colors.whiteText,
        fontFamily: 'Pelita-Bold',
        marginTop: '12%',
        marginLeft: '3%',
        fontSize: Utils.normalize(23)
    },
    questionBullet: {
        backgroundColor: Palette.colors.whiteText,
        width: 50,
        height: 3,
        borderRadius: 5,
        marginRight: 5
    },
    questionGoodAnswerBullet: {
        backgroundColor: Palette.colors.goodAnswer,
        width: 50,
        height: 3,
        borderRadius: 5,
        marginRight: 5
    },
    questionWrongAnswerBullet: {
        backgroundColor: Palette.colors.wrongAnswer,
        width: 50,
        height: 3,
        borderRadius: 5,
        marginRight: 5
    },
    scroll: {
        left: '3%',
        position: 'absolute',
        top: '62%',
        width: '94%',
        height: 15,
    },
    scrollBumper : {
        width: windowWidth * 0.47,
        height: 15,
    }
});