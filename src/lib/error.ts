/**
 * Reports an error to the centralized logging service.
 * In this implementation, it logs to the console as no service like Sentry is configured.
 *
 * @param error - The error to report.
 * @param context - Additional context for the error.
 */
export function reportError(error: unknown, context?: Record<string, unknown>): void {
	// In a real application, this would send the error to Sentry or another service.
	console.error('Reported Error:', error);
	if (context) {
		console.error('Context:', context);
	}
}
