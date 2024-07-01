interface ToggleColorModeProps {
  setColorMode: React.Dispatch<React.SetStateAction<ColorModes>>;
  colorMode: ColorModes;
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
