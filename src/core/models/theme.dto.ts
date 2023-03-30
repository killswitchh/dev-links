/**
 * Model Theme
 *
 */
export type Theme = {
  id: string;
  linkGroupId: string;
  button: Button;
  background: Background;
};

/**
 * Model Button
 *
 */
export type Button = {
  id: string;
  buttonTheme: ButtonTheme;
  buttonShape: ButtonShape;
  themeId: string;
};

/**
 * Model Background
 *
 */
export type Background = {
  id: string;
  backgroundType: BackgroundType;
  backgroundColor?: string | null;
  gradientStops?: GradientStop[];
  imageUrl?: string | null;
  themeId: string;
};

/**
 * Model GradientStop
 *
 */
export type GradientStop = {
  id: string;
  color: string;
  position: string;
  backgroundId: string;
};

export enum BackgroundType {
  GRADIENT = 'GRADIENT',
  FILL = 'FILL',
  IMAGE = 'IMAGE',
}

export enum ButtonShape {
  RECTANGLE = 'RECTANGLE',
  PILL = 'PILL',
  ROUNDED_RECTANGLE = 'ROUNDED_RECTANGLE',
}

export enum ButtonTheme {
  FILL = 'FILL',
  OUTLINE = 'OUTLINE',
  HARD_SHADOW = 'HARD_SHADOW',
  SOFT_SHADOW = 'SOFT_SHADOW',
}
