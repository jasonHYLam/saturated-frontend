import { useRef } from "react";
import styles from "./marker.module.css";
import { MARKER_HEIGHT } from "../../../../helpers/constants";

export function PositionMarker({ normalisedClickedPosition }) {
  const markerRef = useRef(null);

  return (
    <>
      <div
        ref={markerRef}
        style={{
          top: normalisedClickedPosition.y + MARKER_HEIGHT / 2 - 5,
          left: normalisedClickedPosition.x - MARKER_HEIGHT / 2,
        }}
        className={styles.marker}
      ></div>
    </>
  );
}
