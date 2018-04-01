import React from 'react'
import moment from 'moment'
import { css } from 'react-emotion'
import Colors from '../../others/Colors'
import swal from 'sweetalert2'
import axios from '../../others/axiosInstance'

const mainClass = css`
	margin-bottom: 10px
	.keyInputText {
		width: 100%
		background: transparent
		border: none
		color: white
		margin: 1px 0
	}
	.topBar {
		display: flex
		flex-direction: row
		justify-content: space-between
		align-items: center
	}
	.shareButton {
		border: none
		padding: 0 8px
		cursor: pointer
		border-radius: 4px
		background: white
		color: black
		height: 22px
		font-size: 0.9rem
		&:hover {
			background: ${Colors.mainLight}
		}
	}
`
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

const showShareLink = (publicKey) => {
	const titleText = 'Share your key via URL'
	const baseUrl = 'https://safe-messenger.herokuapp.com/'
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
const selectTarget = (event) => event.target.select()
export default function KeysBox({ publicKey, createdDate }) {
	const dateString = moment(createdDate).format('MMM Do, HH:mm:ss')
	return <div className={mainClass}>
		<div className="topBar">
			<span>{dateString}</span>
			<button className="shareButton" onClick={showShareLink(publicKey)}>
				<i className="fas fa-link"></i> Share URL
			</button>
		</div>
		<input
			type="text"
			className="keyInputText"
			value={publicKey}
			onFocus={selectTarget}
			readOnly
		/>
	</div>
}