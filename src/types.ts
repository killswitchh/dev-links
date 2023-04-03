import type { LinkGroup } from './core/models/link-group.dto';

export type Route = {
  name: string;
  path: string;
  id: number;
  active: boolean;
  position: 'left' | 'right';
};

export type NullSafePageItem = LinkGroup | null;
