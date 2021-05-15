const HttpStatus = require("http-status-codes");
const Slots = require("../../models/slots");
const Constants = require("./../../config/constants");

/**
 * Default api or home api
 * 
 * @param {*} req 
 * @param {*} res 
 */
const home = async (req, res) => {
  let statusCode = HttpStatus.NO_CONTENT;
  const dataObject = {};
  let statusMessage = "Undefined Response Error";


  statusCode = HttpStatus.OK;
  statusMessage = "API Home Response";
  dataObject.message = statusMessage;

  res.status(statusCode).json({
    'status': statusCode,
    'data': dataObject,
    'message': statusMessage
  }).end();
}

/**
 * Fetch slots
 * 
 * @param {*} req 
 * @param {*} res 
 */
const slots = async (req, res) => {
  let statusCode = HttpStatus.NO_CONTENT;
  const dataObject = {};
  let statusMessage = "Undefined Response Error";

  const SlotsList = await Slots.findAll({
    where: { status: Constants.Status.Active_Status }
  });

  if(SlotsList){
    statusCode = HttpStatus.OK;
    statusMessage = "Slots List";
    dataObject.message = statusMessage;
    dataObject.slots = SlotsList;
  }else{
    statusCode = HttpStatus.OK;
    statusMessage = "unavailable Slots";
    dataObject.message = statusMessage;
  }

  res.status(statusCode).json({
    'status': statusCode,
    'data': dataObject,
    'message': statusMessage
  }).end();
}

/**
 * Update slot first name, last name. and, mobile
 * 
 * @param {*} req 
 * @param {*} res 
 */
const updateSlot = async (req, res) => {
  let statusCode = HttpStatus.NO_CONTENT;
  const dataObject = {};
  let statusMessage = "Undefined Response Error";
  let validate = true;
  dataObject.errors = {};
  console.log(req.body);
  const slotId = req.body.slotId;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const mobile = req.body.mobile;

  if(!firstName){
    validate = false;
    dataObject.errors.firstName = "Please provide first name";
  }

  if(!lastName){
    validate = false;
    dataObject.errors.lastName = "Please provide last name";
  }

  if(!mobile){
    validate = false;
    dataObject.errors.mobile = "Please provide mobile";
  }

  if(validate){

    let slot = await Slots.findOne({
      where: { id: slotId },
    });

    slot.first_name = firstName;
    slot.last_name = lastName;
    slot.mobile = mobile;
    slot.is_booked = Constants.Status.Active_Status;
    slot.save();

    statusCode = HttpStatus.OK;
    statusMessage = "Slot updated";
    dataObject.message = statusMessage;

  }else{
    statusCode = HttpStatus.NO_CONTENT;
    statusMessage = "Validation Error Found";
  }

  console.log(statusMessage);
  res.status(HttpStatus.OK).json({
    'status': statusCode,
    'data': dataObject,
    'message': statusMessage
  }).end();
}

module.exports = {
  home: home,
  slots: slots,
  updateSlot: updateSlot
};
