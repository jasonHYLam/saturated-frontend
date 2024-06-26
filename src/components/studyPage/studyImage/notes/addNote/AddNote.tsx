import { useState } from "react";
import { RgbColorPicker, RgbColor } from "react-colorful";
import { useForm } from "react-hook-form";
import { ColorReference } from "../../../colorReference/ColorReference";
import { fetchWithoutQueryOrImage } from "../../../../../helpers/fetchData";
import { rgbToHex } from "../../../../../helpers/helpers";
import { useNavigate } from "react-router-dom";

export function AddNote({
  studyId,
  setShowAddNote,
  pixelColorData,
  setAllNotes,
  allNotes,
  clickedPositionFraction,
}) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm();
  const [showColorReference, setShowColorReference] = useState(true);
  const [guessedColor, setGuessedColor] = useState({ r: 255, g: 255, b: 255 });

  const guessedColorAsString = `rgb(${guessedColor.r} ${guessedColor.g} ${guessedColor.b})`;
  const originalColorAsHex = rgbToHex(pixelColorData);
  const guessedColorAsHex = rgbToHex(guessedColor);

  async function uploadNote(data) {
    const newNoteInput = JSON.stringify({
      Text: data.text,
      OriginalHexColor: originalColorAsHex,
      GuessedHexColor: guessedColorAsHex,
      XOrdinateAsFraction: clickedPositionFraction.xFraction,
      YOrdinateAsFraction: clickedPositionFraction.yFraction,
    });

    console.log("checking newNote");
    console.log(newNoteInput);

    const response = await fetchWithoutQueryOrImage(
      `Note/${studyId}`,
      "POST",
      newNoteInput
    );

    if (!response.ok || response instanceof Error) {
      navigate("/error");
    }

    const createdNote = await response.json();
    console.log("checking createdNote");
    console.log(createdNote);

    if (allNotes) {
      setAllNotes([...allNotes, createdNote]);
    } else {
      setAllNotes([createdNote]);
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
