export class FetchError {
	private constructor(
		public timestamp: Date,
		public status: number,
		public statusText: string,
		public message: string
	) {}

	/**
	 * Constructs a fetch error from response body.
	 * @param json the JSON object parsed from response body.
	 * @returns an instance of FetchError.
	 */
	static fromResponseBody(json: any) {
		const fetchError = new FetchError(new Date(), 0, '', '')
		Object.assign(fetchError, json)
		return fetchError
	}
}
