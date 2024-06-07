<script lang="ts">
  import { onMount } from "svelte";
  import axios from "axios";

  let weatherData: any = [];
  let city: string = "Washington,DC,USA";
  let todayWeather: any = null;
  let isLoading: boolean = false;
  let location: string = "";

  async function fetchWeather() {
    isLoading = true;
    try {
      const response = await axios.get("/api", {
        params: { city },
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
    return ((fahrenheit - 32) * 5) / 9;
  }

  onMount(fetchWeather);

  function searchWeather() {
    fetchWeather();
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      searchWeather();
    }
  }
</script>

<svelte:head>
	<title>Weather</title>
	<meta name="description" content="Weather App" />
</svelte:head>

<h1 class="text-3xl font-semibold text-center my-6">
  Weather Forecast for {location}
</h1>

<div class="flex max-w-xs mx-auto mb-6">
  <input
    type="text"
    placeholder="Enter city name"
    class="border border-gray-400 rounded-l-lg px-4 py-2 w-full"
    bind:value={city}
    on:keydown={handleKeydown}
  />
  <button
    class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-r-lg"
    on:click={searchWeather}>Search</button
  >
</div>

{#if isLoading}
  <div class="flex flex-col justify-center items-center my-6">
    <span>Loading...</span>
    <svg
    role="img"
    width="1000"
    height="1000"
    aria-labelledby="loading-aria"
    viewBox="0 0 1000 1000"
    preserveAspectRatio="none"
  >
    <title id="loading-aria">Loading...</title>
    <rect
      x="0"
      y="0"
      width="100%"
      height="100%"
      clip-path="url(#clip-path)"
      style='fill: url("#fill");'
    ></rect>
    <defs>
      <clipPath id="clip-path">
          <rect x="6" y="20" rx="0" ry="0" width="989" height="219" /> 
          <rect x="6" y="260" rx="0" ry="0" width="250" height="189" /> 
          <rect x="136" y="383" rx="0" ry="0" width="0" height="1" /> 
          <rect x="374" y="259" rx="0" ry="0" width="250" height="189" /> 
          <rect x="6" y="469" rx="0" ry="0" width="250" height="189" /> 
          <rect x="6" y="680" rx="0" ry="0" width="250" height="189" /> 
          <rect x="6" y="884" rx="0" ry="0" width="250" height="189" /> 
          <rect x="374" y="883" rx="0" ry="0" width="250" height="189" /> 
          <rect x="374" y="679" rx="0" ry="0" width="250" height="189" /> 
          <rect x="374" y="468" rx="0" ry="0" width="250" height="189" /> 
          <rect x="745" y="260" rx="0" ry="0" width="250" height="189" /> 
          <rect x="745" y="469" rx="0" ry="0" width="250" height="189" /> 
          <rect x="745" y="680" rx="0" ry="0" width="250" height="189" /> 
          <rect x="745" y="884" rx="0" ry="0" width="250" height="189" />
      </clipPath>
      <linearGradient id="fill">
        <stop
          offset="0.599964"
          stop-color="#b5b5b5"
          stop-opacity="1"
        >
          <animate
            attributeName="offset"
            values="-2; -2; 1"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop
          offset="1.59996"
          stop-color="#ffffff"
          stop-opacity="1"
        >
          <animate
            attributeName="offset"
            values="-1; -1; 2"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
        <stop
          offset="2.59996"
          stop-color="#b5b5b5"
          stop-opacity="1"
        >
          <animate
            attributeName="offset"
            values="0; 0; 3"
            keyTimes="0; 0.25; 1"
            dur="2s"
            repeatCount="indefinite"
          ></animate>
        </stop>
      </linearGradient>
    </defs>
  </svg>
  </div>
{:else}
  {#if todayWeather}
    <div class="bg-blue-100 shadow-md rounded-lg p-6 mb-6">
      <h2 class="text-2xl font-semibold mb-4">
        Today: {new Date(todayWeather.datetimeStr).toLocaleDateString()}
      </h2>
      <div class="grid grid-cols-2">
        <p class="mb-2">
          <strong>Max Temperature:</strong>
          {convertToCelsius(todayWeather.maxt).toFixed(1)} °C
        </p>
        <p class="mb-2"><strong>Humidity:</strong> {todayWeather.humidity} %</p>
        <p class="mb-2">
          <strong>Min Temperature:</strong>
          {convertToCelsius(todayWeather.mint).toFixed(1)} °C
        </p>
        <p class="mb-2">
          <strong>Precipitation:</strong>
          {todayWeather.precip} mm
        </p>
        <p class="mb-2">
          <strong>Conditions:</strong>
          {todayWeather.conditions}
        </p>
        <p class="mb-2"><strong>Wind Speed:</strong> {todayWeather.wspd} mph</p>
        <p class="mb-2"><strong>UV Index:</strong> {todayWeather.uvindex}</p>
        <p class="mb-2">
          <strong>Visibility:</strong>
          {todayWeather.visibility} km
        </p>
      </div>
    </div>
  {/if}

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {#each weatherData.slice(1) as { datetimeStr, maxt, mint, conditions, precip, uvindex, wspd }}
      <div class="bg-white shadow-md rounded-lg p-4">
        <h2 class="text-lg font-semibold mb-2">
          {new Date(datetimeStr).toLocaleDateString()}
        </h2>
        <p class="mb-1">
          <strong>Max Temperature:</strong>
          {convertToCelsius(maxt).toFixed(1)} °C
        </p>
        <p class="mb-1">
          <strong>Min Temperature:</strong>
          {convertToCelsius(mint).toFixed(1)} °C
        </p>
        <p class="mb-1"><strong>Conditions:</strong> {conditions}</p>
        <p class="mb-1"><strong>Precipitation:</strong> {precip} mm</p>
        <p class="mb-1"><strong>UV Index:</strong> {uvindex}</p>
        <p class="mb-1"><strong>Wind Speed:</strong> {wspd} mph</p>
      </div>
    {/each}
  </div>
{/if}
