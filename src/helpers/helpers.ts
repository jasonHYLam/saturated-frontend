export function getMarkerHeight(marker) {
  if (marker) {
    const markerHeightString = getComputedStyle(marker).height;
    const markerHeightValue = parseInt(
      markerHeightString.substring(0, markerHeightString.length - 2)
    );
    return markerHeightValue;
  }
}
export function pixelColorDataToStringForCSS(pixelColorData) {
  return `rgb(${pixelColorData.r} ${pixelColorData.g} ${pixelColorData.b})`;
}

export function pixelColorDataToStringForNote(pixelColorData) {
  return `rgb(${pixelColorData.r},${pixelColorData.g},${pixelColorData.b})`;
}

function componentToHex(component) {
  const componentToHex = component.toString(16);
  return componentToHex.length === 1 ? `0${componentToHex}` : componentToHex;
}

export function rgbToHex(pixelColorData) {
  const r = componentToHex(pixelColorData.r);
  const g = componentToHex(pixelColorData.g);
  const b = componentToHex(pixelColorData.b);
  const colorAsHex = `#${r}${g}${b}`;

  return colorAsHex;
}

export function hexToRgb(hex) {
  const bigInt = parseInt(hex, 16);
}

// ColorData is in rgb, and will be converted to hex format for database storage.
export function getColorDataForPixel(
  normalisedMousePositionFraction,
  imageDimensions,
  canvasContext
) {
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
