// lib/email-validator.ts
import { levenshteinEditDistance as leven } from "levenshtein-edit-distance";

// Auto-updating disposable domains (client-safe)
const DISPOSABLE_DOMAINS = new Set<string>(
	(await fetchDisposableDomains()).concat([
		"no-reply",
		"noreply",
		"notifications",
		"mailer",
		"updates",
		"system",
		"bot",
		"mailchimp.com",
		"sendgrid.net",
	]),
);

// Common domains and university patterns
const COMMON_DOMAINS = new Set<string>([
	"gmail.com",
	"yahoo.com",
	"hotmail.com",
	"outlook.com",
	"icloud.com",
	"aol.com",
	"protonmail.com",
]);

const UNIVERSITY_PATTERNS = [".edu", ".ac.", ".uni-", "university"];

// Client-safe validation patterns
const SUSPICIOUS_PATTERNS = {
	uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i,
	sequence: /(?:1234|2345|3456|4567|5678|6789|abcd|bcde|cdef|defg)/i,
	repeated: /(.)\1{3}/,
	automated: /(noreply|no-reply|support|admin|system|notifications|bot)/i,
};

interface ValidationResult {
	isValid: boolean;
	isDisposable: boolean;
	isCommon: boolean;
	isUniversity: boolean;
	isSuspicious: boolean;
	suggestions: string[];
	warnings: string[];
}

class EmailValidatorClass {
	static async validate(email: string): Promise<ValidationResult> {
		const result: ValidationResult = {
			isValid: false,
			isDisposable: false,
			isCommon: false,
			isUniversity: false,
			isSuspicious: false,
			suggestions: [],
			warnings: [],
		};

		const [localPart, domain] = email.toLowerCase().split("@");

		// Basic validation
		if (!this.isValidFormat(email) || !domain) {
			result.warnings.push("Invalid email format");
			return result;
		}
		result.isValid = true;

		// Domain analysis
		result.isDisposable = DISPOSABLE_DOMAINS.has(domain);
		result.isCommon = COMMON_DOMAINS.has(domain);
		result.isUniversity = UNIVERSITY_PATTERNS.some((p) =>
			domain.includes(p),
		);

		// Local part analysis
		const localChecks = this.analyzeLocalPart(localPart);
		result.warnings.push(...localChecks.warnings);

		// MX Records check (server-side only)
		if (typeof window === "undefined") {
			const hasMx = await this.checkMxRecords(domain);
			if (!hasMx) result.warnings.push("Domain email setup incomplete");
		}

		// Final determination
		result.isSuspicious = result.isDisposable || localChecks.isSuspicious;
		result.suggestions = this.getSuggestions(domain);

		return result;
	}

	private static isValidFormat(email: string): boolean {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	}

	private static analyzeLocalPart(localPart: string) {
		const result = {
			isSuspicious: false,
			warnings: [] as string[],
		};

		const checks = {
			length: localPart.length > 24,
			numbers:
				(localPart.match(/\d/g) || []).length / localPart.length > 0.3,
			specialChars: (localPart.match(/[^a-z0-9]/gi) || []).length > 2,
			patterns: Object.values(SUSPICIOUS_PATTERNS).some((p) =>
				p.test(localPart),
			),
		};

		if (checks.length) result.warnings.push("Long username");
		if (checks.numbers) result.warnings.push("Many numbers");
		if (checks.specialChars) result.warnings.push("Special characters");
		if (checks.patterns) result.warnings.push("Suspicious pattern");

		result.isSuspicious = Object.values(checks).some(Boolean);
		return result;
	}

	private static async checkMxRecords(domain: string): Promise<boolean> {
		try {
			if (typeof window !== "undefined") {
				const response = await fetch("/api/check-mx", {
					method: "POST",
					body: JSON.stringify({ domain }),
				});
				const { hasMx } = await response.json();
				return hasMx;
			}

			const dns = await import("dns/promises");
			const records = await dns.resolveMx(domain);
			return records.length > 0;
		} catch {
			return false;
		}
	}

	private static getSuggestions(domain: string): string[] {
		const suggestions = [];

		const closest = this.findClosestDomain(domain);
		if (closest) {
			suggestions.push(`Did you mean ${closest}?`);
		}

		if (UNIVERSITY_PATTERNS.some((p) => domain.includes(p))) {
			suggestions.push("University email detected");
		}

		return suggestions;
	}

	private static findClosestDomain(domain: string): string | null {
		let closest: string | null = null;
		let minDistance = Infinity;

		COMMON_DOMAINS.forEach((common) => {
			const distance = leven(domain, common);
			if (distance < 3 && distance < minDistance) {
				minDistance = distance;
				closest = common;
			}
		});

		return closest;
	}
}

async function fetchDisposableDomains(): Promise<string[]> {
	try {
		const response = await fetch(
			"https://raw.githubusercontent.com/disposable-email-domains/disposable-email-domains/master/disposable_email_blocklist.conf",
			{
				cache: "force-cache",
				keepalive: true,
				next: {
					tags: [
						"fetchDisposableDomains",
						"disposable+domains_cache",
					],
				},
			},
		);
		return (await response.text())
			.split("\n")
			.filter((line) => line && !line.startsWith("#"));
	} catch (error) {
		console.error("Failed to fetch disposable domains:", error);
		return [];
	}
}

export const EmailValidator = new EmailValidatorClass();

export default EmailValidator;
