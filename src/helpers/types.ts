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

interface StudyPageContextProps {
  hoveredMarkerAndNoteID: number | null;
  setHoveredMarkerAndNoteID: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  setOpenedNoteID: React.Dispatch<React.SetStateAction<number | null>>;
  openedNoteID: number | null;
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  allNotes: Note[];
  canvasElementDimensions: { width: number; height: number };
  normalisedClickedPosition: { x: number; y: number };
  positionForNewMarker: { x: number; y: number };
  positionForNewNote: { x: number; y: number };
  colorPixelDataForNewNote: { r: number; g: number; b: number };
}

type ImageFitMode = "fitHeight" | "fitWidth";
