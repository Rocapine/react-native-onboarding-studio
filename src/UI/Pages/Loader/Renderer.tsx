import { LoaderStepType } from "./types";
import { View, Text, Button } from 'react-native';


type ContentProps = {
  step: LoaderStepType;
  onContinue: () => void;
};

export const LoaderRenderer = ({ step, onContinue }: ContentProps) => {
  return (<View>
    <Text>{step.type}</Text>
    <Text>{step.name}</Text>
    <Text>{JSON.stringify(step.payload)}</Text>
    <Button title="Continue" onPress={onContinue} />
  </View>)
};
