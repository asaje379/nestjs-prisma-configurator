import { capitalize, kebabToCamel, lowerUpperVarName } from '.';

export function generateSerializer(name: string) {
  const capitalizedName = capitalize(kebabToCamel(name));
  const { lowerName } = lowerUpperVarName(name);
  return `
import { Exclude } from 'class-transformer';
import { ${capitalizedName} } from '../entities/${lowerName}.entity';

export class ${capitalizedName}Serializer extends ${capitalizedName} {
  @Exclude() enabled: boolean;
}
`;
}
