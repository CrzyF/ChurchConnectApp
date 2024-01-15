import React, { useState } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableWithoutFeedback, Alert, Animated } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from "../components/colors";
import Screen from "../components/Screen";
import HeaderComponent from "../components/HeaderComponent";
import fonts from "../config/fonts";


const eventContents = {
    contentID: 1,
    bannerImage: require('../assets/banner-image.png'),
    title: 'Our Lady of the Rosary Novena',
    day: 'This Friday',
    date: 'July 8, 2022',
    starred: true,
    content: 'Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here\'s the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here\'s the way you figured out the date of Pentecost. ',
    sender: {
        position: 'Church Secretariat',
        name: 'Most Rev. Peter Paul',
        image: require('../assets/mary.png')
    }
}

const Star = ({ starred, starRemoved, currentState = false }) => {
    const [star, setStar] = useState(currentState);
    return (
        <TouchableWithoutFeedback onPress={star ? ()=> setStar(false) : ()=>setStar(true)}>
            {star ? <MaterialCommunityIcons name="star" size={25} color={colors.primary} onPress={starRemoved}/> :
            <MaterialCommunityIcons name="star-outline" size={25} color={colors.lighter} onPress={starred}/>}
        </TouchableWithoutFeedback>
    )
}

const EventViewScreen = ({ route })=> {
    // const params = route.params;
    return (
        <Screen style={styles.container}>
            <View>
                <HeaderComponent 
                    backEnabled
                /> 
                <Image source={require('../assets/banner-image.png')} style={styles.banner}/>

                <Text style={styles.eventTitle}>{eventContents.title}</Text>
            
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10}}>
                    <Text style={styles.date}>{eventContents.day}    {eventContents.date}</Text>
                    <Star 
                        currentState={eventContents.starred} 
                        starRemoved={()=> Alert.alert('Star removed')}
                        starred={()=> Alert.alert('Starred')}
                    />
                    {/* <MaterialCommunityIcons name="star-outline" color={colors.lighter} size={25}/> */}
                </View>

                <ScrollView style={{height: 350}}>
                    <Text style={styles.content}>{eventContents.content} </Text>
                </ScrollView>
            </View>
        
            <View style={styles.card}>
                <Text style={{color: colors.light, fontWeight: '500', marginBottom: 10}}>From</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Image 
                        source={eventContents.sender.image}
                        style={styles.eventImage}
                    />
                    <View style={{flexGrow: 1}}>
                        <Text style={styles.title}>{eventContents.sender.position}</Text>
                        <Text style={styles.subtitle}>{eventContents.sender.name}</Text>
                    </View>
                </View>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column', 
        justifyContent: 'space-between',
    },
    banner: {
        maxHeight: 140,
        borderRadius: 20,
        width: '100%',
        marginBottom: 10
    },
    eventTitle: {
        textAlign: "center",
        fontSize: fonts.fontSizeLarge,
        fontWeight: '500',
        color: colors.dark,
        marginBottom: 10
    },
    date: {
        fontSize: fonts.fontSizeSmaller,
        color: colors.lighter,
    },
    content: {
        color: colors.light,
        lineHeight: 18,
        fontSize: fonts.fontSizeSmall
    },
    card: {
        backgroundColor: "#f2f2f2",
        width: "100%",
        borderRadius: 20,
        paddingVertical: 12,
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    eventImage: {
        borderRadius: 10,
        height: 55,
        width: 55,
        marginRight: 10,
    },
    title: {
        fontSize: fonts.fontSizeSmall,
        marginBottom: 4,
    },
    subtitle: {
        color: colors.lighter,
        fontSize: fonts.fontSizeSmaller
    }
})

export default EventViewScreen;