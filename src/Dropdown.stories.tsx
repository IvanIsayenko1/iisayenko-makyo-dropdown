import { Dropdown } from "./Dropdown";
import type { Meta } from "@storybook/react";
import { Option } from "./Option";
import { Search } from "./Search";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  subcomponents: {
    Option: Option,
    Search: Search,
  },
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Dropdown label",
    },
    multipleSelect: {
      control: "boolean",
      description: "Enable multiple select",
    },
    search: {
      control: "boolean",
      description: "Enable search",
    },
    name: {
      control: "text",
      description: "Dropdown name",
    },
    maxHeight: {
      control: "number",
      description: "Dropdown options container max height",
    },
    width: {
      control: "text",
      description: "Dropdown width",
    },
    outlined: {
      control: "boolean",
      description: "Enable outlined style",
    },
    options: {
      control: "object",
    },
  },
};

export default meta;

export const Default = {
  args: {
    label: "Dropdown",
    multipleSelect: false,
    search: true,
    name: "dropdown",
    usePortal: false,
    maxHeight: 300,
    width: "350px",
    outlined: false,
    options: [
      { value: "value-1", label: "Long text" },
      { value: "value-2", label: "Long" },
      { value: "value-3", label: "Long text with some meaningful content" },
      {
        value: "value-4",
        label: "Long text more",
      },
      { value: "value-5", label: "Long text example five" },
      { value: "value-6", label: "Long text example six with additional info" },
      {
        value: "value-7",
        label: "Long text example seven with meaningful content",
      },
      {
        value: "value-8",
        label: "Long text example eight with more meaningful content",
      },
      { value: "value-9", label: "Long text example nine with extra details" },
      {
        value: "value-10",
        label: "Long text example ten with extended description",
      },
      { value: "value-11", label: "Long text example eleven" },
      {
        value: "value-12",
        label: "Long text example twelve with some content",
      },
      {
        value: "value-13",
        label: "Long text example thirteen with meaningful details",
      },
      {
        value: "value-14",
        label: "Long text example fourteen with extra meaningful content",
      },
      { value: "value-15", label: "Long text example fifteen" },
      {
        value: "value-16",
        label: "Long text example sixteen with some extra text",
      },
      {
        value: "value-17",
        label: "Long text example seventeen with meaningful content",
      },
      {
        value: "value-18",
        label: "Long text example eighteen with more details and content",
      },
      { value: "value-19", label: "Long text example nineteen" },
      {
        value: "value-20",
        label: "Long text example twenty with extra meaningful text",
      },
      { value: "value-21", label: "Long text example twenty-one" },
      {
        value: "value-22",
        label: "Long text example twenty-two with some content",
      },
      {
        value: "value-23",
        label: "Long text example twenty-three with meaningful details",
      },
      {
        value: "value-24",
        label: "Long text example twenty-four with extended content",
      },
      { value: "value-25", label: "Long text example twenty-five" },
      {
        value: "value-26",
        label: "Long text example twenty-six with extra info",
      },
      {
        value: "value-27",
        label: "Long text example twenty-seven with meaningful content",
      },
      {
        value: "value-28",
        label: "Long text example twenty-eight with additional details",
      },
      { value: "value-29", label: "Long text example twenty-nine" },
      {
        value: "value-30",
        label: "Long text example thirty with some content",
      },
      { value: "value-31", label: "Long text example thirty-one" },
      {
        value: "value-32",
        label: "Long text example thirty-two with extra details",
      },
      {
        value: "value-33",
        label: "Long text example thirty-three with meaningful content",
      },
      {
        value: "value-34",
        label: "Long text example thirty-four with extended description",
      },
      { value: "value-35", label: "Long text example thirty-five" },
      {
        value: "value-36",
        label: "Long text example thirty-six with extra content",
      },
      { value: "value-37", label: "Long text example thirty-seven" },
      {
        value: "value-38",
        label: "Long text example thirty-eight with meaningful details",
      },
      { value: "value-39", label: "Long text example thirty-nine" },
      { value: "value-40", label: "Long text example forty with extra text" },
      { value: "value-41", label: "Long text example forty-one" },
      {
        value: "value-42",
        label: "Long text example forty-two with some content",
      },
      { value: "value-43", label: "Long text example forty-three" },
      {
        value: "value-44",
        label: "Long text example forty-four with extended meaningful content",
      },
      { value: "value-45", label: "Long text example forty-five" },
      {
        value: "value-46",
        label: "Long text example forty-six with additional details",
      },
      {
        value: "value-47",
        label: "Long text example forty-seven with meaningful text",
      },
      {
        value: "value-48",
        label: "Long text example forty-eight with more content",
      },
      { value: "value-49", label: "Long text example forty-nine" },
      {
        value: "value-50",
        label: "Long text example fifty with extra content",
      },
      { value: "value-51", label: "Long text example fifty-one" },
      {
        value: "value-52",
        label: "Long text example fifty-two with extra meaningful text",
      },
      { value: "value-53", label: "Long text example fifty-three" },
      {
        value: "value-54",
        label: "Long text example fifty-four with meaningful details",
      },
      { value: "value-55", label: "Long text example fifty-five" },
      {
        value: "value-56",
        label: "Long text example fifty-six with extra info",
      },
      {
        value: "value-57",
        label: "Long text example fifty-seven with additional content",
      },
      { value: "value-58", label: "Long text example fifty-eight" },
      {
        value: "value-59",
        label: "Long text example fifty-nine with some details",
      },
      { value: "value-60", label: "Long text example sixty" },
      { value: "value-61", label: "Long text example sixty-one" },
      {
        value: "value-62",
        label: "Long text example sixty-two with extra content",
      },
      { value: "value-63", label: "Long text example sixty-three" },
      {
        value: "value-64",
        label: "Long text example sixty-four with meaningful details",
      },
      { value: "value-65", label: "Long text example sixty-five" },
      {
        value: "value-66",
        label: "Long text example sixty-six with additional info",
      },
      {
        value: "value-67",
        label: "Long text example sixty-seven with extended description",
      },
      { value: "value-68", label: "Long text example sixty-eight" },
      {
        value: "value-69",
        label: "Long text example sixty-nine with extra content",
      },
      { value: "value-70", label: "Long text example seventy" },
      { value: "value-71", label: "Long text example seventy-one" },
      {
        value: "value-72",
        label: "Long text example seventy-two with meaningful content",
      },
      { value: "value-73", label: "Long text example seventy-three" },
      {
        value: "value-74",
        label: "Long text example seventy-four with extra details",
      },
      { value: "value-75", label: "Long text example seventy-five" },
      {
        value: "value-76",
        label: "Long text example seventy-six with extended info",
      },
      { value: "value-77", label: "Long text example seventy-seven" },
      {
        value: "value-78",
        label: "Long text example seventy-eight with more content",
      },
      { value: "value-79", label: "Long text example seventy-nine" },
      {
        value: "value-80",
        label: "Long text example eighty with meaningful details",
      },
      { value: "value-81", label: "Long text example eighty-one" },
      {
        value: "value-82",
        label: "Long text example eighty-two with extra info",
      },
      { value: "value-83", label: "Long text example eighty-three" },
      {
        value: "value-84",
        label: "Long text example eighty-four with additional content",
      },
      { value: "value-85", label: "Long text example eighty-five" },
      { value: "value-86", label: "Long text example eighty-six" },
      {
        value: "value-87",
        label: "Long text example eighty-seven with extra text",
      },
      { value: "value-88", label: "Long text example eighty-eight" },
      {
        value: "value-89",
        label: "Long text example eighty-nine with meaningful content",
      },
      { value: "value-90", label: "Long text example ninety" },
      {
        value: "value-91",
        label: "Long text example ninety-one with some extra details",
      },
      { value: "value-92", label: "Long text example ninety-two" },
      {
        value: "value-93",
        label: "Long text example ninety-three with extended info",
      },
      { value: "value-94", label: "Long text example ninety-four" },
      {
        value: "value-95",
        label: "Long text example ninety-five with extra content",
      },
      { value: "value-96", label: "Long text example ninety-six" },
      {
        value: "value-97",
        label: "Long text example ninety-seven with additional info",
      },
      { value: "value-98", label: "Long text example ninety-eight" },
      {
        value: "value-99",
        label: "Long text example ninety-nine with meaningful content",
      },
      { value: "value-100", label: "Long text example one hundred" },
      { value: "value-101", label: "Long text example one hundred-one" },
      { value: "value-102", label: "Long text example one hundred-two" },
      { value: "value-103", label: "Long text example one hundred-three" },
    ],
  },
  render: (args) => <Dropdown {...args} />,
};
