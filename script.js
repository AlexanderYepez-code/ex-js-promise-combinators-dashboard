// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).
// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).
// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.


// const getDashboardData = async (query) =>{
//     const res = await fetch(`http://localhost:3333/destinations?search=${query}`)
//     const obj = await res.json()
//     const destination = obj[0];

//     const data = {
//         city: destination.name,
//         country: destination.country,
//     }
// return data
// }




    async function getDashboardData(query) {
        console.log(`caricando i dati dalla chiamata ${query}`)
        try{
            const destinationPromise = fetchRequest(`http://localhost:3333/destinations?search=${query}`);
            const weatherPromise = fetchRequest(`http://localhost:3333/weathers?search=${query}`);
            const airportspromise = fetchRequest(`http://localhost:3333/airports?search=${query}`);

            const promises = [destinationPromise,weatherPromise,airportspromise];
            const[destination,weather,airport] = await Promise.all(promises);

            return {
                city: destination[0].name,
                country: destination[0].country,
                temperature : weather[0].temperature,
                weather_description: weather[0].weather_description,
                airport: airport[0].name 

            }
        }catch(error){
            throw new Error(`Errore nel recupero dei dati`)
        }

        
    }


getDashboardData('london')
    .then(data => {
        console.log('Dasboard data:', data);
        console.log(
            `${data.city} is in ${data.country}.\n` +
            `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
            `The main airport is ${data.airport}.\n`
        );
    })
    .catch(error => console.error(error));

    async function fetchRequest(url) {
        const response = await fetch (url);
        const obj = await response.json()
        return obj
    }



