'use client';

import { useTheme } from 'next-themes';
import { Toaster as Sonner, type ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
	const { theme = 'system' } = useTheme();

	return (
		<Sonner
			theme={theme as ToasterProps['theme']}
			className="toaster group"
			toastOptions={{
				classNames: {
					toast: 'group !toast group-[.toaster]:!bg-background/90 group-[.toaster]:!text-foreground group-[.toaster]:!border-border group-[.toaster]:!shadow-lg',
					description: 'group-[.toast]:!text-muted-foreground/80',
					actionButton:
						'group-[.toast]:!bg-primary group-[.toast]:!text-primary-foreground',
					cancelButton:
						'group-[.toast]:!bg-muted group-[.toast]:!text-muted-foreground',
				},
			}}
			{...props}
		/>
	);
};

export { Toaster };
