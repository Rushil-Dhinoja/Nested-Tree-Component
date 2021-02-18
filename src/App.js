/** @format */

import React, { useEffect, useState } from "react";
import Axios from "axios";
import "./App.css";
import Item from "./Item";

function App() {
	// To store API data Locally
	const [uiData, setUiData] = useState();

	// To Make API Request
	useEffect(() => {
		// Function to make API request because useEffect itself can't be async
		const dataCall = async () => {
			const data = await Axios.get(
				"https://www.mocky.io/v2/5cff79fc3200007100eac68f"
			);

			setUiData(data.data.responseData);
		};

		// Calling Function to get DATA
		dataCall();
	}, []);

	// Returning JSX
	return (
		<div>
			{/* The component to render the ITEM */}
			<Item {...uiData} />
		</div>
	);
}

export default App;
