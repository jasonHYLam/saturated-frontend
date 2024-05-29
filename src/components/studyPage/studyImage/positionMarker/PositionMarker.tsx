import { useRef } from "react";
import styles from "./positionMarker.module.css";
import { getMarkerHeight } from "../../../../helpers/helpers";

export function PositionMarker({ normalisedClickedPosition }) {
  const markerRef = useRef(null);

  const markerHeight = getMarkerHeight(markerRef.current);

  return (
    <>
      <div
        ref={markerRef}
        style={{
          top: normalisedClickedPosition.y + markerHeight / 2 - 5,
          left: normalisedClickedPosition.x - markerHeight / 2,
        }}
        className={styles.marker}
      ></div>
    </>
  );
}
