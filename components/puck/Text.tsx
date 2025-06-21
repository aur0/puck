import { Text as RadixText } from "@radix-ui/themes";

export const Text = {
  Text: {
    label: "Text",
    fields: {
      children: { type: "text", label: "Text" },
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
          { label: "Size 9", value: "9" },
        ],
        label: "Size"
      },
      weight: {
        type: "select",
        options: [
          { label: "Light", value: "light" },
          { label: "Regular", value: "regular" },
          { label: "Medium", value: "medium" },
          { label: "Bold", value: "bold" }
        ],
        label: "Weight"
      },
      align: {
        type: "select",
        options: [
          { label: "Left", value: "left" },
          { label: "Center", value: "center" },
          { label: "Right", value: "right" }
        ],
        label: "Alignment"
      },
      trim: {
        type: "select",
        options: [
          { label: "Normal", value: "normal" },
          { label: "Start", value: "start" },
          { label: "End", value: "end" },
          { label: "Both", value: "both" }
        ],
        label: "Trim"
      },
      wrap: {
        type: "select",
        options: [
          { label: "Wrap", value: "wrap" },
          { label: "No Wrap", value: "nowrap" },
          { label: "Pretty", value: "pretty" },
          { label: "Balance", value: "balance" }
        ],
        label: "Wrap"
      },
      color: {
        type: "select",
        options: [
          { label: "Gray", value: "gray" },
          { label: "Indigo", value: "indigo" },
          { label: "Cyan", value: "cyan" },
          { label: "Orange", value: "orange" },
          { label: "Crimson", value: "crimson" }
        ],
        label: "Color"
      },
      highContrast: {
        type: "radio",
        options: [
          { label: "Yes", value: true },
          { label: "No", value: false }
        ],
        label: "High Contrast"
      },
      as: {
        type: "select",
        options: [
          { label: "Paragraph", value: "p" },
          { label: "Span", value: "span" },
          { label: "Label", value: "label" },
          { label: "Div", value: "div" }
        ],
        label: "Element Type"
      }
    },
    defaultProps: {
      size: "3",
      weight: "regular",
      align: "left",
      trim: "normal",
      wrap: "wrap",
      color: "gray",
      highContrast: false,
      as: "p",
      children: "Your text here."
    },
    render: ({ children, size, weight, align, trim, wrap, color, highContrast, as }) => (
      <RadixText
        size={size}
        weight={weight}
        align={align}
        trim={trim}
        wrap={wrap}
        color={color}
        highContrast={highContrast}
        as={as}
      >
        {children}
      </RadixText>
    ),
  },
};