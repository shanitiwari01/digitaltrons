import { UPDATE_SLOT, FETCH_SLOTS } from './../core/constant';

export const updateSlot = slot => (
    {
        type: UPDATE_SLOT,
        payload: slot,
    }
);

export const fetchSlots = slots => (
    {
        type: FETCH_SLOTS,
        payload: slots,
    }
);