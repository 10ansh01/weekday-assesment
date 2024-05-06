export function combineAndSortArrays(existingOptions, newOptions) {
  const combinedOptions = Array.from(
    new Set([...existingOptions, ...newOptions])
  );
  combinedOptions.sort((a, b) => {
    if (typeof a === "string" && typeof b === "string") {
      return a.localeCompare(b);
    } else {
      return a - b;
    }
  });
  return combinedOptions;
}
