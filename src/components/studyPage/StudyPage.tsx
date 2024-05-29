import { useRef, useState } from "react";
import test from "../../assets/82620866_p0_master1200.jpg";

import styles from "./studyPage.module.css";

import { StudyImage } from "./studyImage/StudyImage";
import { AddNote } from "./studyImage/notes/AddNote";

export function StudyPage() {
  // need to convert this into fraction, and then somehow use canvas dimensions, maybe multiply
  // this might depend on position or normalisedPosition
  // so, normalisedby canvas Element, call that normalisedPositionAsFraction and create another variable for normalisedClickedPosition
  const [clickedPositionFraction, setClickedPositionFraction] = useState({
    xFraction: 1,
    yFraction: 1,
  });
  const [clickedPixelColorData, setClickedPixelColorData] = useState("");
  const [allNotes, setAllNotes] = useState([]);
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

  const normalisedClickedPosition = {
    x: clickedPositionFraction.xFraction * canvasElementDimensions.width,
    y: clickedPositionFraction.yFraction * canvasElementDimensions.height,
  };

  // this should only work for color
  // but why does this work for clickedPosition, surely imageDims isn't necessary...
  // oh maybe at the start imageDim is the same as canvasElemDim

  const normalisedMousePositionFraction = {
    x: position.x / canvasElementDimensions.width,
    y: position.y / canvasElementDimensions.height,
  };

  const normalisedMousePositionForColor = {
    x: normalisedMousePositionFraction.x * imageDimensions.width,
    y: normalisedMousePositionFraction.y * imageDimensions.height,
  };

  const normalisedMousePosition = {
    x: (position.x * imageDimensions.width) / canvasElementDimensions.width,
    y: (position.y * imageDimensions.height) / canvasElementDimensions.height,
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
          <p>{/* x: {position.x}, y: {position.y} */}</p>
          <p></p>

          <div
            ref={colorReferenceRef}
            className={styles.colorReference}
            style={{ backgroundColor: pixelColorData }}
          ></div>
        </header>

        <>
          <section className={styles.pageContents}>
            <StudyImage
              setPosition={setPosition}
              setImageDimensions={setImageDimensions}
              setCanvasElementDimensions={setCanvasElementDimensions}
              canvasRef={canvasRef}
              normalisedClickedPosition={normalisedClickedPosition}
              showAddNote={showAddNote}
              handleClick={handleClick}
              // used for testing mouse after changing screen dimensions
              normalisedMousePosition={normalisedMousePosition}
            />
            <section>
              <h1>Notes</h1>
              <section></section>
              <div></div>
              {showAddNote ? (
                <AddNote
                  setShowAddNote={setShowAddNote}
                  pixelColorData={clickedPixelColorData}
                  setAllNotes={setAllNotes}
                  allNotes={allNotes}
                />
              ) : null}
              {/* <textarea name="" id="" cols="30" rows="10"></textarea> */}
            </section>
          </section>
        </>
      </main>
    </>
  );
}
