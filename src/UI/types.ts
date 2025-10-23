import {
  CarouselStepType,
  CommitmentStepType,
  LoaderStepType,
  MediaContentStepType,
  PickerStepType,
  RatingsStepType,
  QuestionStepType,
} from "./Pages";

export type CustomStepType<StepPayload = any> = {
  id: string;
  type: "CustomScreen";
  name: string;
  displayProgressHeader: boolean;
  payload: {
    customScreenId: string;
    type: string;
  };
  customPayload: StepPayload;
  figmaUrl?: string | null;
};

export type BaseStepType = {
  id: string;
  type: string;
  name: string;
  displayProgressHeader?: boolean;
  payload?: any;
  customPayload?: any;
};

export type OnboardingStepType =
  | RatingsStepType
  | MediaContentStepType
  | PickerStepType
  | CommitmentStepType
  | CarouselStepType
  | LoaderStepType
  | QuestionStepType
  | CustomStepType;
