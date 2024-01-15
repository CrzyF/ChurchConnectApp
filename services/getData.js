import { useState } from "react";
import { getFirestore, collection, getDocs, getDoc, setDoc, doc } from 'firebase/firestore';
import app from '../config/firebaseConfig';
import { useNetInfo } from '@react-native-community/netinfo';


export default getData = (dataPath) => {

    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const netInfo = useNetInfo();
    const request = async () => {
        setLoading(true);

        if(netInfo.isConnected === false) {
            setError(true);
            setLoading(false);
            return;
        } 

        else {
            const db = getFirestore(app);

            const querySnapshot = await getDocs(collection(db, dataPath)).catch(error => console.log(error));
    
            const obj = [];
            querySnapshot.forEach((doc) => {
                obj.push(doc.data());
            });
            setError(false);
            setData(obj);
            setLoading(false);
        }
    };
    return { request, data, error, loading };
}