(function($) {
   let html = '';
   if (localStorage.getItem('herokuapp_response')) {
      html = `
      <h1> ${(JSON.parse(localStorage.getItem('herokuapp_response'))["status"]) ? firstLetterUppercase(JSON.parse(localStorage.getItem('herokuapp_response'))["status"]) : 'Success'}! Congratulations on Finding Falcone. King Shan is mighty pleased.</h1>
      <h3>Time taken : ${(JSON.parse(localStorage.getItem('herokuapp_response'))["time_taken"]) ? (JSON.parse(localStorage.getItem('herokuapp_response'))["time_taken"]) : ''}</h3>
      <h3>Planet found : ${(JSON.parse(localStorage.getItem('herokuapp_response'))["planet_name"]) ? firstLetterUppercase(JSON.parse(localStorage.getItem('herokuapp_response'))["planet_name"]) : ''}</h3>
      `;
      localStorage.setItem('herokuapp_response', '');
   } else { 
      html = `
      <h1>Error! Nothing happened, let's try again.</h1>
      `;
   }  
   $('.geektrust-message').html(html);
})($);