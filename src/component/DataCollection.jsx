'use client'
import styles from "../app/page.module.css";

import { useState, useEffect} from 'react';
import SearchIcon from '@mui/icons-material/Search';
import CloudIcon from '@mui/icons-material/Cloud';
import DehazeIcon from '@mui/icons-material/Dehaze';
import VapingRoomsIcon from '@mui/icons-material/VapingRooms';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import FilterDramaIcon from '@mui/icons-material/FilterDrama';
    // const WEATHER_API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY
    const WEATHER_API_KEY= 'b6d44e253afb80c1f622eed1b51db91e';
    console.log(WEATHER_API_KEY)
const DataCollection = () =>{
    const currentTime = new Date().toLocaleTimeString([],{
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        
    })
    const initalState = 'London';
    const [ place, setPlace ] =useState(initalState);
    const [placeData, setPlaceData] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleChange = (e) =>{
        setPlace(e.target.value);
    }
    const getWeatherData = async () =>{
    if(place && place.length > 0){
        setLoading(true);
        setError(null);
        try{
            let encodedPlace = encodeURIComponent(place);
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedPlace}&appid=${WEATHER_API_KEY}`;
            let response = await fetch(url);
            let data = await response.json();
            console.log('Get weather', data);
            console.log(data.name)
            setPlaceData(data)
        }
        catch(err){
        console.log(err);
        setError('Failed to fetch weather data');
        }
        finally{
            setLoading(false)
        }
    }

    }
    useEffect(()=>{
            getWeatherData();
}, [])

    return (
        <div className={styles.firstdiv}>
            <div className={styles.searchbar}>
            <input type="search"  onChange={handleChange} placeholder='Enter the name of the city'/>
                <button onClick={getWeatherData}><SearchIcon/></button>
            </div>
            {isLoading && <p>Loading......</p>}
            {error && <p>{error}</p>}
                {
                    placeData &&placeData.weather[0]&& !isLoading && <div className={styles.row}>
                        <div className={styles.section1}>
                            <div className={styles.section11}>
                            {placeData.weather[0].main === 'Clouds' && <CloudIcon className={styles.weathericon}/>}
                                {placeData.weather[0].main === 'Haze' && <DehazeIcon className={styles.weathericon}/>
                                }
                                {placeData.weather[0].main === 'Smoke' && <VapingRoomsIcon className={styles.weathericon}/>
                                }
                                {placeData.weather[0].main === 'Rain' && <ThunderstormIcon className={styles.weathericon}/>}
                                {placeData.weather[0].main === 'Clear' && <FilterDramaIcon className={styles.weathericon}/>}
                                <p className={styles.temp}>{placeData? <span>{(placeData?.main.temp - 273.15).toFixed(2)} degree celcius</span> : ''}</p>
                            </div>
                            <div className={styles.section11}>
                                <p className={styles.city}>{placeData?.name}</p>
                                <p className={styles.weathertype}>{placeData?.weather[0].main}</p>
                                <p className={styles.place}>{placeData? <span>{placeData.weather[0].description}</span> : ''}</p>
                            </div>
                        </div>
            
                        <div className={styles.timediv}>
                            <p className={styles.time}>{currentTime}</p>
                        </div>
                    </div>
                }
                {
                    placeData && placeData?.weather[0]
                    &&  <div className={styles.section2}>
                            <div className={styles.section21}>
                                <p className={styles.head1}>Temperature</p>
                                <p className={styles.head2}>{(placeData?.main.temp - 273.15).toFixed(2)} degree celcius</p>
                            </div>

                            <div className={styles.section21}>
                                <p className={styles.head1}>Temperature Min</p>
                                <p className={styles.head2}>{(placeData?.main.temp_min - 273.15).toFixed(2)} degree celcius</p>
                            </div>

                            <div className={styles.section21}>
                                <p className={styles.head1}>Temperature Max</p>
                                <p className={styles.head2}>{(placeData?.main.temp_max - 273.15).toFixed(2)} degree celcius</p>
                            </div>

                            <div className={styles.section21}>
                                <p className={styles.head1}>Humidity</p>
                                <p className={styles.head2}>{placeData?.main.humidity}</p>
                            </div>

                            <div className={styles.section21}>
                                <p className={styles.head1}>Pressure</p>
                                <p className={styles.head2}>{placeData?.main.pressure}</p>
                            </div>

                            <div className={styles.section21}>
                                <p className={styles.head1}>Visibility</p>
                                <p className={styles.head2}>{placeData?.visibility}</p>
                            </div>

                            <div className={styles.section21}>
                                <p className={styles.head1}>Wind Speed</p>
                                <p className={styles.head2}>{placeData?.wind.speed} km/hr</p>
                            </div>
                        </div>
                }
        </div>

    )
}
export default DataCollection

