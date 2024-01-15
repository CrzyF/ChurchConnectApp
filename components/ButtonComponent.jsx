import React from "react";
import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from "./colors";

const ButtonComponent = ({ title, width, elevation, onPress, style })=> {
    return (
        <TouchableOpacity onPress={onPress} style={[styles.container, elevation && styles.elevation, {width: width, shadowOffset: {height: elevation}}, style]}>
            <Text style={{textAlign: 'center', color: colors.white}}>{title}</Text>
        </TouchableOpacity>
    )
}

const NextButton = ({onPress})=> (
    <TouchableOpacity onPress={onPress} style={[styles.controlButton, {backgroundColor: colors.primary}]}>
        <Text style={{color: colors.white, marginRight: 10, marginStart: 5}}>NEXT</Text>
        <MaterialCommunityIcons name='arrow-right-drop-circle' size={25} color={colors.white}/>
    </TouchableOpacity>
)

const PreviousButton = ({ onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.controlButton}>
        <MaterialCommunityIcons name='arrow-left-drop-circle' size={25} color={colors.primary}/>
        <Text style={{color: colors.primary, marginLeft: 10, marginEnd: 5}}>BACK</Text>
    </TouchableOpacity>
)

const ZoomButtons = ({ style, onZoomIn, onZoomOut })=> (
    <View style={[style, styles.zoomButtonsContainer]}>
        <TouchableOpacity onPress={onZoomOut} style={[styles.zoomButton, styles.zoomOut]}>
            <MaterialCommunityIcons name="magnify-minus-outline" size={30} color={colors.light}/>
        </TouchableOpacity>
        <TouchableOpacity onPress={onZoomIn} style={[styles.zoomButton, styles.zoomIn]}>
            <MaterialCommunityIcons name="magnify-plus-outline" size={30} color={colors.white}/>
        </TouchableOpacity>
    </View>
)

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.primary, 
        padding: 15, 
        borderRadius: 10,
    },
    elevation: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: .3,
        shadowRadius: 10,
        elevation: 2,
    },
    controlButton: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.primary,
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    zoomButtonsContainer: {
        position: 'absolute', 
        bottom: 0,
        right: 0,
        marginTop: -25
    },
    zoomIn: {
        backgroundColor: colors.primary,
        padding: 10,
    },
    zoomOut: {
        padding: 10,
        borderWidth: 1,
        borderColor: colors.light,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        marginBottom: 15
    },
    zoomButton: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,
        width: 50,
        borderRadius: 25,
    }
});

export {NextButton, PreviousButton, ZoomButtons};
export default ButtonComponent;