type ColorModeOptions = "grayscale" | "color";

interface ToggleColorModeProps {
  setColorMode: React.Dispatch<React.SetStateAction<string>>;
  colorMode: ColorModeOptions;
}

export function ToggleColorMode({
  setColorMode,
  colorMode,
}: ToggleColorModeProps) {
  return (
    <>
      {colorMode === "color" ? (
        <button onClick={() => setColorMode("grayscale")}>Grayscale</button>
      ) : (
        <button onClick={() => setColorMode("color")}>Color</button>
      )}
    </>
  );
}
