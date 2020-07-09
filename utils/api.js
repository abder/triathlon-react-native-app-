import { AsyncStorage } from "react-native";
import { CALENDAR_STORAGE_KEY } from "./_calender.js";

export const submitEntry = async (key, entry) => {
  try {
    return AsyncStorage.mergeItem(
      CALENDAR_STORAGE_KEY,
      JSON.stringify({
        [key]: entry,
      })
    );
  } catch (err) {
    return console.error(err);
  }
};

export const removeEntry = async (key) => {
  try {
    const result = await AsyncStorage.getItem(CALENDAR_STORAGE_KEY, key);
    let data = JSON.parse(result);
    data[key] = undefined;
    delete data[key];
    return AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    return console.error(err);
  }
};
