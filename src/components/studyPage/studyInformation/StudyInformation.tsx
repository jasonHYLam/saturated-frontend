import { useContext, useState } from "react";
import { StudyPageContext } from "../StudyPage";
import { AddNote } from "../studyImage/notes/addNote/AddNote";
import { NotesContainer } from "../studyImage/notesContainer/NotesContainer";
import { useNavigate } from "react-router-dom";
import styles from "./studyInformation.module.css";

export function StudyInformation({
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

  const studyInformationStyle = isMobile ? "" : "";
  return (
    <>
      <section className={styles.studyInformation}>
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
