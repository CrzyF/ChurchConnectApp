import React, { useState } from "react";
import { View, TextInput, Image, StyleSheet} from "react-native";
import fonts from "../config/fonts";
import colors from "./colors";

const SearchFilter = ({ style, placeholder })=> {
    const [focused, setFocused] = useState(false);
    return (
        <View style={[styles.searcharea, style, focused ? styles.shaddow : null]}>
            <TextInput 
                placeholder={placeholder} 
                style={styles.searchbar} 
                onFocus={()=> setFocused(true)} 
                onBlur={()=> setFocused(false)} 
                selectionColor={colors.primary}
                clearButtonMode={"while-editing"}
            />
            
            <View style={styles.column4}>
            <View style={styles.card}>
                <Image source={require('../assets/icons/filter.png')} style={styles.icon} />
            </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    searcharea: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        width: 30,
        height: 30,
    },
    card: {
        backgroundColor: colors.white,
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginStart: 10,
        borderRadius: 10
    },
    searchbar: {
        flexGrow: 1,
        paddingVertical: 12,
        backgroundColor: "#fff",
        borderRadius: 10,
        paddingHorizontal: 15,
        fontSize: fonts.fontSizeNormal,
        color: colors.light,
    },
    shaddow: {
        shadowcolor: colors.primary,
        shadowOffset: {width: 0, height: 1},
        shadowOpacity: 0.25,
        shadowRadius: 10,
        elevation: 5,
    }
})

export default SearchFilter;