import { IUser } from '../types';

import { SupabaseClient } from '@supabase/supabase-js';

export const isAuthenticated = async (client: SupabaseClient) => {
  const { data: { user } } = await client.auth.getUser();
  return !!user;
};

export const getSessionUser = async (client: SupabaseClient) => {
  const { data: { session } } = await client.auth.getSession();
  if (!session?.user) {
    return undefined;
  }

  const user = {
    id: session.user.id,
    email: session.user.email,
    ...session.user.user_metadata,
  } as IUser;
  return user;
};
