export const dummyUser = {
  id: "dummy-id",
  name: "Admin User",
  email: "admin@example.com",
  image: null,
  role: "admin",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const auth = {
  api: {
    getSession: async () => ({ session: {}, user: dummyUser }),
  }
} as any;
