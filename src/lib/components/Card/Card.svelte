<script lang="ts">
	export let variant: 'default' | 'outlined' | 'elevated' = 'elevated';
	export let rounded: 'none' | 'sm' | 'md' | 'lg' = 'md';

	$: classes = ['card', `card--${variant}`, `card--rounded-${rounded}`, $$props.class]
		.filter(Boolean)
		.join(' ');
</script>

<div class={classes} on:click role={$$props.role}>
	<slot />
</div>

<style lang="scss">
	.card {
		display: block;
		transition: all 0.2s ease;
		padding: 1.5rem;

		&--default {
			background-color: white;
			border: 1px solid #e5e7eb;
		}

		&--outlined {
			background-color: transparent;
			border: 1px solid #e5e7eb;
		}

		&--elevated {
			background-color: white;
			border: 1px solid #f3f4f6;
			box-shadow:
				0 1px 3px 0 rgba(0, 0, 0, 0.1),
				0 1px 2px 0 rgba(0, 0, 0, 0.06);
		}

		&--rounded-none {
			border-radius: 0;
		}

		&--rounded-sm {
			border-radius: 4px;
		}

		&--rounded-md {
			border-radius: 8px;
		}

		&--rounded-lg {
			border-radius: 12px;
		}

		&[role='button'] {
			&:focus {
				outline: none;
				box-shadow: 0 0 0 3px rgba(72, 187, 120, 0.3);
			}
		}
	}
</style>
