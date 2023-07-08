import {Bill} from '../../entities/Bill'
import './BillCard.scss'

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

	const names = () => {
		return bill.people.map(person => person.firstName).join(', ')
	}

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

	const badge = () => {
		if (bill.status === 'OPEN') {
			return <span className='badge rounded-pill bg-secondary'>Open</span>
		} else if (bill.status === 'CLOSED') {
			return <span className='badge rounded-pill bg-primary'>Closed</span>
		}
	}

	return (
		<ul className='list-group'>
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
