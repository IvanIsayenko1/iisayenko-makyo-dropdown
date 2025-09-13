import { useContext } from "react";
import { DropdownSearchProps } from "./types";
import { DropdownContext } from "./Dropdown";
import { CircleX, CircleXIcon, SearchIcon, XCircle } from "lucide-react";

export const Search: React.FC<DropdownSearchProps> = ({ placeholder = "" }) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown.Search must be used within a Dropdown");
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    context.setSearchText(e.target.value);
  };

  return (
    <div className="sticky top-0 flex h-10 w-full items-center gap-2 border-b border-gray-300 bg-white px-4 py-1 dark:border-neutral-700 dark:bg-neutral-800">
      <SearchIcon
        size={16}
        className="flex-shrink-0 text-gray-500 dark:text-gray-400"
      />
      <input
        className="h-full w-full bg-white text-gray-500 focus:outline-none focus:ring-0 dark:bg-neutral-800 dark:text-gray-400"
        type="text"
        placeholder={placeholder}
        onChange={handleChange}
        value={context.searchText}
      />
      {context.searchText && (
        <button
          className="flex h-4 w-4 items-center justify-center rounded-full bg-gray-400 dark:bg-gray-400"
          onClick={() => context.setSearchText("")}
        >
          <CircleX
            size={22}
            className="flex-shrink-0 text-white dark:text-neutral-800"
          />
        </button>
      )}
    </div>
  );
};
