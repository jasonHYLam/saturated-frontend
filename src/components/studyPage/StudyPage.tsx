import { createContext, useRef, useState } from "react";
import styles from "./studyPage.module.css";
import { StudyImage } from "./studyImage/StudyImage";
import { ColorReference } from "./colorReference/ColorReference";
import { ToggleColorMode } from "./toggleColorMode/ToggleColorMode";
import { StudyInformationAndNotes } from "./studyInformationAndNotes/StudyInformationAndNotes";
import {
  useGetStudyAndNotes,
  useGuest,
  useMousePosition,
  useScreenResize,
} from "../../helpers/hooks";
import { useParams } from "react-router-dom";
import { getColorDataForPixel } from "../../helpers/helpers";

export const StudyPageContext = createContext({
  canvasElementDimensions: [],
  normalisedClickedPosition: {},
  activeMarkerAndNoteID: "",
  setActiveMarkerAndNoteID: () => {},
  setAllNotes: () => {},
  allNotes: [],
});

export function StudyPage() {
  const { studyId } = useParams();

  const [clickedPositionFraction, setClickedPositionFraction] = useState({
    xFraction: 1,
    yFraction: 1,
  });

  const [clickedPixelColorData, setClickedPixelColorData] = useState({
    r: 0,
    g: 0,
    b: 0,
  });
  const [colorMode, setColorMode] = useState("color");
  const [hoveredMarkerAndNoteID, setHoveredMarkerAndNoteID] = useState("");
  const [openedNoteID, setOpenedNoteID] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const { study, allNotes, setAllNotes, loading } =
    useGetStudyAndNotes(studyId);

  const { position, setPositionOnImage } = useMousePosition();

  const imageDimensions = {
    width: canvasRef.current?.width,
    height: canvasRef.current?.height,
  };

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
    x: clickedPositionFraction.xFraction * canvasElementDimensions.width,
    y: clickedPositionFraction.yFraction * canvasElementDimensions.height,
  };

  const colorDataForPixel = getColorDataForPixel(
    normalisedMousePositionFraction,
    imageDimensions,
    canvasContext
  );

  function handleClick(isMobile, e) {
    if (isMobile) {
      setPositionOnImage(e);
    }

    setClickedPositionFraction({
      xFraction: normalisedMousePositionFraction.x,
      yFraction: normalisedMousePositionFraction.y,
    });
    setShowAddNote(true);
    setClickedPixelColorData(colorDataForPixel);
  }

  const pageStyle = isMobile
    ? `${styles.pageContents} ${styles.mobile}`
    : `${styles.pageContents} ${styles.desktop}`;

  return loading ? (
    <p>loading...</p>
  ) : (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <ColorReference colorData={colorDataForPixel} size="large" />
          <ToggleColorMode colorMode={colorMode} setColorMode={setColorMode} />
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
            }}
          >
            <section className={pageStyle}>
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
                studyId={studyId}
                showAddNote={showAddNote}
                setShowAddNote={setShowAddNote}
                clickedPixelColorData={clickedPixelColorData}
                setAllNotes={setAllNotes}
                clickedPositionFraction={clickedPositionFraction}
                isMobile={isMobile}
              />
            </section>
          </StudyPageContext.Provider>
        </>
      </main>
    </>
  );
}
