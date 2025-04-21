// Ensures only valid enum values reach the query
export default function validateEnum<T extends readonly string[]>(
    input: string | string[],
    validValues: T
  ): input is T[number][] {
    const values = Array.isArray(input) ? input : [input];
    return values.every((v) => validValues.includes(v));
  }
  