<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';

  let weatherData: any = [];
  let city: string = 'Washington,DC,USA';
  let todayWeather: any = null;
  let isLoading: boolean = false;
  let location: string = ''; 

  async function fetchWeather() {
    isLoading = true;
    try {
      const response = await axios.get('/api', {
        params: { city }
      });
      weatherData = response.data.locations[city].values;
      location = response.data.locations[city].address; 
      todayWeather = weatherData[0];
    } catch (error) {
      console.error(error);
    } finally {
      isLoading = false;
    }
  }

  function convertToCelsius(fahrenheit: number): number {
    return (fahrenheit - 32) * 5 / 9;
  }

  onMount(fetchWeather);

  function searchWeather() {
    fetchWeather();
  }
</script>

<h1 class="text-3xl font-semibold text-center my-6">Weather Forecast for {location}</h1> <!-- Mostrar la dirección en lugar de la ciudad -->

<div class="flex max-w-xs mx-auto mb-6">
  <input type="text" placeholder="Enter city name" class="border border-gray-400 rounded-l-lg px-4 py-2 w-full" bind:value={city}>
  <button class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg" on:click={searchWeather}>Search</button>
</div>

{#if isLoading}
  <div class="flex justify-center items-center my-6">
    <span class="visually-hidden">Loading...</span>
    <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full" role="status"></div>
  </div>
{:else}
  {#if todayWeather}
    <div class="bg-blue-100 shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">Today: {new Date(todayWeather.datetimeStr).toLocaleDateString()}</h2>
      <p class="mb-2"><strong>Max Temperature:</strong> {convertToCelsius(todayWeather.maxt).toFixed(1)} °C</p>
      <p class="mb-2"><strong>Min Temperature:</strong> {convertToCelsius(todayWeather.mint).toFixed(1)} °C</p>
      <p class="mb-2"><strong>Conditions:</strong> {todayWeather.conditions}</p>
      <p class="mb-2"><strong>Precipitation:</strong> {todayWeather.precip} mm</p>
      <p class="mb-2"><strong>UV Index:</strong> {todayWeather.uvindex}</p>
      <p class="mb-2"><strong>Wind Speed:</strong> {todayWeather.wspd} mph</p>
    </div>
  {/if}

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each weatherData.slice(1) as { datetimeStr, maxt, mint, conditions, precip, uvindex, wspd }}
      <div class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-2">{new Date(datetimeStr).toLocaleDateString()}</h2>
        <p class="mb-1"><strong>Max Temperature:</strong> {convertToCelsius(maxt).toFixed(1)} °C</p>
        <p class="mb-1"><strong>Min Temperature:</strong> {convertToCelsius(mint).toFixed(1)} °C</p>
        <p class="mb-1"><strong>Conditions:</strong> {conditions}</p>
        <p class="mb-1"><strong>Precipitation:</strong> {precip} mm</p>
        <p class="mb-1"><strong>UV Index:</strong> {uvindex}</p>
        <p class="mb-1"><strong>Wind Speed:</strong> {wspd} mph</p>
      </div>
    {/each}
  </div>
{/if}
