import React, { useState, useEffect } from "react";
import '../assets/css/styles.css'
import '../assets/css/index.css'
import moon from '/img/moon.jpg'

function Home() {
    const [backendData, setBackendData] = useState([{}])
    useEffect(() => {
		fetch("http://localhost:5000/api"
		).then(
			response => response.json()
		).then(
			data => {
				setBackendData(data)
			}
		);
	}, []);

    return (
        <>
            {(typeof backendData.users === 'undefined') ? (
				<p>Loading...</p>
			) : (
				backendData.users.map((user, i) => (
					<p key={i}>{user}</p>
				))
			)}

            <div class="body-container">
                <h1 class="hero-header">Home</h1>
                <img src={moon} class="hero-img"/>
            </div>
        </>
    );
}

export default Home;