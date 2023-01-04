export const deleteById = <T extends { id: number }>(
  id: number,
  objectsArray: T[]
): T[] => {
  objectsArray.splice(
    objectsArray.findIndex((i: T) => i.id === id),
    1
  );
  return objectsArray;
};
