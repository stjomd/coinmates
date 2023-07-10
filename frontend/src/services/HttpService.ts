/* eslint-disable @typescript-eslint/no-explicit-any */
type Headers = object
type Parameters = object
type Method = 'DELETE' | 'GET' | 'PATCH' | 'POST' | 'PUT'

const jsonHeaders: Headers = {
	'Accept': 'application/json',
	'Content-Type': 'application/json',
}

/**
 * A class that represents an error obtained from a response.
 */
export class FetchError {
	constructor(
		public timestamp: Date,
		public status: number,
		public statusText: string,
		public message: string
	) {}
}

/**
 * A class responsible for HTTP communication.
 * By default, all requests contain the `Accept` and `Content-Type` headers with
 * the value `application/json`. This can be overridden by passing an object
 * with the headers to this class's methods.
 */
export abstract class HttpService {
	/**
	 * Sends a GET request to a specified URI.
	 * @param uri the URI.
	 * @param parameters an object containing query parameters.
	 * @param headers an object containing HTTP headers.
	 * @returns a promise with the response object.
	 */
	static async get<T>(
		uri: string,
		parameters?: Parameters,
		headers?: Headers
	): Promise<T> {
		return this.request('GET', uri, undefined, parameters, headers)
	}

	/**
	 * Sends a POST request to a specified URI.
	 * @param uri the URI.
	 * @param body the body to send alongside the request as JSON.
	 * @param parameters an object containing query parameters.
	 * @param headers an object containing HTTP headers.
	 * @returns a promise with the response object.
	 */
	static async post<T>(
		uri: string,
		body?: any,
		parameters?: Parameters,
		headers?: Headers
	): Promise<T> {
		return this.request('POST', uri, body, parameters, headers)
	}

	/**
	 * Sends a PATCH request to a specified URI.
	 * @param uri the URI.
	 * @param body the body to send alongside the request as JSON.
	 * @param parameters an object containing query parameters.
	 * @param headers an object containing HTTP headers.
	 * @returns a promise with the response object.
	 */
	static async patch<T>(
		uri: string,
		body?: any,
		parameters?: Parameters,
		headers?: Headers
	): Promise<T> {
		return this.request('PATCH', uri, body, parameters, headers)
	}

	/**
	 * Sends an HTTP request to a specified URI.
	 * @param method the HTTP method (such as GET, POST, etc.)
	 * @param uri the URI to send a request to.
	 * @param body the body to send alongside request. Serialized as JSON.
	 * @param parameters an object containing query parameters.
	 * @param headers an object containing the HTTP headers to append to the
	 * 				request. By default, the request contains the `Accept` and
	 * 				`Content-Type` headers with the value `application/json`. This can
	 * 				be overridden by passing an object to this parameter.
	 * @returns
	 */
	private static async request<T>(
		method: Method,
		uri: string,
		body?: any,
		parameters?: Parameters,
		headers?: Headers
	): Promise<T> {
		const response = await fetch(this.uriWithQueryParams(uri, parameters), {
			method: method,
			body: JSON.stringify(body),
			headers: {...jsonHeaders, ...headers},
			credentials: 'include',
		})
		if (response.ok) {
			return response.json()
		} else {
			throw (await response.json()) as FetchError
		}
	}

	/**
	 * Appends query parameters to a specified URI.
	 * @param uri the URI.
	 * @param params an object containing
	 * @returns
	 */
	private static uriWithQueryParams(uri: string, params?: Parameters) {
		let result = uri
		if (params == null) {
			return result
		}
		const entries = Object.entries(params)
		if (entries.length < 1) {
			return result
		}
		// Append parameters to the URI
		result += '?'
		for (const [key, value] of entries) {
			result += `${key}=${value}&`
		}
		return result.slice(0, -1)
	}
}
