import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorage = <T>(key: string, initialValue: T) => {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  const getValue = async () => {
    try {
      const item = await AsyncStorage.getItem(key);
      if (item !== null) {
        console.log("set value");
        setStoredValue(JSON.parse(item));
      }
    } catch (error) {
      console.error("Error while getting value from AsyncStorage:", error);
    }
  };

  const setValue = async (value: T) => {
    try {
      setStoredValue(value);
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error("Error while setting value in AsyncStorage:", error);
    }
  };

  const removeValue = async () => {
    try {
      await AsyncStorage.removeItem(key);
      setStoredValue(initialValue);
    } catch (error) {
      console.error("Error removing value from AsyncStorage:", error);
    }
  };

  useEffect(() => {
    console.log("getvalue");
    getValue();
  }, []);

  return { storedValue, setValue, removeValue };
};

export default useAsyncStorage;
