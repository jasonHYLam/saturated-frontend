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
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}

export function StudyInformationAndNotes({
  studyTitle,
  studyOriginalLink,
  studyId,
  showAddNote,
  setShowAddNote,
  setAllNotes,
}: StudyInformationAndNotesProps) {
  const { allNotes } = useContext(StudyPageContext);
  const navigate = useNavigate();
  const [displayInfo, setDisplayInfo] = useState("notes");

  return (
    <>
      <section className={styles.studyInformationContainer}>
        <section className={styles.studyInformationContent}>
          <section className={styles.topRow}>
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
                  setAllNotes={setAllNotes}
                  allNotes={allNotes}
                />
              ) : (
                <NotesContainer allNotes={allNotes} />
              )}
            </section>
          )}
        </section>
      </section>
    </>
  );
}
