import { Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { Player } from '../class/Player';
import { DartIcon } from './DartIcon';
import { useLocation } from 'react-router-dom';
import { DeleteForeverRounded } from '@mui/icons-material';
import { CanFinish } from './CanFinish';

interface PlayerDisplayProps {
    players: Player[];
    currentIndex: number;
    callbackValid?: () => void;
    callbackEmpty?: () => void;
    callbackPrevPlayer?: () => void;
    tempDarts: number[];
}


export function PlayerDisplay({ players, currentIndex, callbackValid, callbackEmpty, callbackPrevPlayer, tempDarts }: Readonly<PlayerDisplayProps>) {

    const location = useLocation();

    return (
        <Stack direction="row" width="100%" justifyContent="space-between">
            <Stack
                bgcolor={players[currentIndex].getColor()}
                rowGap={2}
                padding={2}
                borderRadius={1.2}
                width={180}
                alignItems="center"
                height={300}
            >
                <Typography variant='h5'>{players[currentIndex].getNom()}</Typography>
                <Stack alignSelf="flex-start">
                    <Typography variant='h6'>{`Score: ${location.state.nbPoints - players[currentIndex].getScore() - tempDarts.reduce((accumulator, currentVal) => accumulator + currentVal, 0)}`}</Typography>
                    <Typography variant='h6'>{`Manche: ${players[currentIndex].getMancheGagne()}/${location.state.nbManche}`}</Typography>
                </Stack>

                <Stack alignSelf="flex-start" direction="row" justifyContent="space-between" width="100%">
                    <DartIcon />
                    <Typography variant='h5'>{tempDarts?.[0] ?? ''}</Typography>
                </Stack>
                <Stack alignSelf="flex-start" direction="row" justifyContent="space-between" width="100%">
                    <Stack spacing={1} direction="row">
                        <DartIcon />
                        <DartIcon />
                    </Stack>
                    <Typography variant='h5'>{tempDarts?.[1] ?? ''}</Typography>

                </Stack>
                <Stack alignSelf="flex-start" direction="row" justifyContent="space-between" width="100%">
                    <Stack spacing={1} direction="row">
                        <DartIcon />
                        <DartIcon />
                        <DartIcon />
                    </Stack>

                    <Typography variant='h5'>{tempDarts?.[2] ?? ''}</Typography>
                </Stack>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Button variant='text' sx={{ width: "fit-content", textTransform: "none" }} onClick={callbackPrevPlayer}>Précédent</Button>
                    <Button variant='outlined' sx={{ textTransform: "none" }} onClick={callbackEmpty} color='error' startIcon={<DeleteForeverRounded />}>Vider</Button>
                    <Button variant='outlined' sx={{ textTransform: "none" }} onClick={callbackValid}>Valider</Button>

                </Stack>
            </Stack>
            <CanFinish 
                score={location.state.nbPoints - players[currentIndex].getScore() - tempDarts.reduce((accumulator, currentVal) => accumulator + currentVal, 0)}
                finisher={players[currentIndex].getNom()}
                />
            <Stack justifySelf="flex-end" alignSelf="flex-end">
                <Stack direction="column" rowGap={5}>
                    {players.map((player, index) => {
                        if (index !== currentIndex) {
                            return (
                                <Stack
                                    bgcolor={player.getColor()}
                                    key={index}
                                    rowGap={2}
                                    padding={2}
                                    borderRadius={1.2}
                                    width={180}
                                    alignItems="center"
                                >
                                    <Typography variant='h5'>{player.getNom()}</Typography>
                                    <Stack alignSelf="flex-start">
                                        <Typography variant='body1'>{`Score: ${location.state.nbPoints - player.getScore()}`}</Typography>
                                        <Typography variant='body1'>{`Manche: ${player.getMancheGagne()}/${location.state.nbManche}`}</Typography>
                                    </Stack>
                                </Stack>
                            );
                        }
                        return null;
                    })}
                </Stack>
            </Stack>
        </Stack>
    );
}
