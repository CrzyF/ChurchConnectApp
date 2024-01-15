import React from 'react';
import { Text, StyleSheet, View, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../components/colors';
import HeaderComponent from '../components/HeaderComponent';
import Screen from '../components/Screen';
import fonts from '../config/fonts';


const news = [
    {
        id: 1,
        title: 'Our Lady Of the Rosary Novena',
        author: {
            name: 'Author Name',
            image: require('../assets/Avatar.png'),
        },
        subtitle: 'This Friday, July 8 2022',
        image: require('../assets/mary.png'),
        content: {
          bannerImage: require('../assets/banner-image.png'),
          title: 'Our Lady of the Rosary Novena',
          day: 'This Friday',
          date: 'July 8, 2022',
          starred: false,
          message: 'Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here\'s the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here\'s the way you figured out the date of Pentecost. ',
          sender: {
            position: 'Church Secretariat',
            name: 'Most Rev. Peter Paul',
            image: require('../assets/mary.png')
          }
        }
    },
    {
        id: 2,
        title: 'Our Lady Of the Rosary Novena',
        author: {
            name: 'Author Name',
            image: require('../assets/Avatar.png'),
        },
        subtitle: 'This Friday, July 8 2022',
        image: require('../assets/mary.png'),
        content: {
          bannerImage: require('../assets/banner-image.png'),
          title: 'Our Lady of the Rosary Novena',
          day: 'This Friday',
          date: 'July 8, 2022',
          starred: false,
          message: 'Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here\'s the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here\'s the way you figured out the date of Pentecost. ',
          sender: {
            position: 'Church Secretariat',
            name: 'Pst. John Paul',
            image: require('../assets/mary.png')
          }
        }
    },
    {
        id: 3,
        title: 'Our Lady Of the Rosary Novena',
        author: {
            name: 'Author Name',
            image: require('../assets/Avatar.png'),
        },
        subtitle: 'This Friday, July 8 2022',
        image: require('../assets/mary.png'),
        content: {
          bannerImage: require('../assets/banner-image.png'),
          title: 'Our Lady of the Rosary Novena',
          day: 'This Friday',
          date: 'July 8, 2022',
          starred: true,
          message: 'Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here\'s the way you figured out the date of Pentecost. Pentecost was the celebration of the beginning of the early weeks of harvest. In Palestine, there were two harvests each year. The early harvest came during the months of May and June; the final harvest came in the Fall. Pentecost was the celebration of the beginning of the early wheat harvest, which meant that Pentecost always fell sometime during the middle of the month of May or sometimes in early June. There were several festivals, celebrations, or observances that took place before Pentecost. There was Passover, there was Unleavened Bread, and there was the Feast of Firstfruits. The Feast of Firstfruits was the celebration of the beginning of the barley harvest. Here\'s the way you figured out the date of Pentecost. ',
          sender: {
            position: 'Church Secretariat',
            name: 'Elder Mireku',
            image: require('../assets/mary.png')
          }
        }
    },
]

const NewsItemComponent = ({ title, message, author, onPress })=> (
    <TouchableWithoutFeedback onPress={onPress}>
    <View style={styles.card}>
        <Image style={styles.image} source={require('../assets/banner-image.png')}/>
        <View style={styles.newsContainer}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.subtitle} numberOfLines={2}>{message}</Text>
            
            <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={styles.authorImg} source={author.image}/>
                    <Text style={{ color: colors.lighter, fontSize: fonts.fontSizeNormal }}>{author.name}</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: colors.lighter, fontSize: fonts.fontSizeNormal }}>Share</Text>
                    <MaterialCommunityIcons name='share' color={colors.lighter} size={20}/>
                </View>
            </View>
        </View>
    </View>
    </TouchableWithoutFeedback>
)

const News = ({ navigation })=> {
    return (
        <Screen>
            <HeaderComponent
                backEnabled
                navigation={navigation}
            />

            <FlatList
                data={news}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item })=> 
                    <NewsItemComponent 
                        title={item.title} 
                        message={item.content.message} 
                        author={item.content.sender}
                        onPress={() => navigation.navigate("AnnouncementView", item.content)}
                    />
                }
            />
        </Screen>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.white,
        marginBottom: 20,
        borderRadius: 20,
        shadowcolor: colors.primary,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.25,
        shadowRadius: 3,
    },
    image: {
        maxHeight: 140,
        borderRadius: 20,
        marginBottom: 10,
        width: '100%'
    },
    newsContainer: {
        padding: 10,
    },
    title: {
        fontSize: fonts.fontSizeLarge,
        fontWeight: 'bold',
        marginBottom: 10
    },
    subtitle: {
        color: colors.light,
        lineHeight: 20,
        marginBottom: 20
    },
    authorImg: {
        height: 30,
        width: 30,
        borderRadius: 15,
        marginEnd: 10
    }
});

export default News;