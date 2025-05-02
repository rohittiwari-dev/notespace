import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';

const withForwardRef = (Component: React.ElementType) => {
	const ConvertShadcnToNoteUI = forwardRef((props, ref) => {
		return (
			<Component
				{...props}
				ref={ref}
				className={cn('w-auto', (props as any)?.className)}
			/>
		);
	});
	ConvertShadcnToNoteUI.displayName = 'ConvertShadcnToNoteUI';
	return ConvertShadcnToNoteUI;
};

export default withForwardRef;
