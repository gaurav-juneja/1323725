import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const windowSize = 10;

const App = () => {
    const [numberId, setNumberId] = useState('');
    const [numberWindow, setNumberWindow] = useState([]);
    const [result, setResult] = useState(null);

    const handleInputChange = (e) => {
        setNumberId(e.target.value);
    };

    const fetchAndCalculate = async () => {
        if (!['p', 'f', 'e', 'r'].includes(numberId)) {
            alert("Please enter a valid ID: 'p', 'f', 'e', or 'r'.");
            return;
        }

        try {
            const response = await axios.get(`http://localhost:5000/api/numbers/${numberId}`,{ timeout: 500 });
            const fetchedNumbers = response.data;

            // Update number window
            const updatedWindow = [...new Set([...numberWindow, ...fetchedNumbers])].slice(-windowSize);
            setNumberWindow(updatedWindow);

            // Calculate average
            const sum = updatedWindow.reduce((acc, num) => acc + num, 0);
            const avg = (sum / updatedWindow.length).toFixed(2);

            const resultData = {
                windowPrevState: numberWindow.slice(0, -fetchedNumbers.length),
                windowCurrState: updatedWindow,
                numbers: fetchedNumbers,
                avg: parseFloat(avg)
            };

            setResult(resultData);
        } catch (error) {
            console.error("Error fetching numbers:", error);
            alert("An error occurred while fetching numbers. Please try again.");
        }
    };

    return (
        <div className="container">
            <h1>Average Calculator Microservice</h1>
            <label htmlFor="numberId">Enter Number ID (p, f, e, r):</label>
            <input 
                type="text" 
                id="numberId" 
                value={numberId} 
                onChange={handleInputChange} 
                maxLength="1" 
            />
            <button onClick={fetchAndCalculate}>Calculate</button>
            <h2>Results:</h2>
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
        </div>
    );
};

export default App;