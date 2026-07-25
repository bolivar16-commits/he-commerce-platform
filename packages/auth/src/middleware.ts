import { auth } from '@/auth';

export const authMiddleware = async (request: Request) => {
  const session = await auth();
  if (!session) {
    return new Response('Unauthorized', { status: 401 });
  }
  return null;
};