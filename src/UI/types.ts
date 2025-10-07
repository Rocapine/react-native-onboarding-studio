import {
  CarouselStepType,
  CommitmentStepType,
  LoaderStepType,
  MediaContentStepType,
  PickerStepType,
  RatingsStepType,
  QuestionStepType,
} from "./Pages";

export type OnboardingStepType =
  | RatingsStepType
  | MediaContentStepType
  | PickerStepType
  | CommitmentStepType
  | CarouselStepType
  | LoaderStepType
  | QuestionStepType;
