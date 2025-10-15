export type ColorTokens = {
  primary: string;
  disable: string;
  neutral: {
    high: string;
    higher: string;
    highest: string;
    low: string;
    lower: string;
    lowest: string;
    lowestest: string;
    medium: string;
  };
  text: {
    disable: string;
    opposite: string;
    primary: string;
    secondary: string;
    tertiary: string;
  };
};

export type TextStyle = {
  fontSize: number;
  fontWeight: "400" | "500" | "600" | "700" | "800";
  lineHeight: number;
  fontFamily: "text" | "title";
};

export type TextStyles = {
  heading1: TextStyle;
  heading2: TextStyle;
  heading3: TextStyle;
  body: TextStyle;
  bodyMedium: TextStyle;
  label: TextStyle;
  caption: TextStyle;
  button: TextStyle;
};

export type TypographyTokens = {
  fontFamily: {
    text: string;
    title: string;
  };
  fontWeight: {
    regular: "400";
    medium: "500";
    semibold: "600";
    bold: "700";
    extrabold: "800";
  };
  lineHeight: {
    tight: number;
    normal: number;
    relaxed: number;
  };
  textStyles: TextStyles;
};

export type Theme = {
  colors: ColorTokens;
  typography: TypographyTokens;
};

export type ColorScheme = "light" | "dark";

/**
 * Deep partial utility type for nested objects.
 * Makes all properties optional recursively.
 */
export type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>;
    }
  : T;
