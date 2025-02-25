"use server";
import { CreateEmailOptions, Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({
	...props
}: Exclude<CreateEmailOptions, "from">) => {
	const { data, error } = await resend.emails.send({
		...props,
		from: "Acme <onboarding@resend.dev>",
	});

	if (error) {
		return {
			success: false,
			message: error.message,
			error,
		};
	}

	return {
		success: true,
		message: "Message sent successfully",
		data,
	};
};
