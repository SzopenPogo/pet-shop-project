export const validateAddressInput = (value: string, length?: number) => {
  const inputLength = length ? length : 1;
  return value.length >= inputLength;
}