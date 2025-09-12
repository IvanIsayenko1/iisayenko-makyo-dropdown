import { Option } from "./Option";
import { Search } from "./Search";

// Dropdown
export interface DropdownComponent extends React.FC<DropdownProps> {
  Option?: typeof Option;
  Search?: typeof Search;
}

export interface DropdownProps {
  name?: string;
  multipleSelect?: boolean;
  search?: boolean;
  options: DropdownOptionProps[];
  maxHeight?: number;
  usePortal?: boolean;
}

// Dropdown Option
export interface DropdownOptionProps extends SelectOption {
  render?: (props: { selected: boolean; label: string }) => React.ReactNode;
}

// Dropdown Search
export interface DropdownSearchProps {
  placeholder?: string;
}

// Other
export interface DropdownContextType {
  searchText?: string;
  setSearchText?: (searchText: string) => void;
  selected?: SelectOption | SelectOption[];
  setSelected?: (selected: SelectOption | SelectOption[]) => void;
  multipleSelect?: boolean;
}

export interface SelectOption {
  value: string;
  label: string;
}
