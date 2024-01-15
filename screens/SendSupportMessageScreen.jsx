import React from "react";
import { View, Text, StyleSheet, TextInput, ScrollView, Keyboard } from "react-native";

import colors from "../components/colors";
import Screen from "../components/Screen";
import HeaderComponent from "../components/HeaderComponent";
import ButtonComponent from "../components/ButtonComponent";
import fonts from "../config/fonts";

const SendSupportMessageScreen = ({ navigation })=> {
    return (
        <Screen>
            <HeaderComponent backEnabled title={'support'} navigation={navigation}/>

            <Text style={{color: colors.light, marginBottom: 20, fontSize: 16}}>We’re here to help you with anything and everything on catholicApp</Text>
            
            <ScrollView onScroll={Keyboard.dismiss} scrollEventThrottle={16}>
                <TextInput
                    multiline
                    style={styles.message}
                    placeholder={'Enter message'}
                />
                <ButtonComponent title={'Send message'} elevation={9}/>
            </ScrollView>

        </Screen>
    )
}

const styles = StyleSheet.create({
    message: {
        borderWidth: 1,
        borderRadius: 10,
        borderColor: colors.lighter,
        color: colors.light,
        paddingHorizontal: 20,
        paddingVertical: 30,
        paddingTop: 20,
        height: 300,
        fontSize: fonts.fontSizeNormal,
        marginBottom: 20
    },
})

export default SendSupportMessageScreen;