import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

const TextButton = ({ children, onPress }) => {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <Text>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TextButton;
