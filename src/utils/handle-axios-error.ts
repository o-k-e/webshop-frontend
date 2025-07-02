import axios from "axios"

/**
 * Handles Axios errors and returns a user-friendly error message.
 *
 * - If the server responded with an error (status 4xx or 5xx), 
 *   returns `"Error <status>: <error message>"`.
 * - If no response was received (e.g. network issue, server down), 
 *   returns `"No response from server"`.
 * - If an Axios error occurred without response (e.g. invalid config), 
 *   returns the error's message string.
 * - If the error is not an Axios error (unexpected error), 
 *   returns `"Unexpected error"`.
 *
 * @param error - The error object caught in a try-catch block.
 * @returns A user-friendly error message string.
 */
const handleAxiosError = (error: unknown) => {
    if (axios.isAxiosError(error)) {
		if (error.response) {
			console.error(
				`Error ${error.response.status}:`,
				error.response.data
			);
			return `Error ${error.response.status}: ${error.response.data.message || 'Server Error'}`;
		} else if (error.request) {

			console.error('No response received:', error.request);
			return 'No response from server';
		} else {
			console.error('Axios error:', error.message);
			return error.message;
		}
	} else {
		console.error('Unexpected error:', error);
		return 'Unexpected error';
	}
}

export default handleAxiosError