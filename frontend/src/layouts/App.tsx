import React, { useEffect, useState } from 'react';
import { Button, MenuItem, Stack, TextField, Typography, Snackbar, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Player } from '../class/Player';

const nbJoueurs = [
	{
		value: 1,
		label: '1 Joueur',
	},
	{
		value: 2,
		label: '2 Joueurs',
	},
	{
		value: 3,
		label: '3 Joueurs',
	},
	{
		value: 4,
		label: '4 Joueurs',
	},
];

const nbPoints = [
	{
		value: 301,
		label: '301 points',
	},
	{
		value: 501,
		label: '501 points',
	},
	{
		value: 701,
		label: '701 points',
	},
	{
		value: 1001,
		label: '1001 points',
	},
];
const nbMancheGagnantes = [
	{
		value: 1,
		label: '1 manches gagnantes',
	},
	{
		value: 2,
		label: '2 manches gagnantes',
	},
	{
		value: 3,
		label: '3 manches gagnantes',
	},
	{
		value: 4,
		label: '4 manches gagnantes',
	},
	{
		value: 5,
		label: '5 manches gagnantes',
	},
	{
		value: 6,
		label: '6 manches gagnantes',
	},
	{
		value: 7,
		label: '7 manches gagnantes',
	},
];

const playerColors = ['#42db6b', '#e36bb7', '#fab75a', '#59bfde'];


function App() {

	const [players, setPlayers] = useState<Player[]>([]);
	const navigate = useNavigate();
	const [nbPlayer, setNbPlayer] = useState(2);
	const [score, setScore] = useState(301);
	const [nbManche, setNbManche] = useState(3);
	const [snackbarOpen, setSnackbarOpen] = useState(false);
	const [snackbarMessage, setSnackbarMessage] = useState("");




	useEffect(() => {
		const newPlayers = [...players];

		// Add players if nbPlayer increases
		while (newPlayers.length < nbPlayer) {
			newPlayers.push(new Player("", ""));
		}

		// Remove players if nbPlayer decreases
		while (newPlayers.length > nbPlayer) {
			newPlayers.pop();
		}
		setPlayers(newPlayers);
	}, [nbPlayer]);



	function startGame() {
		const names = players.map((p) => p.getNom().trim());

		if (names.some((name) => name === "")) {
			showSnackbar("Tous les joueurs doivent avoir un nom.");
			return;
		}

		const uniqueNames = new Set(names);
		if (uniqueNames.size < players.length) {
			showSnackbar("Les noms des joueurs doivent être uniques.");
			return;
		}

		navigate("/game", {
			state: { nbPoints: score, nbManche, players },
		});
	}

	function updatePlayer(index: number, value: string) {
		const updatedPlayers = [...players];

		updatedPlayers[index].setNom(value);
		updatedPlayers[index].setColor(playerColors[index]);
		setPlayers(updatedPlayers);
	}


	function showSnackbar(message: string) {
		setSnackbarMessage(message);
		setSnackbarOpen(true);
	}

	function handleSnackbarClose() {
		setSnackbarOpen(false);
	}


	return (
		<Stack padding={10} alignItems="center" rowGap={10}>
			<Typography>Bienvenue à Centrale Nantes Fléchette ! </Typography>
			<Stack width={400} alignItems="center" rowGap={5}>
				<Stack width={400} alignItems="center" rowGap={2}>
					<TextField
						select
						fullWidth
						value={nbPlayer}
						label="Choisissez le nombre de joueur"
						onChange={(e) => setNbPlayer(parseInt(e.target.value, 10))}
					>
						{nbJoueurs.map((option) => (
							<MenuItem key={option.value} value={option.value}>
								{option.label}
							</MenuItem>
						))}
					</TextField>

					<Stack width={350} alignSelf="flex-end" rowGap={2}>
						{players.map((player, index) => (
							<TextField
								key={index}
								fullWidth
								label={`Joueur ${index + 1}`}
								value={player.getNom()}
								onChange={(e) => updatePlayer(index, e.target.value)}
							/>
						))}

					</Stack>
				</Stack>

				<TextField
					select
					fullWidth
					value={score}
					label="Choisissez le nombre de points"
					onChange={(e) => setScore(parseInt(e.target.value, 10))}
				>
					{nbPoints.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<TextField
					select
					fullWidth
					value={nbManche}
					label="Choisissez le nombre de manche gagnante"
					onChange={(e) => setNbManche(parseInt(e.target.value, 10))}
				>
					{nbMancheGagnantes.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
				<Stack width={200}>
					<Button variant='contained' onClick={startGame}>Commencer</Button>
				</Stack>
				<Snackbar
					open={snackbarOpen}
					autoHideDuration={3000}
					onClose={handleSnackbarClose}
					anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
				>
					<Alert onClose={handleSnackbarClose} severity="error" sx={{ width: '100%' }}>
						{snackbarMessage}
					</Alert>
				</Snackbar>

			</Stack>
		</Stack>

	);
}

export default App;
