<script lang="ts">
  import { onMount } from 'svelte';
  import axios from 'axios';

  let weatherData: any = [];

  async function fetchWeather() {
    const options = {
      method: 'GET',
      url: 'https://visual-crossing-weather.p.rapidapi.com/forecast',
      params: {
        aggregateHours: '24',
        location: 'Washington,DC,USA',
        contentType: 'json',
        unitGroup: 'us',
        shortColumnNames: '0'
      },
      headers: {
        'X-RapidAPI-Key': 'faa271f72fmshfe9df8831015cddp121d98jsn308069e51507',
        'X-RapidAPI-Host': 'visual-crossing-weather.p.rapidapi.com'
      }
    };

    try {
      const response = await axios.request(options);
      weatherData = response.data.locations['Washington,DC,USA'].values;
      console.log(response.data.locations['Washington,DC,USA'].values);
    } catch (error) {
      console.error(error);
    }
  }

  onMount(fetchWeather);
</script>

<table class="min-w-full divide-y divide-gray-200">
  <thead class="bg-gray-50">
    <tr>
      {#if weatherData.length > 0}
        {#each Object.keys(weatherData[0]) as column}
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{column}</th>
        {/each}
      {:else}
        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loading...</th>
      {/if}
    </tr>
  </thead>
  <tbody class="bg-white divide-y divide-gray-200">
    {#each weatherData as row}
      <tr>
        {#each Object.values(row) as cell}
          <td class="px-6 py-4 whitespace-nowrap">{cell}</td>
        {/each}
      </tr>
    {/each}
  </tbody>
</table>
