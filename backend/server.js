const express = require('express');
const cors = require('cors');

const app = express();
const port = 9876;

const primeNumbers = apiUrl = 'https://20.244.56.144/test/primes';;
const fibonacciNumbers = 'https://20.244.56.144/test/fibo';
const evenNumbers = 'https://20.244.56.144/test/even';
const randomNumbers = 'https://20.244.56.144/test/rand';
app.use(cors());
const getNumbersById = (id) => {
    switch (id) {
        case 'p':
            return primeNumbers;
        case 'f':
            return fibonacciNumbers;
        case 'e':
            return evenNumbers;
        case 'r':
            return randomNumbers;
        default:
            throw new Error('Invalid ID');
    }
};

app.get('/api/numbers/:id', (req, res) => {
    const { id } = req.params;

    try {
        const numbers = getNumbersById(id);
        res.json(numbers);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});