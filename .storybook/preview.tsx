import "../src/index.css";
import type { Preview } from "@storybook/react-vite";
import type { StoryContext, StoryFn } from "@storybook/react";

const withDarkMode = (Story: StoryFn, context: StoryContext) => {
  const isDark = context.globals.backgrounds?.value === "dark";
  return (
    <div className={isDark ? "dark" : ""}>{Story(context.args, context)}</div>
  );
};

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#1a1a1a" },
      ],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  decorators: [withDarkMode],
};

export default preview;
