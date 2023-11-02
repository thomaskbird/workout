const addOrRemove = (existingVals: string[] | null, newVal: string): string[] => {
  let newIds: string[] = [];
  let existing: string[] = existingVals ?? [];

  if (!existing.includes(newVal)) {
    newIds = [...existing, newVal];
  } else {
    newIds = existing.filter(fav => fav !== newVal);
  }

  return newIds;
}

export default addOrRemove;