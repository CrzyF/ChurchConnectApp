import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';
import colors from '../components/colors';

const LoadingScreen = ()=> {
    return (
        <View style={styles.containter}>
            <ActivityIndicator size={'large'} color={colors.primary}/>
        </View>
    )
}

const styles = StyleSheet.create({
    containter: {
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0, 0, 0, .5)',
        position: 'absolute',
        height: '100%',
        width: '100%',
        zIndex: 2
    }
});

export default LoadingScreen;