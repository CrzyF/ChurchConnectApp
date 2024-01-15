import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Animated,
  ScrollView,
  TouchableWithoutFeedback,
  RefreshControl,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from '../components/colors'
import Screen from '../components/Screen'
import HeaderComponent from '../components/HeaderComponent'
import ButtonComponent from '../components/ButtonComponent'
import fonts from '../config/fonts'
import SearchBar from '../components/SearchBar'
import useApi from '../services/useApi'
import authApi from '../services/auth'

const faq = [
  {
    questionID: 1,
    question: 'Is there a free trial available?',
    answer:
      'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
  },
  {
    questionID: 2,
    question: 'Is there a free trial available?',
    answer:
      'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
  },
  {
    questionID: 3,
    question: 'Is there a free trial available?',
    answer:
      'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
  },
  {
    questionID: 4,
    question: 'Is there a free trial available?',
    answer:
      'Yes, you can try us for free for 30 days. If you want, we’ll provide you with a free, personalized 30-minute onboarding call to get you up and running as soon as possible.',
  },
]

const QuestionCard = ({ question, answer }) => {
  const height = new Animated.Value(0)
  const padding = new Animated.Value(0)

  const expand = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 120,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(padding, {
        toValue: 10,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const collapse = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(padding, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start()
  }

  const CollapseIcon = ({ onExpand, onCollapse, currentState = false }) => {
    const [expand, setExpand] = useState(currentState)
    return (
      <TouchableWithoutFeedback
        onPress={expand ? () => setExpand(false) : () => setExpand(true)}
      >
        {!expand ? (
          <MaterialCommunityIcons
            name="plus-circle-outline"
            size={25}
            color={colors.lighter}
            onPress={onExpand}
            style={{ marginStart: 10 }}
          />
        ) : (
          <MaterialCommunityIcons
            name="minus-circle-outline"
            size={25}
            color={colors.lighter}
            onPress={onCollapse}
            style={{ marginStart: 10 }}
          />
        )}
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={styles.card}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Text style={styles.question}>{question}</Text>
        <CollapseIcon onExpand={() => expand()} onCollapse={() => collapse()} />
        {/* {!expanded ? <MaterialCommunityIcons name="plus-circle-outline" size={20} onPress={()=> expand()}/>
                : <MaterialCommunityIcons name="minus-circle-outline" size={20} onPress={()=> collapse()}/>} */}
      </View>
      <Animated.View style={{ height: height }}>
        <Text style={styles.answer}>{answer}</Text>
      </Animated.View>
    </View>
  )
}

const SupportScreen = ({ navigation }) => {
  const { request: getFaqs, data: faqs, loading, error } = useApi(
    authApi.getFaqs,
  )

  useEffect(() => {
    getFaqs()

    if (error) {
      console.log('Error getting announcements...')
      return
    }
    if (loading) {
      console.log('Loading...')
    }
  }, [])

  return (
    <Screen>
      <HeaderComponent backEnabled title={'faqs'} navigation={navigation} />
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={getFaqs} />
        }
      >
        {/* <Text style={styles.info}>
          We’re here to help you with anything and everything on catholicApp
        </Text>

        <Text style={styles.infoContent}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amet eget
          suspendisse justo, sed nibh nulla ut. Dictum aenean nisl varius
          ornare. Eu blandit fringilla imperdiet cras fringilla maecenas
          egestas. In lobortis et augue malesuada nec, elementum eu, bibendum.
          Iaculis velit nisl libero faucibus euismod praesent. Nam nulla
          porttitor pulvinar leo, nec enim gravida. Id nulla porttitor ipsum
          arcu, porttitor at. Molestie dolor ultrices nunc amet nec. Duis nam
          ullamcorper nullam sed sed mollis augue nibh risus.
        </Text>

        <SearchBar placeholder={'Search faqs'} /> */}

        {/* <Text
          style={{
            marginBottom: 5,
            marginTop: 10,
            paddingHorizontal: 10,
            fontWeight: 'bold',
          }}
        >
          FAQs
        </Text> */}
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          faqs?.data?.map((element, index) => {
            if (!faqs) {
              return (
                <Text>
                  Unable to load FAQs... please check your internet connection
                  and retry
                </Text>
              )
            }
            return (
              <QuestionCard
                key={index}
                answer={element.description}
                question={element.title}
              />
            )
          })
        )}
      </ScrollView>
      {/* <ButtonComponent
        style={{ marginBottom: 35 }}
        title={'Get in touch'}
        onPress={() => navigation.navigate('SupportMessageScreen')}
      /> */}
    </Screen>
  )
}

const styles = StyleSheet.create({
  container: {},
  info: {
    color: colors.light,
    fontSize: fonts.fontSizeNormal,
    fontWeight: '400',
    marginBottom: 20,
  },
  infoContent: {
    color: colors.lighter,
    lineHeight: 25,
    fontSize: fonts.fontSizeNormal,
    marginBottom: 20,
  },
  search: {
    backgroundColor: 'rgba(28, 118, 118, 0.3)',
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  card: {
    padding: 20,
    position: 'relative',
    marginHorizontal: 5,
    backgroundColor: colors.white,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.02,
    shadowRadius: 10,
    elevation: 2,
    marginBottom: 20,
  },
  question: {
    fontSize: fonts.fontSizeNormal,
    flexShrink: 1,
  },
  answer: {
    color: colors.light,
    lineHeight: 24,
  },
})

export default SupportScreen
