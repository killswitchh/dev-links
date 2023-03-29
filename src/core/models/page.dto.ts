import type { Link } from './link.dto';
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
  underCreation: boolean;
};

export type CreatePageRequest = {
  name: string;
  ownerId: string;
  underCreation: boolean;
  active: boolean;
};
