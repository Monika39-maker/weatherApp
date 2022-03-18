window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree');
    let temperatureSection = document.querySelector('.temperature')
    let locationTimeZone = document.querySelector('.location-timezone');
    let icon = document.querySelector('#icon');
    const temperatureSpan = document.querySelector('.temperature span')
    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            // const proxy = "https://cors-anywhere.herokuapp.com/";

            const myApi = '6839eb866f13c6bd59fdcd5c8a418409'
            const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${myApi}`

            fetch(api)
            .then(response => {
                return response.json()
            })
            .then(data => {
                console.log(data)
                const {temp, feels_like, name} = data.main;
                const currentTempInKelvin = temp;
                const currentTempInFarenheit = Math.floor((currentTempInKelvin - 273.15) * 9/5 + 32);
                console.log(currentTempInFarenheit)
                temperatureDegree.textContent = currentTempInFarenheit;
                temperatureDescription.textContent = `Feels like: ${feels_like}`;
                locationTimeZone.textContent = data.name;

                //FORMULA FOR CELSIUS   
                let celsius = Number((currentTempInFarenheit - 32) * (5/9)).toFixed(2)

                icon.innerHTML = `<img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png" />`;

                //change temperatur to Celsius/Fatenheit
                temperatureSection.addEventListener('click', () => {
                    if(temperatureSpan.textContent === 'F') {
                        temperatureSpan.textContent = 'C';
                        temperatureDegree.textContent = celsius;
                    } else {
                        temperatureSpan.textContent = 'F';
                        temperatureDegree.textContent = currentTempInFarenheit 
                    }
                })

            })
               
                
        });

        
        
    }

    
})



