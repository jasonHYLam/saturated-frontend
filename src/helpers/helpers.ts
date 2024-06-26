export function getMarkerHeight(marker) {
  // console.log(marker);
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
  console.log(bigInt);
}
