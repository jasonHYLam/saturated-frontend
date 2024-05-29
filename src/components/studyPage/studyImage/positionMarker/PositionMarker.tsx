import styles from "./marker.module.css";
import { MARKER_HEIGHT } from "../../../../helpers/constants";

export function PositionMarker({ normalisedClickedPosition }) {
  return (
    <>
      <div
        style={{
          top: normalisedClickedPosition.y + MARKER_HEIGHT / 2 - 5,
          left: normalisedClickedPosition.x - MARKER_HEIGHT / 2,
        }}
        className={styles.marker}
      ></div>
    </>
  );
}
