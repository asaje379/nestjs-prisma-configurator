export const crudService = `
import { Helpers } from './../utils/helpers';
import { BaseError } from './../base/error';
import { paginate } from 'nestjs-prisma-pagination';
import { BasePagination } from './../base/pagination';
import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { WebsocketGateway } from '../websocket/websocket.gateway';

@Injectable()
export class CrudService<CreateDto, UpdateDto, QueryType> {
  search: string[] = [];
  equals: string[] = [];
  includes: string[] = [];
  model = '';
  defaultSerializer: any;

  constructor(
    protected readonly prisma: PrismaService,
    protected socket: WebsocketGateway,
  ) {
    this.model = 'crud';
  }

  newUpdateNotify(paths?: string[]) {
    this.socket.broadcast({
      event: this.model + '.update',
      value: { msg: 'New Update' },
    });
    if (paths) {
      for (const path of paths) {
        this.socket.broadcast({
          event: path + '.update',
          value: { msg: 'New Update' },
        });
      }
    }
  }

  async create(createDto: CreateDto) {
    const item = await this.prisma[this.model].create({ data: createDto });
    this.newUpdateNotify();
    return new this.defaultSerializer(item);
  }

  async createMany(createDtos: CreateDto[]) {
    await this.prisma[this.model].createMany({ data: createDtos });
    this.newUpdateNotify();
  }

  async findAll(args?: BasePagination) {
    const query = paginate(args, {
      search: this.search,
      equals: this.equals,
    });
    const items = await this.prisma[this.model].findMany(query);
    return items.map((item) => new this.defaultSerializer(item));
  }

  async findBy($query: QueryType, args?: BasePagination) {
    const query = paginate(args, {
      search: ['label'],
      equals: ['duration'],
    });
    const items = await this.prisma[this.model].findMany({
      ...query,
      where: { ...query.where, ...$query },
    });
    return items.map((item) => new this.defaultSerializer(item));
  }

  async findOne(id: string | number) {
    const item = await this.prisma[this.model].findUnique({
      where: { id: Helpers.numberOrString(id) },
    });
    if (!item) {
      BaseError._404();
    }
    return new this.defaultSerializer(item);
  }

  async findOneBy(query: QueryType) {
    const item = await this.prisma[this.model].findFirst({ where: query });
    if (!item) {
      BaseError._404();
    }
    return item;
  }

  async count() {
    return await this.prisma[this.model].count();
  }

  async countBy(query: QueryType) {
    return await this.prisma[this.model].count({ where: query });
  }

  async update(
    id: string | number,
    updateitemDto: UpdateDto & { enabled?: boolean },
  ) {
    await this.handleIdNotExist(id);
    const item = await this.prisma[this.model].update({
      where: { id: Helpers.numberOrString(id) },
      data: { ...updateitemDto, updatedAt: new Date() },
    });
    this.newUpdateNotify();
    return new this.defaultSerializer(item);
  }

  async archive(id: string | number) {
    const result = await this.update(id, {
      enabled: false,
      updatedAt: new Date(),
    } as any);
    this.newUpdateNotify();
    return result;
  }

  async remove(id: string | number) {
    await this.handleIdNotExist(id);
    await this.prisma[this.model].delete({
      where: { id: Helpers.numberOrString(id) },
    });
    this.newUpdateNotify();
  }

  async archiveMany(ids: Array<string | number>) {
    for (const id of ids) {
      this.archive(id);
    }
    this.newUpdateNotify();
  }

  async removeMany(ids: Array<string | number>) {
    for (const id of ids) {
      this.remove(id);
    }
    this.newUpdateNotify();
  }

  async handleIdNotExist(id: string | number) {
    const existingitem = await this.findOne(id);
    if (!existingitem) {
      BaseError._404();
    }
  }
}
`;
