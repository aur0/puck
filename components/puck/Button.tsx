import { Button as RadixButton } from "@radix-ui/themes";

export const Button = {
  Button: {
    label: "Button",
    fields: {
      label: { type: "text", label: "Text" },
      href: { type: "text", label: "Link URL" },
      variant: {
        type: "select",
        options: [
          { label: "Solid", value: "solid" },
          { label: "Soft", value: "soft" },
          { label: "Outline", value: "outline" },
          { label: "Surface", value: "surface" },
          { label: "Classic", value: "classic" },
          { label: "Ghost", value: "ghost" }
        ],
        label: "Variant"
      },
      size: {
        type: "select",
        options: [
          { label: "Small", value: "1" },
          { label: "Medium", value: "2" },
          { label: "Large", value: "3" },
          { label: "X-Large", value: "4" }
        ],
        label: "Size"
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
      }
    },
    defaultProps: {
      label: "Get Started",
      href: "#",
      variant: "solid",
      size: "2",
      color: "indigo",
      highContrast: false,
      radius: "medium"
    },
    render: ({
      label,
      href,
      variant,
      size,
      color,
      highContrast,
      radius
    }) => (
      <RadixButton
        asChild
        variant={variant}
        size={size}
        color={color}
        highContrast={highContrast}
        radius={radius}
      >
        <a href={href}>{label}</a>
      </RadixButton>
    )
  }
};
