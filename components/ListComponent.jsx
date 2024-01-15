import React, { useState } from "react";
import { FlatList, StyleSheet, View, TouchableWithoutFeedback, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

import fonts from "../config/fonts";
import colors from "./colors";
import { PreviousButton, NextButton } from "./ButtonComponent";

const ItemSeparator = () => {
    return (
      <View style={styles.itemSeparator}></View>
    )
}

const ListItem = ({ onPress, title, itemNumber })=> {
    return (
        <TouchableWithoutFeedback onPress={onPress}>
            <View style={styles.hymnItem}>
                <Text style={[styles.title, {marginRight: 10}]}>{itemNumber+'.'}</Text>
                <Text style={[styles.title, {flexGrow: 1}]}>{title}</Text>
                <MaterialCommunityIcons name='chevron-right' size={20} color={colors.lighter}/>
            </View>
        </TouchableWithoutFeedback>
    )
}

const ListComponent = ({ listItems, numbOfListPerPage, onItemPress })=> {
    const [pageNumber, setPageNumber] = useState(0);

    const listPerPage = numbOfListPerPage;
    const pagesVisited = pageNumber * listPerPage;

    const listDisplay = listItems
        .slice(pagesVisited, pagesVisited + listPerPage);

    const pageCount = Math.ceil(listItems.length / listPerPage);


    return (
        <View style={{flex: 1}}>
            <FlatList 
            data={listDisplay}
            keyExtractor={(item)=> item.hymnID.toString()}
            renderItem={({item})=> 
                <ListItem
                    title={item.title}
                    itemNumber={item.hymnID}
                    onPress={()=> onItemPress(listItems, item)}
                />
            }
            ItemSeparatorComponent={()=> <ItemSeparator />}
            />

            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <PreviousButton  onPress={()=> setPageNumber(pageNumber ==0 ? 0 : pageNumber-1)}/>
                
                <NextButton onPress={()=> setPageNumber(pageNumber == pageCount-1 ? pageCount-1 : pageNumber +1)}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    itemSeparator: {
        width: '100%',
        height: 1,
        backgroundColor: '#ccc',
    },
    hymnItem: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: fonts.fontSizeNormal,
    },
      button: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: colors.primary,
        padding: 10,
        marginRight: 7,
        minWidth: 30,
        alignItems: 'center'
    },
});

export default ListComponent;