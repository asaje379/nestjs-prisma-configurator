import { capitalize } from '.';

export function generateSerializer(name: string) {
  const capitalizedName = capitalize(name);
  return `
import { Exclude } from 'class-transformer';
import { ${capitalizedName} } from '../entities/${name}.entity';

export class ${capitalizedName}Serializer extends ${capitalizedName} {
  @Exclude() enabled: boolean;
}
`;
}
