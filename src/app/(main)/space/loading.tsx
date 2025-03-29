import Spinner from '@/components/app-ui/spinner';
import React from 'react';

function Loading() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<Spinner className="size-10 text-primary" />
		</div>
	);
}

export default Loading;
