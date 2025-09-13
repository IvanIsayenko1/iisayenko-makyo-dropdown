import { Dropdown } from "./Dropdown";
import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: `

## Features
- Searchable with highlighting
- Virtualized for large datasets
- Portal support for z-index issues
- Customizable rendering
- Dark mode support
        `,
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label displayed above the dropdown",
    },
    multipleSelect: {
      control: "boolean",
      description: "Allow selecting multiple options",
    },
    search: {
      control: "boolean",
      description: "Enable search functionality with highlighting",
    },
    usePortal: {
      control: "boolean",
      description: "Render dropdown in a portal (useful for z-index issues)",
    },
    outlined: {
      control: "boolean",
      description: "Use outlined style instead of filled",
    },
    width: {
      control: "text",
      description: "Dropdown width (CSS value)",
    },
    maxHeight: {
      control: { type: "range", min: 100, max: 500, step: 50 },
      description: "Maximum height of options container",
    },
    onChange: { action: "changed" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data sets
const simpleOptions = [
  { value: "apple", label: "Apple" },
  { value: "banana", label: "Banana" },
  { value: "cherry", label: "Cherry" },
  { value: "date", label: "Date" },
  { value: "elderberry", label: "Elderberry" },
];

const countriesOptions = [
  { value: "us", label: "United States" },
  { value: "ca", label: "Canada" },
  { value: "uk", label: "United Kingdom" },
  { value: "de", label: "Germany" },
  { value: "fr", label: "France" },
  { value: "jp", label: "Japan" },
  { value: "au", label: "Australia" },
  { value: "br", label: "Brazil" },
  { value: "in", label: "India" },
  { value: "cn", label: "China" },
];

const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
  value: `item-${i}`,
  label: `Item ${i + 1} - ${["Alpha", "Beta", "Gamma", "Delta", "Epsilon"][i % 5]} Series`,
}));

const longLabelsOptions = [
  { value: "short", label: "Short" },
  { value: "medium", label: "Medium length option" },
  {
    value: "long",
    label: "This is a very long option label that might wrap to multiple lines",
  },
  {
    value: "extra-long",
    label:
      "This is an extremely long option label that definitely will wrap to multiple lines and test how the component handles very long text content",
  },
];

// Stories
export const Default: Story = {
  args: {
    label: "Choose an option",
    options: simpleOptions,
  },
};

export const WithSearch: Story = {
  args: {
    label: "Search countries",
    options: countriesOptions,
    search: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Enable search to filter options. Search text is highlighted in results.",
      },
    },
  },
};

export const MultipleSelection: Story = {
  args: {
    label: "Select multiple fruits",
    options: simpleOptions,
    multipleSelect: true,
    search: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Allow users to select multiple options. Selected items appear as removable tags.",
      },
    },
  },
};

export const LargeDataset: Story = {
  args: {
    label: "Large dataset (1000 items)",
    options: largeDataset,
    search: true,
    maxHeight: 300,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Automatically uses virtualization for datasets with more than 100 options to maintain performance.",
      },
    },
  },
};

export const WithPortal: Story = {
  args: {
    label: "Portal dropdown",
    options: countriesOptions,
    usePortal: true,
    search: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Renders dropdown in a portal to avoid z-index issues. Useful when dropdown is inside modals or containers with overflow hidden.",
      },
    },
  },
};

export const OutlinedStyle: Story = {
  args: {
    label: "Outlined dropdown",
    options: simpleOptions,
    outlined: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Use outlined style for a more subtle appearance.",
      },
    },
  },
};

export const CustomWidth: Story = {
  args: {
    label: "Custom width",
    options: longLabelsOptions,
    width: "500px",
    search: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Customize dropdown width to accommodate longer labels.",
      },
    },
  },
};

export const FormIntegration: Story = {
  args: {
    label: "Form field",
    name: "category",
    options: simpleOptions,
  },
  render: (args) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        console.log("Form data:", Object.fromEntries(formData));
      }}
    >
      <Dropdown {...args} />
      <br />
      <br />
      <button
        type="submit"
        className="rounded bg-blue-500 px-4 py-2 text-white"
      >
        Submit Form
      </button>
    </form>
  ),
  parameters: {
    docs: {
      description: {
        story: "Dropdown works seamlessly with forms using hidden inputs.",
      },
    },
  },
};

export const CustomRendering: Story = {
  args: {
    label: "Custom option rendering",
    options: countriesOptions,
    search: true,
    render: ({ label, selected }) => (
      <div className={`flex items-center gap-2 ${selected ? "font-bold" : ""}`}>
        <span className="text-lg">🌍</span>
        <span>{label}</span>
        {selected && <span className="text-green-500">✓</span>}
      </div>
    ),
  },
  parameters: {
    docs: {
      description: {
        story: "Use the render prop to customize how options are displayed.",
      },
    },
  },
};

export const EmptyState: Story = {
  args: {
    label: "Empty dropdown",
    options: [],
    search: true,
  },
  parameters: {
    docs: {
      description: {
        story: "How the dropdown behaves with no options.",
      },
    },
  },
};

// Interactive story with state
export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = useState(null);
    const [multiSelected, setMultiSelected] = useState([]);

    return (
      <div className="space-y-6">
        <div>
          <h3 className="mb-2 text-lg font-semibold">Single Selection</h3>
          <Dropdown
            label="Choose one"
            options={simpleOptions}
            onChange={setSelected}
          />
          <p className="mt-2 text-sm text-gray-600">
            Selected: {selected ? JSON.stringify(selected) : "None"}
          </p>
        </div>

        <div>
          <h3 className="mb-2 text-lg font-semibold">Multiple Selection</h3>
          <Dropdown
            label="Choose multiple"
            options={simpleOptions}
            multipleSelect
            search
            onChange={(e) => {
              if (Array.isArray(e)) {
                setMultiSelected(e.map((item) => item.label));
              }
            }}
          />
          <p className="mt-2 text-sm text-gray-600">
            Selected:{" "}
            {multiSelected.length > 0 ? JSON.stringify(multiSelected) : "None"}
          </p>
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive example showing state management with both single and multiple selection modes.",
      },
    },
  },
};
