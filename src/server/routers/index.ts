import newsletterRouter from './newsletter.routes';
import { createRouter } from '../trpc';
import workspaceRouter from './workspace.routes';
import moduleRouter from './modules.routes';

export default createRouter({
	newsletter: newsletterRouter,
	workspace: workspaceRouter,
	modules: moduleRouter,
});
