import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { getMetricMetaInfo, timeToString } from "../utils/helpers";
import AppSlider from "./AppSlider";
import Stepper from "./Stepper";
import DateHeader from "./DateHeader";
import TextButton from "./TextButton";
import { Ionicons } from "@expo/vector-icons";

const SubmitBtn = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>Submit</Text>
    </TouchableOpacity>
  );
};

const AddEntry = ({ alreadyLogged }) => {
  const [state, setState] = useState({
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  });

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
    // Update Redux

    setState({ run: 0, bike: 0, swim: 0, sleep: 0, eat: 0 });
    // Navigate To home

    // Save to "DB"

    // Clearn Loacal Notifications
  };

  const reset = () => {
    // update Redux
    // Route to home
    // Update "DB"
  };

  if (alreadyLogged) {
    return (
      <View>
        <Ionicons name='md-happy' size={100} color='black'></Ionicons>
        <Text>You already logged your information fro today</Text>
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
