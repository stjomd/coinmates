import {render} from '@testing-library/react'
import PasswordHelper from './PasswordHelper'

describe("'fulfils' callback should accept a correct pass value", () => {
	test('false when password is empty', () => {
		let pass = false
		render(<PasswordHelper password='' fulfils={result => (pass = result)} />)
		expect(pass).toBe(false)
	})

	test('false when password does not meet requirements', () => {
		let pass = false
		render(
			<PasswordHelper password='hey1' fulfils={result => (pass = result)} />
		)
		expect(pass).toBe(false)
	})

	test('true when password meets requirements', () => {
		let pass = false
		render(
			<PasswordHelper
				password='testHey123pass!'
				fulfils={result => (pass = result)}
			/>
		)
		expect(pass).toBe(true)
	})
})
