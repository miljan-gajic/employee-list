<script>
	export let title = '';
</script>

<div class="form-wrapper">
	{#if title}
		<h3 class="form-title">{title}</h3>
	{/if}
	<div class="form-content">
		<slot />
	</div>
</div>

<style lang="scss">
	.form-wrapper {
		background: #f8f9fa;
		border: 1px solid #e9ecef;
		border-radius: 8px;
		padding: 20px;
		margin: 16px 0;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

		.form-title {
			margin: 0 0 16px 0;
			font-size: 14px;
			font-weight: 500;
			color: #495057;
		}

		.form-content {
			display: flex;
			gap: 12px;
			align-items: flex-end;
		}

		@media (max-width: 768px) {
			flex-direction: column;
			align-items: stretch;
		}
	}
</style>
