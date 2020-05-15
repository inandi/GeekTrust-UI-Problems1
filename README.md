
# Problem Context

Our problem is set in the planet of Lengaburu…in the distant distant galaxy of Tara B. After the recent war with neighbouring planet Falicornia, King Shan has exiled the Queen of Falicornia for 15 years.
Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she will be exiled for another 15 years..

## Technology and how to start the program and test it

* Apache (XAMPP)
* Javascript/JQuery
* Browser e.g. Google Chrome

Install XAMPP on your system. And copy the project directory in htdoc directory of xampp. The structure will be like this below diagram:

* xampp/
	* htdocs/
		* GeekTrust-UI-Problems1/

 Run localhost from XAMPP and open "http://localhost/GeekTrust-UI-Problems1/" on your browser and start calculating the problem. It will show you its home screen having four dropdown for destinations. It is having option of planets e.g. Donlon, Enchai, Jebing, Sapir, Lerbin, Pingasor using "https://findfalcone.herokuapp.com/planets" API. On change of every planet-dropdown available space-vehicle will appear below the each dropdown in radio-button format using "https://findfalcone.herokuapp.com/vehicles" API. Option will be like this "sapce ship(2)", where first is the name of vehicle and in parenthesis it is available amount. also we are getting speed and max-distance of vehicles, if the selected planet's distance is greater than of any vehicle, they the vehicle option will be disabled. Now you can start selecting vehicles for your selected planet. Whenever you select vehicle three things will happen, which are:

* On the right hand side, in "Time taken" box, total time taken by all selected vehicles for their respective planet will be displayed
* Whenever you select any option, the count in parenthesis will be updated. If it is 'zero', all the other non-selected options will be strike out and won’t be able select those. If you want to select those, you have re-calculate and select other option to make this available
* "Find falcone", is disabled by default, you have to select all the four vehicles for four planets then it will available to click

Now when you have selected all the option, hit "Find falcone". it will redirect you to new page with message (using "https://findfalcone.herokuapp.com/find" API) whether it’s a success/fail. 

Yahoo!!! We have found Falcone!!
