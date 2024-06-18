import { useState } from "react";

export function CreateStudy() {
  const [showCreateStudy, setShowCreateStudy] = useState(false);

  function toggleCreateStudy() {
    setShowCreateStudy(!showCreateStudy);
  }
  return (
    <>
      <button onClick={toggleCreateStudy}>Create a study</button>
      {showCreateStudy && (
        <div>
          <p>Creating a study</p>
          <form>
            <input type="text" placeholder="Title" />
            <input type="text" placeholder="Original link" />
            <input type="file" />
            <input type="submit" value="Create study" />
          </form>
        </div>
      )}
    </>
  );
}
