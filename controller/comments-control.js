const Comment = require('../models/Comments');

exports.postComment = (req, res) => {
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

   // console.log(query);
   Comment.create(query, (err, inserted) => {
      if (err) throw err;
      res.redirect('back');
   })
}

exports.getComment = (req, res) => {


   Comment.find({liveshows_id: req.body._id}, null, {sort: {date: -1}}, (err, comments) => {
      if(err) throw err;

      res.send(comments);
   })
}


exports.deleteComment = (req, res) => {
   Comment.deleteOne({_id: req.body._id}, (err, done) => {
      if(err) throw err;

      res.redirect("back");
   })
}