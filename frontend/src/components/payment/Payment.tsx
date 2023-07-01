import './Payment.scss'

function Payment() {
	return (
		<ul className='list-group'>
			<li className='list-group-item payment-content'>
				<div className='payment-date'>
					<span>1</span>
					<span>JUL</span>
				</div>
				<div className='payment-info'>
					<div>
						You received{' '}
						<span className='payment-amount-pos'>10,00 &euro;</span> from
						Lucille
					</div>
					<div className='payment-description'>For the banana</div>
				</div>
			</li>
		</ul>
	)
}

export default Payment
