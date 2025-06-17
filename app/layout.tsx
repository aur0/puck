import "./styles.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Theme accentColor="crimson" grayColor="sand" radius="large" scaling="95%">
          {children}
        </Theme>
      </body>
    </html>
  );
}
