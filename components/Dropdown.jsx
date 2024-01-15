import React, { useState } from 'react'
import {
  View,
  TouchableWithoutFeedback,
  Animated,
  StyleSheet,
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

function Dropdown({
  itemComponent,
  subItemComponent,
  collapseIconName,
  expandIconName,
  dropdownIconStyles,
  style,
}) {
  const height = new Animated.Value(0)
  const padding = new Animated.Value(0)

  const expand = () => {
    Animated.parallel([
      Animated.timing(height, {
        toValue: 100,
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

  const [open, setOpen] = useState(false)

  const DropdownIcon = ({ expandIconName, collapseIconName }) => {
    const [expanded, setExpanded] = useState(false)
    return (
      <TouchableWithoutFeedback
        onPress={
          expanded
            ? () => {
                setExpanded(false)
                setOpen(false)
              }
            : () => {
                setExpanded(true)
                setOpen(true)
              }
        }
      >
        {!expanded ? (
          <MaterialCommunityIcons
            name={expandIconName}
            size={25}
            style={dropdownIconStyles}
            onPress={() => expand()}
          />
        ) : (
          <MaterialCommunityIcons
            name={collapseIconName}
            size={25}
            style={dropdownIconStyles}
            onPress={() => collapse()}
          />
        )}
      </TouchableWithoutFeedback>
    )
  }

  return (
    <View style={style}>
      <View style={styles.item}>
        {itemComponent}
        <DropdownIcon
          collapseIconName={collapseIconName}
          expandIconName={expandIconName}
        />
      </View>
      <Animated.View
        style={{
          maxHeight: !open
            ? 0
            : height.interpolate({
                inputRange: [0, 100],
                outputRange: ['0%', '100%'],
              }),
        }}
      >
        {/* {console.log(currentHeight)} */}
        {subItemComponent}
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  item: {
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default Dropdown
