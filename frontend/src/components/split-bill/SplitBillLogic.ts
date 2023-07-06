import {Amount} from '../../entities/Amount'
import {Bill} from '../../entities/Bill'

/**
 * Allowed separators between euros and cents in the amount field.
 */
export const separators = [',', '.']

/**
 * An object that represents validation error messages.
 */
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
	if (bill.description != null && bill.description.length > 1000) {
		result.errors.description = 'Description is too long (max 1000 characters)'
		result.dirty = true
	}
	if (bill.amount.fraction < 0 || bill.amount.fraction > 99) {
		result.errors.amount = 'Please enter a valid amount of cents (0 to 99)'
		result.dirty = true
	}
	if (bill.amount.integer < 0) {
		result.errors.amount = 'Please enter a positive amount.'
		result.dirty = true
	}
	if (bill.amount.integer === 0 && bill.amount.fraction === 0) {
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
		return {amount: new Amount(Number(input), 0)}
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
				? {amount: new Amount(integer, fraction)}
				: {}
		}
	}
	return {}
}

/**
 * Limits keystrokes in the amount field (e.g. forbids to enter letters, etc.)
 * @param amountString the current input amount string.
 * @param event the onKeyDown event.
 */
export function filterAmountField(
	amountString: string,
	event: React.KeyboardEvent<HTMLInputElement>
) {
	// Always allow backspace
	if (event.key === 'Backspace') {
		return
	}
	// Only allow backspace, numbers and separators
	if (!/[0-9.,]/.test(event.key)) {
		event.preventDefault()
		return
	}
	// Only allow one separator
	if (separators.includes(event.key)) {
		for (const separator of separators) {
			if (amountString.includes(separator)) {
				event.preventDefault()
			}
		}
	}
	// Only allow two digits after separator
	for (const separator of separators) {
		const parts = amountString.split(separator)
		if (parts.length === 2 && parts[1].length >= 2) {
			event.preventDefault()
		}
	}
}
