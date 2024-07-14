import { useContext, useState } from "react";
import { RgbColorPicker } from "react-colorful";
import { SubmitHandler, useForm } from "react-hook-form";
import { fetchWithoutQueryOrImage } from "../../../../../helpers/fetchData";
import { rgbToHex } from "../../../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import styles from "./addNote.module.css";
import { StudyPageContext } from "../../../StudyPage";
import { ColorReferenceForNote } from "../../../colorReference/ColorReferenceForNote";

interface AddNoteProps {
  studyId: number;
  setShowAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  allNotes: Note[];
}

export function AddNote({
  studyId,
  setShowAddNote,
  setAllNotes,
  allNotes,
}: AddNoteProps) {
  interface FormInput {
    text: string;
  }
  const { colorPixelDataForNewNote, positionForNewNote } =
    useContext(StudyPageContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormInput>();
  const [submitting, setSubmitting] = useState(false);
  const [showColorReference, setShowColorReference] = useState(true);
  const [guessedColor, setGuessedColor] = useState({ r: 255, g: 255, b: 255 });

  const originalColorAsHex = rgbToHex(colorPixelDataForNewNote);
  const guessedColorAsHex = rgbToHex(guessedColor);

  const uploadNote: SubmitHandler<FormInput> = async (data) => {
    setSubmitting(true);
    const newNoteInput = JSON.stringify({
      Text: data.text,
      OriginalHexColor: originalColorAsHex,
      GuessedHexColor: guessedColorAsHex,
      XOrdinateAsFraction: positionForNewNote.x,
      YOrdinateAsFraction: positionForNewNote.y,
    });

    const response = await fetchWithoutQueryOrImage(
      `Note/${studyId}`,
      "POST",
      newNoteInput
    );

    if (response instanceof Error) {
      return navigate("/error");
    }

    if (!response.ok) {
      return navigate("/error");
    }

    const createdNote = await response.json();

    if (allNotes) {
      setAllNotes([...allNotes, createdNote]);
    } else {
      setAllNotes([createdNote]);
    }
    setShowAddNote(false);
  };

  return (
    <>
      <section className={styles.addNoteContainer}>
        <section className={styles.topRow}>
          <h1>Add note</h1>
          <button onClick={() => setShowAddNote(false)}>Close</button>
        </section>

        <section>
          {showColorReference ? (
            <ColorReferenceForNote
              colorAsHex={originalColorAsHex}
              size="large"
            />
          ) : null}
          {showColorReference ? (
            <button onClick={() => setShowColorReference(false)}>
              Hide color
            </button>
          ) : (
            <button onClick={() => setShowColorReference(true)}>
              Show color
            </button>
          )}
        </section>

        <section className={styles.addNoteSection}>
          <p>Guess color</p>
          <RgbColorPicker
            // className={styles.rgbColorPicker}
            className="rgbColorPicker"
            color={guessedColor}
            onChange={setGuessedColor}
          />
        </section>

        <form
          action=""
          onSubmit={handleSubmit(uploadNote)}
          className={styles.addNoteSection}
        >
          <textarea
            className={styles.textInput}
            {...register("text")}
            placeholder="Add a note"
          />
          {!submitting ? (
            <input
              className={styles.createNoteButton}
              type="submit"
              value="Create"
            />
          ) : (
            <input
              className={styles.createNoteButton}
              type="submit"
              value="Creating note..."
              disabled
            />
          )}
        </form>
      </section>
    </>
  );
}
