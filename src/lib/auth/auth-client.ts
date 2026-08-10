export const dummyUser = {
  id: "dummy-id",
  name: "Admin User",
  email: "admin@example.com",
  image: null,
  role: "admin",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export const authClient = {
  updateUser: async (data: any) => ({ data: { user: { ...dummyUser, ...data } }, error: null }),
};

export const signIn = { 
  email: async () => ({ data: {}, error: null }),
  social: async () => ({ data: {}, error: null }) 
};
export const signOut = async () => ({ data: {}, error: null });
export const signUp = async () => ({ data: {}, error: null });
export const getSession = async () => ({ data: { session: {}, user: dummyUser }, error: null });

export const useSession = () => {
  return { 
    data: { session: {}, user: dummyUser }, 
    isPending: false, 
    error: null 
  };
};
