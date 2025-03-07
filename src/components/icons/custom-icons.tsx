import { type SVGProps } from 'react';

import { cn } from '@/lib/utils';

type IIcons = SVGProps<SVGSVGElement>;

export const UsernameIcon = ({ className, ...props }: IIcons) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			className={cn('text-foreground h-6 w-6', className)}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M21.0802 8.58003V15.42C21.0802 16.54 20.4802 17.58 19.5102 18.15L13.5702 21.58C12.6002 22.14 11.4002 22.14 10.4202 21.58L4.48016 18.15C3.51016 17.59 2.91016 16.55 2.91016 15.42V8.58003C2.91016 7.46003 3.51016 6.41999 4.48016 5.84999L10.4202 2.42C11.3902 1.86 12.5902 1.86 13.5702 2.42L19.5102 5.84999C20.4802 6.41999 21.0802 7.45003 21.0802 8.58003Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M11.9999 11.0001C13.2867 11.0001 14.3299 9.95687 14.3299 8.67004C14.3299 7.38322 13.2867 6.34009 11.9999 6.34009C10.7131 6.34009 9.66992 7.38322 9.66992 8.67004C9.66992 9.95687 10.7131 11.0001 11.9999 11.0001Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M16 16.6601C16 14.8601 14.21 13.4001 12 13.4001C9.79 13.4001 8 14.8601 8 16.6601"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const LockIcon = ({ className, ...props }: IIcons) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			className={cn('text-foreground h-6 w-5', className)}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M6 10V8C6 4.69 7 2 12 2C17 2 18 4.69 18 8V10"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M17 22H7C3 22 2 21 2 17V15C2 11 3 10 7 10H17C21 10 22 11 22 15V17C22 21 21 22 17 22Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M15.9965 16H16.0054"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M11.9955 16H12.0045"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M7.99451 16H8.00349"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const UserIcon = ({ className, ...props }: IIcons) => {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			className={cn('text-foreground h-6 w-6', className)}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<path
				d="M20.5901 22C20.5901 18.13 16.7402 15 12.0002 15C7.26015 15 3.41016 18.13 3.41016 22"
				stroke="currentColor"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const GoogleIcon = ({ className, ...props }: IIcons) => {
	return (
		<svg
			viewBox="0 0 48 48"
			fill="none"
			className={cn('text-foreground h-6 w-6', className)}
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<clipPath id="g">
				<path d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" />
			</clipPath>
			<g className="colors" clipPath="url(#g)">
				<path fill="#FBBC05" d="M0 37V11l17 13z" />
				<path fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" />
				<path fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" />
				<path fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" />
			</g>
		</svg>
	);
};

export const MailIcon = ({ className, ...props }: IIcons) => (
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 24 24"
		className={cn('text-foreground h-6 w-6', className)}
		fill="none"
		{...props}
	>
		<path
			d="m7 8.5 2.942 1.74c1.715 1.014 2.4 1.014 4.116 0L17 8.5"
			stroke="currentColor"
			strokeWidth={1}
			strokeLinecap="round"
			strokeLinejoin="round"
		/>
		<path
			d="M2.016 13.476c.065 3.065.098 4.598 1.229 5.733 1.131 1.136 2.705 1.175 5.854 1.254 1.94.05 3.862.05 5.802 0 3.149-.079 4.723-.118 5.854-1.254 1.131-1.135 1.164-2.668 1.23-5.733.02-.986.02-1.966 0-2.952-.066-3.065-.099-4.598-1.23-5.733-1.131-1.136-2.705-1.175-5.854-1.254a115.11 115.11 0 0 0-5.802 0c-3.149.079-4.723.118-5.854 1.254-1.131 1.135-1.164 2.668-1.23 5.733a69.07 69.07 0 0 0 0 2.952Z"
			stroke="currentColor"
			strokeWidth={1}
			strokeLinejoin="round"
		/>
	</svg>
);
