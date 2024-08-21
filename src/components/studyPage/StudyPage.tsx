import { createContext, useRef, useState } from "react";
import styles from "./studyPage.module.css";
import { StudyImage } from "./studyImage/StudyImage";
import { ColorReference } from "./colorReference/ColorReference";
import { ToggleColorMode } from "./toggleColorMode/ToggleColorMode";
import { StudyInformationAndNotes } from "./studyInformationAndNotes/StudyInformationAndNotes";
import {
  useGetStudyAndNotes,
  useMousePosition,
  useScreenResize,
} from "../../helpers/hooks";
import { useParams } from "react-router-dom";
import { getColorDataForPixel } from "../../helpers/helpers";
import { Loading } from "../loading/Loading";

export const StudyPageContext = createContext<StudyPageContextProps>({
  hoveredMarkerAndNoteID: null,
  setHoveredMarkerAndNoteID: () => {},
  openedNoteID: null,
  setOpenedNoteID: () => {},
  setAllNotes: () => {},
  allNotes: [],
  canvasElementDimensions: { width: 1, height: 1 },
  normalisedClickedPosition: { x: 0, y: 0 },
  positionForNewMarker: { x: 0, y: 0 },
  positionForNewNote: { x: 0, y: 0 },
  colorPixelDataForNewNote: { r: 0, g: 0, b: 0 },
});

export function StudyPage() {
  const { studyId } = useParams() as { studyId: string };

  const [clickedPositionFraction, setClickedPositionFraction] = useState({
    x: 1,
    y: 1,
  });

  const [clickedPixelColorData, setClickedPixelColorData] = useState({
    r: 0,
    g: 0,
    b: 0,
  });
  const [imageFitMode, setImageFitMode] = useState("fitWidth");
  const [colorMode, setColorMode] = useState<ColorModes>("color");
  const [hoveredMarkerAndNoteID, setHoveredMarkerAndNoteID] = useState<
    number | null
  >(0);
  const [openedNoteID, setOpenedNoteID] = useState<number | null>(0);
  const [showAddNote, setShowAddNote] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const notesContainerRef = useRef<HTMLElement>(null);

  const { study, allNotes, setAllNotes, loading } =
    useGetStudyAndNotes(studyId);

  const { position, setPositionOnImage } = useMousePosition();

  let imageDimensions: { width: number; height: number };
  if (canvasRef.current) {
    imageDimensions = {
      width: canvasRef.current.width,
      height: canvasRef.current.height,
    };
  } else {
    imageDimensions = {
      width: 1,
      height: 1,
    };
  }

  const canvasContext = canvasRef.current?.getContext("2d");

  // Height and width of the canvas HTML element.
  const [canvasElementDimensions, setCanvasElementDimensions] = useState({
    width: 1,
    height: 1,
  });

  const isMobile = useScreenResize({ canvasRef, setCanvasElementDimensions });

  // Mouse position normalised to the canvas dimensions.
  const normalisedMousePositionFraction = {
    x: position.x / canvasElementDimensions.width,
    y: position.y / canvasElementDimensions.height,
  };

  // Clicked position on canvas. Scales with canvas.
  const normalisedClickedPosition = {
    x: clickedPositionFraction.x * canvasElementDimensions.width,
    y: clickedPositionFraction.y * canvasElementDimensions.height,
  };

  let colorDataForPixel: ColorDataType;
  if (canvasContext && imageDimensions) {
    colorDataForPixel = getColorDataForPixel({
      normalisedMousePositionFraction: normalisedMousePositionFraction,
      imageDimensions: imageDimensions,
      canvasContext: canvasContext,
    });
  } else {
    colorDataForPixel = {
      r: 0,
      g: 0,
      b: 0,
    };
  }

  function handleClick(isMobile: boolean, e: React.MouseEvent) {
    if (isMobile) {
      setPositionOnImage(e);
    }

    setClickedPositionFraction({
      x: normalisedMousePositionFraction.x,
      y: normalisedMousePositionFraction.y,
    });
    setShowAddNote(true);
    setClickedPixelColorData(colorDataForPixel);
  }

  const positionForNewMarker = isMobile ? position : normalisedClickedPosition;
  const positionForNewNote = isMobile
    ? normalisedMousePositionFraction
    : clickedPositionFraction;
  const colorPixelDataForNewNote = isMobile
    ? colorDataForPixel
    : clickedPixelColorData;

  return loading ? (
    <Loading />
  ) : (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <article className={styles.colorReferenceContainer}>
            <ColorReference colorData={colorDataForPixel} />
            <ToggleColorMode
              colorMode={colorMode}
              setColorMode={setColorMode}
            />
          </article>
        </header>

        <>
          <StudyPageContext.Provider
            value={{
              canvasElementDimensions,
              normalisedClickedPosition,
              hoveredMarkerAndNoteID,
              setHoveredMarkerAndNoteID,
              openedNoteID,
              setOpenedNoteID,
              setAllNotes,
              allNotes,
              positionForNewMarker: positionForNewMarker,
              positionForNewNote: positionForNewNote,
              colorPixelDataForNewNote,
            }}
          >
            <section className={styles.pageContents}>
              <StudyImage
                imageLink={study.imageLink}
                setCanvasElementDimensions={setCanvasElementDimensions}
                canvasRef={canvasRef}
                showAddNote={showAddNote}
                handleClick={handleClick}
                allNotes={allNotes}
                colorMode={colorMode}
                setPositionOnImage={setPositionOnImage}
                isMobile={isMobile}
              />

              <StudyInformationAndNotes
                studyTitle={study.title}
                studyOriginalLink={study.originalLink}
                studyId={Number(studyId)}
                showAddNote={showAddNote}
                setShowAddNote={setShowAddNote}
                setAllNotes={setAllNotes}
              />
            </section>
          </StudyPageContext.Provider>
        </>
      </main>
    </>
  );
}
