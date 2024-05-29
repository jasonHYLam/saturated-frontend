export function ToggleColorMode({ setColorMode, colorMode }) {
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
