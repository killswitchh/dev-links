import type { Link } from './link.dto';
import type { Theme } from './theme.dto';

export type Page = {
  id: string;
  name: string;
  description?: string;
  imageURL?: string;
  createdTs: Date;
  updatedTs: Date;
  ownerId: string;
  active: boolean;
  links?: Link[];
  theme: Theme;
  underCreation: boolean;
};

export type CreatePageRequest = {
  name: string;
  ownerId: string;
  underCreation: boolean;
  active: boolean;
};
