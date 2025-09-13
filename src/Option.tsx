import { useCallback, useContext, useMemo } from "react";
import { SelectOption } from "./types";
import { DropdownContext } from "./Dropdown";

export const Option: React.FC<SelectOption> = ({ value, label }) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown.Option must be used within a Dropdown");
  }

  const isSelected = useMemo(() => {
    return Array.isArray(context.selected)
      ? context.selected.some((item) => item.value === value)
      : context.selected?.value === value;
  }, [context.selected, value]);

  const handleClick = useCallback(() => {
    if (context.multipleSelect) {
      if (Array.isArray(context.selected)) {
        if (context.selected.some((item) => item.value === value)) {
          context.setSelected(
            context.selected.filter((item) => item.value !== value)
          );
          return;
        }

        context.setSelected([...context.selected, { value, label }]);
        context.onChange?.([...context.selected, { value, label }]);
        return;
      }
      context.setSelected([{ value, label }]);
      context.onChange?.([{ value, label }]);
    } else {
      context.setSelected({ value, label });
      context.setIsOpen(false);
      context.onChange?.({ value, label });
    }
  }, [context, value, label]);

  const highlightMatchOfLabel = useMemo(() => {
    const searchText = context.searchText;
    if (!searchText) return label;

    const escaped = searchText.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(escaped, "gi");

    const matches = [...label.matchAll(regex)];
    if (matches.length === 0) return label;

    const elements = [];
    let lastIndex = 0;

    matches.forEach((match, i) => {
      const start = match.index!;
      const end = start + match[0].length;

      if (lastIndex < start) {
        elements.push(
          <span key={`text-${i}`}>{label.slice(lastIndex, start)}</span>
        );
      }

      elements.push(
        <span key={`match-${i}`} className="bg-yellow-200 dark:bg-yellow-900">
          {label.slice(start, end)}
        </span>
      );

      lastIndex = end;
    });

    if (lastIndex < label.length) {
      elements.push(<span key="last">{label.slice(lastIndex)}</span>);
    }
    return elements;
  }, [label, context.searchText]);

  return (
    <div
      onClick={handleClick}
      role="option"
      id={`${context.dropdownId}-option-${value}`}
      aria-selected={isSelected}
      tabIndex={isSelected ? 0 : -1}
      className={
        !context.render
          ? `cursor-pointer px-4 py-1 text-gray-500 hover:bg-green-50 dark:text-gray-400 dark:hover:bg-green-950 ${isSelected ? "bg-green-50 dark:bg-green-950" : ""}`
          : ""
      }
    >
      {context.render
        ? context.render({ label, selected: isSelected })
        : highlightMatchOfLabel}
    </div>
  );
};
