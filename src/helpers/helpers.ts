// export function pixelColorDataToStringForNote(pixelColorData) {
//   return `rgb(${pixelColorData.r},${pixelColorData.g},${pixelColorData.b})`;
// }

function componentToHex(component: number) {
  const componentToHex = component.toString(16);
  return componentToHex.length === 1 ? `0${componentToHex}` : componentToHex;
}

export function rgbToHex(pixelColorData: ColorDataType) {
  const r = componentToHex(pixelColorData.r);
  const g = componentToHex(pixelColorData.g);
  const b = componentToHex(pixelColorData.b);
  const colorAsHex = `#${r}${g}${b}`;

  return colorAsHex;
}

// ColorData is in rgb, and will be converted to hex format for database storage.
interface GetColorDataForPixelProps {
  normalisedMousePositionFraction: { x: number; y: number };
  imageDimensions: { width: number; height: number };
  canvasContext: CanvasRenderingContext2D;
}

export function getColorDataForPixel({
  normalisedMousePositionFraction,
  imageDimensions,
  canvasContext,
}: GetColorDataForPixelProps) {
  if (!canvasContext) {
    return {
      r: 0,
      g: 0,
      b: 0,
    };
  }
  const xOrdinateForImage =
    normalisedMousePositionFraction.x * imageDimensions.width;
  const yOrdinateForImage =
    normalisedMousePositionFraction.y * imageDimensions.height;

  const pixelData = canvasContext?.getImageData(
    xOrdinateForImage,
    yOrdinateForImage,
    1,
    1
  ).data;

  return {
    r: pixelData[0],
    g: pixelData[1],
    b: pixelData[2],
  };
}
