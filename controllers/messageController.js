const asyncHandler = require("express-async-handler");
const {
  makeMessage,
  Message,
} = require("../models/message");
const {
    Expert,
  } = require("../models/Expert");
  
  const {
    User,
  } = require("../models/User");
  const mongoose = require("mongoose");

  /**
 *  @desc    make Message
 *  @route   /api/Message
 *  @method  get
 *  @access  private
 */
const getMessage = asyncHandler(async (req, res) => {

  let isUser=req.body.isUser;
  if(isUser==null){
    return res.status(400).json({message:"enter isUser"});
  }
  let messages;
  if(isUser){
    messages = await Message.find({ user: req.user.id ,expert:req.body.id});//.populate('expert');
  }else{
    messages = await Message.find({ expert: req.user.id,user:req.body.id });//.populate('expert');
  }

    res.status(200).json({messages:messages});
});

  /**
 *  @desc    make Message
 *  @route   /api/Message
 *  @method  get
 *  @access  private
 */
  const getUniqueUserMessages = asyncHandler(async (req, res) => {
    const expertId = req.user.id;
  
    const messages = await Message.aggregate([
      { $match: { expert: mongoose.Types.ObjectId(expertId) } }, // Match messages for the specific expert
      {
        $sort: { createdAt: -1 } // Sort by creation date, latest first
      },
      {
        $group: { 
          _id: "$user", 
          message: { $first: "$$ROOT" } // Get the first document in each group
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "message.user",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $unwind: "$userDetails"
      },
      {
        $project: {
          _id: 0,
          user: "$userDetails",
          text: "$message.text",
          createdAt: "$message.createdAt"
        }
      }
    ]);
  
    res.status(200).json({ messages });
  });

/**
 *  @desc    make Message
 *  @route   /api/Message
 *  @method  POST
 *  @access  private
 */
const doMessage = asyncHandler(async (req, res) => {

  let message;
if(req.body.isUser){
  let expert = await Expert.findOne({ _id: req.body.id });
  if (!expert) {
    return res.status(400).json({ message: "invalid expert" });
  }

  let user = await User.findOne({ _id: req.user.id });
  if (!user) {
    return res.status(400).json({ message: "invalid user" });
  }
  message = new Message({
    user: req.user.id,
    expert: req.body.id,
    text: req.body.text,
    sender:req.user.id,
  });
}else{
  let expert = await Expert.findOne({ _id: req.user.id });
  if (!expert) {
    return res.status(400).json({ message: "invalid expert" });
  }

  let user = await User.findOne({ _id: req.body.id });
  if (!user) {
    return res.status(400).json({ message: "invalid user" });
  }
  message = new Message({
    user: req.body.id,
    expert: req.user.id,
    text: req.body.text,
    sender:req.user.id,
  });
}

 

  const result = await message.save();
  res.status(200).json({ "message": "success make Message" });
});





module.exports = {
  getMessage,
  //getBookById,
  doMessage,
  getUniqueUserMessages


};
