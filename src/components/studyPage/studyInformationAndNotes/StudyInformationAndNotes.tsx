import { useContext, useState } from "react";
import { StudyPageContext } from "../StudyPage";
import { AddNote } from "./notes/addNote/AddNote";
import { NotesContainer } from "./notesContainer/NotesContainer";
import { useNavigate } from "react-router-dom";
import styles from "./studyInformationAndNotes.module.css";
import { StudyInformation } from "./studyInformation/StudyInformation";

interface StudyInformationAndNotesProps {
  studyTitle: string;
  studyOriginalLink: string;
  studyId: number;
  showAddNote: boolean;
  setShowAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  clickedPixelColorData: { r: number; g: number; b: number };
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  clickedPositionFraction: { xFraction: number; yFraction: number };
  isMobile: boolean;
}

export function StudyInformationAndNotes({
  studyTitle,
  studyOriginalLink,
  studyId,
  showAddNote,
  setShowAddNote,
  clickedPixelColorData,
  setAllNotes,
  clickedPositionFraction,
  isMobile,
}: StudyInformationAndNotesProps) {
  const { allNotes } = useContext(StudyPageContext);
  const navigate = useNavigate();
  const [displayInfo, setDisplayInfo] = useState("notes");

  const studyInformationStyle = isMobile
    ? `${styles.studyInformation} ${styles.mobile}`
    : `${styles.studyInformation} `;
  return (
    <>
      <section className={studyInformationStyle}>
        <section>
          <button onClick={() => navigate("/")}>All studies</button>
          <button onClick={() => setDisplayInfo("study")}>Study</button>
          <button onClick={() => setDisplayInfo("notes")}>Notes</button>
        </section>
        {displayInfo === "study" ? (
          <StudyInformation
            studyTitle={studyTitle}
            studyOriginalLink={studyOriginalLink}
            studyId={studyId}
          />
        ) : (
          <section>
            {showAddNote ? (
              <AddNote
                studyId={studyId}
                setShowAddNote={setShowAddNote}
                pixelColorData={clickedPixelColorData}
                setAllNotes={setAllNotes}
                allNotes={allNotes}
                clickedPositionFraction={clickedPositionFraction}
              />
            ) : (
              <NotesContainer allNotes={allNotes} />
            )}
          </section>
        )}
      </section>
    </>
  );
}
