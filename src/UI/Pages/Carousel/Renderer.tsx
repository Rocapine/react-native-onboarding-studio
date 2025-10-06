import { CarouselStepType } from "./types";
import { View, Text, Button } from 'react-native';


type ContentProps = {
  step: CarouselStepType;
  onContinue: () => void;
};

export const CarouselRenderer = ({ step, onContinue }: ContentProps) => {
  return (<View>
    <Text>Carousel</Text>
    <Text>{step.type}</Text>
    <Text>{step.name}</Text>
    <Text>{JSON.stringify(step.payload)}</Text>
    <Button title="Continue" onPress={onContinue} />
  </View>)
};
