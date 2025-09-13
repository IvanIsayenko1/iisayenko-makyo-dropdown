export interface DropdownProps {
  render?: (props: { selected: boolean; label: string }) => React.ReactNode;
  onChange?: (value: SelectOption | SelectOption[] | null) => void;
  name?: string;
  multipleSelect?: boolean;
  search?: boolean;
  options: SelectOption[];
  maxHeight?: number;
  width?: string;
  usePortal?: boolean;
  label?: string;
  id?: string;
  outlined?: boolean;
}

// Other
export interface DropdownContextType {
  dropdownId: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  searchText: string;
  setSearchText: (searchText: string) => void;
  selected: SelectOption | SelectOption[];
  setSelected: (selected: SelectOption | SelectOption[]) => void;
  multipleSelect: boolean;
  onChange?: (value: SelectOption | SelectOption[] | null) => void;
  render?: (props: { selected: boolean; label: string }) => React.ReactNode;
}

export interface SelectOption {
  value: string;
  label: string;
}
