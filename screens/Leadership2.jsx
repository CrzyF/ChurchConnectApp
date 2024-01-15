import React, { useContext, useEffect, useState } from 'react'
import { Text, StyleSheet, View, FlatList, ScrollView } from 'react-native'
import AuthContext from '../auth/context'
import colors from '../components/colors'
import HeaderComponent from '../components/HeaderComponent'
import LoginRedirect from '../components/LoginRedirect'
import Screen from '../components/Screen'
import fonts from '../config/fonts'
import authApi from '../services/auth'
import useApi from '../services/useApi'

const leadership = [
  {
    id: 1,
    category: 'Priests',
    leaders: [
      {
        title: 'Parish Priest',
        names: ['Rev. Fr. Richard Kwaku Manu'],
      },
      {
        title: 'Others',
        names: [
          'Rev. Fr. Richard Kwaku Manu',
          'Rev. Fr. Collins Agyekum',
          'Rev. Fr. Richmond Badu',
        ],
      },
    ],
  },
  {
    id: 2,
    category: 'Pastorial Council',
    leaders: [
      {
        title: 'Chairman',
        names: ['Rev. Fr. Richard Kwaku Manu'],
      },
      {
        title: 'Other',
        names: ['Justice Agyemang'],
      },
      {
        title: 'Other',
        names: ['Richmond Badu'],
      },
    ],
  },
  {
    id: 3,
    category: 'Parish Youth Council',
    leaders: [
      {
        title: 'Chairman',
        names: ['Rev. Fr. Richard Kwaku Manu'],
      },
      {
        title: 'Other',
        names: ['Justice Agyemang'],
      },
      {
        title: 'Other',
        names: ['Richmond Badu'],
      },
    ],
  },
  {
    id: 4,
    category: 'Parish Youth Council',
    leaders: [
      {
        title: 'Chairman',
        names: ['Rev. Fr. Richard Kwaku Manu'],
      },
      {
        title: 'Other',
        names: ['Justice Agyemang'],
      },
      {
        title: 'Other',
        names: ['Richmond Badu'],
      },
    ],
  },
]

const LeadersComponent = ({ category, leaders }) => (
  <View style={{ marginBottom: 20 }}>
    <Text style={{ fontSize: fonts.fontSizeMedium, marginBottom: 10 }}>
      {category}
    </Text>
    {leaders.map((leader, index) => (
      <View key={index} style={{ flexDirection: 'row', marginBottom: 5 }}>
        <Text key={index} style={{ color: colors.primary }}>
          {leader.title}:{' '}
        </Text>

        <View>
          {leader.names.map((name, nameIndex) => (
            <Text
              key={nameIndex}
              style={{ color: colors.light, marginBottom: 5 }}
            >
              {name}
            </Text>
          ))}
        </View>
      </View>
    ))}
  </View>
)

const Leadership2 = ({ navigation }) => {
  const { user } = useContext(AuthContext)

  const categories = []

  const { request: getLeaders, data: leaders, error, loading } = useApi(
    authApi.getLeaders,
  )

  useEffect(() => {
    getLeaders(user.id)
  }, [])

  leaders?.data?.map((leader) => {
    if (!categories.includes(leader.category)) {
      categories.push(leader.category)
    }
  })

  const sortCategory = (categories) => {
    return categories.sort((a, b) => {
      if (a === 'Priest') {
        return -1
      } else if (a === 'ParishPastoralCouncil') {
        return 1
      } else {
        return 0
      }
    })
  }

  return (
    <Screen>
      <HeaderComponent backEnabled navigation={navigation} />
      {user.isGuest ? (
        <LoginRedirect />
      ) : (
        <>
          <View style={{ marginBottom: 20 }}>
            <Text
              style={{
                color: colors.primary,
                fontSize: fonts.fontSizeLarge,
                textAlign: 'center',
                fontWeight: '800',
              }}
            >
              LEADERSHIP
            </Text>
            <Text
              style={{
                color: colors.light,
                fontSize: fonts.fontSizeSmaller,
                textAlign: 'center',
              }}
            >
              Saints Peter and Paul
            </Text>
          </View>

          {/* <FlatList
            data={leadership}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <LeadersComponent
                category={item.category}
                leaders={item.leaders}
              />
            )}
          /> */}

          {loading && !error ? (
            <Text>Loading...</Text>
          ) : (
            <ScrollView>
              {sortCategory(categories).map((category, index) => (
                <View key={index} style={{ marginBottom: 25 }}>
                  <Text
                    style={{
                      fontSize: fonts.fontSizeMedium,
                      marginBottom: 10,
                    }}
                  >
                    {(category === 'ParishPastoralCouncil' &&
                      'Parish Pastoral Council') ||
                      (category === 'ParishYouthCouncil' &&
                        'Parish Youth Council') ||
                      category}
                  </Text>
                  {leaders?.data
                    ?.filter((leader) => leader.category === category)
                    .map((leader, index) => (
                      <View
                        key={index}
                        style={{ flexDirection: 'row', marginBottom: 10 }}
                      >
                        <Text style={{ color: colors.primary }} key={index}>
                          {leader.positionText}:{' '}
                        </Text>
                        <Text style={{ color: colors.light }}>
                          {leader.title + ' ' + leader.name}
                        </Text>
                      </View>
                    ))}
                </View>
              ))}
            </ScrollView>
          )}
        </>
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  title: {
    color: colors.primary,
    fontSize: fonts.fontSizeNormal,
    fontWeight: '600',
    marginBottom: 10,
  },
})

export default Leadership2
