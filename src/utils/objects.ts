export const getKeyByPropName = (
  data: any,
  keyToFind: string,
  prop: string
): string => {
  const tabName = Object.keys(data).find(
    (tabName) => data[tabName][prop] === keyToFind
  )!;
  return tabName;
};
