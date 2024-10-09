export const calcProportionalHeight = (
  width: number,
  height: number,
  candidateWidth?: number
) => {
  const ratio = width / height;
  if (candidateWidth) {
    return candidateWidth / ratio;
  }
  return 1;
};
