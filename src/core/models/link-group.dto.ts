import type { BackgroundType, Button, GradientStop, Link, LinkGroup, Theme } from '@prisma/client';
import type { OTheme, RTheme } from './theme.dto';

export type LinkGroupOptional = LinkGroup & { theme: Theme | null };

export type test = Theme & {
  button: Button | null;
  background: {
    id: string;
    backgroundType: BackgroundType;
    backgroundColor: string | null;
    imageUrl: string | null;
    gradientStops: GradientStop[];
    themeId: string;
  } | null;
};

export type OLinkGroup = LinkGroup & { theme: OTheme | null } & {
  links: Link[] | null;
};

export type OLinkGroupWithLinks = LinkGroup & { theme: OTheme | null } & {
  links: Link[];
};

export type RLinkGroup = LinkGroup & { theme: RTheme } & {
  links: Link[] | null;
};

export type CreateLinkGroupRequest = {
  name: string;
  ownerId: string;
  underCreation: boolean;
  active: boolean;
};
