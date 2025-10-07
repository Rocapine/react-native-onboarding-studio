import { MediaContentStepType } from "./types";
import { View, Text, Button } from "react-native";

type ContentProps = {
  step: MediaContentStepType;
  onContinue: () => void;
};

export const MediaContentRenderer = ({ step, onContinue }: ContentProps) => {
  return (
    <View>
      <Text>{step.type}</Text>
      <Text>{step.name}</Text>
      <Text>{JSON.stringify(step.payload)}</Text>
      <Button title="Continue" onPress={onContinue} />
    </View>
  );
};
