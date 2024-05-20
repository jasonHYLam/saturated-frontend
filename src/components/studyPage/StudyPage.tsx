import { useEffect, useRef, useState } from "react";
import test from "../../assets/82620866_p0_master1200.jpg";

import styles from "./studyPage.module.css";
export function StudyPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvasContext = canvasRef.current.getContext("2d");
    }
    setIsLoaded(true);
  }, []);
  return (
    <>
      <p>Studying</p>

      <img className={styles.image} src={test} alt="" />
      {isLoaded ? <canvas ref={canvasRef}></canvas> : null}
    </>
  );
}
