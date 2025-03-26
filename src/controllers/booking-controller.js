// const {ServiceError} = require('../utils/errors/index')
const {StatusCodes} = require('http-status-codes')
const {BookingService} = require('../services/index')

const bookingService = new BookingService();
const {createChannel , publishMessage} = require('../utils/messageQueue')
const {REMINDER_BINDING_KEY } = require('../config/serverConfig')

class BookingController{

    constructor(){
// this.channel = channel;
    }

    async sendMessageToQueue(req,res){ 
        const channel = await createChannel();
        const data = {message: " success"}
        publishMessage(channel , REMINDER_BINDING_KEY , JSON.stringify(data));
        return res.status(200).json({
            message : "successfully published the message"
        })
    }

    async create(req,res){
        try {
            const response =await bookingService.createBooking(req.body);
            // console.log("from booking controller response" , response)
            return res.status(StatusCodes.OK).json({
                message : 'Succesfully created a booking',
                data:response , 
                err :{},
                status : true,
    
            })
        } catch (error) {
            // console.log("from booking controller , error")
            return res.status(error.statusCodes).json({
                message : 'failed to create a booking',
                data:{} , 
                err :error.explanation,
                status : false,
    
            })
        }
}
}


module.exports = BookingController;
