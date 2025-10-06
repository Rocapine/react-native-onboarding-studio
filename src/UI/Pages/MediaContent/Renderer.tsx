import { MediaContentStepType } from "./types";
import { View, Text } from 'react-native';


type ContentProps = {
  step: MediaContentStepType;
};

export const MediaContentRenderer = ({ step }: ContentProps) => {
  return (<View>
    <Text>{step.type}</Text>
    <Text>{step.name}</Text>
    <Text>{JSON.stringify(step.payload)}</Text>
  </View>)
};
