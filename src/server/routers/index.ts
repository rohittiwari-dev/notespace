import helloRouter from './hello.routes';
import { createRouter } from '../trpc';

export default createRouter({
	hello: helloRouter,
});
