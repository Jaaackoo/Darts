import React, { useEffect, useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Player } from '../class/Player';
import { PlayerCard } from '../components/PlayerCard';
import { Grid } from '../components/Grid';
import { PlayerDisplay } from '../components/PlayerDisplay';
import _ from 'lodash';

export function Game() {

    const location = useLocation();
    const navigate = useNavigate();
    const [players, setPlayers] = useState<Player[]>([]);
    const [round, setRound] = useState<number>(1);
    const [currentPlayer, setCurrentPlayer] = useState<number>(-1);
    const [startingPlayer, setStartingPlayer] = useState<number>(0);
    const [isFirstRound, setIsFirstRound] = useState(true);
    const [tempDarts, setTempDarts] = useState<number[]>([]);
    const [winner, setWinner] = useState<Player | null>(null);

    useEffect(() => {
        if (location?.state?.players == null || location?.state?.nbPoints == null || location?.state?.nbManche == null) {
            navigate("/");
        } else {
            const p = [...players];
            for (const element of location.state.players) {
                let player = new Player(element.nom, element.color);
                player.setScore(0);
                player.setMancheGagne(element.mancheGagne);
                p.push(player);
            }
            setPlayers(p);
        }
        document.title = "CNF";


    }, []);


    function callbackPlayerCard(nom: string) {
        setCurrentPlayer(players.findIndex((player) => player.getNom() == nom));
        setStartingPlayer(players.findIndex((player) => player.getNom() == nom));
        setIsFirstRound(false);
    }

    function handleGrid(value: number) {
        if (tempDarts.length < 3) {
            const newTemp = [...tempDarts, value];
            setTempDarts(newTemp);

            let total = newTemp.reduce((acc, curr) => acc + curr, 0);

            let currScore = location.state.nbPoints - (players[currentPlayer].getScore() + total)
            if (currScore === 0) {
                winRound();
            } else if (currScore < 0) {
                nextPlayer([]);
            } else {
                if (newTemp.length === 3) {
                    nextPlayer(newTemp);
                }
            }


        }

    }

    function winRound() {
        const updatedPlayers = _.cloneDeep(players);

        updatedPlayers[currentPlayer].setMancheGagne(updatedPlayers[currentPlayer].getMancheGagne() + 1);
        setTempDarts([]);
        if (updatedPlayers[currentPlayer].getMancheGagne() == location.state.nbManche) {
            setPlayers(updatedPlayers);
            setWinner(updatedPlayers[currentPlayer]);
        } else {
            for (const player of updatedPlayers) {
                player.reset();
            }
            setRound(1);
            let startingP = startingPlayer === players.length - 1 ? 0 : startingPlayer + 1
            setStartingPlayer(startingP);
            setCurrentPlayer(startingP);

        }
        setPlayers(updatedPlayers);

    }

    function nextPlayer(darts?: number[]) {

        // Ajoute les flechettes
        const updatedPlayers = _.cloneDeep(players);
        darts?.forEach((dart) => updatedPlayers[currentPlayer].addDart(dart));
        setPlayers(updatedPlayers);
        setTempDarts([]); // reset pour le joueur suivant

        let nextPlayerIndex = _.cloneDeep(currentPlayer); // deep clone
        nextPlayerIndex = nextPlayerIndex === players.length - 1 ? 0 : nextPlayerIndex + 1;
        setCurrentPlayer(nextPlayerIndex);
        if (nextPlayerIndex === startingPlayer) {
            setRound((prevState) => prevState + 1);
        }
        setTempDarts([]);
    }

    function prevPlayer() {
        if (round === 1 && startingPlayer === currentPlayer) return;

        let newRound = round;
        if (currentPlayer === startingPlayer) {
            newRound = round - 1;
        }

        const clonedPlayers = _.cloneDeep(players);

        // On calcule l'index du joueur précédent
        const prevIndex = currentPlayer === 0 ? players.length - 1 : currentPlayer - 1;
        const prevPlayer = clonedPlayers[prevIndex];

        // Combien de fléchettes devrait-il avoir ?
        const expectedDarts = newRound * 3;
        const actualDarts = prevPlayer.getDarts().length;

        // S'il en a plus que prévu, on les supprime
        const dartsToRemove = actualDarts - expectedDarts;

        // Si le joueur précédent a trop de fléchettes, on les retire
        if (dartsToRemove > 0) {
            for (let i = 0; i < dartsToRemove; i++) {
                prevPlayer.removeDart();
            }
        }

        // Récupère ses 3 dernières fléchettes (s’il en a)
        const newTempDarts = prevPlayer.getDarts().slice(-3);
        if (newTempDarts.length > 0) {
            for (let i = 0; i < newTempDarts.length; i++) {
                prevPlayer.removeDart();
            }
        }
        // Met à jour l’état
        setPlayers(clonedPlayers);
        setCurrentPlayer(prevIndex);
        setRound(newRound);
        setTempDarts(newTempDarts);
    }

    function empty() {
        setTempDarts([]);
    }


    function replay() {
        navigate('/');
    }

    return (

        <Stack padding={10} alignItems="center" rowGap={10}>
            {winner === null ? isFirstRound ? (
                <Stack alignItems="center" rowGap={2}>
                    <Typography variant='h4'>
                        Lancer votre première fléchette, le plus près commence !
                    </Typography>
                    <Typography variant='h5'>
                        Cliquez sur la personne étant la plus proche
                    </Typography>
                    {players?.length > 0 && (
                        <Stack direction="row" columnGap={5} marginTop={10}>
                            {players?.map((player, index) => <PlayerCard player={player} key={index} callback={callbackPlayerCard} />)}
                        </Stack>
                    )}

                </Stack>
            ) : (
                <Stack justifyContent="flex-end" height={800} rowGap={10}>
                    <PlayerDisplay
                        currentIndex={currentPlayer}
                        players={players}
                        callbackValid={() => nextPlayer(tempDarts)}
                        callbackEmpty={empty}
                        callbackPrevPlayer={prevPlayer}
                        tempDarts={tempDarts}
                    />
                    <Grid callback={handleGrid} />
                </Stack >
            ) : (
                <Stack spacing={10} mt={10}>
                    <Typography variant='h4'>
                        {`Bravo à ${winner!.getNom()}`}
                        

                    </Typography>
                    <Button onClick={replay} variant='contained'>Rejouer</Button>
                </Stack>
            )}

        </Stack>

    );
}

