import React from 'react'
import Colors from '../others/Colors'
import Linkify from 'react-linkify'
import { css } from 'react-emotion'
import ReactTooltip from 'react-tooltip'
import PropTypes from 'prop-types'
import moment from 'moment'

const mainClass = css`
	margin: 5px 0;
	display: flex;
	flex-direction: column;
	color: ${Colors.mainDark};
	border: solid ${Colors.mainDark};
	border-width: 0;
	.inner {
		background: ${Colors.mainDark};
		color: white;
		word-wrap: break-word;
		border-radius: 6px;
		text-align: left;
		padding: 5px 10px;
		width: auto;
		max-width: calc(100% - 50px);
		display: inline-block;
		position: relative;
		.arrow {
			position: absolute;
			top: 0;
			width: 0; 
			height: 0; 
			border-top: 0px solid transparent;
			border-bottom: 8px solid transparent;
		}
		.arrow-left {
			left: -5px;
			border-right: 5px solid ${Colors.mainDark};
		}
		.arrow-right {
			right: -5px;
			border-left: 5px solid ${Colors.mainDark};
		}
	}
	.content {
		a {
			color: white;
		}
	}
`
export default function Message({ style: customStyle, children, left, synced,
	error, removeMessage, resendMessage, date }) {
	const alignItems = left ? 'flex-start' : 'flex-end'
	const borderRadius = left ? { borderTopLeftRadius: '0px' } : { borderTopRightRadius: '0px' }
	const errorStyles = error
		? { borderWidth: '0 3px 0 0', paddingRight: '7px', marginBottom: '10px' }
		: {}
	const errorInfo = !error
		? ''
		: <div style={{ color: '#b44' }}>
			Message not sent
		</div>
	const errorActions = !error
		? ''
		: <div>
			<span
				style={{ marginRight: '8px', color: Colors.mainDark, cursor: 'pointer' }}
				onClick={ resendMessage }
			>
				<i className="fas fa-redo"></i> Retry
			</span>
			<span
				style={{ cursor: 'pointer' }}
				onClick={ removeMessage }
			>
				<i style={{ color: '#b44' }} className="fas fa-ban"></i> Discard
			</span>
		</div>
	const opacity = synced ? 1 : 0.7
	const messageDate = moment(date).calendar(null, {
		sameDay: '[Today], HH:mm:ss',
		lastDay: '[Yesterday], HH:mm:ss',
		sameElse: 'MMM Do YYYY, HH:mm:ss',
	})
	const tooltipId = 'date-' + Math.round(Math.random() * 1e9)	//random id
	const tooltipPlace = left ? 'left' : 'right'
	return <div className={ mainClass } style={{ alignItems, ...errorStyles, ...customStyle }}>
		<div
			data-tip
			data-for={ date ? tooltipId : undefined }
			data-event="mouseover"
			data-event-off="mouseout click"
			className="inner"
			style={{ ...borderRadius, opacity }}
		>
			<div className={`arrow ${left ? 'arrow-left' : 'arrow-right'}`}></div>
			<Linkify className="content" properties={{ target: '_blank' }}>{ children }</Linkify>
		</div>
		<ReactTooltip id={ tooltipId } place={ tooltipPlace } type="dark" effect="solid">
			<span>{ messageDate }</span>
		</ReactTooltip>
		{ errorInfo }
		{ errorActions }
	</div>
}

Message.propTypes = {
	style: PropTypes.object,
	children: PropTypes.node.isRequired,
	left: PropTypes.bool.isRequired,
	synced: PropTypes.bool,
	error: PropTypes.bool,
	removeMessage: PropTypes.func.isRequired,
	resendMessage: PropTypes.func.isRequired,
	date: PropTypes.instanceOf(Date),
}
Message.defaultProps = {
	style: {},
	synced: true,
	error: false,
}