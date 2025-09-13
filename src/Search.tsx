import { useContext } from "react";
import { DropdownContext } from "./Dropdown";
import { CircleX, SearchIcon } from "lucide-react";

export const Search = () => {
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
        role="searchbox"
        aria-label="Search options"
        aria-describedby={`${context.dropdownId}-search-help`}
        aria-controls={`${context.dropdownId}-listbox`}
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
