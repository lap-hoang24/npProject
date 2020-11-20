const commentBtn = document.getElementById('comment-btn');



commentBtn.addEventListener('click', async (event) => {
   event.preventDefault();
   const content = document.getElementById('content').value;
   const user_name = document.getElementById('user_name').value;
   const user_id = document.getElementById('user_id').value;
   const user_avatar = document.getElementById('user_avatar').value;
   const liveshow_id = document.getElementById('liveshow_id').value;
   const user_color = document.getElementById('user_color').value;

   try {
      let response = await fetch('/comments/comment', {
         method: "POST",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            content: content,
            user: {
               user_name: user_name,
               user_id: user_id,
               user_avatar: user_avatar,
               user_color: user_color
            },
            liveshows_id: liveshow_id
         })
      });

      response = await response.text();

      console.log("Comment posted succesfully");

   } catch (err) {
      console.error(err);
   }

   document.getElementById('content').value = "";

   // ================================

   getAllComments();
})


// ===============================

window.addEventListener("load", () => {

   const deleteBtn = document.getElementsByClassName('delete-btn');
   console.log(deleteBtn.length);

   for (let i = 0; i < deleteBtn.length; i++) {
      deleteBtn[i].addEventListener('click', async (event) => {
         // event.preventDefault();
         console.log(event.target);
         const commentId = event.target.parentElement.getAttribute('comment_id');

         console.log(commentId);

         let response = await fetch(`/comments/delete`, {
            method: "DELETE",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               _id: commentId
            })
         });

         response = await response.text();
         window.location.reload();
      })
   }
})






// ========================================
async function getAllComments() {
   try {
      const commentWrapper = document.getElementById('comment-wrapper');
      const liveshow_id = document.getElementById('liveshow_id').value;
      console.log(liveshow_id);
      let htmlString;

      let res = await fetch('/comments/getcomment', {
         method: "POST",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            _id: liveshow_id
         })
      })
      dataSet = await res.json();
      console.log(dataSet);
      dataSet.forEach(data => {
         htmlString += `<div class="comment">
         <div class="left ${data.user.user_color}">
            ${data.user.user_avatar}
         </div>
         <div class="right">
            <div class="comment-user">${data.user.user_name}:</div>
            <div class="comment-content">${data.content}</div>
         </div>
            <div class="setting">
            <i class="fas fa-ellipsis-v"></i>
               <div class="edit-delete" comment_id="${data._id}">
                  <button class="edit-btn">Edit</button>
                  <button class="delete-btn">Delete </button>
               </div> 
            </div>
      </div>` ;
      })

      commentWrapper.innerHTML = htmlString;

   } catch (err) {
      console.error(err);
   }
}

getAllComments();






