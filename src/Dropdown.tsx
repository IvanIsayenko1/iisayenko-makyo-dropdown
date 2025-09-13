import {
  createContext,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
} from "react";
import { DropdownContextType, DropdownProps, SelectOption } from "./types";
import { Option } from "./Option";
import { Search } from "./Search";
import { Virtuoso } from "react-virtuoso";
import { createPortal } from "react-dom";
import { ChevronDown, CircleX } from "lucide-react";

// create the context
export const DropdownContext = createContext<DropdownContextType | null>(null);

// the component
export const Dropdown: React.FC<DropdownProps> = ({
  name,
  multipleSelect = false,
  search = false,
  options,
  width = "350px",
  maxHeight = 300,
  usePortal = false,
  label,
  id,
  outlined = false,
  onChange,
  render,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selected, setSelected] = useState<
    SelectOption | SelectOption[] | null
  >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const ref = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

  const dropdownId = id || useId();

  const handleClickBox = () => {
    setIsOpen(!isOpen);
  };

  /**
   * Filter options based on the search text
   */
  const filteredOptions = useMemo(() => {
    if (!searchText) return options;
    return options.filter((option) =>
      option.label.toLowerCase().includes(searchText.toLowerCase())
    );
  }, [searchText, options]);

  /**
   * Ensure the compability with forms
   * @returns {JSX.Element | JSX.Element[] | null}
   */
  const renderHiddenInput = useMemo(() => {
    if (!name) return null;

    if (!selected) return <input type="hidden" name={name} value={""} />;

    if (Array.isArray(selected)) {
      return selected.map((select) => (
        <input
          key={select.value}
          type="hidden"
          name={name}
          value={select.value}
        />
      ));
    }

    return <input type="hidden" name={name} value={selected.value} />;
  }, [name, selected]);

  const renderTriggerBox = useMemo(() => {
    const handleClick = (e: React.MouseEvent, value: string) => {
      e.stopPropagation();
      if (Array.isArray(selected)) {
        const updated = selected.filter((item) => item.value !== value);
        setSelected(updated);
        onChange?.(updated);
      }
    };

    let result;

    if (Array.isArray(selected)) {
      result = selected.map((select) => (
        <div
          role="group"
          aria-label={`Selected: ${select.label}`}
          key={select.value}
          className="flex w-fit items-center gap-1 rounded-2xl border border-gray-100 bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:border-neutral-700 dark:bg-neutral-700 dark:text-gray-300"
        >
          <span>{select.label}</span>
          <button
            aria-label={`Remove ${select.label}`}
            onClick={(e) => handleClick(e, select.value)}
            className="flex-shrink-0 text-gray-500 dark:text-gray-400"
          >
            <CircleX size={16} />
          </button>
        </div>
      ));
    } else {
      result = (
        <span className="text-gray-500 dark:text-gray-400">
          {selected?.label}
        </span>
      );
    }

    return (
      <button
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={`${dropdownId}-listbox`}
        aria-label={label || "Select an option"}
        id={dropdownId}
        type="button"
        className={`flex min-h-9 w-full cursor-pointer flex-wrap items-center gap-1 rounded-md border px-2 py-1 text-left ${outlined ? "border-gray-300 bg-transparent text-gray-500 dark:border-neutral-700 dark:text-gray-300" : "border-gray-300 bg-white text-gray-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-gray-300"}`}
        onClick={handleClickBox}
      >
        <span className="flex flex-1 flex-wrap gap-1">{result}</span>
        <span className="ml-2">
          <ChevronDown size={16} className="text-gray-500 dark:text-gray-300" />
        </span>
      </button>
    );
  }, [selected, isOpen, outlined]);

  /**
   * Render options based on the filtered options.
   * If the filtered options are more than 100, Virtuoso renders them.
   */
  const renderOptions = useMemo(() => {
    const content =
      filteredOptions.length <= 10 ? (
        <div
          style={{ maxHeight, overflow: "auto" }}
          className="bg-white dark:bg-neutral-800"
        >
          {filteredOptions.map((option) => (
            <Option key={option.value} {...option} />
          ))}
        </div>
      ) : (
        <Virtuoso
          style={{ height: maxHeight }}
          totalCount={filteredOptions.length}
          itemContent={(index) => <Option {...filteredOptions[index]} />}
        />
      );

    const dropdown = (
      <div
        role="listbox"
        aria-multiselectable={multipleSelect}
        id={`${dropdownId}-listbox`}
        ref={optionsRef}
        className={`mt-2 border border-gray-300 bg-white shadow-xl dark:border-neutral-700 dark:bg-neutral-800 ${
          usePortal ? "absolute z-[1000]" : ""
        }`}
        style={
          usePortal
            ? {
                top: position.top,
                left: position.left,
                width: position.width,
              }
            : {}
        }
      >
        {search && <Search />}
        {content}
      </div>
    );

    return dropdown;
  }, [filteredOptions, maxHeight, usePortal, position, search]);

  const updatePosition = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
  }, []);

  // handle the click outside the dropdown
  useEffect(() => {
    if (!isOpen) return;

    let observer;
    if (usePortal) {
      updatePosition();

      observer = new ResizeObserver(() => {
        updatePosition();
      });

      observer.observe(ref.current);
    }

    const handleClickOutside = (e: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(e.target as Node) &&
        optionsRef.current &&
        !optionsRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      observer?.disconnect();
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition);
    };
  }, [isOpen, updatePosition]);

  return (
    <DropdownContext.Provider
      value={{
        searchText,
        setSearchText,
        selected,
        setSelected,
        multipleSelect,
        isOpen,
        setIsOpen,
        onChange,
        render,
        dropdownId,
      }}
    >
      <div className="flex flex-row gap-8">
        {label && (
          <label
            className="flex h-9 items-center text-sm font-medium text-gray-500 dark:text-gray-400"
            htmlFor={dropdownId}
          >
            {label}
          </label>
        )}
        <div className="relative" style={{ width: width }} ref={ref}>
          {/* hidden inputs */}
          {renderHiddenInput}

          {/* trigger box */}
          {renderTriggerBox}

          {/* option list */}
          {isOpen &&
            (usePortal
              ? createPortal(renderOptions, document.body)
              : renderOptions)}
        </div>
      </div>
    </DropdownContext.Provider>
  );
};
