import { connect } from 'react-redux'
import MenuBar from './../components/MenuBar'
import { createNewKeyAction, changeMessageSoundOn } from '../actions/index'

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		keys: state.keys,
		keyRequestInProgress: state.others.keyRequestInProgress,
		messageSoundOn: state.others.messageSoundOn,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		createNewKey: () => {
			dispatch(createNewKeyAction())
		},
		wipeAppData: () => {
			localStorage.removeItem('appState')
			location.reload()
		},
		setMessageSoundOn: (on) => {
			dispatch(changeMessageSoundOn(on))
		},
	}
}

const MenuBarContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuBar)

export default MenuBarContainer