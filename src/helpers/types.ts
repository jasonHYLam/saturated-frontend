interface Study {
  id: number;
  title: string;
  originalLink: string;
  imageLink: string;
  dateUploaded: Date;
  notes: Note[];
}

interface StudyPreview {
  id: number;
  title: string;
  thumbnailLink: string;
  dateUploaded: Date;
}

interface Note {
  id: number;
  text: string;
  originalHexColor: string;
  guessedHexColor: string;
  xOrdinateAsFraction: number;
  yOrdinateAsFraction: number;
}
