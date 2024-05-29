import { createContext, useRef, useState } from "react";
import test from "../../assets/82620866_p0_master1200.jpg";

import { testNotes } from "../../helpers/testData";

import styles from "./studyPage.module.css";

import { StudyImage } from "./studyImage/StudyImage";
import { AddNote } from "./studyImage/notes/AddNote";
import { NotesContainer } from "./studyImage/notes/NotesContainer";
import { Note } from "./studyImage/notes/Note";

export const StudyPageContext = createContext({
  canvasElementDimensions: [],
  normalisedClickedPosition: {},
  activeMarkerAndNoteID: "",
  setActiveMarkerAndNoteID: () => {},
});

export function StudyPage() {
  const [clickedPositionFraction, setClickedPositionFraction] = useState({
    xFraction: 1,
    yFraction: 1,
  });
  const [clickedPixelColorData, setClickedPixelColorData] = useState("");
  // const [allNotes, setAllNotes] = useState([]);
  const [allNotes, setAllNotes] = useState(testNotes);
  const [activeMarkerAndNoteID, setActiveMarkerAndNoteID] = useState("");
  const [showAddNote, setShowAddNote] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [imageDimensions, setImageDimensions] = useState({
    width: 1,
    height: 1,
  });

  // console.log(activeMarkerAndNoteID);

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

  let pixelData;
  let pixelColorData = "";
  if (canvasContext) {
    pixelData = canvasContext?.getImageData(
      normalisedMousePositionForColor.x,
      normalisedMousePositionForColor.y,
      1,
      1
    ).data;
    pixelColorData = `rgb(${pixelData[0]} ${pixelData[1]} ${pixelData[2]})`;
  }

  function handleClick() {
    setClickedPositionFraction({
      xFraction: normalisedMousePositionFraction.x,
      yFraction: normalisedMousePositionFraction.y,
    });
    setShowAddNote(true);
    setClickedPixelColorData(pixelColorData);
  }

  // console.log(position);
  // console.log(imageDimensions);
  // console.log(canvasElementDimensions);
  // console.log(normalisedPosition);
  // console.log(canvasContext);
  // console.log(pixelColorData);
  // console.log("");

  const colorReferenceRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <main className={styles.page}>
        <header className={styles.header}>
          <p>Studying</p>

          <div
            ref={colorReferenceRef}
            className={styles.colorReference}
            style={{ backgroundColor: pixelColorData }}
          ></div>
        </header>

        <>
          <StudyPageContext.Provider
            value={{
              canvasElementDimensions,
              normalisedClickedPosition,
              activeMarkerAndNoteID,
              setActiveMarkerAndNoteID,
            }}
          >
            <section className={styles.pageContents}>
              <StudyImage
                setPosition={setPosition}
                setImageDimensions={setImageDimensions}
                setCanvasElementDimensions={setCanvasElementDimensions}
                canvasRef={canvasRef}
                normalisedClickedPosition={normalisedClickedPosition}
                showAddNote={showAddNote}
                handleClick={handleClick}
                allNotes={allNotes}
                canvasElementDimensions={canvasElementDimensions}
              />
              <section>
                <h1>Notes</h1>
                <NotesContainer allNotes={allNotes} />
                {/* <section>
                  {allNotes.map((note) => (
                    <Note note={note} />
                  ))}
                </section> */}
                {showAddNote ? (
                  <AddNote
                    setShowAddNote={setShowAddNote}
                    pixelColorData={clickedPixelColorData}
                    setAllNotes={setAllNotes}
                    allNotes={allNotes}
                    clickedPositionFraction={clickedPositionFraction}
                  />
                ) : null}
              </section>
            </section>
          </StudyPageContext.Provider>
        </>
      </main>
    </>
  );
}
