# iisayenko-makyo-dropdown

**Important**: This project is a technical test made for Makyo. It is not intended for production use.

- keyboard navigation is not implemented.
- unit testing are not done.

## ✨ Features

- 🔍 **Searchable** - Built-in search functionality with highlighting
- 🚀 **Virtualized** - Handles large datasets efficiently (>100 options)
- 🌐 **Portal Support** - Render dropdown outside component tree
- 🎯 **Single & Multiple Selection** - Flexible selection modes
- ♿ **Accessible** - ARIA compliant
- 🎨 **Customizable** - Custom rendering and styling options
- 🌙 **Dark Mode** - Built-in dark mode support
- 🔧 **Form Compatible** - Works with forms and hidden inputs
- ⚡ **TypeScript** - Full TypeScript support

## 📦 Installation

```bash
npm install iisayenko-makyo-dropdown
```

### Peer Dependencies

Make sure you have the required peer dependencies installed:

```bash
npm install react@^19.1.1 react-dom@^19.1.1
```

## 🚀 Quick Start

Importatn

```tsx
import { Dropdown } from "iisayenko-makyo-dropdown";
import "iisayenko-makyo-dropdown/dist/index.css";

const options = [
  { value: "1", label: "Option 1" },
  { value: "2", label: "Option 2" },
  { value: "3", label: "Option 3" },
];

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <Dropdown
      options={options}
      onChange={setSelected}
      label="Select an option"
    />
  );
}
```

## 📖 Usage Examples

**Important**: if your project already has Tailwind, is not necessary to import the CSS file.

### Basic Dropdown

```tsx
<Dropdown
  options={[
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "cherry", label: "Cherry" },
  ]}
  onChange={(value) => console.log("Selected:", value)}
  label="Choose a fruit"
/>
```

### Multiple Selection

```tsx
<Dropdown
  options={options}
  multipleSelect={true}
  onChange={(values) => console.log("Selected:", values)}
  label="Choose multiple options"
/>
```

### With Search

```tsx
<Dropdown
  options={options}
  search={true}
  onChange={(value) => console.log("Selected:", value)}
  label="Search and select"
/>
```

### Large Dataset with Virtualization

```tsx
const largeOptions = Array.from({ length: 1000 }, (_, i) => ({
  value: `option-${i}`,
  label: `Option ${i + 1}`,
}));

<Dropdown
  options={largeOptions}
  search={true}
  maxHeight={300}
  onChange={(value) => console.log("Selected:", value)}
  label="Large dataset"
/>;
```

### Portal Mode

```tsx
<Dropdown
  options={options}
  usePortal={true}
  onChange={(value) => console.log("Selected:", value)}
  label="Portal dropdown"
/>
```

### Custom Rendering

```tsx
<Dropdown
  options={options}
  render={({ label, selected }) => (
    <div className={`custom-option ${selected ? "selected" : ""}`}>
      <span>🎯</span> {label}
    </div>
  )}
  onChange={(value) => console.log("Selected:", value)}
  label="Custom rendered options"
/>
```

### Form Integration

```tsx
<form>
  <Dropdown
    name="category"
    options={categories}
    onChange={(value) => console.log("Form value:", value)}
    label="Category"
  />
  <button type="submit">Submit</button>
</form>
```

## 🔧 API Reference

### DropdownProps

| Prop             | Type                                                      | Default          | Description                     |
| ---------------- | --------------------------------------------------------- | ---------------- | ------------------------------- |
| `options`        | `SelectOption[]`                                          | **required**     | Array of options to display     |
| `onChange`       | `(value: SelectOption \| SelectOption[] \| null) => void` | `undefined`      | Callback when selection changes |
| `multipleSelect` | `boolean`                                                 | `false`          | Enable multiple selection       |
| `search`         | `boolean`                                                 | `false`          | Enable search functionality     |
| `usePortal`      | `boolean`                                                 | `false`          | Render dropdown in portal       |
| `name`           | `string`                                                  | `undefined`      | Form input name                 |
| `label`          | `string`                                                  | `undefined`      | Dropdown label                  |
| `id`             | `string`                                                  | `auto-generated` | Component ID                    |
| `width`          | `string`                                                  | `"350px"`        | Dropdown width                  |
| `maxHeight`      | `number`                                                  | `300`            | Maximum height of options list  |
| `outlined`       | `boolean`                                                 | `false`          | Use outlined style              |
| `render`         | `(props: RenderProps) => ReactNode`                       | `undefined`      | Custom option renderer          |

### SelectOption

```tsx
interface SelectOption {
  value: string;
  label: string;
}
```

### RenderProps

```tsx
interface RenderProps {
  label: string;
  selected: boolean;
}
```

## 🎨 Styling

The component uses Tailwind CSS classes and supports dark mode out of the box. You can customize the appearance by:

1. **Using the built-in classes** - The component responds to `dark` class on parent elements
2. **Custom CSS** - Override the default styles with your own CSS
3. **Custom rendering** - Use the `render` prop for complete control

### Dark Mode

The component automatically supports dark mode when a parent element has the `dark` class:

```tsx
<div className="dark">
  <Dropdown options={options} />
</div>
```

### Development Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/iisayenko-makyo-dropdown.git

# Install dependencies
npm install

# Start Storybook for development
npm run storybook

# Build the library
npm run build
```

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Virtualization powered by [react-virtuoso](https://virtuoso.dev/)
- Icons from [Lucide React](https://lucide.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)

**Made with ❤️ by Ivan Isayenko**
