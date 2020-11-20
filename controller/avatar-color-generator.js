exports.avatarGenerator = () => {
   const avatars = [
      '<i class="fas fa-cat"></i>',
      '<i class="fas fa-horse-head"></i>',
      '<i class="fas fa-spider"></i>',
      '<i class="fas fa-dragon"></i>',
      '<i class="fas fa-dog"></i>',
      '<i class="fas fa-hippo"></i>',
      '<i class="fas fa-fish"></i>',
      '<i class="fas fa-dove"></i>',
      '<i class="fas fa-paw"></i>',
      '<i class="fas fa-otter"></i>',
      '<i class="fab fa-earlybirds"></i>',
      '<i class="fas fa-hand-middle-finger"></i>',
      '<i class="fas fa-crow"></i>'
   ]

   let randomNum = Math.floor(Math.random() * 13);
   
   return avatars[randomNum];
}


exports.colorGenerator = () => {
   const colors = [
      'bg-green',
      'bg-yellow',
      'bg-red',
      'bg-blue',
      'bg-violet',
      'bg-orange',
      'bg-pink',
      'bg-gray',
      'bg-teal',
      'bg-black'
   ];

   let randomNum = Math.floor(Math.random() * 10);
   
   return colors[randomNum];
}

