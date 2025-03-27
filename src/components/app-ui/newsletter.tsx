'use client';
import React, { useEffect, useState } from 'react';
import { HoverBoarderGradient } from '../primitives/hover-boarder-gradient';
import { Label } from '../ui/label';
import { MailIcon } from '../icons';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { api } from '@/lib/trpc/client';
import Spinner from './spinner';
import { Check } from 'lucide-react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

const newsLetterSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
});

function NewsLetter() {
	const [success, setSuccess] = useState(false);

	const { mutate, error, isPending, isSuccess } =
		api.newsletter.subscribeNewsLetter.useMutation();

	const {
		handleSubmit,
		setValue,
		register,
		formState: { isLoading, errors, touchedFields, isSubmitting },
	} = useForm<z.infer<typeof newsLetterSchema>>({
		resolver: zodResolver(newsLetterSchema),
		defaultValues: {
			email: '',
		},
		mode: 'onChange',
		reValidateMode: 'onChange',
		shouldUnregister: true,
	});

	useEffect(() => {
		let timer: NodeJS.Timeout | ReturnType<typeof setTimeout> | null = null;
		if (isSuccess) {
			setValue('email', '');
			setSuccess(true);
			timer = setTimeout(() => {
				setSuccess(false);
			}, 2000);
			return () => {
				if (timer) clearTimeout(timer);
			};
		}
		return () => {
			if (timer) clearTimeout(timer);
		};
	}, [isSuccess, setValue]);

	const onSubmit = async (data: z.infer<typeof newsLetterSchema>) => {
		mutate({ email: data.email });
	};

	return (
		<div>
			<Label>Enter Email to get updates</Label>
			<HoverBoarderGradient className="w-fit h-fit flex items-center  p-0 border-none bg-background">
				<form
					onSubmit={handleSubmit(onSubmit)}
					className="flex items-center "
				>
					<div className="p-2 rounded-md bg-accent-foreground/10">
						<MailIcon />
					</div>{' '}
					<Input
						className="focus-visible:!ring-0 min-w-64 !min-h-full !m-0 !rounded-none !border-none focus-visible:!outline-none"
						placeholder="Enter Email"
						{...register('email')}
					/>
					<Button
						type="submit"
						disabled={isPending || isLoading || isSubmitting}
					>
						{(isPending || isLoading || isSubmitting) && (
							<Spinner />
						)}{' '}
						{success && (
							<Check className="w-4 h-4 text-green-500" />
						)}{' '}
						Subscribe
					</Button>
				</form>
			</HoverBoarderGradient>
			{errors.email && touchedFields.email && (
				<span className="text-red-500">{errors.email.message}</span>
			)}
			{error?.message && (
				<span className="text-red-500">
					{error.data?.zodError?.issues?.[0]?.message ||
						error?.message}
				</span>
			)}
		</div>
	);
}

export default NewsLetter;
