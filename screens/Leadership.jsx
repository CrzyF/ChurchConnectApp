import React from 'react';
import { Text, StyleSheet, TouchableWithoutFeedback, View, Image, FlatList } from 'react-native';
import colors from '../components/colors';
import HeaderComponent from '../components/HeaderComponent';
import Screen from '../components/Screen';
import fonts from '../config/fonts';


const leaders = [
    { id: 1, title: 'Parish Priest', image: require('../assets/person1.png') },
    { id: 2, title: 'Catechist', image: require('../assets/person2.png') },
    { id: 3, title: 'Harvest Chairman', image: require('../assets/person3.png') },
    { id: 4, title: 'Leader2', image: require('../assets/person4.png') },
    { id: 5, title: 'Leader3', image: require('../assets/person5.png') },
    { id: 6, title: 'Leader4', image: require('../assets/person6.png') },
]

const LeaderComponent = ({ title, image })=> (
    <TouchableWithoutFeedback>
        <View style={styles.card}>
            <Image style={styles.image} source={image}/>
            <Text style={styles.title}>{title}</Text>
        </View>
    </TouchableWithoutFeedback>
)

const Leadership = ({ navigation })=> {
    return (
        <Screen>
            <HeaderComponent
                backEnabled
                navigation={navigation}
            />
            <View style={{ marginBottom: 20 }}>
                <Text style={{ color: colors.primary, fontSize: fonts.fontSizeLarge, textAlign: 'center', fontWeight: '800' }}>LEADERSHIP</Text>
                <Text style={{ color: colors.light, fontSize: fonts.fontSizeSmaller, textAlign: 'center' }}>Saints Peter and Paul</Text>
            </View>

            <FlatList
                data={leaders}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item })=> <LeaderComponent title={item.title} image={item.image}/>}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                numColumns={2}
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    card: {
        maxWidth: '50%',
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        borderRadius: 20,
        shadowOffset: {width: 0, height: 5},
        shadowOpacity: 0.05,
        shadowRadius: 3,
    },
    title: {
        color: colors.primary,
        fontSize: fonts.fontSizeNormal,
        fontWeight: '600',
        marginBottom: 10
    },
    image: {
        width: 100, 
        height: 100, 
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
        marginHorizontal: 30
    }
})

export default Leadership;