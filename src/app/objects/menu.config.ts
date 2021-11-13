export interface MenuConfig {
  items: MenuItemConfig[];
}

export interface MenuItemConfig {
  title: string;
  icon: string;
  path: string;
  active?: boolean;
}
