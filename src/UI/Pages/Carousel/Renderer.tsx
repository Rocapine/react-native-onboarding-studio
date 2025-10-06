import { CarouselStepType } from "./types";
import { View, Text } from 'react-native';


type ContentProps = {
  step: CarouselStepType;
};

export const CarouselRenderer = ({ step }: ContentProps) => {
  return (<View>
    <Text>Carousel</Text>
    <Text>{step.type}</Text>
    <Text>{step.name}</Text>
    <Text>{JSON.stringify(step.payload)}</Text>
  </View>)
};
