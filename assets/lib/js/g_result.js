var herokuappResponse = '';

/**
* update data with response from find API
*/
(function($) {
   herokuappResponse = localStorage.herokuapp_response;
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
      <h1>Nothing to display, let's try again. You will be redirected to main page in <span class="span-timer">5</span> second(s).</h1>
      `;
   }  
   $('.geektrust-message').html(html);
})($);

/**
* if nothing to display then edirect to index page in 5 seconds
*/
setTimeout(function(){
   if (!herokuappResponse) {
      window.location = "index.php"; 
   }
}, 5000);

/**
* time box in seconds 
*/
setInterval(function(){ 
   $('.span-timer').html($('.span-timer').html()-1)
}, 1000);