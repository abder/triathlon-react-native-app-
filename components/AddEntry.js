import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
} from "../utils/helpers";
import AppSlider from "./AppSlider";
import Stepper from "./Stepper";
import DateHeader from "./DateHeader";
import TextButton from "./TextButton";
import { Ionicons } from "@expo/vector-icons";
import { submitEntry, removeEntry } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addEntry } from "../actions/";

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );
};

const AddEntry = () => {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  });

  const [alreadyLogged, setAlreadyLogged] = useState(false);

  const entries = useSelector((state) => state);

  useEffect(() => {
    const key = timeToString();

    if (entries[key] && typeof entries[key].today === "undefined") {
      setAlreadyLogged(true);
    } else {
      setAlreadyLogged(false);
    }
  }, [entries]);

  const increment = (metric) => {
    const { max, step } = getMetricMetaInfo(metric);
    setState((state) => {
      const count = state[metric] + step;
      return {
        ...state,
        [metric]: count > max ? max : count,
      };
    });
  };

  const decrement = (metric) => {
    const { step } = getMetricMetaInfo(metric);
    setState((state) => {
      const count = state[metric] - step;
      return {
        ...state,
        [metric]: count < 0 ? 0 : count,
      };
    });
  };

  const slide = (metric, value) => {
    setState(() => {
      return { ...state, [metric]: value };
    });
  };

  const submit = () => {
    const key = timeToString();
    const entry = state;
    // Update Redux

    dispatch(addEntry({ [key]: entry }));

    // Navigate To home
    // Save to "DB"
    submitEntry(key, entry);
    // Clearn Loacal Notifications
  };

  const reset = () => {
    const key = timeToString();

    // update Redux
    dispatch(addEntry({ [key]: getDailyReminderValue() }));
    // Route to home
    // Update "DB"
    //removeEntry(key);
  };

  if (alreadyLogged) {
    return (
      <View>
        <Ionicons name='md-happy' size={100} color='black'></Ionicons>
        <Text>You already logged your information for today</Text>
        <TextButton onPress={reset}>Reset</TextButton>
      </View>
    );
  }

  return (
    <View>
      <DateHeader date={new Date().toLocaleDateString()} />
      {Object.keys(getMetricMetaInfo()).map((key) => {
        const { type, getIcon, ...rest } = getMetricMetaInfo(key);
        const value = state[key];

        return (
          <View key={key}>
            {getIcon()}
            {type === "slider" ? (
              <AppSlider
                value={value}
                onChange={(value) => slide(key, value)}
                {...rest}
              />
            ) : (
              <Stepper
                value={value}
                onIncrement={() => increment(key)}
                onDecrement={() => decrement(key)}
              />
            )}
          </View>
        );
      })}
      <SubmitBtn onPress={submit}></SubmitBtn>
    </View>
  );
};

export default AddEntry;
