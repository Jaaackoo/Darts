import React, { useEffect, useState } from 'react';
import { Stack, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Player } from '../class/Player';
import { PlayerCard } from '../components/PlayerCard';
import { Grid } from '../components/Grid';
import { PlayerDisplay } from '../components/PlayerDisplay';

export function Game() {

    const location = useLocation();
    const navigate = useNavigate();
    const [players, setPlayers] = useState<Player[]>([]);
    const [currentPlayer, setCurrentPlayer] = useState<number>(0);
    const [isFirstRound, setIsFirstRound] = useState(true);

    useEffect(() => {
        if (location?.state?.players == null || location?.state?.nbPoints == null || location?.state?.nbManche == null) {
            navigate("/");
        } else {
            const p = [...players];
            for (const element of location.state.players) {
                let player = new Player(element.nom, element.color);
                player.setScore(element.score);
                player.setMancheGagne(element.mancheGagne);
                p.push(player);
            }
            setPlayers(p);
        }
    }, []);

    function callbackPlayerCard(nom: string) {
        setCurrentPlayer(players.findIndex((player) => player.getNom() == nom));
        setIsFirstRound(false);
    }

    function nextPlayer() {
        setCurrentPlayer((prevState) => prevState == players.length - 1 ? 0 : prevState++);
    }
    return (

        <Stack padding={10} alignItems="center" rowGap={10}>
            {isFirstRound ? (
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
                <Stack justifyContent="flex-end" height={800}>
                    <PlayerDisplay currentIndex={currentPlayer} players={players} />
                    <Grid />
                </Stack >
            )}
        </Stack>

    );
}

