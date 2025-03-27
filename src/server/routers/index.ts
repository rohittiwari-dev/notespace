import newsletterRouter from './newsletter.routes';
import { createRouter } from '../trpc';
import workspaceRouter from './workspace.routes';

export default createRouter({
	newsletter: newsletterRouter,
	workspace: workspaceRouter,
});
