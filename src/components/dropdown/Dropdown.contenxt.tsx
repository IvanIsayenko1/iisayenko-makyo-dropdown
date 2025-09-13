import { createContext } from "react";
import { DropdownContextType } from "./types";

/**
 * Dropdown context
 * @typedef {Object} DropdownContextType
 * @property {string} searchText - The search text
 * @property {function} setSearchText - Set the search text
 * @property {DropdownOption | DropdownOption[] | null} selected - The selected option(s)
 * @property {function} setSelected - Set the selected option(s)
 * @property {boolean} multipleSelect - Whether multiple select is enabled
 * @property {boolean} isOpen - Whether the dropdown is open
 * @property {function} setIsOpen - Set whether the dropdown is open
 * @property {function} onChange - The change handler
 * @property {function} render - The render function
 * @property {string} dropdownId - The dropdown id
 */
export const DropdownContext = createContext<DropdownContextType | null>(null);
