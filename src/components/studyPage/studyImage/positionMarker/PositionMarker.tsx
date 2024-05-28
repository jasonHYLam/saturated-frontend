import { useRef } from "react";
import styles from "./positionMarker.module.css";
import { getMarkerHeight } from "../../../../helpers/helpers";

export function PositionMarker({ position }) {
  const markerRef = useRef(null);

  const markerHeight = getMarkerHeight(markerRef.current);

  return (
    <>
      <div
        ref={markerRef}
        style={{
          top: position.y + markerHeight / 2 - 5,
          left: position.x - markerHeight / 2,
        }}
        className={styles.marker}
      ></div>
    </>
  );
}
