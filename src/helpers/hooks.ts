import { useEffect, useState } from "react";
import { getDataFromFetch } from "./fetchData";
import { useNavigate } from "react-router-dom";

export function useGetAllStudies() {
  const [allStudies, setAllStudies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllStudies() {
      try {
        const allStudiesResponse = await getDataFromFetch("Study/allStudies");

        if (!allStudiesResponse.ok || allStudiesResponse instanceof Error) {
          navigate("/error");
        }

        console.log("checking allStudiesResponse");
        console.log(allStudiesResponse);

        const allStudies = await allStudiesResponse.json();
        console.log(allStudies);

        setLoading(false);
        setAllStudies(allStudies);
      } catch (err) {
        navigate("/error");
      }
    }
    fetchAllStudies();
  }, []);

  return { allStudies, loading };
}

export function useGetStudyAndNotes(studyId) {
  const [study, setStudy] = useState({});
  const [allNotes, setAllNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchStudy() {
      const response = await getDataFromFetch(`Study/${studyId}`);

      if (!response.ok || response instanceof Error) {
        navigate("/error");
      }

      const study = await response.json();

      setLoading(false);
      setStudy(study);
      setAllNotes(study.notes);
    }
    fetchStudy();
  }, []);

  return { study, loading, allNotes, setAllNotes };
}

export function useScreenResize({ canvasRef, setCanvasElementDimensions }) {
  useEffect(() => {
    function handleScreenResize(canvas) {
      setCanvasElementDimensions({
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      });
    }

    window.addEventListener("resize", () =>
      handleScreenResize(canvasRef.current)
    );

    return () => {
      window.removeEventListener("resize", () =>
        handleScreenResize(canvasRef.current)
      );
    };
  }, []);
}

// CanvasElementDimensions refer to the canvas HTML element, and is used for determining where to place notes.
// Canvas.width and canvas.height refer to the image height and width, which is used for determining color data from the image.
export function useAddImageToCanvas({
  canvasRef,
  imageLink,
  setCanvasElementDimensions,
}) {
  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas.getContext("2d");

    const studyImage = new Image();
    studyImage.crossOrigin = "Anonymous";
    studyImage.src = imageLink;
    studyImage.onload = () => {
      canvas.width = studyImage.naturalWidth;
      canvas.height = studyImage.naturalHeight;
      setCanvasElementDimensions({
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      });
      canvasContext.drawImage(studyImage, 0, 0);
    };
  }, []);
}

export function useMousePosition() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    setPosition({ x: newX, y: newY });
  }
  return { position, handleMouseMove };
}
