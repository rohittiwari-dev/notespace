'use client';
import {
	Form,
	FormItem,
	FormField,
	FormLabel,
	FormControl,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { WorkspaceGeneralSettingsSchema } from '@/lib/formschemas';
import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';

import AnimatedTabContent from '@/components/app-ui/animated-tab-content';

// create form action state with zod schema WorkspaceGeneralSettingsSchema
const formSchema = WorkspaceGeneralSettingsSchema;
const initialState = {
	name: '',
	description: '',
	icon: '',
	thumbnail: '',
	logo: '',
	tags: [],
	in_trash: false,
};
function CollaboratorsSettings() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: initialState,
	});
	const onSubmit = (data: z.infer<typeof formSchema>) => {
		console.log(data);
	};
	return (
		<AnimatedTabContent>
			<div className="flex flex-col gap-2">
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Workspace Name</FormLabel>
									<FormControl>
										<Input {...field} />
									</FormControl>
								</FormItem>
							)}
						/>

						<Button type="submit">Save</Button>
					</form>
				</Form>
			</div>
		</AnimatedTabContent>
	);
}

export default CollaboratorsSettings;
