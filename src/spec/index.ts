import { resolve } from 'path';
import { parseYml } from '../utils/parser';

const specPath = resolve(__dirname, './spec.yml');
export const $spec = parseYml(specPath);
