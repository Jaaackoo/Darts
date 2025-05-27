import { Stack, Typography } from '@mui/material'
import React from 'react'
import { Player } from '../class/Player';



interface PlayerDisplayProps {
    players: Player[];
    currentIndex: number;
}
export function PlayerDisplay({ players, currentIndex }: Readonly<PlayerDisplayProps>) {



    return (
        <Stack direction="row" width="100%" justifyContent="space-between">
            <Stack bgcolor={players[currentIndex].getColor()} rowGap={2} padding={2} borderRadius={1.2} width={180} alignItems="center" height={250}>
                <Typography variant='h5'>{players[currentIndex].getNom()}</Typography>
                <Typography alignSelf="flex-start" variant='body1'>{`Score: ${players[currentIndex].getScore()}`}</Typography>
                <Typography alignSelf="flex-start" variant='body1'>{`Manche: ${players[currentIndex].getScore()}`}</Typography>
            </Stack>
            <Stack direction="column" rowGap={5}>
                {players.map((player, index) => {
                    if (index !== currentIndex) {
                        return (
                            <Stack bgcolor={player.getColor()} key={index} rowGap={2} padding={2} borderRadius={1.2} width={180} alignItems="center">
                                <Typography variant='h5'>{player.getNom()}</Typography>
                                <Typography alignSelf="flex-start" variant='body1'>{`Score: ${player.getScore()}`}</Typography>
                                <Typography alignSelf="flex-start" variant='body1'>{`Manche: ${player.getScore()}`}</Typography>
                            </Stack>
                        )
                    }
                })}

            </Stack>
        </Stack>
    )
}