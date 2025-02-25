import * as React from "react";

interface EmailTemplateProps {
	firstName: string;
	href: string;
}

export const SignUpVerificationTemplate: React.FC<
	Readonly<EmailTemplateProps>
> = ({ firstName, href }) => (
	<div>
		<h1>Welcome, {firstName}!</h1>
		<p>
			Click <a href={href}>here</a> to verify your account
		</p>
	</div>
);
