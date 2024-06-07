<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="w-full">
	<Header />

	<main class="p-2">
		<slot />
	</main>

	<footer class="flex justify-center">
		<a href="https://oficial-site-next-app.vercel.app/">Developer site</a>
	</footer>
</div>