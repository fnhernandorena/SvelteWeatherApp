<script>
	import Header from './Header.svelte';
	import './styles.css';
</script>

<div class="w-full">
	<Header />

	<main>
		<slot />
	</main>

	<footer>
		<a href="https://oficial-site-next-app.vercel.app/">Developer site</a>
	</footer>
</div>