import { useContext } from "react";
import { DropdownSearchProps } from "./types";
import { DropdownContext } from "./Dropdown";
import { SearchIcon } from "lucide-react";

export const Search: React.FC<DropdownSearchProps> = ({ placeholder = "" }) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown.Search must be used within a Dropdown");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    context.setSearchText(e.target.value);
  };

  return (
    <div className="sticky top-0 w-full flex">
      <SearchIcon size={16} />
      <input
        type="search"
        placeholder={placeholder}
        onChange={handleChange}
        value={context.searchText}
      />
    </div>
  );
};
