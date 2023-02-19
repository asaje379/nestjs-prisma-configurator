import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

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

export function unCapitalize(value: string) {
  return value.charAt(0).toLowerCase() + value.substring(1);
}

export function getPath(path: string) {
  return join(process.cwd(), path);
}

export function lowerUpperVarName(name: string) {
  const upperName = capitalize(kebabToCamel(name));
  const lowerName = camelToKebab(name).toLowerCase();
  return { upperName, lowerName };
}

export function createDir(path: string) {
  if (!existsSync(path)) mkdirSync(path);
}

export function createFile(path: string, content: string) {
  writeFileSync(path, content, 'utf-8');
}
