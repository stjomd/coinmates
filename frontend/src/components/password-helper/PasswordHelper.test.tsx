import {render} from '@testing-library/react'
import PasswordHelper from './PasswordHelper'

test('empty password should be rejected', () => {
	let pass = false
	render(<PasswordHelper password='' fulfils={result => (pass = result)} />)
	expect(pass).toBe(false)
})
