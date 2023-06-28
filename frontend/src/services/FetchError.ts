export class FetchError extends Error {
	constructor(public status: number, message: string) {
		super(status + ' ' + message)
	}
}
