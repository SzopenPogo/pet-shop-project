const generateInputId = (name: string) => {
  return `${name}-input-${Math.random().toFixed(3)}`;
}

export default generateInputId;