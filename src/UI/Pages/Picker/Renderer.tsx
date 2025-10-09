import { OnboardingTemplate } from "../../Templates/OnboardingTemplate";
import { PickerStepType, PickerStepTypeSchema, WeightUnit, HeightUnit } from "./types";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from "react-native";
import { useState } from "react";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../../Theme/useTheme";

type ContentProps = {
  step: PickerStepType;
  onContinue: (value?: string | number) => void;
};

const PickerRendererBase = ({ step, onContinue }: ContentProps) => {
  const { theme } = useTheme();
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

  if (pickerType === "height") {
    return (
      <HeightPicker
        step={validatedData}
        onContinue={onContinue}
        title={title}
        description={description}
      />
    );
  }

  if (pickerType === "name") {
    return (
      <NamePicker
        step={validatedData}
        onContinue={onContinue}
        title={title}
        description={description}
      />
    );
  }

  if (pickerType === "date") {
    return (
      <DatePicker
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
        <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
        {description && <Text style={[styles.description, { color: theme.colors.text.tertiary }]}>{description}</Text>}
        <View style={[styles.placeholderContainer, { backgroundColor: theme.colors.neutral.lowest }]}>
          <Text style={[styles.placeholderText, { color: theme.colors.text.tertiary }]}>
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
  const { theme } = useTheme();
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
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
          {description && (
            <Text style={[styles.description, { color: theme.colors.text.tertiary }]}>{description}</Text>
          )}
        </View>

        <View style={styles.pickerContainer}>
          <View style={styles.pickerRow}>
            <Picker
              selectedValue={selectedWeight}
              onValueChange={(itemValue: number) => setSelectedWeight(Number(itemValue))}
              style={styles.weightPicker}
              itemStyle={[styles.pickerItem, { color: theme.colors.text.primary }]}
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
              itemStyle={[styles.pickerItem, { color: theme.colors.text.primary }]}
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

type HeightPickerProps = {
  step: PickerStepType;
  onContinue: (value?: string | number) => void;
  title: string;
  description: string | null;
};

const HeightPicker = ({
  step,
  onContinue,
  title,
  description,
}: HeightPickerProps) => {
  const { theme } = useTheme();
  const [unit, setUnit] = useState<HeightUnit>("cm");

  // For metric (cm)
  const [selectedCm, setSelectedCm] = useState<number>(170);

  // For imperial (ft + in)
  const [selectedFeet, setSelectedFeet] = useState<number>(5);
  const [selectedInches, setSelectedInches] = useState<number>(7);

  const generateCmOptions = () => {
    const options: React.ReactNode[] = [];
    for (let i = 250; i >= 100; i--) {
      options.push(<Picker.Item key={i} label={i.toString()} value={i} />);
    }
    return options;
  };

  const generateFeetOptions = () => {
    const options: React.ReactNode[] = [];
    for (let i = 8; i >= 3; i--) {
      options.push(<Picker.Item key={i} label={i.toString()} value={i} />);
    }
    return options;
  };

  const generateInchesOptions = () => {
    const options: React.ReactNode[] = [];
    for (let i = 11; i >= 0; i--) {
      options.push(<Picker.Item key={i} label={i.toString()} value={i} />);
    }
    return options;
  };

  const handleContinue = () => {
    // Return height based on unit
    if (unit === "cm") {
      onContinue(`${selectedCm}-${unit}`);
    } else {
      // Return as "feet-inches-ft" format, e.g., "5-7-ft"
      onContinue(`${selectedFeet}-${selectedInches}-${unit}`);
    }
  };

  const handleUnitChange = (newUnit: HeightUnit) => {
    if (newUnit === "cm") {
      setSelectedCm(170);
    } else if (newUnit === "ft") {
      setSelectedFeet(5);
      setSelectedInches(7);
    }
    setUnit(newUnit);
  };

  return (
    <OnboardingTemplate
      step={step}
      onContinue={handleContinue}
      button={{ text: step.continueButtonLabel }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>{title}</Text>
          {description && (
            <Text style={[styles.description, { color: theme.colors.text.tertiary }]}>{description}</Text>
          )}
        </View>

        <View style={styles.pickerContainer}>
          {unit === "cm" ? (
            <View style={styles.pickerRow}>
              <Picker
                selectedValue={selectedCm}
                onValueChange={(itemValue: number) => setSelectedCm(Number(itemValue))}
                style={styles.weightPicker}
                itemStyle={[styles.pickerItem, { color: theme.colors.text.primary }]}
              >
                {generateCmOptions()}
              </Picker>
              <Picker
                selectedValue={unit}
                onValueChange={(itemValue: HeightUnit) => handleUnitChange(itemValue)}
                style={styles.unitPicker}
                itemStyle={[styles.pickerItem, { color: theme.colors.text.primary }]}
              >
                <Picker.Item label="cm" value="cm" />
                <Picker.Item label="ft" value="ft" />
              </Picker>
            </View>
          ) : (
            <View style={styles.heightImperialContainer}>
              <View style={styles.pickerRow}>
                <Picker
                  selectedValue={selectedFeet}
                  onValueChange={(itemValue: number) => setSelectedFeet(Number(itemValue))}
                  style={styles.heightFeetPicker}
                  itemStyle={[styles.pickerItem, { color: theme.colors.text.primary }]}
                >
                  {generateFeetOptions()}
                </Picker>
                <Picker
                  selectedValue={selectedInches}
                  onValueChange={(itemValue: number) => setSelectedInches(Number(itemValue))}
                  style={styles.heightInchesPicker}
                  itemStyle={[styles.pickerItem, { color: theme.colors.text.primary }]}
                >
                  {generateInchesOptions()}
                </Picker>
                <Picker
                  selectedValue={unit}
                  onValueChange={(itemValue: HeightUnit) => handleUnitChange(itemValue)}
                  style={styles.heightUnitPicker}
                  itemStyle={[styles.pickerItem, { color: theme.colors.text.primary }]}
                >
                  <Picker.Item label="cm" value="cm" />
                  <Picker.Item label="ft" value="ft" />
                </Picker>
              </View>
            </View>
          )}
        </View>
      </View>
    </OnboardingTemplate>
  );
};

type NamePickerProps = {
  step: PickerStepType;
  onContinue: (value?: string | number) => void;
  title: string;
  description: string | null;
};

const NamePicker = ({
  step,
  onContinue,
  title,
  description,
}: NamePickerProps) => {
  const { theme } = useTheme();
  const [name, setName] = useState<string>("");

  const handleContinue = () => {
    if (name.trim()) {
      onContinue(name.trim());
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={dismissKeyboard}>
        <View style={{ flex: 1 }}>
          <OnboardingTemplate
            step={step}
            onContinue={handleContinue}
            button={{
              text: step.continueButtonLabel,
              disabled: !name.trim(),
            }}
          >
            <View style={styles.container}>
              <View style={styles.textContainer}>
                <Text style={[styles.title, { color: theme.colors.text.primary }]}>
                  {title}
                </Text>
                {description && (
                  <Text style={[styles.description, { color: theme.colors.text.tertiary }]}>
                    {description}
                  </Text>
                )}
              </View>

              <View style={styles.nameInputContainer}>
                <TextInput
                  autoFocus
                  value={name}
                  onChangeText={setName}
                  returnKeyType="done"
                  placeholder="Type to write"
                  placeholderTextColor={theme.colors.text.disable}
                  onSubmitEditing={() => name.trim() && handleContinue()}
                  style={[
                    styles.nameInput,
                    {
                      backgroundColor: theme.colors.surface.lower,
                      color: theme.colors.text.primary,
                    },
                  ]}
                />
              </View>
            </View>
          </OnboardingTemplate>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

type DatePickerProps = {
  step: PickerStepType;
  onContinue: (value?: string | number) => void;
  title: string;
  description: string | null;
};

const DatePicker = ({
  step,
  onContinue,
  title,
  description,
}: DatePickerProps) => {
  const { theme } = useTheme();

  // Get current date as default
  const now = new Date();
  const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number>(now.getDate());
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const generateDayOptions = (month: number, year: number) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const options: React.ReactNode[] = [];
    for (let i = 1; i <= daysInMonth; i++) {
      options.push(<Picker.Item key={i} label={i.toString()} value={i} />);
    }
    return options;
  };

  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const options: React.ReactNode[] = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      options.push(<Picker.Item key={i} label={i.toString()} value={i} />);
    }
    return options;
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    // Adjust day if it exceeds the new month's days
    const daysInNewMonth = new Date(selectedYear, month + 1, 0).getDate();
    if (selectedDay > daysInNewMonth) {
      setSelectedDay(daysInNewMonth);
    }
  };

  const handleContinue = () => {
    // Return date as ISO string "YYYY-MM-DD"
    const date = new Date(selectedYear, selectedMonth, selectedDay);
    onContinue(date.toISOString().split('T')[0]);
  };

  return (
    <OnboardingTemplate
      step={step}
      onContinue={handleContinue}
      button={{ text: step.continueButtonLabel }}
    >
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={[styles.title, { color: theme.colors.text.primary }]}>
            {title}
          </Text>
          {description && (
            <Text style={[styles.description, { color: theme.colors.text.tertiary }]}>
              {description}
            </Text>
          )}
        </View>

        <View style={styles.pickerContainer}>
          <View style={styles.datePickerRow}>
            {/* Month Picker */}
            <Picker
              selectedValue={selectedMonth}
              onValueChange={(itemValue: number) => handleMonthChange(itemValue)}
              style={styles.monthPicker}
              itemStyle={[styles.pickerItem, { color: theme.colors.text.primary }]}
            >
              {months.map((month, index) => (
                <Picker.Item key={index} label={month} value={index} />
              ))}
            </Picker>

            {/* Day Picker */}
            <Picker
              selectedValue={selectedDay}
              onValueChange={(itemValue: number) => setSelectedDay(itemValue)}
              style={styles.dayPicker}
              itemStyle={[styles.pickerItem, { color: theme.colors.text.primary }]}
            >
              {generateDayOptions(selectedMonth, selectedYear)}
            </Picker>

            {/* Year Picker */}
            <Picker
              selectedValue={selectedYear}
              onValueChange={(itemValue: number) => setSelectedYear(itemValue)}
              style={styles.yearPicker}
              itemStyle={[styles.pickerItem, { color: theme.colors.text.primary }]}
            >
              {generateYearOptions()}
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
    textAlign: "center",
    letterSpacing: -0.76,
  },
  description: {
    fontFamily: "System",
    fontSize: 17,
    lineHeight: 22.1,
    textAlign: "center",
  },
  placeholderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 24,
    padding: 32,
  },
  placeholderText: {
    fontFamily: "System",
    fontSize: 16,
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
    fontSize: 20,
  },
  heightImperialContainer: {
    flex: 1,
  },
  heightFeetPicker: {
    width: "33%",
  },
  heightInchesPicker: {
    width: "33%",
  },
  heightUnitPicker: {
    width: "34%",
  },
  nameInputContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 8,
  },
  nameInput: {
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 24,
    height: 70,
    fontSize: 17,
    borderRadius: 16,
    fontFamily: "System",
  },
  datePickerRow: {
    flexDirection: "row",
  },
  monthPicker: {
    width: "50%",
  },
  dayPicker: {
    width: "25%",
  },
  yearPicker: {
    width: "25%",
  },
});

import { withErrorBoundary } from '../../ErrorBoundary';

export const PickerRenderer = withErrorBoundary(PickerRendererBase, 'Picker');
