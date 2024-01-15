import React, { useEffect, useState } from "react";
import { Button, FlatList, Text, TextInput, View } from "react-native";
import { getDatabase, ref, child, set, get, onValue } from 'firebase/database';
import { getFirestore, collection, getDocs, getDoc, setDoc, doc } from 'firebase/firestore';
import app from '../config/firebaseConfig';
import { useNetInfo } from '@react-native-community/netinfo';
import _ from 'lodash';
import { getDailyReadings } from "../services/dailyReadingsServices";

import Screen from "../components/Screen";
import colors from "../components/colors";


const FirebaseScreen = ()=> {
    const [arrays, setArrays] = useState([{id: 1, value: 'ones'}, {id: 2, value: 'twos'}]);
    const [firestore, setFirestore] = useState([]);
    const netInfo = useNetInfo();
    // console.log(netInfo);

    const getData = ()=> {
        const db = getDatabase();
        const dbRef = ref(db, 'arrays/');
        onValue(dbRef, (snapshot) => {
            console.log('new data collected');
            setArrays(_.map(snapshot.val()));
        });
    }

    const addToFirestore = async() => {
        const db = getFirestore(app);
        try {
            // const docRef = addDoc(collection(db, "users"), {
            //     first: 'Alan',
            //     middle: 'Mathison',
            //     last: 'Turing',
            //     born: '1912'
            // });
            // console.log("Document written with ID: ", docRef.id);
            const citiesRef = collection(db, 'cities');
            
            await setDoc(doc(citiesRef, "SF"), {
                name: "San Francisco", state: "CA", country: "USA",
                capital: false, population: 860000,
                regions: ["west_coast", "norcal"] });
            await setDoc(doc(citiesRef, "LA"), {
                name: "Los Angeles", state: "CA", country: "USA",
                capital: false, population: 3900000,
                regions: ["west_coast", "socal"] });
            await setDoc(doc(citiesRef, "DC"), {
                name: "Washington, D.C.", state: null, country: "USA",
                capital: true, population: 680000,
                regions: ["east_coast"] });
            await setDoc(doc(citiesRef, "TOK"), {
                name: "Tokyo", state: null, country: "Japan",
                capital: true, population: 9000000,
                regions: ["kanto", "honshu"] });
            await setDoc(doc(citiesRef, "BJ"), {
                name: "Beijing", state: null, country: "China",
                capital: true, population: 21500000,
                regions: ["jingjinji", "hebei"] });

        } catch (error) {
            console.error("Error adding document: ", error);
        }
    }

    const getFromFirestore = async ()=> {
        const db = getFirestore(app);
        const obj = [];

        const querySnapshot = await getDocs(collection(db, "readings"));
        if(querySnapshot) console.log('yese');
        else {
            console.log('no');
        }
        querySnapshot.forEach((doc) => {
            obj.push(doc.data());
        });
        setFirestore(obj);
        console.log('New data collected');
        setLoading(false)

        // const docRef = doc(db, "cities", "SF");
        // const docSnap = await getDoc(docRef);

        // if (docSnap.exists()) {
        // console.log("Document data:", docSnap.data());
        // } else {
        // // doc.data() will be undefined in this case
        // console.log("No such document!");
        // }
    }

    useEffect(()=> {getFromFirestore()}, []);

    const [loading, setLoading] = useState(true);
    return (
        <Screen>
            <View>
                <View style={{flexDirection: 'row', alignItems: "center"}}>
                    <Text>Connection Status: </Text> 
                    <View style={{height: 10, width: 10, backgroundColor: !netInfo.isConnected ? colors.danger : colors.primary}}></View>
                </View>
                <Button title="Add data to firestore" onPress={addToFirestore}/>
                <Button title="Get data from firestore" onPress={getFromFirestore}/>
                <Button title="Get data" onPress={getData}/>
                <Button title="Clear data" onPress={()=> {setArrays([]); setFirestore([])}}/>
                <Text>List of items</Text>
                <FlatList 
                    data={arrays}
                    keyExtractor={(item)=> item.id}
                    renderItem={({item})=> (
                        <>
                            <Text>itemID: {item.id}</Text>
                            <Text>value: {item.value}</Text>
                        </>
                    )}
                    />
                <View style={{marginTop: 20}}>
                    <Text>Data from Firestore</Text>
                    <FlatList
                        style={{height: 500}}
                        data={firestore}
                        keyExtractor={(item)=> item.id}
                        renderItem={({item})=> (
                            <View style={{marginBottom: 20}}>
                                <Text>------------------------</Text>
                                <Text>Reading {item.id} </Text>
                                <Text>title: {item.title}</Text>
                                <Text>firstReading: {item.firstReading}</Text>
                                <Text>gospel: {item.gospel}</Text>
                                <Text>date: {item.date.day + ' ' + item.date.month + ' ' + item.date.year}</Text>
                                <Text>content: {item.readContent.content}</Text>
                                <Text>------------------------</Text>
                            </View>
                        )}
                        refreshing={loading}
                        onRefresh={()=> {
                            setLoading(true); 
                            console.log('refreshing');
                            getFromFirestore();
                            setLoading(false)
                        }}
                    />
                </View>
            </View>
        </Screen>
    )
}

export default FirebaseScreen;