<script>
	import { page } from '$app/stores';
</script>

<header>
	<div class="bg-zinc-800"><h1 class="text-5xl ">Svelte app</h1></div>
		<ul class="flex">
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/weather' ? 'page' : undefined}>
				<a href="/weather">Weather</a>
			</li>
		</ul>
</header>