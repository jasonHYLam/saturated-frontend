import styles from "./studyImage.module.css";
import { PositionMarker } from "./marker/PositionMarker";
import { NoteMarker } from "./marker/NoteMarker";
import { useAddImageToCanvas } from "../../../helpers/hooks";

export function StudyImage({
  imageLink,
  setCanvasElementDimensions,
  canvasRef,
  showAddNote,
  handleClick,
  allNotes,
  colorMode,
  setPositionOnImage,
  isMobile,
  imageFitMode,
}: StudyImageProps) {
  useAddImageToCanvas({
    canvasRef: canvasRef,
    imageLink: imageLink,
    setCanvasElementDimensions: setCanvasElementDimensions,
  });

  const colorModeStyle = colorMode === "color" ? `` : styles.grayscale;

  const imageFitModeStyle =
    imageFitMode === "fitHeight"
      ? `${styles.canvas} ${styles.fitToHeight}`
      : `${styles.canvas} ${styles.fitToWidth}`;

  const canvasEventHandlers = isMobile
    ? {
        onClick: (e: React.MouseEvent) => handleClick(isMobile, e),
      }
    : {
        onPointerMove: (e: React.MouseEvent) => setPositionOnImage(e),
        onClick: (e: React.MouseEvent) => handleClick(isMobile, e),
      };

  return (
    <>
      <section className={styles.canvasContainer}>
        <canvas
          // className={`${styles.canvas} ${colorModeStyle}`}
          className={`${imageFitModeStyle} ${colorModeStyle}`}
          {...canvasEventHandlers}
          ref={canvasRef}
        ></canvas>

        {showAddNote ? <PositionMarker /> : null}

        {allNotes.map((note) => (
          <NoteMarker note={note} key={note.id} />
        ))}
      </section>
    </>
  );
}

interface StudyImageProps {
  imageLink: string;
  setCanvasElementDimensions: React.Dispatch<
    React.SetStateAction<{ width: number; height: number }>
  >;
  canvasRef: React.RefObject<HTMLCanvasElement>;
  showAddNote: boolean;
  handleClick: HandleClickCallbackType;
  allNotes: Note[];
  colorMode: ColorModes;
  setPositionOnImage: setPositionOnImageCallbackType;
  isMobile: boolean;
  imageFitMode: ImageFitModes;
}
