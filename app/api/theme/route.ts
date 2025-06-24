import { NextResponse } from "next/server";
import fs from "fs";
import { revalidatePath } from "next/cache";

export async function GET() {
  try {
    const themeData = fs.existsSync("theme.json")
      ? JSON.parse(fs.readFileSync("theme.json", "utf-8"))
      : { colorPrimary: "#4b87c3" };
    return NextResponse.json(themeData);
  } catch (error) {
    console.error("Error reading theme:", error);
    return NextResponse.json({ colorPrimary: "#4b87c3" });
  }
}

export async function POST(request: Request) {
  try {
    const { color } = await request.json();

    // Update theme.json
    const themeData = {
      colorPrimary: color
    };
    fs.writeFileSync("theme.json", JSON.stringify(themeData, null, 2));

    // Revalidate cache
    revalidatePath("/api/theme");

    return NextResponse.json({ status: "ok", data: themeData });
  } catch (error) {
    console.error("Error updating theme:", error);
    return NextResponse.json(
      { error: "Failed to update theme" },
      { status: 500 }
    );
  }
}
