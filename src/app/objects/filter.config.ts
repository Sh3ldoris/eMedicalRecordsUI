export interface Filter {
  items: FilterItem[];
}

export interface FilterItem {
  id: string,
  label: string,
  type: 'text'
  value?: any
}
