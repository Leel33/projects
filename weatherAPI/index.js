const express = require('express');
const axios = require('axios');
require('dotenv').config();
const path = require('path');
const AWS = require('aws-sdk');

const app = express();
const PORT = process.env.PORT || 5000;

const WEATHER_API_URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = process.env.ApiKey;
const REGION = process.env.AWS_REGION || 'us-east-2';  // Change this if necessary

// Set up DynamoDB
AWS.config.update({ region: REGION });
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const TABLE_NAME = 'CitySearches';  // DynamoDB table name

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route to serve the api.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'api.html'));
});

// Weather route that fetches weather data from OpenWeather API
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        // Fetch weather data from OpenWeather API
        const response = await axios.get(WEATHER_API_URL, {
            params: {
                q: city,
                appid: API_KEY,
                units: 'imperial'
            }
        });

        // Update the city search count in DynamoDB
        await updateCitySearchCount(city);

        // Send weather data as response
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching weather data', details: error.message });
    }
});

// Update the search count for the city in DynamoDB
async function updateCitySearchCount(city) {
    const params = {
        TableName: TABLE_NAME,
        Key: { city },
        UpdateExpression: 'SET #count = if_not_exists(#count, :start) + :increment',
        ExpressionAttributeNames: {
            '#count': 'count'
        },
        ExpressionAttributeValues: {
            ':increment': 1,
            ':start': 0  // If the city doesn't exist, start the count at 0
        }
    };

    try {
        const result = await dynamoDB.update(params).promise();
        console.log('City search count updated:', result); // Log result for debugging
    } catch (error) {
        console.error('Error updating city search count:', error);
    }
}

// Get the search count for the city from DynamoDB
async function getCitySearchCount(city) {
    const params = {
        TableName: TABLE_NAME,
        Key: { city }
    };

    try {
        const result = await dynamoDB.get(params).promise();
        console.log('DynamoDB result:', result); // Log the retrieved item for debugging
        return result.Item ? result.Item.count : 0;  // Return count if the city exists
    } catch (error) {
        console.error('Error fetching city search count:', error);
        return 0;
    }
}

// Get the search count for the city
app.get('/searchCount', async (req, res) => {
    const city = req.query.city;

    if (!city) {
        return res.status(400).json({ error: 'City is required' });
    }

    try {
        const count = await getCitySearchCount(city);
        res.json({ count });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching city search count', details: error.message });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
