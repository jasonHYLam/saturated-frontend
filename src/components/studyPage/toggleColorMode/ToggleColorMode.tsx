export function({mode}) {

  return (
    <>
  {mode === 'color' ? <button>Grayscale</button> : <button>Color</button>}
    </>
  )

}