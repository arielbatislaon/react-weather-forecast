import React,{useReducer} from 'react'
import './App.css'
import CitySearch from './components/city-search'
import ForeCastContainer from './components/forecast-container'



const selectedCity = {
	forecasts: [],
	city: ''
}
const reducer = (state, action) => {
	switch (action.type) {
		case 'SET_CITY_FORECAST':
			return action.payload
		default:
			return state
	}
}

export const CityForecastContext = React.createContext()

function App() {
	const [state, dispatch] = useReducer(reducer, selectedCity)
	return (
		<CityForecastContext.Provider
			value={{ cityState: state, cityIdDispatch: dispatch}}
		>
			<div className="App">
				<h2>Major City Weather Forecast</h2>
				<CitySearch />
				<ForeCastContainer forecasts={state.forecasts} city={state.city}/>
			</div>
		</CityForecastContext.Provider>
	)
}

export default App
