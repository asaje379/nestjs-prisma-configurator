export const BASE_ENTITY = `
export class BaseEntity {
  constructor(data: any) {
    for (const item in data) {
      this[item] = data[item];
    }
  }
}`;
