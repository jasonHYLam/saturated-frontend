import { useContext, useState } from "react";
import { StudyPageContext } from "../StudyPage";
import { AddNote } from "./notes/addNote/AddNote";
import { NotesContainer } from "./notesContainer/NotesContainer";
import { useNavigate } from "react-router-dom";
import styles from "./studyInformationAndNotes.module.css";

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
}) {
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
          <section>
            <h1>Study Info</h1>
            <p>{studyTitle}</p>
            <p>{studyOriginalLink}</p>
            <button>Delete study</button>
          </section>
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
