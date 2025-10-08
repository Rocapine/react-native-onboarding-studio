import { OnboardingTemplate } from "../../Templates/OnboardingTemplate";
import { PickerStepType, PickerStepTypeSchema, WeightUnit } from "./types";
import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";

type ContentProps = {
  step: PickerStepType;
  onContinue: (value?: string | number) => void;
};

const PickerRendererBase = ({ step, onContinue }: ContentProps) => {
  const validatedData = PickerStepTypeSchema.parse(step);
  const { title, description, pickerType } = validatedData.payload;

  // Route to specific picker implementation based on type
  if (pickerType === "weight") {
    return (
      <WeightPicker
        step={validatedData}
        onContinue={onContinue}
        title={title}
        description={description}
      />
    );
  }

  // Fallback for other picker types (to be implemented)
  return (
    <OnboardingTemplate
      step={step}
      onContinue={() => onContinue()}
      button={{ text: validatedData.continueButtonLabel }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        {description && <Text style={styles.description}>{description}</Text>}
        <View style={styles.placeholderContainer}>
          <Text style={styles.placeholderText}>
            Picker type "{pickerType}" not yet implemented
          </Text>
        </View>
      </View>
    </OnboardingTemplate>
  );
};

type WeightPickerProps = {
  step: PickerStepType;
  onContinue: (value?: string | number) => void;
  title: string;
  description: string | null;
};

const WeightPicker = ({
  step,
  onContinue,
  title,
  description,
}: WeightPickerProps) => {
  const [selectedWeight, setSelectedWeight] = useState<number>(70);
  const [unit, setUnit] = useState<WeightUnit>("kg");

  const generateWeightOptions = (unit: WeightUnit) => {
    const config = {
      lb: { max: 660, step: 1 },
      kg: { max: 300, step: 1 },
    } as const;

    const { max, step } = config[unit];
    const options: React.ReactNode[] = [];

    for (let i = max; i >= step; i -= step) {
      options.push(<Picker.Item key={i} label={i.toString()} value={i} />);
    }

    return options;
  };

  const handleContinue = () => {
    // Return weight as "value-unit" format, e.g., "70-kg"
    onContinue(`${selectedWeight}-${unit}`);
  };

  return (
    <OnboardingTemplate
      step={step}
      onContinue={handleContinue}
      button={{ text: step.continueButtonLabel }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{title}</Text>
          {description && (
            <Text style={styles.description}>{description}</Text>
          )}
        </View>

        <View style={styles.pickerContainer}>
          <View style={styles.pickerRow}>
            <Picker
              selectedValue={selectedWeight}
              onValueChange={(itemValue: number) => setSelectedWeight(Number(itemValue))}
              style={styles.weightPicker}
              itemStyle={styles.pickerItem}
            >
              {generateWeightOptions(unit)}
            </Picker>
            <Picker
              selectedValue={unit}
              onValueChange={(itemValue: WeightUnit) => {
                if (itemValue === "kg") {
                  setSelectedWeight(70);
                } else if (itemValue === "lb") {
                  setSelectedWeight(154);
                }
                setUnit(itemValue);
              }}
              style={styles.unitPicker}
              itemStyle={styles.pickerItem}
            >
              <Picker.Item label="lb" value="lb" />
              <Picker.Item label="kg" value="kg" />
            </Picker>
          </View>
        </View>
      </View>
    </OnboardingTemplate>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    gap: 32,
  },
  textContainer: {
    gap: 16,
  },
  title: {
    fontFamily: "System",
    fontSize: 38,
    fontWeight: "500",
    lineHeight: 49.4,
    color: "#262626",
    textAlign: "center",
    letterSpacing: -0.76,
  },
  description: {
    fontFamily: "System",
    fontSize: 17,
    lineHeight: 22.1,
    color: "#8e8e93",
    textAlign: "center",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f6f6f6",
    borderRadius: 24,
    padding: 32,
  },
  placeholderText: {
    fontFamily: "System",
    fontSize: 16,
    color: "#8e8e93",
    textAlign: "center",
  },
  pickerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  pickerRow: {
    flexDirection: "row",
  },
  weightPicker: {
    width: "65%",
  },
  unitPicker: {
    width: "35%",
  },
  pickerItem: {
    fontSize: 32,
  },
});

import { withErrorBoundary } from '../../ErrorBoundary';

export const PickerRenderer = withErrorBoundary(PickerRendererBase, 'Picker');
