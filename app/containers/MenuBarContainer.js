import { connect } from 'react-redux'
import MenuBar from './../components/MenuBar'
import { createNewKeyAction } from '../actions/index'

const mapStateToProps = (state, ownProps) => {
	return {
		...ownProps,
		keys: state.keys,
		keyRequestInProgress: state.others.keyRequestInProgress,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		createNewKey: () => {
			dispatch(createNewKeyAction())
		},
	}
}

const MenuBarContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(MenuBar)

export default MenuBarContainer