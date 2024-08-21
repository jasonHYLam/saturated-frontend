interface Study {
  id: number;
  title: string;
  originalLink: string;
  imageLink: string;
  dateUploaded: Date;
  notes: Note[];
}

interface StudyPreview {
  id: number;
  title: string;
  thumbnailLink: string;
  dateUploaded: Date;
}

interface Note {
  id: number;
  text: string;
  originalHexColor: string;
  guessedHexColor: string;
  xOrdinateAsFraction: number;
  yOrdinateAsFraction: number;
}

interface CanvasElementDimensions {
  width: number;
  height: number;
}

type ColorModes = "color" | "grayscale";

type HandleClickCallbackType = (isMobile: boolean, e: React.MouseEvent) => void;
type setPositionOnImageCallbackType = (e: React.MouseEvent) => void;

interface ColorDataType {
  r: number;
  g: number;
  b: number;
}

type ImageFitModes = "fitHeight" | "fitWidth";
