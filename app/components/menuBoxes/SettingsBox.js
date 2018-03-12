import React from 'react'
import SharedStyles from '../../others/SharedStyles'
import Switch from 'react-switch'
import swal from 'sweetalert2'
import { css } from 'emotion'
import Colors from '../../others/Colors'

const iconClass = css`
	border-radius: 0px;
	.swal2-icon.swal2-warning.swal2-animate-warning-icon {
		color: #d33;
		border-color: #d33;
	}
`
const style = {
	main: {},
	button: {
		...SharedStyles.button,
		...SharedStyles.menuBoxButton,
		textAlign: 'center',
	},
	label: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		margin: '14px 0',
	},
}

export default class SettingsBox extends React.Component {
	constructor(props) {
		super(props)
		this.messageSoundOnChangeHandler = this.messageSoundOnChangeHandler.bind(this)
		this.clearAppData = this.clearAppData.bind(this)
	}
	messageSoundOnChangeHandler() {
		this.props.setMessageSoundOn(!this.props.messageSoundOn)
	}
	clearAppData() {
		swal({
			title: 'Are you sure?',
			text: 'You won\'t be able to revert this!',
			type: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#d33',
			cancelButtonColor: Colors.mainDark,
			confirmButtonText: 'Remove all data',
			customClass: iconClass,
		}).then((result) => {
			if (result.value) {
				this.props.wipeAppData()
			}
		})
	}
	render() {
		const { style: customStyle, messageSoundOn } = this.props
		return <div style={{ ...style.main, ...customStyle }}>
			<button
				style={{ ...style.button }}
				onClick={ this.clearAppData }
			>
				Wipe all app data
			</button>
			<label htmlFor="material-switch" style={ style.label }>
				<span>Message sound</span>
				<Switch
					checked={ messageSoundOn }
					onChange={ this.messageSoundOnChangeHandler }
					onColor={ Colors.mainDark }
					onHandleColor={ Colors.mainLight }
					handleDiameter={ 30 }
					activeBoxShadow="0px 0px 1px 10px rgba(255, 255, 255, 0.2)"
					height={ 30 }
					width={ 64 }
					id="material-switch"
				/>
			</label>
		</div>
	}
}