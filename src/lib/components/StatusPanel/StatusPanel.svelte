<script lang="ts">
	import type { ImportStatus } from '$lib/types/employee';

	export let status: ImportStatus | null = null;

	// Helper function to determine status color class
	function getStatusColor(status: string | undefined): string {
		if (!status) return '';
		switch (status.toLowerCase()) {
			case 'pending':
			case 'processing':
			case 'in-progress':
				return 'status-pending';
			case 'success':
			case 'completed':
				return 'status-success';
			case 'error':
			case 'failed':
				return 'status-error';
			default:
				return '';
		}
	}

	// Helper function to get human-readable status text
	function getStatusText(status: string | undefined): string {
		if (!status) return '';
		switch (status.toLowerCase()) {
			case 'pending':
			case 'processing':
			case 'in-progress':
				return 'In Bearbeitung';
			case 'success':
			case 'completed':
				return 'Erfolgreich';
			case 'error':
			case 'failed':
				return 'Fehler';
			default:
				return status;
		}
	}
</script>

{#if status}
	<div class="status-container">
		<div class="status-row">
			<div class="status-badge {getStatusColor(status.status)}">
				{getStatusText(status.status)}
			</div>

			{#if status.total > 0}
				<div class="status-counts">
					<span class="count-success">Erfolgreich: {status.succeeded || 0}</span>
					<span class="count-divider">|</span>
					<span class="count-error">Fehlgeschlagen: {status.failed || 0}</span>
					<span class="count-divider">|</span>
					<span class="count-total">Gesamt: {status.total || 0}</span>
				</div>
			{/if}
		</div>

		{#if status.total > 0}
			<div class="progress-container">
				<div
					class="progress-bar progress-success"
					style="width: {(status.succeeded / status.total) * 100}%"
				></div>
				{#if status.failed > 0}
					<div
						class="progress-bar progress-error"
						style="width: {(status.failed / status.total) * 100}%"
					></div>
				{/if}
			</div>
		{/if}
	</div>
{/if}

<style lang="scss">
	.status-container {
		margin-top: 16px;
		font-family:
			'Inter',
			-apple-system,
			sans-serif;
	}

	.status-row {
		display: flex;
		align-items: center;
		gap: 16px;
		margin-bottom: 8px;
	}

	.status-badge {
		display: inline-flex;
		padding: 4px 8px;
		border-radius: 4px;
		font-size: 12px;
		font-weight: 500;

		&.status-pending {
			background-color: #fff8e1;
			color: #f57c00;
			border: 1px solid #ffcc80;
		}

		&.status-success {
			background-color: #e8f5e9;
			color: #2e7d32;
			border: 1px solid #a5d6a7;
		}

		&.status-error {
			background-color: #ffebee;
			color: #c62828;
			border: 1px solid #ef9a9a;
		}
	}

	.status-counts {
		display: flex;
		align-items: center;
		gap: 8px;
		font-size: 12px;
	}

	.count-success {
		color: #2e7d32;
		font-weight: 500;
	}

	.count-error {
		color: #c62828;
		font-weight: 500;
	}

	.count-total,
	.count-divider {
		color: #6b716a;
	}

	.progress-container {
		height: 4px;
		background-color: #e0e0e0;
		border-radius: 2px;
		overflow: hidden;
		position: relative;
	}

	.progress-bar {
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		transition: width 0.3s ease;
	}

	.progress-success {
		background-color: #4caf50;
		z-index: 1;
	}

	.progress-error {
		background-color: #f44336;
		z-index: 2;
		left: auto;
		right: 0;
	}
</style>
