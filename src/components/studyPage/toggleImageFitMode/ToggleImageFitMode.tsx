interface ToggleImageFitModeProps {
  imageFitMode: ImageFitModes;
  setImageFitMode: React.Dispatch<React.SetStateAction<ImageFitModes>>;
}

export function ToggleImageFitMode({
  imageFitMode,
  setImageFitMode,
}: ToggleImageFitModeProps) {
  if (imageFitMode === "fitWidth") {
    return (
      <button onClick={() => setImageFitMode("fitHeight")}>
        Fit to height
      </button>
    );
  } else if (imageFitMode === "fitHeight") {
    return (
      <button onClick={() => setImageFitMode("fitWidth")}>Fit to width</button>
    );
  }
}
