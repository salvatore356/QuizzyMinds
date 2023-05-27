import { StyleSheet } from 'react-native';
import Palette from './Palette';
import Utils from '../utils/Utils';

export default StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bigButton: {
        position:'absolute',
        backgroundColor: Palette.colors.primary,
        alignSelf: 'center',
        width: '90%',
        height: 57,
        borderRadius: 15,
        justifyContent: 'center'
    },
    bigButtonText: {
        color: Palette.colors.lightText,
        alignSelf: 'center',
        fontSize: Utils.normalize(17),
        fontWeight: 'bold',
        fontFamily: 'Pelita-Bold'
    },
    draft: {
        position: 'absolute',
        height: '110%',
        opacity: 0.7
    },
})