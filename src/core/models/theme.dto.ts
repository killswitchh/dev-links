import type {
  Background,
  BackgroundType,
  Button,
  ButtonShape,
  ButtonTheme,
  GradientStop,
  Theme,
} from '@prisma/client';

export type ActivateInactivateEvent = {
  clicked: ActivateInactivateEventContent;
};

export type ActivateInactivateEventContent = {
  action: 'INACTIVATE' | 'ACTIVATE';
};

export type ButtonChangeEvent = {
  selected: ButtonChangeEventContent;
};

export type BackgroundChangeEvent = {
  selected: BackgroundChangeEventContent;
};

export type BackgroundChangeEventContent = {
  backgroundType: BackgroundType;
  backgroundColor?: string | null;
  gradientStops?: GradientStop[] | undefined | null;
  imageUrl?: string | null;
};

export type ButtonChangeEventContent = {
  buttonText: string;
  buttonTheme: ButtonTheme;
  buttonShape: ButtonShape;
  buttonColor: string;
  fontColor: string;
  outlineColor: string;
};

export type BackgroundOptional = Background & { gradientStops: GradientStop[] };

export type OTheme = Theme & { background: BackgroundOptional | null } & { button: Button | null };
export type RTheme = Theme & {
  background: Background & {
    gradientStops: GradientStop[];
  };
} & {
  button: Button;
};
