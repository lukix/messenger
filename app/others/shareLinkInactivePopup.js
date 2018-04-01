import swal from 'sweetalert2'
import Colors from './Colors'

export default function showShareLinkInactivePopup() {
	const titleText = 'URL does not exist'
	const text = `
		The URL you've entered from does not exist or it has expired.
		If someone has sent it to you, request a new one.
	`
	swal({
		titleText,
		html: text,
		type: 'error',
		confirmButtonColor: Colors.mainDark,
		confirmButtonText: 'Close',
	})
}