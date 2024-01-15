import { MaterialCommunityIcons } from '@expo/vector-icons'
import { TouchableWithoutFeedback } from 'react-native'

import colors from './colors'

const FavoriteIcon = ({ onFavoriteChange, favorite = false }) => {
  return (
    <TouchableWithoutFeedback onPress={onFavoriteChange}>
      {favorite ? (
        <MaterialCommunityIcons name="star" size={20} color={colors.primary} />
      ) : (
        <MaterialCommunityIcons
          name="star-outline"
          size={20}
          color={colors.lighter}
        />
      )}
    </TouchableWithoutFeedback>
  )
}

export default FavoriteIcon
