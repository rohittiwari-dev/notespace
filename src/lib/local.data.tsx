import { ClipboardCheckIcon, Edit3Icon, ListChecksIcon } from 'lucide-react';

export const constants = {
	name: 'NoteSpace - Rethinking Student Productivity',
	shortName: 'NoteSpace',
	tagline: 'Rethinking Student Productivity',
	description:
		'NoteSpace is a productivity platform including many tools students need to be productive and stay on top of their work such as note taking, task management, and more.',
	twitter_handle: '@notespace',
	github_repo: 'https://github.com/rohittiwari-dev/notespace',
	domain: 'noodle.run',
	discord: 'https://discord.gg/ewKmQd8kYm',
	twitter: 'https://x.com/noodle_run',
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
