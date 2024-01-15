import React from "react";
import { View, Text, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from "./colors";

const BackButton = ({ onPress, style })=> {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={[styles.backButton, style]}>
                <MaterialCommunityIcons name='arrow-left-box' size={45} color={colors.primary} style={{marginRight: 5}}/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const HeaderComponent = ({ navigation, style, backEnabled, title = ' ' }) => {
    return (
        <View style={[styles.headerComponent, style]}>
            {backEnabled && <BackButton onPress={()=> navigation.goBack()}/>}
            {title && <Text style={styles.title}>{title}</Text>}
        </View>
    )
}

const styles = StyleSheet.create({
    headerComponent: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    backButton: {
        position: 'absolute',
        left: -6,
    },  
    title: {
        color: colors.primary,
        textAlign: "center",
        fontSize: 24,
        fontWeight: '900',
        textTransform: 'uppercase',
        width: '80%'
    }
})

export default HeaderComponent;