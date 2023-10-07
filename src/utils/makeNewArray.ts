export function makeArrayFromSnapshot<T>(snap: T[]) {
  const data: T[] = [];
  snap.forEach((item: any) => {
    data.push({
      ...item.data(),
      id: item.id,
    });
  });

  return data;
}
