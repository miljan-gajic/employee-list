<script lang="ts">
	import '$lib/style/global.scss';
	import { initializeAuthStore } from '$lib/utils/tokenGetter';
	import { onMount } from 'svelte';

	let { children } = $props();

	onMount(() => {
		initializeAuthStore();
	});
</script>

<div class="main-layout">
	{@render children()}
</div>

<style lang="scss">
	.main-layout {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 1200px;
		margin-inline: auto;
		min-height: 100vh;
		max-width: 100vw;
	}
</style>
