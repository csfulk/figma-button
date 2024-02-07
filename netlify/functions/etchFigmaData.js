// Example: netlify/functions/fetchFigmaData.js
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const FIGMA_API_TOKEN = process.env.FIGMA_API_TOKEN; // Stored in Netlify's environment variables
  const fileId = event.queryStringParameters.fileId; // Get the fileId from query params

  try {
    const response = await fetch(`https://api.figma.com/v1/files/${fileId}`, {
      headers: { 'Authorization': `Bearer ${FIGMA_API_TOKEN}` },
    });

    if (!response.ok) {
      return { statusCode: response.status, body: 'Error fetching Figma data' };
    }

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
