import { useState } from "react";
import styles from "./addNote.module.css";
import { RgbColorPicker, RgbColor } from "react-colorful";
import { useForm } from "react-hook-form";
import { ColorReference } from "../../../colorReference/ColorReference";

export function AddNote({
  setShowAddNote,
  pixelColorData,
  setAllNotes,
  allNotes,
  clickedPositionFraction,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const [showColorReference, setShowColorReference] = useState(true);
  const [guessedColor, setGuessedColor] = useState({ r: 255, g: 255, b: 255 });

  const guessedColorAsString = `rgb(${guessedColor.r} ${guessedColor.g} ${guessedColor.b})`;
  console.log(pixelColorData);

  console.log(guessedColor);
  console.log(typeof guessedColor);

  console.log(String(guessedColor));

  function uploadNote(data) {
    const newNote = {
      text: data.text,
      color: pixelColorData,
      // guessedColor: ,
      normalisedMousePositionFraction: clickedPositionFraction,
    };
    // fetchData
    if (allNotes) {
      setAllNotes([...allNotes, newNote]);
    } else {
      setAllNotes([newNote]);
    }
    setShowAddNote(false);
  }
  return (
    <>
      <button onClick={() => setShowAddNote(false)}>Close</button>
      <h1>Add note</h1>
      {showColorReference ? (
        <ColorReference colorData={pixelColorData} size="large" />
      ) : null}
      {showColorReference ? (
        <button onClick={() => setShowColorReference(false)}>Hide color</button>
      ) : (
        <button onClick={() => setShowColorReference(true)}>Show color</button>
      )}

      <p>Guess color</p>
      <RgbColorPicker color={guessedColor} onChange={setGuessedColor} />

      <form action="" onSubmit={handleSubmit(uploadNote)}>
        <input type="text" {...register("text")} placeholder="Add a note" />
        <input type="submit" value="Create" />
      </form>
    </>
  );
}
