interface ToggleImageFitModeProps {
  imageFitMode: ImageFitModes;
  setImageFitMode: React.Dispatch<React.SetStateAction<ImageFitModes>>;
}

export function ToggleImageFitMode({
  imageFitMode,
  setImageFitMode,
}: ToggleImageFitModeProps) {
  function handleClick() {
    if (imageFitMode === "fitWidth") {
      setImageFitMode("fitHeight");
    } else if (imageFitMode === "fitHeight") {
      setImageFitMode("fitWidth");
    }
  }
  return <button onClick={handleClick}>Toggle image fit</button>;
}
