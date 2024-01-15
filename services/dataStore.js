import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async(key, data)=> {
    try {
      await AsyncStorage.setItem(key, data);
    } catch (error) {
      console.log('New data unable to save', error);
    }
}
  
const getData = async(key)=> {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    console.log('Unable to retrieve new data', error); 
  }
}

const updateData = async(key, data)=> {
  try {
    await AsyncStorage.mergeItem(key, data);
  } catch (error) {
    console.log('New update unable to save', error); 
  }
}

const removeData = async(key)=> {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log('Error clearing data', error); 
  }
}

const getAllKeys = async()=> {
  try {
    return await AsyncStorage.getAllKeys();
  } catch (error) {
    console.log('Error getting keys', error); 
  }
}

const formatMemory = async()=> {
  try {
    await AsyncStorage.clear(()=> console.log('Memory cleared'))
  } catch (error) {
    console.log('Error formatting memory', error); 
  }
}

export default { storeData, getData, updateData, removeData, getAllKeys, formatMemory,  };