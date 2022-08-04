import React from "react";
import { Text, View } from "react-native";
import Animated, {
  Layout,
  LightSpeedInLeft,
  LightSpeedOutRight,
  FadeInLeft,
  FadeOutRight,
} from "react-native-reanimated";

import FeatherIcon from "@expo/vector-icons/Feather";

type Props = {
  id: number;
  description: string;
  completed: boolean;
  onDelete: (id: number) => void;
  onCompleted: (id: number) => void;
};

export function Task({
  completed,
  description,
  onDelete,
  id,
  onCompleted,
}: Props) {
  return (
    <Animated.View
      entering={FadeInLeft.duration(500)}
      exiting={FadeOutRight.duration(400)}
      layout={Layout.springify()}
      style={{
        backgroundColor: "#262626",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#333333",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        marginRight: 24,
        marginLeft: 24,
        padding: 12,
        height: 64,
      }}
      key={id}
    >
      <FeatherIcon
        name={completed ? "check-circle" : "circle"}
        color={completed ? "#5E60CE" : "#4EA8DE"}
        size={24}
        style={{ flex: 0.1, marginRight: 8 }}
        onPress={() => onCompleted(id)}
      />

      <Text style={{ flex: 0.8, fontSize: 14, color: "#F2F2F2" }}>
        {description}
      </Text>

      <FeatherIcon
        name={"trash-2"}
        color={"#808080"}
        size={24}
        onPress={() => onDelete(id)}
        style={{ flex: 0.1, marginLeft: 8 }}
      />
    </Animated.View>
  );
}
