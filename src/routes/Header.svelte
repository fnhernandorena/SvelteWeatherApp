<script>
	import { page } from '$app/stores';
</script>

<header>
	<div class="bg-zinc-800"><h1 class="text-5xl ">Svelte app</h1></div>
		<ul>
			<li class="text-sky-500" aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
				<a href="/about">About</a>
			</li>
			<li aria-current={$page.url.pathname.startsWith('/sverdle') ? 'page' : undefined}>
				<a href="/sverdle">Sverdle</a>
			</li>
		</ul>
</header>