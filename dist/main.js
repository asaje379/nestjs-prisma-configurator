#!/usr/bin/env node
"use strict";var xe=Object.create;var U=Object.defineProperty,Re=Object.defineProperties,Me=Object.getOwnPropertyDescriptor,$e=Object.getOwnPropertyDescriptors,Te=Object.getOwnPropertyNames,G=Object.getOwnPropertySymbols,we=Object.getPrototypeOf,k=Object.prototype.hasOwnProperty,Se=Object.prototype.propertyIsEnumerable;var B=(r,e,t)=>e in r?U(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,F=(r,e)=>{for(var t in e||={})k.call(e,t)&&B(r,t,e[t]);if(G)for(var t of G(e))Se.call(e,t)&&B(r,t,e[t]);return r},j=(r,e)=>Re(r,$e(e));var ve=(r,e,t,o)=>{if(e&&typeof e=="object"||typeof e=="function")for(let s of Te(e))!k.call(r,s)&&s!==t&&U(r,s,{get:()=>e[s],enumerable:!(o=Me(e,s))||o.enumerable});return r};var Ce=(r,e,t)=>(t=r!=null?xe(we(r)):{},ve(e||!r||!r.__esModule?U(t,"default",{value:r,enumerable:!0}):t,r));var f=require("fs");var m=class{constructor(e){this.$path="";this.$path=e!=null?e:""}getSrcPath(){return`${process.cwd()}/src/${this.$path}`}filePath(e,t){return this.getSrcPath()+`/${e}.${t}.ts`}};var c=class{};c.PRISMA_SCHEMA_NAME="schema.prisma",c.PRISMA_FULL_PATH="prisma/schema.prisma",c.CLIENT_TYPES_FOLDER_NAME="client-typings";var H=require("fs");var _=require("path"),q=require("prettier");function u(r){if(!r||r.length===0)return r;let e=[r.at(0)];for(let t=1;t<r.length;++t){if(r.charCodeAt(t)<97){r.charAt(t)!=="-"&&e.push("-"),e.push(r.charAt(t).toLowerCase());continue}e.push(r.charAt(t))}return e.join("")}function a(r){return r.split("-").map((e,t)=>t===0?e:p(e)).join("")}function p(r){return r.charAt(0).toUpperCase()+r.substring(1)}function g(r){return(0,q.format)(r,{parser:"typescript",singleQuote:!0})}function Q(r){return(0,_.join)(process.cwd(),r)}function Pe(r,e){let t=[`export enum ${p(a(r))} {`];for(let o of e)t.push(` ${o.toUpperCase()} = '${o.toUpperCase()}',`);return t.push("}"),t.join(`
`)}function Y(r){for(let e in r)(0,H.writeFileSync)(`${c.CLIENT_TYPES_FOLDER_NAME}/enums/${u(e).toLowerCase()}.ts`,g(Pe(p(a(e)),r[e])),"utf-8")}var K=require("fs");var z={["int"]:"Int",["string"]:"String",["bool"]:"Boolean",["float"]:"Float",["ref"]:void 0,["enum"]:void 0},w={["int"]:"number",["string"]:"string",["bool"]:"boolean",["float"]:"number",["enum"]:void 0},V={["increment"]:"autoincrement()",["uuid"]:"uuid()"};function l(r){let e=p(a(r)),t=u(r).toLowerCase();return{upperName:e,lowerName:t}}function Ae(r,e){var s,n;let t=[`export interface ${r} {`],o=[];for(let i in e){let M=[i,"?:"],d=e[i].type;M.push(`${Ne(d,e,i)}`),d==="ref"&&o.push(`import {${e[i].model}} from './${u((s=e[i].model)!=null?s:"").toLowerCase()}'`),d==="enum"&&o.push(`import {${e[i].enum}} from '../enums/${u((n=e[i].enum)!=null?n:"").toLowerCase()}'`),t.push(M.join(" "))}return t.push("}"),[o.join(`
`),t.join(`
`)].join(`
 
`)}function Ne(r,e,t){return r==="ref"?e[t].model:r==="enum"?e[t].enum:w[r]}function J(r){for(let e in r)(0,K.writeFileSync)(`${c.CLIENT_TYPES_FOLDER_NAME}/interfaces/${u(e).toLowerCase()}.ts`,g(Ae(p(a(e)),r[e])),"utf-8")}var x=class extends m{constructor(t,o){super();this.models=t!=null?t:{},this.enums=o!=null?o:{}}generate(){console.log("Generating client typings ..."),(0,f.existsSync)("client-typings")||(0,f.mkdirSync)("client-typings"),(0,f.existsSync)("client-typings/enums")||(0,f.mkdirSync)("client-typings/enums"),(0,f.existsSync)("client-typings/interfaces")||(0,f.mkdirSync)("client-typings/interfaces"),Y(this.enums),J(this.models)}};var S=class{execute(e){new x(e.models,e.enums).generate()}};var Z=require("fs");var $=class extends m{constructor(t){super();this.enums=t!=null?t:{}}generate(){let t=[];for(let o in this.enums)t.push(W(o,this.enums[o]));return t.join(`
`)}generateForTarget(t){return W(t,this.enums[t])}};function W(r,e){let t=[`enum ${r} {`];for(let o of e)t.push(` ${o.toUpperCase()}`);return t.push("}"),t.join(`
`)}var T=class extends m{constructor(t){super();this.models=t!=null?t:{}}generate(){let t=[];for(let o in this.models)t.push(X(p(a(o)),this.models[o]));return t.join(`

`)}generateForTarget(t){return X(p(a(t)),this.models[t])}};function X(r,e){let t=[`model ${r} {`];for(let o in e){let s=[o],n=e[o].type;s.push(`${be(n,e,o)}${"required"in e[o]&&!e[o].required?"?":""}`),"default"in e[o]&&s.push(`@default(${e[o].default})`),"id"in e[o]&&s.push(`@id @default(${V[e[o].id]})`),t.push(s.join(" "))}return t.push("enabled Boolean @default(true)"),t.push("createdAt DateTime @default(now())"),t.push("updatedAt DateTime @default(now())"),t.push("}"),t.join(`
`)}function be(r,e,t){return r==="ref"?e[t].model:r==="enum"?e[t].enum:z[r]}var L=require("child_process"),h=class{execute({enums:e,models:t,init:o=!0,target:s=void 0}){if(o&&(0,L.execSync)("npx prisma init"),!s){let n=[new T(t).generate(),`
`,new $(e).generate()].join(`
`);this.generate(n);return}if(s in t){this.generate(new T(t).generateForTarget(s));return}if(s in e){this.generate(new $(e).generateForTarget(s));return}}generate(e){(0,Z.appendFileSync)(c.PRISMA_FULL_PATH,e,"utf-8"),(0,L.execSync)(`npx prisma format --schema ${c.PRISMA_FULL_PATH}`)}};var ee=require("fs");var v=class extends m{constructor(t){let{name:o,value:s}=t;super(o);this.$name=o,this.$value=s}generate(){let t=this.filePath(l(this.$name).lowerName,"typings");console.log(t),(0,ee.writeFileSync)(t,g(this.generateTypingRes()),"utf-8")}generateTypingRes(){let t=p(a(this.$name)),o=[`export class Create${t} {`],s=["import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'"],n=[];return this.generateLines(this.$value,n,o),o.push("}"),o.push(`
export class Update${t} {`),this.generateLines(this.$value,n,o,!1),o.push("}"),n.length>0&&s.push(`import {${n.join(",")}} from '@prisma/client'`),[s.join(`
`),o.join(`
`)].join(`
 
`)}generateLines(t,o,s,n=!0){for(let i in t){let M=[],d=t[i].type;if(d==="ref"||(d==="enum"&&!o.includes(t[i].enum)&&o.push(t[i].enum),i==="id"))continue;let O="required"in t[i]&&!t[i].required;M.push(`@ApiProperty${O||!n?"Optional":""}(${d==="enum"?`{enum: ${t[i].enum}}`:""}) ${i}${O||!n?"?":""}: ${d==="enum"?t[i].enum:w[d]}`),s.push(M.join(" "))}}};function te(r){let{upperName:e,lowerName:t}=l(r),o=r.charAt(0).toLowerCase()+a(r).substring(1);return`
import { Create${e}, Update${e} } from './${t}.typings';
import { RepositoryController } from './../repository/repository.controller';
import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { ${e}Service } from './${t}.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('${t}s')
@ApiTags('Manage ${t}s')
export class ${e}Controller extends RepositoryController<
  Create${e},
  Update${e}
> {
  constructor(private readonly ${o}Service: ${e}Service) {
    super(${o}Service);
  }

  @Post()
  async create(@Body() data: Create${e}) {
    return await this.${o}Service.create(data);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() data: Update${e}) {
    return await this.${o}Service.update(id, data);
  }
}`}function re(r){let{upperName:e,lowerName:t}=l(r);return`
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [${e}Controller],
  providers: [${e}Service],
})
export class ${e}Module {}
`}function oe(r){let{upperName:e,lowerName:t}=l(r),o=r.charAt(0).toLowerCase()+a(r).substring(1);return`
import { Create${e}, Update${e} } from './${t}.typings';
import { PrismaService } from '../prisma/prisma.service';
import { RepositoryService } from './../repository/repository.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ${e}Service extends RepositoryService<
  Create${e},
  Update${e}
> {
  constructor(protected prisma: PrismaService) {
    super(prisma);
    this.model = '${o}';
    this.includes = [];
  }
}`}var se=require("fs"),ie=require("child_process"),ne=require("fs");var y=class extends m{constructor(t){let{path:o,data:s}=t;super(o);this.$resources={};this.$resources=s}generate(){var t;for(let o in this.$resources){let s=o;this.generateNestResource({filename:this.$path,type:s,data:(t=this.$resources[s])!=null?t:""})}}generateNestResource(t){let{filename:o,type:s,data:n}=t,i=this.filePath(o,s);(0,ne.existsSync)(i)||(0,ie.execSync)(`npx nest g ${s} ${o} --no-spec`),(0,se.writeFileSync)(i,g(n),"utf-8")}};var C=class extends y{constructor(t){let{name:o,model:s}=t;super({path:l(o).lowerName,data:{module:re(o),service:oe(o),controller:te(o)}});this.$name=o,this.$model=s}generate(){super.generate(),new v({name:this.$path,value:this.$model}).generate()}};var ae=`
import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { ApiBody } from '@nestjs/swagger';
import { PaginationArgs } from 'nestjs-prisma-pagination';

@Controller('repository')
export class RepositoryController<CreateType, UpdateType> {
  constructor(
    private readonly repositoryService: RepositoryService<
      CreateType,
      UpdateType
    >,
  ) {}

  @Post()
  async create(@Body() createRepositoryDto: CreateType) {
    const result = await this.repositoryService.create(createRepositoryDto);
    return result;
  }

  @Post('multiple')
  async createMany(@Body() createRepositoryDtos: CreateType[]) {
    const result = await this.repositoryService.createMany(
      createRepositoryDtos,
    );
    return result;
  }

  @Get()
  async findAll(@Query() args?: PaginationArgs) {
    return await this.repositoryService.findAll(args);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const data = await this.repositoryService.findOne(id);
    console.log(data);
    if (!data) return new NotFoundException();
    return data;
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRepositoryDto: UpdateType,
  ) {
    const result = this.repositoryService.update(id, updateRepositoryDto);
    return result;
  }

  @Delete('multiple/force')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ids: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  async removeMultiple(@Body('ids') ids: string[]) {
    const result = await this.repositoryService.removeMultiple(ids);
    return result;
  }

  @Patch('multiple')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        ids: { type: 'array', items: { type: 'string' } },
      },
    },
  })
  async softRemoveMultiple(@Body('ids') ids: string[]) {
    console.log('[ids]', ids);
    const result = await this.repositoryService.softRemoveMultiple(ids);
    return result;
  }

  @Delete('all/force')
  async removeAll() {
    const result = await this.repositoryService.removeAll();
    return result;
  }

  @Delete('all')
  async softRemoveAll() {
    const result = await this.repositoryService.softRemoveAll();
    return result;
  }

  @Delete(':id/force')
  async remove(@Param('id') id: string) {
    const result = await this.repositoryService.remove(id);
    return result;
  }

  @Delete(':id')
  async softRemove(@Param('id') id: string) {
    const result = await this.repositoryService.softRemove(id);
    console.log(result);
    return result;
  }
}
`;var pe=`
import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  controllers: [RepositoryController],
  providers: [RepositoryService, PrismaModule],
  imports: [],
})
export class RepositoryModule {}`;var me=`
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
`;var P=class extends y{constructor(){super({path:"repository",data:{module:pe,service:me,controller:ae}})}};var ce=`
import { Module } from '@nestjs/common';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}`;var le=`
import { Injectable, OnModuleInit, INestApplication } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }

  async enableShutdownHooks(app: INestApplication) {
    this.$on('beforeExit', async () => {
      await app.close();
    });
  }
}
`;var A=class extends y{constructor(){super({path:"prisma",data:{module:ce,service:le}})}};var N=require("fs"),de=require("child_process"),Ie={yarn:"add",npm:"install",pnpm:"add"},E=class{static getPackageManager(){let e=process.cwd();return(0,N.existsSync)(`${e}/yarn.lock`)?"yarn":(0,N.existsSync)(`${e}/pnpm-lock.yaml`)||(0,N.existsSync)(`${e}/pnpm-lock.yml`)?"pnpm":"npm"}static installDependencies(){let e=E.getPackageManager();console.log("Detected package manager : ",e),(0,de.execSync)(`${e} ${Ie[e]} ${E.dependencies.join(" ")}`)}},R=E;R.dependencies=["@nestjs/swagger","nestjs-prisma-pagination","prisma","@prisma/client","nestjs-redoc","class-transformer","class-validator","@nestjs/websockets","@nestjs/platform-socket.io","socket.io"],R.devDependencies=["@dotenv/cli"];var b=class{execute(e){console.log("Prisma configuration..."),new h().execute(e),console.log("Client typings"),new x(e.models,e.enums).generate(),console.log("Installing dependencies..."),R.installDependencies(),console.log("Generating prisma module ..."),new A().generate(),console.log("Generating repository module ..."),new P().generate();for(let t in e.models)console.log(`Generating ${t} module ...`),new C({name:t,model:e.models[t]}).generate();console.log("Done with success. Enjoy !")}};var ue={init:r=>new b().execute(r),"gen:prisma":r=>new h().execute(j(F({},r),{init:!0})),"gen:prisma:target":r=>new h().execute(j(F({},r),{init:!1})),"gen:client-typings":r=>new S().execute(r)},I=class{static run(e,t){return e in ue||(console.log(`Error: invalid command ${e}`),process.exit(1)),ue[e](t)}};var ge=require("fs"),fe=Ce(require("yaml"));function ye(r){let e=(0,ge.readFileSync)(r,"utf8");return fe.default.parse(e)}function he(r,e,t){console.log(`Parsing yml schema file at : ${r}...`);let o=ye(r),s=o.enums,n=o.models;I.run(e,{models:n,enums:s,target:t})}(process.argv.length<4||process.argv.length>5)&&(console.log("Error!"),process.exit(1));var Ue=Q(process.argv[2]),Fe=process.argv[3],je=process.argv[4];he(Ue,Fe,je);
