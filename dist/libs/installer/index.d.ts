export declare class Installer {
    static dependencies: string[];
    static devDependencies: string[];
    static getPackageManager(): "yarn" | "pnpm" | "npm";
    static installDependencies(): void;
}
