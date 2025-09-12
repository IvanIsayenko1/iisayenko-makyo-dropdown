import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DropdownComponent, DropdownContextType, SelectOption } from "./types";
import { Option } from "./Option";
import { Search } from "./Search";
import { Virtuoso } from "react-virtuoso";
import { createPortal } from "react-dom";
import { ChevronDown, CircleX } from "lucide-react";

// create the context
export const DropdownContext = createContext<DropdownContextType | null>(null);

// the component
export const Dropdown: DropdownComponent = ({
  name,
  multipleSelect = false,
  search = false,
  options,
  maxHeight = 300,
  usePortal = false,
}) => {
  const [searchText, setSearchText] = useState<string>("");
  const [selected, setSelected] = useState<
    SelectOption | SelectOption[] | null
  >(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [position, setPosition] = useState({ top: 0, left: 0, width: 0 });

  const ref = useRef<HTMLDivElement>(null);
  const optionsRef = useRef<HTMLDivElement>(null);

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
        <input type="hidden" name={name} value={select.value} />
      ));
    }

    return <input type="hidden" name={name} value={selected.value} />;
  }, [name, selected]);

  const renderTriggerBox = useMemo(() => {
    let result;

    if (Array.isArray(selected)) {
      result = selected.map((select) => (
        <span className="p-1 rounded-2xl border flex gap-1 w-fit ">
          {select.label}
          <CircleX size={16} />
        </span>
      ));
    } else {
      result = <span>{selected?.label}</span>;
    }

    return (
      <div
        className="flex flex-wrap gap-1 items-center border w-full min-h-6 "
        onClick={handleClickBox}
      >
        <span className="flex-1 flex flex-wrap">{result}</span>
        <span className="ml-2">
          <ChevronDown size={16} />
        </span>
      </div>
    );
  }, [selected, isOpen]);

  /**
   * Render options based on the filtered options.
   * If the filtered options are more than 100, Virtuoso renders them.
   */
  const renderOptions = useMemo(() => {
    const content =
      filteredOptions.length <= 100 ? (
        <div style={{ maxHeight, overflow: "auto" }}>
          {filteredOptions.map((option) => (
            <Dropdown.Option key={option.value} {...option} />
          ))}
        </div>
      ) : (
        <Virtuoso
          style={{ height: maxHeight }}
          totalCount={filteredOptions.length}
          itemContent={(index) => (
            <Dropdown.Option {...filteredOptions[index]} />
          )}
        />
      );

    const dropdown = (
      <div
        ref={optionsRef}
        className={`border bg-white shadow-md ${
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
        {search && <Dropdown.Search />}
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

    const hendleClickOutside = (e: MouseEvent) => {
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
    document.addEventListener("mousedown", hendleClickOutside);

    return () => {
      observer?.disconnect();
      document.removeEventListener("mousedown", hendleClickOutside);
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
      }}
    >
      <div className="realtive w-96" ref={ref}>
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
    </DropdownContext.Provider>
  );
};

Dropdown.Option = Option;
Dropdown.Search = Search;
