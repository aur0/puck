export type TextAlignment = 'left' | 'center' | 'right';
export type FontWeight = 'light' | 'regular' | 'medium' | 'bold';
export type TextColor = '' | 'indigo' | 'cyan' | 'orange' | 'crimson' | 'gray';
export type TextWrap = 'wrap' | 'nowrap' | 'pretty' | 'balance';

export const typographyFields = {
  size: {
    type: "select",
    options: [
      { label: "Size 1", value: "1" },
      { label: "Size 2", value: "2" },
      { label: "Size 3", value: "3" },
      { label: "Size 4", value: "4" },
      { label: "Size 5", value: "5" },
      { label: "Size 6", value: "6" },
      { label: "Size 7", value: "7" },
      { label: "Size 8", value: "8" },
      { label: "Size 9", value: "9" }
    ],
    defaultValue: "6"
  },
  weight: {
    type: "select",
    options: [
      { label: "Light", value: "light" },
      { label: "Regular", value: "regular" },
      { label: "Medium", value: "medium" },
      { label: "Bold", value: "bold" }
    ],
    defaultValue: "regular"
  },
  align: {
    type: "select",
    options: [
      { label: "Left", value: "left" },
      { label: "Center", value: "center" },
      { label: "Right", value: "right" }
    ],
    defaultValue: "left"
  },
  color: {
    type: "select",
    options: [
      { label: "Default", value: "" },
      { label: "Indigo", value: "indigo" },
      { label: "Cyan", value: "cyan" },
      { label: "Orange", value: "orange" },
      { label: "Crimson", value: "crimson" },
      { label: "Gray", value: "gray" }
    ],
    defaultValue: ""
  },
  highContrast: {
    type: "radio",
    options: [
      { label: "Default", value: false },
      { label: "High Contrast", value: true }
    ],
    defaultValue: false
  },
  truncate: {
    type: "radio",
    options: [
      { label: "No", value: false },
      { label: "Yes", value: true }
    ],
    defaultValue: false
  },
  wrap: {
    type: "select",
    options: [
      { label: "Wrap", value: "wrap" },
      { label: "No Wrap", value: "nowrap" },
      { label: "Pretty", value: "pretty" },
      { label: "Balance", value: "balance" }
    ],
    defaultValue: "wrap"
  }
} as const;
