import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import AuthContext from '../auth/context';
import ButtonComponent from './ButtonComponent';

const LoginRedirect = ()=> {
    const { setUser } = useContext(AuthContext);

    const handleRedirect = ()=> {
        setUser(null);
    }
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{ marginBottom: 10 }}>Sign in to view page content</Text>

            <ButtonComponent title={'Sign in'} onPress={handleRedirect} width={150}/>
        </View>
    )
}

export default LoginRedirect;