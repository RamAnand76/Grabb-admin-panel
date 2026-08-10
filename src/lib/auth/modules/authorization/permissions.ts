export const ac = {} as any;
export const roles = {
  viewer: {},
  editor: {},
  admin: {},
} as const;
export type AppRole = keyof typeof roles;
