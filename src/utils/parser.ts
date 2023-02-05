import { readFileSync } from "fs";
import Yaml from "yaml";

export function parseYml(path: string) {
  const file = readFileSync(path, "utf8");
  const result = Yaml.parse(file);
  return result;
}
