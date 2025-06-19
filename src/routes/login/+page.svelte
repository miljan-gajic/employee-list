<!-- src/routes/login/+page.svelte -->
<script lang="ts">
	import { goto } from '$app/navigation';

	import { api } from '$lib/api/api';
	import Button from '$lib/components/Button/Button.svelte';
	import Input from '$lib/components/NumberInput/NumberInput.svelte';
	import Card from '$lib/components/Card/Card.svelte';

	let email = '';
	let password = '';
	let error: Error = new Error('');
	let loading = false;

	async function handleLogin() {
		try {
			loading = true;
			await api('/api/auth/login', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email, password })
			});

			goto('/');
		} catch (err) {
			error.message = (err as Error).message || 'Login failed. Please try again.';
		} finally {
			loading = false;
		}
	}
</script>

<svelte:head>
	<title>Anmelden - Mitarbeiterverwaltung</title>
</svelte:head>

<div class="login-container">
	<div class="login-wrapper">
		<Card class="login-card">
			<div class="login-header">
				<h1>Anmelden</h1>
				<p>Melden Sie sich in Ihrem Konto an</p>
			</div>

			<form on:submit|preventDefault={handleLogin} class="login-form">
				<div class="form-group">
					<Input
						id="login-email"
						type="email"
						placeholder="E-Mail-Adresse"
						bind:value={email}
						autocomplete="email"
						disabled={loading}
					/>
				</div>

				<div class="form-group">
					<Input
						id="login-password"
						type="password"
						placeholder="Passwort"
						bind:value={password}
						autocomplete="current-password"
						disabled={loading}
					/>
				</div>

				<Button type="submit" variant="primary" {loading} disabled={loading}>Anmelden</Button>
			</form>
		</Card>
	</div>
</div>

<style lang="scss">
	.login-container {
		min-height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.login-wrapper {
		width: 100%;
		max-width: 400px;
	}

	:global(.login-card) {
		padding: 2rem;
	}

	.login-header {
		text-align: center;
		margin-bottom: 2rem;

		h1 {
			font-size: 1.75rem;
			font-weight: 600;
			color: #2d3748;
			margin: 0 0 0.5rem 0;
		}

		p {
			color: #718096;
			margin: 0;
			font-size: 0.875rem;
		}
	}

	.login-form {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}
</style>
