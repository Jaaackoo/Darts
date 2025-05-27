import React from "react"
import { Player } from "../class/Player"
import { Box, Stack, Typography } from "@mui/material";

interface PlayerCardProps {
    player: Player;
    callback: (name: string) => void;
}

export function PlayerCard({ player, callback }: Readonly<PlayerCardProps>) {


    function handleClick() {
        callback(player.getNom());
    }
    return (
        <Box onClick={handleClick} borderRadius={1.2} bgcolor={player.getColor()} padding={2} >
            <Stack width={180} alignItems="center">
                <Typography variant="h6">{player.getNom()}</Typography>

            </Stack>
        </Box>

    )
}