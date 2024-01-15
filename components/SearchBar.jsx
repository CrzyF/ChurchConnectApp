import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import colors from './colors'

const SearchBar = ({
  onSubmit,
  onTextChange,
  color = colors.white,
  style,
  ...props
}) => {
  return (
    <View style={[styles.search, style]}>
      <MaterialCommunityIcons name="magnify" size={25} color={color} />
      <View style={{ flexGrow: 1 }}>
        <TextInput
          {...props}
          // placeholder="Search Hymns..."
          placeholderTextColor={color}
          selectionColor={color}
          clearButtonMode="while-editing"
          onSubmitEditing={({ nativeEvent: { text } }) => {
            onSubmit && onSubmit(text)
          }}
          onChange={({ nativeEvent: { text } }) => {
            onTextChange && onTextChange(text)
          }}
          style={{
            color: color,
            fontSize: 16,
            marginLeft: 10,
            paddingVertical: 6,
          }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
})

export default SearchBar
