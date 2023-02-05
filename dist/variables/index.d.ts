import { Formats } from './../interfaces/index';
export declare const TypesMapping: {
    int: string;
    string: string;
    bool: string;
    float: string;
    ref: undefined;
    enum: undefined;
};
export declare const JsTypesMapping: {
    int: string;
    string: string;
    bool: string;
    float: string;
    enum: undefined;
};
export declare const IdMapping: Record<Formats, string>;
export declare const schemaFileHeader = "\ngenerator client {\n  provider        = \"prisma-client-js\"\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}";
export declare const prismaFolderName = "prisma";
export declare const prismaSchemaName = "schema.prisma";
export declare const prismaFullPath = "prisma/schema.prisma";
export declare const clientTypesFolderName = "client-typings";
export declare function lowerUpperVarName(name: string): {
    upperName: string;
    lowerName: string;
};
