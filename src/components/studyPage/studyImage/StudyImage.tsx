import styles from "./studyImage.module.css";
import { PositionMarker } from "./marker/PositionMarker";
import { NoteMarker } from "./marker/NoteMarker";
import { useAddImageToCanvas } from "../../../helpers/hooks";

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
}

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
}: StudyImageProps) {
  useAddImageToCanvas({
    canvasRef: canvasRef,
    imageLink: imageLink,
    setCanvasElementDimensions: setCanvasElementDimensions,
  });

  const colorModeStyle = colorMode === "color" ? `` : styles.grayscale;

  const canvasEventHandlers = isMobile
    ? {
        onClick: (e) => handleClick(isMobile, e),
      }
    : {
        onPointerMove: (e) => {
          setPositionOnImage(e);
        },
        onClick: (e) => handleClick(isMobile, e),
      };

  return (
    <>
      <section className={styles.canvasContainer}>
        <canvas
          className={`${styles.canvas} ${colorModeStyle}`}
          {...canvasEventHandlers}
          ref={canvasRef}
        ></canvas>

        {showAddNote ? <PositionMarker /> : null}

        {allNotes.map((note) => (
          <NoteMarker note={note} />
        ))}
      </section>
    </>
  );
}
