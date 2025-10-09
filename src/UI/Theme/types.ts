export type ColorTokens = {
  primary: string;
  secondary: string;
  disable: string;
  tertiary: {
    tertiary1: string;
    tertiary2: string;
    tertiary3: string;
  };
  neutral: {
    high: string;
    higher: string;
    highest: string;
    low: string;
    lower: string;
    lowest: string;
    medium: string;
  };
  surface: {
    high: string;
    higher: string;
    highest: string;
    low: string;
    lower: string;
    lowest: string;
    medium: string;
    opposite: string;
  };
  text: {
    disable: string;
    opposite: string;
    primary: string;
    secondary: string;
    tertiary: string;
  };
};

export type TypographyTokens = {
  fontFamily: {
    tagline: string;
    text: string;
    title: string;
  };
  fontSize: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
    "2xl": number;
    "3xl": number;
    "4xl": number;
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
