async function getData() {
   //await the response of the fetch call
   let response = await fetch('https://api.github.com/users');
   //proceed once the first promise is resolved.
   let data = await response.json()
   //proceed only when the second promise is resolved
   console.log(data);
}
//call getData function

getData();

// async function resolve() {
//    let data = await getData();
//    console.log(data);
// }
// getData()
//    .then(data => console.log(data));//log the data

// resolve();