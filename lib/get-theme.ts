import * as fs from 'fs';

// Replace with call to your theme database
export const getTheme = () => {
  const themeData = fs.existsSync("theme.json")
    ? JSON.parse(fs.readFileSync("theme.json", "utf-8"))
    : null;

  return themeData;
};