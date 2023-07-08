import './BillCard.scss'

function BillCard() {
	return (
		<ul className='list-group'>
			<li className='list-group-item'>
				<div className='bc-container'>
					<div className='bc-date'>
						<span>8</span>
						<span>Jul</span>
					</div>
					<div className='bc-details'>
						<span className='bc-title'>
							Bill Title{' '}
							<span className='badge rounded-pill text-bg-primary'>Open</span>
						</span>
						<span className='bc-persons'>Person 1, Person 2, ...</span>
					</div>
					<div className='bc-price'>
						<span className='logo'>58,00 &euro;</span>
					</div>
				</div>
			</li>
		</ul>
	)
}

export default BillCard
