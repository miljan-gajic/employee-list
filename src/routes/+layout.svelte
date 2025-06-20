<script lang="ts">
	import '$lib/style/global.scss';

	let { children } = $props();
</script>

<div class="main-layout">
	{@render children()}
</div>

<style lang="scss">
	.main-layout {
		display: flex;
		background-color: #ecefec;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		min-width: 1200px;
		margin-inline: auto;
		min-height: 100vh;
		max-width: 100vw;
	}
</style>
