import { toNextJsHandler } from 'better-auth/next-js';
import { authServerApi } from '@/lib/auth/server';

export const { POST, GET } = toNextJsHandler(authServerApi);
