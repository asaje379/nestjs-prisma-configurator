import { TypingResGenerator } from './typing-resource.gen';
import { Model } from '../../interfaces';
import { generateController } from '../variables/generic/generic.controller';
import { generateModule } from '../variables/generic/generic.module';
import { generateService } from '../variables/generic/generic.service';
import { NestResourceGenerator } from './nest-resource.gen';
import { lowerUpperVarName } from '../../utils';

export interface GenericResGeneratorOptions {
  name: string;
  model: Record<string, Model>;
}

export class GenericResGenerator extends NestResourceGenerator {
  private $name: string;
  private $model: Record<string, Model>;

  constructor(options: GenericResGeneratorOptions) {
    const { name, model } = options;

    super({
      path: lowerUpperVarName(name).lowerName,
      data: {
        module: generateModule(name),
        service: generateService(name),
        controller: generateController(name),
      },
    });

    this.$name = name;
    this.$model = model;
  }

  generate(): void {
    super.generate();
    new TypingResGenerator({
      name: this.$path,
      value: this.$model,
    }).generate();
  }
}
