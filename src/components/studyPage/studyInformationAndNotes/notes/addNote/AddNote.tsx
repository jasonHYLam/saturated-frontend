import { useState } from "react";
import { RgbColorPicker } from "react-colorful";
import { SubmitHandler, useForm } from "react-hook-form";
import { ColorReference } from "../../../colorReference/ColorReference";
import { fetchWithoutQueryOrImage } from "../../../../../helpers/fetchData";
import { rgbToHex } from "../../../../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../../../loading/Loading";

interface AddNoteProps {
  studyId: number;
  setShowAddNote: React.Dispatch<React.SetStateAction<boolean>>;
  pixelColorData: { r: number; g: number; b: number };
  setAllNotes: React.Dispatch<React.SetStateAction<Note[]>>;
  allNotes: Note[];
  clickedPositionFraction: { xFraction: number; yFraction: number };
}

export function AddNote({
  studyId,
  setShowAddNote,
  pixelColorData,
  setAllNotes,
  allNotes,
  clickedPositionFraction,
}: AddNoteProps) {
  interface FormInput {
    text: string;
  }
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<FormInput>();
  const [submitting, setSubmitting] = useState(false);
  const [showColorReference, setShowColorReference] = useState(true);
  const [guessedColor, setGuessedColor] = useState({ r: 255, g: 255, b: 255 });

  const originalColorAsHex = rgbToHex(pixelColorData);
  const guessedColorAsHex = rgbToHex(guessedColor);

  const uploadNote: SubmitHandler<FormInput> = async (data) => {
    setSubmitting(true);
    const newNoteInput = JSON.stringify({
      Text: data.text,
      OriginalHexColor: originalColorAsHex,
      GuessedHexColor: guessedColorAsHex,
      XOrdinateAsFraction: clickedPositionFraction.xFraction,
      YOrdinateAsFraction: clickedPositionFraction.yFraction,
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
        {!submitting ? (
          <input type="submit" value="Create" />
        ) : (
          <input type="submit" value="Creating note..." disabled />
        )}
        <Loading />
      </form>
    </>
  );
}
