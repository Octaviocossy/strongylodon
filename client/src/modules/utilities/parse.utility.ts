export const parseEnumToArray = <T extends object>(_enum: T) => {
  return Object.values(_enum) as string[];
};
