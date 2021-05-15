const Slots = require("./slots");
const FeedRootData = async () => {
  const slotList = [
    { id: 1, slot_name: "09:00 AM to 10:00 AM", is_booked: 0 },
    { id: 2, slot_name: "10:00 AM to 11:00 AM", is_booked: 0 },
    { id: 3, slot_name: "11:00 AM to 12:00 PM", is_booked: 0 },
    { id: 4, slot_name: "12:00 PM to 01:00 PM", is_booked: 0 },
    { id: 5, slot_name: "01:00 PM to 02:00 PM", is_booked: 0 },
    { id: 6, slot_name: "02:00 PM to 03:00 PM", is_booked: 0 },
    { id: 7, slot_name: "03:00 PM to 04:00 PM", is_booked: 0 },
    { id: 8, slot_name: "04:00 PM to 05:00 PM", is_booked: 0 }
  ];
  for (const slot of slotList) {
    await Slots.create(slot);
  }
};

module.exports = {
  FeedRoot: FeedRootData,
};
