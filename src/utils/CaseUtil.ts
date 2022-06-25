export const toCamel = (data: any): any => {
  if (typeof data !== 'object' || !data) return data;
  if (Array.isArray(data)) {
    return data.map((item) => toCamel(item));
  }

  const newData = {} as { [index: string]: any };
  const keys = Object.keys(data);
  keys.forEach((item) => {
    const newKey = item.replace(/_([a-z])/g, (p, m) => m.toUpperCase());
    newData[newKey] = toCamel(data[item]);
  });
  return newData;
};

export const toUnderline = (data: any): any => {
  if (typeof data !== 'object' || !data) return data;
  if (Array.isArray(data)) {
    return data.map((item) => toUnderline(item));
  }

  const newData = {} as { [index: string]: any };
  const keys = Object.keys(data);
  keys.forEach((item) => {
    const newKey = item.replace(/([A-Z])/g, (p, m) => `_${m.toLowerCase()}`);
    newData[newKey] = toUnderline(data[item]);
  });
  return newData;
};
