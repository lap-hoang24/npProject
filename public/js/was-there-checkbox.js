// ========== CHECK BOX ==================
const checked = document.getElementById('was-there').getAttribute('checked');

console.log(checked);

async function wasThereCheck() {
   const user_id = document.getElementById('user_id').value;
   const event_id = document.getElementById('liveshow_id').value;
   const checked = document.getElementById('was-there').getAttribute('checked');

   console.log(checked);
   if (checked == null) {
      try {
         let response = await fetch('/users/wasThere', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               user_id: user_id,
               event_id: event_id
            })
         })

         response = await response.text();

      } catch (err) {
         console.error(err);
      }
   } else {
      try {
         let response = await fetch('/users/uncheckWasThere', {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               user_id: user_id,
               event_id: event_id
            })
         })

         response = await response.text();

         if (response == "no") {
            document.getElementById('was-there').removeAttribute('checked');
         }

      } catch (err) {
         console.error(err);
      }
   }
}

// ====== CHECK IF USER WAS THERE AND CHECKED THE BOX ============


async function trueUserWasThere() {
   const user_id = document.getElementById('user_id').value;
   const event_id = document.getElementById('liveshow_id').value;

   try {
      let response = await fetch('/users/ifWasThere', {
         method: "POST",
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({
            user_id: user_id,
            event_id: event_id
         })
      })

      response = await response.text();
      console.log(response);
      if (response == "yes") {
         document.getElementById('was-there').setAttribute('checked', 'checked');
      }

   } catch (err) {
      console.error(err);
   }

}

trueUserWasThere();
