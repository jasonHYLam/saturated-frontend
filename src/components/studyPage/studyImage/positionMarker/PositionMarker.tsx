import styles from "./positionMarker.module.css";

export function PositionMarker({ position }) {
  return (
    <>
      <div
        style={{
          top: position.y,
          left: position.x,
        }}
        className={styles.marker}
      ></div>
    </>
  );
}
