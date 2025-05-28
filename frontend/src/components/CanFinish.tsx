import { Stack, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';

interface CanFinishProps {
    score: number;
    finisher: string;
}

type DartThrow = {
    value: number;
    label: string;
};

function getAllPossibleThrows(): DartThrow[] {
    const throws: DartThrow[] = [];

    for (let i = 1; i <= 20; i++) {
        throws.push({ value: i, label: `${i}` });
        throws.push({ value: i * 2, label: `D${i}` });
        throws.push({ value: i * 3, label: `T${i}` });
    }

    // Bulls
    throws.push({ value: 25, label: '25' });
    throws.push({ value: 50, label: '50' });

    return throws;
}

function predictFinishingCombo(score: number): DartThrow[] | null {
    const throws = getAllPossibleThrows();

    // 1 fléchette
    for (const t1 of throws) {
        if (t1.value === score) return [t1];
    }

    // 2 fléchettes
    for (const t1 of throws) {
        for (const t2 of throws) {
            if (t1.value + t2.value === score) return [t1, t2];
        }
    }

    // 3 fléchettes
    for (const t1 of throws) {
        for (const t2 of throws) {
            for (const t3 of throws) {
                if (t1.value + t2.value + t3.value === score) return [t1, t2, t3];
            }
        }
    }

    return null;
}


export function CanFinish({ score, finisher }: CanFinishProps) {
    const [combo, setCombo] = useState<DartThrow[] | null>(null);

    useEffect(() => {
        if (score > 0) {
            const res = predictFinishingCombo(score);
            setCombo(res);
        } else {
            setCombo(null);
        }
    }, [score]);

    return (
        <Stack>
            <Typography variant='h4'>{`${finisher} a un score de ${score}`}</Typography>
            {combo && (
                <Stack>
                    <Typography variant="h5">
                        Finition possible avec:
                    </Typography>
                    <Typography variant="h5">
                        {combo.map((t) => t.label).join(' + ')}
                    </Typography>
                </Stack>
            )}
        </Stack >
    );
}
