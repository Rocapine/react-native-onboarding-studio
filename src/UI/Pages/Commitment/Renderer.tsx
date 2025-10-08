import { CommitmentStepType } from "./types";
import { View, Text, Button } from 'react-native';


type ContentProps = {
  step: CommitmentStepType;
  onContinue: () => void;
};

const CommitmentRendererBase = ({ step, onContinue }: ContentProps) => {
  return (<View>
    <Text>{step.type}</Text>
    <Text>{step.name}</Text>
    <Text>{JSON.stringify(step.payload)}</Text>
    <Button title="Continue" onPress={onContinue} />
  </View>)
};

import { withErrorBoundary } from '../../ErrorBoundary';

export const CommitmentRenderer = withErrorBoundary(CommitmentRendererBase, 'Commitment');
