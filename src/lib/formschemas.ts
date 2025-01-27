import * as Zod from "zod";

export const loginFormSchema = Zod.object({
	email: Zod.string().describe("Email").email(),
	password: Zod.string()
		.describe("Password")
		.min(6, "password must be at least 6 character")
		.max(20, "password must not be more than 20 character"),
});
