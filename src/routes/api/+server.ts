import type { RequestHandler } from '@sveltejs/kit';
import axios from 'axios';

export const GET: RequestHandler = async ({ url }) => {
  const city = url.searchParams.get('city') || 'Washington,DC,USA';
  const apiKey = import.meta.env.VITE_RAPIDAPI_KEY;

  const options = {
    method: 'GET',
    url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
    params: {
      aggregateHours: '24',
      location: city,
      contentType: 'json',
      unitGroup: 'us',
      shortColumnNames: '0'
    },
    headers: {
      'X-RapidAPI-Key': apiKey,
      'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
    }
  };

  try {
    const response = await axios.request(options);
    return new Response(JSON.stringify(response.data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    let errorMessage = 'An unknown error occurred';
    if (axios.isAxiosError(error) && error.response) {
      errorMessage = error.response.data.message || error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    }
    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
};
