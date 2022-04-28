export const validatePhoneNumber = (value: string) => {
  // Check if value is not a number. Whitespaces are allowed
  if (!+value.replace(/\s+/g, '')) {
    return false;
  }

  return value.length >= 2;
}