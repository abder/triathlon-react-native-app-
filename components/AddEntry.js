import React, { useState } from "react";
import { View, Text } from "react-native";
import { getMetricMetaInfo } from "../utils/helpers";

const AddEntry = () => {
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
      return { [metric]: value };
    });
  };

  return <View>{getMetricMetaInfo("run").getIcon()}</View>;
};

export default AddEntry;
