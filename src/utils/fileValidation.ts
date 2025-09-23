// file check
export function validateFilename(filename: string): string | null {
  const nameWithoutExt = filename.replace(/\.md$/, '');
  if (nameWithoutExt.trim() === '') {
    return 'Filename cannot be empty';
  }
  const forbiddenChars = ['<', '>', ':', '"', '/', '\\', '|', '?', '*'];
  for (const char of forbiddenChars) {
    if (nameWithoutExt.includes(char)) {
      return `Filename cannot contain '${char}'`;
    }
  }
  const reservedNames = [
    'CON', 'PRN', 'AUX', 'NUL',
    'COM1', 'COM2', 'COM3', 'COM4', 'COM5', 'COM6', 'COM7', 'COM8', 'COM9',
    'LPT1', 'LPT2', 'LPT3', 'LPT4', 'LPT5', 'LPT6', 'LPT7', 'LPT8', 'LPT9'
  ];
  
  if (reservedNames.includes(nameWithoutExt.toUpperCase())) {
    return `'${nameWithoutExt}' is a reserved filename in Windows`;
  }
  if (nameWithoutExt.endsWith(' ')) {
    return 'Filename cannot end with a space';
  }
  if (nameWithoutExt.endsWith('.')) {
    return 'Filename cannot end with a period';
  }
  if (filename.length > 255) {
    return 'Filename is too long (maximum 255 characters)';
  }
  for (const char of nameWithoutExt) {
    if (char.charCodeAt(0) < 32) {
      return 'Filename cannot contain control characters';
    }
  }
  
  return null;
}