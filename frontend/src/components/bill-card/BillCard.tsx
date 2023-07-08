import {Bill} from '../../entities/Bill'
import './BillCard.scss'

/**
 * An array of short month names.
 */
const months = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
]

function BillCard({bill}: {bill: Bill}) {
	const date = new Date(bill.creationDate)

	/**
	 * Constructs a string with the names.
	 * @returns the string with people's first names.
	 */
	const names = () => {
		return bill.people.map(person => person.firstName).join(', ')
	}

	/**
	 * Constructs an element displaying the bill'a amount.
	 * @returns a JSX `<span>` element with the amount.
	 */
	const amountElement = () => {
		const fraction = String(bill.amount.fraction).padEnd(2, '0')
		const string = `${bill.amount.integer},${fraction}`
		let className = ''
		if (bill.status === 'OPEN') {
			className = 'bc-amount-open'
		} else {
			className = 'bc-amount-closed'
		}
		return <span className={'logo ' + className}>{string} &euro;</span>
	}

	/**
	 * Constructs a badge displaying the bill's status.
	 * @returns a JSX `<span>` element with a badge.
	 */
	const badge = () => {
		if (bill.status === 'OPEN') {
			return <span className='badge rounded-pill bg-secondary'>Open</span>
		} else if (bill.status === 'CLOSED') {
			return <span className='badge rounded-pill bg-primary'>Closed</span>
		}
	}

	// The component
	return (
		<ul className='list-group bc-card'>
			<li className='list-group-item'>
				<div className='bc-container'>
					<div className='bc-date'>
						<span>{date.getDay()}</span>
						<span>{months[date.getMonth()]}</span>
					</div>
					<div className='bc-details'>
						<span className='bc-title'>
							{bill.title}
							{badge()}
						</span>
						<span className='bc-persons'>{names()}</span>
					</div>
					<div className='bc-amount'>{amountElement()}</div>
				</div>
			</li>
		</ul>
	)
}

export default BillCard
