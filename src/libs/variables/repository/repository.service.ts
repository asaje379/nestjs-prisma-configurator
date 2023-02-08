export const repositoryService = `
import { Injectable, HttpStatus } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { paginate, PaginationArgs } from 'nestjs-prisma-pagination';

@Injectable()
export class RepositoryService<CreateType, UpdateType> {
  model = '';
  includes: string[] = [];
  search: string[] = [];

  constructor(protected readonly prisma: PrismaService) {}

  async create(createRepositoryDto: CreateType) {
    return await this.prisma[this.model].create({
      data: createRepositoryDto,
    });
  }

  async createMany(createRepositoryDtos: CreateType[]) {
    return await this.prisma[this.model].createMany({
      data: createRepositoryDtos,
    });
  }

  get includes_() {
    const include: Record<string, boolean | any> = {};
    for (const attr of this.includes) {
      if (attr.includes('.')) {
        const [key, value, ex] = attr.split('.');
        if (!ex) {
          include[key] = {
            include: {
              ...(include[key] ? include[key].include : {}),
              [value]: true,
            },
          };
        }
        continue;
      }
      include[attr] = true;
    }
    return include;
  }

  async findAll(args?: PaginationArgs) {
    const query = paginate(args, {
      includes: this.includes_,
      search: this.search,
    });

    const result = await this.prisma[this.model].findMany(query);
    const count = await this.prisma[this.model].count({
      where: { enabled: true },
    });
    return { statusCode: HttpStatus.OK, data: { values: result, count } };
  }

  async findOne(id: string) {
    const query: any = { where: { id, enabled: true } };
    if (this.includes.length > 0) query.include = this.includes_;
    return await this.prisma[this.model].findFirst(query);
  }

  async update(id: string, updateRepositoryDto: UpdateType) {
    return await this.prisma[this.model].update({
      where: { id },
      data: updateRepositoryDto,
    });
  }

  async remove(id: string) {
    return await this.prisma[this.model].delete({ where: { id } });
  }

  async softRemove(id: string) {
    return await this.update(id, { enabled: false } as any);
  }

  async removeAll() {
    return await this.prisma[this.model].deleteMany();
  }

  async softRemoveAll() {
    return await this.prisma[this.model].updateMany({
      data: { enabled: false },
    });
  }

  async removeMultiple(ids: string[]) {
    return await this.prisma[this.model].deleteMany({
      where: { id: { in: ids } },
    });
  }

  async softRemoveMultiple(ids: string[]) {
    return await this.prisma[this.model].updateMany({
      where: { id: { in: ids } },
      data: { enabled: false },
    });
  }
}
`;
