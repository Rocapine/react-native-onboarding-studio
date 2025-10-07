import { QuestionStepType } from "./types";
import { View, Text, Button } from 'react-native';


type ContentProps = {
  step: QuestionStepType;
  onContinue: () => void;
};

export const QuestionRenderer = ({ step, onContinue }: ContentProps) => {
  return (<View>
    <Text>{step.type}</Text>
    <Text>{step.name}</Text>
    <Text>{JSON.stringify(step.payload)}</Text>
    <Button title="Continue" onPress={onContinue} />
  </View>)
};
