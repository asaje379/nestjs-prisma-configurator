import { join } from 'path';
import { format } from 'prettier';

export function camelToKebab(value: string) {
  if (!value || value.length === 0) return value;
  const result = [value.at(0)];
  for (let i = 1; i < value.length; ++i) {
    if (value.charCodeAt(i) < 97) {
      if (value.charAt(i) !== '-') {
        result.push('-');
      }
      result.push(value.charAt(i).toLowerCase());
      continue;
    }
    result.push(value.charAt(i));
  }
  return result.join('');
}

export function kebabToCamel(value: string) {
  return value
    .split('-')
    .map((item, index) => (index === 0 ? item : capitalize(item)))
    .join('');
}

export function capitalize(value: string) {
  return value.charAt(0).toUpperCase() + value.substring(1);
}

export function getPath(path: string) {
  return join(process.cwd(), path);
}
