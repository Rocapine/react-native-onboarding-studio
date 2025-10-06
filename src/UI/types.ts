import {
  CarouselStepType,
  CommitmentStepType,
  LoaderStepType,
  MediaContentStepType,
  PickerStepType,
  RatingsStepType,
} from "./Pages";

export type OnboardingStepType =
  | RatingsStepType
  | MediaContentStepType
  | PickerStepType
  | CommitmentStepType
  | CarouselStepType
  | LoaderStepType;
