'use client';
import React from 'react';
import Spinner from '@/components/app-ui/spinner';

export default function Loading() {
	return (
		<div className="flex h-svh w-screen items-center justify-center">
			<Spinner size="lg" className="text-primary-400" />
		</div>
	);
}
