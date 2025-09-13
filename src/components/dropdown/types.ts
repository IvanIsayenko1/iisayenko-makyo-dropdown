export interface DropdownProps {
  render?: (props: { selected: boolean; label: string }) => React.ReactNode;
  onChange?: (value: DropdownOption | DropdownOption[] | null) => void;
  name?: string;
  multipleSelect?: boolean;
  search?: boolean;
  options: DropdownOption[];
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
  selected: DropdownOption | DropdownOption[];
  setSelected: (selected: DropdownOption | DropdownOption[]) => void;
  multipleSelect: boolean;
  onChange?: (value: DropdownOption | DropdownOption[] | null) => void;
  render?: (props: { selected: boolean; label: string }) => React.ReactNode;
}

export interface DropdownOption {
  value: string;
  label: string;
}
