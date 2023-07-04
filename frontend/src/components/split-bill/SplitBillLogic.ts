import {Bill} from '../../entities/Bill'

export interface BillValidationMessages {
	title?: string
	description?: string
	amount?: string
	people?: string
}

/**
 * Validates the form input.
 * @param newBill the bill to be validated.
 * @returns an object containing two fields: `dirty` is a boolean indicating
 * 					if at least one input is invalid, and `errors` is an object
 * 					containing error messages for the respective input fields.
 */
export function validate(bill: Bill) {
	const result: {dirty: boolean; errors: BillValidationMessages} = {
		dirty: false,
		errors: {},
	}
	if (bill.title.length < 1) {
		result.errors.title = 'Please enter a title.'
		result.dirty = true
	}
	if (bill.description.length > 1000) {
		result.errors.description = 'Description is too long (max 1000 characters)'
		result.dirty = true
	}
	if (bill.amountFraction < 0 || bill.amountFraction > 99) {
		result.errors.amount = 'Please enter a valid amount of cents (0 to 99)'
		result.dirty = true
	}
	if (bill.amountInteger < 0) {
		result.errors.amount = 'Please enter a positive amount.'
		result.dirty = true
	}
	if (bill.amountInteger === 0 && bill.amountFraction === 0) {
		result.errors.amount = 'Please enter the amount.'
		result.dirty = true
	}
	if (bill.people.length === 0) {
		result.errors.people = 'Please select at least one friend.'
		result.dirty = true
	}
	return result
}

/**
 * Parses an input string for the amount and returns an object containing
 * the integer and fraction part, to be used in the dispatch function.
 * Allowed separators: comma `,` and period `.`.
 * @param input the input string of the amount field.
 * @returns an object with two keys, `amountInteger` and `amountFraction`, if
 * 					parsing was successful, or an empty object otherwise.
 */
export function parseAmount(input: string): Partial<Bill> {
	const separators = [',', '.']
	// Check if input string contains no separators (implicit integer)
	let isInteger = true
	for (const separator of separators) {
		if (input.includes(separator)) {
			isInteger = false
			break
		}
	}
	// If integer, return updater right away
	if (isInteger) {
		return {amountInteger: Number(input), amountFraction: 0}
	}
	// Otherwise split string (try all separators)
	for (const separator of separators) {
		const parts = input.split(separator)
		if (parts.length == 2) {
			const [integer, fraction] = [
				Number(parts[0]),
				Number(parts[1].padEnd(2, '0')),
			]
			return !isNaN(integer) && !isNaN(fraction)
				? {amountInteger: integer, amountFraction: fraction}
				: {}
		}
	}
	return {}
}
