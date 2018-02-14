import { 
	CHANGE_MESSAGE_SOUND_ON,
} from '../actionTypes/index'

export const changeMessageSoundOn = (on) => ({
	type: CHANGE_MESSAGE_SOUND_ON,
	on,
})