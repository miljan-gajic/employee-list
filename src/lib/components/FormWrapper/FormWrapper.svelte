<script>
	export let title = '';
</script>

<div class="form-wrapper">
	{#if title}
		<h3 class="form-title">{title}</h3>
	{/if}
	<div class="form-content">
		<div class="form-content-container">
			<slot />
		</div>
	</div>
</div>

<style lang="scss">
	.form-wrapper {
		width: 1224px;
		border: 1px solid #e9ecef;
		background: white;
		border-radius: 8px 0px 0px;
		box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
		padding: 20px;
		margin: 16px auto 0 auto;

		.form-title {
			margin: 0 0 12px 0;
			font-size: 12px;
			font-weight: 600;
			font-family:
				'Inter',
				-apple-system,
				sans-serif;
			color: #6b716a;
		}

		.form-content {
			display: flex;
			gap: 12px;
			align-items: center;
		}

		.form-content-container {
			display: flex;
			align-items: center;
			gap: 24px;
		}
	}
</style>
