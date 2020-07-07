import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome, Entypo } from "@expo/vector-icons";

const Stepper = ({ max, unit, step, value, onIncrement, onDecrement }) => {
  return (
    <View>
      <View>
        <TouchableOpacity onPress={onDecrement}>
          <FontAwesome name='minus' size={30} color='black'></FontAwesome>
        </TouchableOpacity>
        <TouchableOpacity onPress={onIncrement}>
          <Entypo name='plus' size={30} color='black'></Entypo>
        </TouchableOpacity>
      </View>
      <View>
        <Text>{value}</Text>
        <Text>{unit}</Text>
      </View>
    </View>
  );
};

export default Stepper;
