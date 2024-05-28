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
