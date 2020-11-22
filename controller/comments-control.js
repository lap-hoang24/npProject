const Comment = require('../models/Comments');
const Event = require('../models/Event');

exports.postComment = async (req, res) => {

   let query = {
      content: req.body.content,
      user: {
         user_name: req.body.user.user_name,
         user_id: req.body.user.user_id,
         user_avatar: req.body.user.user_avatar,
         user_color: req.body.user.user_color
      },
      liveshows_id: req.body.liveshows_id
   }

   try {
      let done = Comment.create(query);
      res.redirect('back');
   } catch (err) {
      console.error(err)
   }
}

exports.getComment = async (req, res) => {
   try {
      let comments = await Comment.find({ liveshows_id: req.body._id }, null, { sort: { date: -1 } })
      res.send(comments);
   } catch (err) {
      console.error(err);
   }
}


exports.deleteComment = async (req, res) => {
   try {
      let done = await Comment.deleteOne({ _id: req.body._id })
      res.redirect("back");
   } catch (err) {
      console.error(err);
   }
}

// functionality not finished yet
exports.editComment = (req, res) => {
   Comment.findOneAndUpdate({ _id: req.body_id }, (err, done) => {
      if (err) throw err;

      res.redirect("back");
   })
}

