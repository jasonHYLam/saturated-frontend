import { createContext, useEffect, useRef, useState } from "react";
import { testNotes } from "../../helpers/testData";
import styles from "./studyPage.module.css";
import { StudyImage } from "./studyImage/StudyImage";
import { AddNote } from "./studyImage/notes/addNote/AddNote";
import { NotesContainer } from "./studyImage/notesContainer/NotesContainer";
import { ColorReference } from "./colorReference/ColorReference";
import { ToggleColorMode } from "./toggleColorMode/ToggleColorMode";
import { useGetStudy } from "../../helpers/hooks";
import { useParams } from "react-router-dom";

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
  const { study, loading } = useGetStudy(studyId);

  console.log("checking study");
  console.log(study);

  console.log("checking loading");
  console.log(loading);

  const [clickedPositionFraction, setClickedPositionFraction] = useState({
    xFraction: 1,
    yFraction: 1,
  });
  const [clickedPixelColorData, setClickedPixelColorData] = useState({
    r: 0,
    g: 0,
    b: 0,
  });
  const [allNotes, setAllNotes] = useState([]);
  // const [allNotes, setAllNotes] = useState(testNotes);
  const [colorMode, setColorMode] = useState("color");
  const [hoveredMarkerAndNoteID, setHoveredMarkerAndNoteID] = useState("");
  const [openedNoteID, setOpenedNoteID] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({
    width: 1,
    height: 1,
  });

  // this differs from the canvas dimensions set at the start, which pertain to the imageDimensions
  const [canvasElementDimensions, setCanvasElementDimensions] = useState({
    width: 1,
    height: 1,
  });

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

  // Position that corresponds to the canvas image, to obtain colorData of the pixel at the mouse position.
  const normalisedMousePositionForColor = {
    x: normalisedMousePositionFraction.x * imageDimensions.width,
    y: normalisedMousePositionFraction.y * imageDimensions.height,
  };

  const canvasContext = canvasRef.current?.getContext("2d");

  // For the purpose of converting rgb to hex, and perhaps converting to grayscale
  let pixelColorDataObject = { r: 0, g: 0, b: 0 };
  if (canvasContext) {
    const pixelData = canvasContext?.getImageData(
      normalisedMousePositionForColor.x,
      normalisedMousePositionForColor.y,
      1,
      1
    ).data;
    pixelColorDataObject = {
      r: pixelData[0],
      g: pixelData[1],
      b: pixelData[2],
    };
  }

  function handleClick() {
    setClickedPositionFraction({
      xFraction: normalisedMousePositionFraction.x,
      yFraction: normalisedMousePositionFraction.y,
    });
    setShowAddNote(true);
    setClickedPixelColorData(pixelColorDataObject);
  }

  // console.log(position);
  // console.log(imageDimensions);
  // console.log(canvasElementDimensions);
  // console.log(normalisedPosition);
  // console.log(canvasContext);
  // console.log(pixelColorData);
  // console.log("");

  return loading ? (
    <p>loading...</p>
  ) : (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <ColorReference colorData={pixelColorDataObject} size="large" />
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
            <section className={styles.pageContents}>
              <StudyImage
                imageLink={study.imageLink}
                setPosition={setPosition}
                setImageDimensions={setImageDimensions}
                setCanvasElementDimensions={setCanvasElementDimensions}
                canvasRef={canvasRef}
                showAddNote={showAddNote}
                handleClick={handleClick}
                allNotes={allNotes}
                colorMode={colorMode}
              />
              <section className={styles.notesSection}>
                <h1>Notes</h1>
                {showAddNote ? (
                  <AddNote
                    setShowAddNote={setShowAddNote}
                    pixelColorData={clickedPixelColorData}
                    setAllNotes={setAllNotes}
                    allNotes={allNotes}
                    clickedPositionFraction={clickedPositionFraction}
                  />
                ) : (
                  <NotesContainer allNotes={allNotes} />
                )}
              </section>
            </section>
          </StudyPageContext.Provider>
        </>
      </main>
    </>
  );
}
