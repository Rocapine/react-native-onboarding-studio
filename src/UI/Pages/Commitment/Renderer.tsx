import { CommitmentStepType } from "./types";
import { View, Text } from 'react-native';


type ContentProps = {
  step: CommitmentStepType;
};

export const CommitmentRenderer = ({ step }: ContentProps) => {
  return (<View>
    <Text>{step.type}</Text>
    <Text>{step.name}</Text>
    <Text>{JSON.stringify(step.payload)}</Text>
  </View>)
};
