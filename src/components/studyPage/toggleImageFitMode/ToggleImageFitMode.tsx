interface ToggleImageFitModeProps {
  imageFitMode: ImageFitModes;
  setImageFitMode: React.Dispatch<React.SetStateAction<ImageFitModes>>;
}

export function ToggleImageFitMode({
  imageFitMode,
  setImageFitMode,
}: ToggleImageFitModeProps) {
  function handleClick() {}
  return <button>Toggle image fit</button>;
}
