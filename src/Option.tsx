import { useContext } from "react";
import { DropdownOptionProps } from "./types";
import { DropdownContext } from "./Dropdown";

export const Option: React.FC<DropdownOptionProps> = ({
  value,
  label,
  render,
}) => {
  const context = useContext(DropdownContext);
  if (!context) {
    throw new Error("Dropdown.Option must be used within a Dropdown");
  }

  const selected = Array.isArray(context.selected)
    ? context.selected.some((item) => item.value === value)
    : context.selected?.value === value;

  const handleClick = () => {
    if (context.multipleSelect) {
      if (Array.isArray(context.selected)) {
        if (context.selected.some((item) => item.value === value)) {
          context.setSelected(
            context.selected.filter((item) => item.value !== value)
          );
          return;
        }

        context.setSelected([...context.selected, { value, label }]);
        return;
      }
      context.setSelected([{ value, label }]);
    } else {
      context.setSelected({ value, label });
    }
  };

  return (
    <div onClick={handleClick} role="option">
      {render ? render({ label, selected }) : label}
    </div>
  );
};
