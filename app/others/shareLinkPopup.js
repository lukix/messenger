import { css } from 'react-emotion'
import swal from 'sweetalert2'
import Colors from './Colors'
import axios from './axiosInstance'

const shareLinkPopupClass = css`
	#swal2-content {
		text-align: left
		.urlInput  {
			font-family: 'Courier';
			font-size: 1rem
			font-weight: bold
			width: 100%
			margin: 5px 0 10px 0
			display: block
		}
	}
`

export default function showShareLinkPopup(publicKey) {
	const titleText = 'Share your key via URL'
	const baseUrl = `${CONFIG.frontUrl}/`
	return () => {
		const text = `
		<input
			type="text"
			class="urlInput"
		>
		Send it to a person, you want to start a conversation with.
		Link will be active for the next 24 hours.
	`
		swal({
			titleText,
			html: text,
			confirmButtonColor: Colors.mainDark,
			confirmButtonText: 'Close',
			customClass: shareLinkPopupClass,
			onOpen: () => {
				document.getElementById('swal2-content').style.display = 'none'
				swal.showLoading()
				axios.post('/publicKeys', { publicKey })
					.then(({ data }) => {
						document.querySelector('#swal2-content .urlInput').value =
							baseUrl + data.aliasName
						swal.hideLoading()
						document.getElementById('swal2-content').style.display = 'block'
					})
					.catch(() => {
						document.querySelector('#swal2-content').innerHTML =
							'Error - cannot fetch URL'
						swal.hideLoading()
						document.getElementById('swal2-content').style.display = 'block'
					})
			},
		})
	}
}