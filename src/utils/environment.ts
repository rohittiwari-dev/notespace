export enum Environment {
	beta = 'beta',
	dev = 'dev',
	local = 'local',
	preprod = 'preprod',
	preview = 'preview',
	prod = 'prod',
	release = 'release',
	testing = 'testing',
	staging = 'staging',
}

export const CURRENT_ENV = process.env.NODE_ENV
	? Environment[
			process.env.NODE_ENV?.toLowerCase() as keyof typeof Environment
		]
	: Environment.dev;

export const isValidEnv = (env?: string) =>
	(Object.values(Environment) as string[]).includes(
		env || process.env.NODE_ENV?.toLowerCase() || '',
	);

export const IS_PRODUCTION = Environment.prod === CURRENT_ENV;
export const IS_PREPROD =
	Environment.preprod === CURRENT_ENV ||
	Environment.preview === CURRENT_ENV ||
	Environment.beta === CURRENT_ENV ||
	Environment.testing === CURRENT_ENV;
export const IS_STAGING =
	Environment.release === CURRENT_ENV || Environment.staging === CURRENT_ENV;
export const IS_DEV =
	Environment.dev === CURRENT_ENV || Environment.local === CURRENT_ENV;
