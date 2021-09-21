import React,{useReducer} from 'react'
import './App.css'
import CitySearch from './components/city-search'
import ForeCastContainer from './components/forecast-container'
import { DISPATCH_ACTION } from '../src/config';

const ErrorFallback = ({ error }) => {
  return (
    <div role="alert">
      <p>Error Encountered !</p>
      <pre>{error.message}</pre>
    </div>
  );
};


const selectedCity = {
	forecasts: [],
	city: ''
}
const reducer = (state, action) => {
	switch (action.type) {
		case DISPATCH_ACTION.SET_CITY_FORECAST:
			return action.payload
		case DISPATCH_ACTION.DISPLAY_ERROR:
			return {error: action.payload}
		case DISPATCH_ACTION.RESET_ERROR:
			return {error: null}
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
				{state.error && <ErrorFallback error={state.error}/>}
			</div>
		</CityForecastContext.Provider>
	)
}

export default App
