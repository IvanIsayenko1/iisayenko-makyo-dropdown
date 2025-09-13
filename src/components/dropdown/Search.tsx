import { useContext } from "react";
import { CircleX, SearchIcon } from "lucide-react";
import { DropdownContext } from "./Dropdown.contenxt";

/**
 * Search component
 */
export const Search: React.FC = () => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown.Search must be used within a Dropdown");
  }

  /**
   * Handle change
   * @param {React.ChangeEvent<HTMLInputElement>} e
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    context.setSearchText(e.target.value);
  };

  return (
    <div className="dark:bg-neutral-800- sticky top-0 z-10 flex h-10 w-full items-center gap-2 border-b border-gray-300 bg-white px-4 py-1 dark:border-neutral-700">
      <SearchIcon
        size={16}
        className="flex-shrink-0 text-gray-600 dark:text-gray-300"
      />
      <input
        className="h-full w-full bg-white text-gray-600 focus:outline-none focus:ring-0 dark:bg-neutral-800 dark:text-gray-300"
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
