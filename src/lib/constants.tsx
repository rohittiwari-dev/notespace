import { ClipboardCheckIcon, Edit3Icon, ListChecksIcon } from 'lucide-react';

export const constants = {
	name: 'NoteSpace - Shaping the Future of Student Productivity',
	shortName: 'NoteSpace',
	tagline: 'Shaping the Future of Student Productivity',
	description:
		'Welcome to the Future of Note Taking and student Mind space with collaborative environment. NoteSpace! An all-in-one note-taking and project management app designed for students. Capture ideas, collaborate effortlessly, and stay organized with powerful productivity tools',
	twitter_handle: '@notespace',
	github_repo: 'https://github.com/rohittiwari-dev/notespace',
	domain: 'devnotespace.netlify.app',
	discord: 'https://discord.gg/FWKcsXeeC5',
	twitter: 'https://x.com/notespace',
	feedback: 'mailto:feedback@notespace.com',
	support: 'mailto:support@notespace.com',
};

export const features = (iconSize: number) => [
	{
		icon: <Edit3Icon size={iconSize} />,
		title: 'Note Taking',
		description:
			'Write your study notes and let Noodle take care of the rest.',
	},
	{
		icon: <ListChecksIcon size={iconSize} />,
		title: 'Task Management',
		description:
			'Create module specific tasks to keep on track with what you need to do.',
	},
	{
		icon: <ClipboardCheckIcon size={iconSize} />,
		title: 'Grade Tracking',
		description:
			'Find out what you need to achieve to stay in progression.',
	},
];

export const SELECTED_SPACE_COOKIE_NAME = 'selected_workspace';

export const MAX_FILE_SIZE = 1024 * 1024 * 1; // 1MB
export const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const SIDEBAR_COOKIE_NAME = 'sidebar_state';

export const BreadcrumbsActivePaths = Object.freeze({
	WORKSPACE: [
		'/space/[workspaceId]',
		'/space/[workspaceId]/settings',
		'/space',
	],
});

export const PageTitleVisiblePaths = Object.freeze({
	WORKSPACE: [
		'/space/[workspaceId]',
		'/space/[workspaceId]/settings',
		'/space',
	],
});
