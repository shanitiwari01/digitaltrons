import { combineReducers } from 'redux';
import { UPDATE_SLOT, FETCH_SLOTS } from './../core/constant';

const INITIAL_STATE = {
    slots: []
};

const slotsReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCH_SLOTS:

            let slotsList = action.payload;
            // Finally, update the redux state
            const newSlotsList = { slots: slotsList };

            return newSlotsList;

        case UPDATE_SLOT:

            // We do not want to alter state directly in case
            // another action is altering it at the same time
            const {
                slots
            } = state;

            let slot = action.payload;
            let index = slots.indexOf((e) => e.id == slot.id);

            if (index > -1) {
                slots[index] = slot;
            }

            // Finally, update the redux state
            const newState = { slots };

            return newState;

        default:
            return state
    }
};

export default combineReducers({
    slots: slotsReducer
});
