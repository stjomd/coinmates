import image from '../../assets/error.svg'
import './ErrorPage.scss'

function ErrorPage() {
	return (
		<div className='ep-container'>
			<img id='error-image' src={image} />
			<div className='ep-right'>
				<p className='ep-title'>Nothing to see here!</p>
				<p>Sorry, but there is no content for you on this page.</p>
			</div>
		</div>
	)
}

export default ErrorPage
