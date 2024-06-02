import styles from "./marker.module.css";
import { MARKER_HEIGHT } from "../../../../helpers/constants";
import { useContext } from "react";
import { StudyPageContext } from "../../StudyPage";

export function PositionMarker() {
  const { normalisedClickedPosition } = useContext(StudyPageContext);
  return (
    <>
      <div
        style={{
          top: normalisedClickedPosition.y + MARKER_HEIGHT / 2 - 5,
          left: normalisedClickedPosition.x - MARKER_HEIGHT / 2,
        }}
        className={styles.positionMarker}
      />
    </>
  );
}
