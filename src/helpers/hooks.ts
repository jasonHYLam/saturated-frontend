import { useEffect, useState } from "react";
import { getDataFromFetch } from "./fetchData";
import { useNavigate } from "react-router-dom";
import { MOBILE_BREAKPOINT } from "./constants";

export function useGetAllStudies() {
  const [allStudies, setAllStudies] = useState<StudyPreview[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchAllStudies() {
      try {
        const allStudiesResponse = await getDataFromFetch("Study/allStudies");

        if (allStudiesResponse instanceof Error) {
          return navigate("/error");
        }
        if (allStudiesResponse.status === 401) {
          return navigate("/login");
        } else if (!allStudiesResponse.ok) {
          return navigate("/error");
        } else {
          const allStudies = await allStudiesResponse.json();
          setLoading(false);
          setAllStudies(allStudies);
        }
      } catch (err) {
        return navigate("/error");
      }
    }
    fetchAllStudies();
  }, []);

  return { allStudies, loading };
}

export function useGetStudyAndNotes(studyId: string) {
  const [study, setStudy] = useState<Study>({
    id: 0,
    title: "",
    originalLink: "",
    imageLink: "",
    dateUploaded: new Date(),
    notes: [],
  });
  const [allNotes, setAllNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    async function fetchStudy() {
      const response = await getDataFromFetch(`Study/${studyId}`);

      if (response instanceof Error) {
        return navigate("/error");
      }

      if (response.status === 401) {
        navigate("/login");
      } else if (response.status === 403) {
        navigate("/");
      } else if (!response.ok) {
        navigate("/error");
      } else {
        const study = await response.json();

        setLoading(false);
        setStudy(study);
        setAllNotes(study.notes);
      }
    }
    fetchStudy();
  }, []);

  return { study, loading, allNotes, setAllNotes };
}

interface useScreenResizeProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  setCanvasElementDimensions: React.Dispatch<
    React.SetStateAction<CanvasElementDimensions>
  >;
}

export function useScreenResize({
  canvasRef,
  setCanvasElementDimensions,
}: useScreenResizeProps) {
  const [screenSize, setScreenSize] = useState(window.innerWidth);

  useEffect(() => {
    function handleScreenResize(canvas: HTMLCanvasElement) {
      setCanvasElementDimensions({
        width: canvas.clientWidth,
        height: canvas.clientHeight,
      });
      setScreenSize(window.innerWidth);
    }

    window.addEventListener("resize", () => {
      if (!canvasRef.current) return;
      handleScreenResize(canvasRef.current);
    });

    return () => {
      window.removeEventListener("resize", () => {
        if (!canvasRef.current) return;
        handleScreenResize(canvasRef.current);
      });
    };
  }, []);

  const isMobile = screenSize <= MOBILE_BREAKPOINT;

  return isMobile;
}

interface useAddImageToCanvasProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  imageLink: string;
  setCanvasElementDimensions: React.Dispatch<
    React.SetStateAction<CanvasElementDimensions>
  >;
}

// CanvasElementDimensions refer to the canvas HTML element, and is used for determining where to place notes.
// Canvas.width and canvas.height refer to the image height and width, which is used for determining color data from the image.
export function useAddImageToCanvas({
  canvasRef,
  imageLink,
  setCanvasElementDimensions,
}: useAddImageToCanvasProps) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
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
      if (!canvasContext) return;
      canvasContext.drawImage(studyImage, 0, 0);
    };
  }, []);
}

interface useMousePositionReturnType {
  position: { x: number; y: number };
  setPositionOnImage: setPositionOnImageCallbackType;
}
export function useMousePosition(): useMousePositionReturnType {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  function setPositionOnImage(e: React.MouseEvent) {
    const rect = e.currentTarget.getBoundingClientRect();
    const newX = e.clientX - rect.left;
    const newY = e.clientY - rect.top;
    setPosition({ x: newX, y: newY });
  }

  return { position, setPositionOnImage };
}

export function useGuest() {
  const navigate = useNavigate();
  const [isGuest, setIsGuest] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getIsGuest() {
      const response = await getDataFromFetch("User/isGuest");

      if (response instanceof Error) {
        navigate("/error");
      } else if (response.status === 401) {
        navigate("/login");
      } else if (!response.ok) {
        navigate("/error");
      } else {
        const isGuest = await response.json();
        setIsGuest(isGuest);
        setLoading(false);
      }
    }
    getIsGuest();
  }, []);

  return { isGuest, loading };
}
