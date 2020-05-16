
# Problem Context

Our problem is set in the planet of Lengaburu…in the distant distant galaxy of Tara B. After the recent war with neighbouring planet Falicornia, King Shan has exiled the Queen of Falicornia for 15 years.
Queen Al Falcone is now in hiding. But if King Shan can find her before the years are up, she will be exiled for another 15 years..

## Technology and how to start the program and test it

* Apache (XAMPP)
* PHP
* Javascript/JQuery
* Browser e.g. Google Chrome

Install XAMPP on your system. And copy the project directory in htdoc directory of XAMPP. The structure will be like this below diagram:

* xampp/
	* htdocs/
		* GeekTrust-UI-Problems1/

Run localhost from XAMPP and open "http://localhost/GeekTrust-UI-Problems1/" on your browser and start solving the problem. You will be shown four dropdowns for destination planets e.g. Donlon, Enchai, Jebing, Sapir, Lerbin, Pingasor using "https://findfalcone.herokuapp.com/planets" API. Every destination planet from the drop down list will show the available space-vehicle in radio-button format using "https://findfalcone.herokuapp.com/vehicles" API on selection. The space vehicle will be shown as “space ship(2)” where the first part is the name and the number within parenthesis being the available units. 

Also we are getting speed and max-distance of vehicles from API. If the selected planet's distance is greater than the max-distance of the vehicle, then the radio button will be disabled for that particular vehicle. Now you can start selecting vehicles for your selected planet. When vehicles are selected, three things happen:
* On the right hand side, in "Time taken" box, total time taken by all selected vehicles for their respective planet will be summed up and displayed.
* When you select a vehicle, the count in parenthesis will be updated. If the count becomes 'zero' for a particular vehicle, it will be struke out for other destinations. To make the vehicle available again, it has to be de-selected from any of the previous destination(s).
* "Find Falcone!" button is disabled by default. The button is activated only when all the four destinations have been selected along with the four vehicles.
On clicking the “Find Falcone!” button, you will be re-directed to a new page with the response (success/failure) message (using "https://findfalcone.herokuapp.com/find" API).

Yahoo!!! We have found Falcone (or not)!!
