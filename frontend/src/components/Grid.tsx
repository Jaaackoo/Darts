import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { DartScore } from "../class/DartScore";
import React from "react";

const numbers = Array.from({ length: 20 }, (_, i) => i + 1);

export function Grid() {
	function handleClick(value: number) {
		console.log("Clicked value:", value);
	}

	return (
		<Table sx={{ maxWidth: "100%", tableLayout: "fixed", boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)" }}>
			<TableHead>
				<TableRow>
					<TableCell></TableCell>
					{numbers.map((num) => (
						<TableCell key={num} align="center" sx={{ fontWeight: "bold" }}>
							{num}
						</TableCell>
					))}
				</TableRow>
			</TableHead>
			<TableBody>
				{["T", "D", "S"].map((prefix) => (
					<TableRow key={prefix}>
						<TableCell sx={{ fontWeight: "bold" }}>{prefix}</TableCell>
						{numbers.map((num) => {
							const key = `${prefix}${num}` as keyof typeof DartScore;
							const value = DartScore[key];
							return (
								<TableCell
									key={key}
									align="center"
									onClick={() => handleClick(value)}
									sx={{
										cursor: "pointer",
										"&:hover": {
											backgroundColor: "#f0f0f0",
										},
									}}
								>
									{value}
								</TableCell>
							);
						})}
					</TableRow>
				))}

				<TableRow>
					<TableCell sx={{ fontWeight: "bold" }}>Autres</TableCell>
					<TableCell
						align="center"
						colSpan={6}
						onClick={() => handleClick(DartScore.S25)}
						sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
					>
						S25: {DartScore.S25}
					</TableCell>
					<TableCell
						align="center"
						colSpan={6}
						onClick={() => handleClick(DartScore.D25)}
						sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
					>
						D25: {DartScore.D25}
					</TableCell>
					<TableCell
						align="center"
						colSpan={8}
						onClick={() => handleClick(DartScore.MISS)}
						sx={{ cursor: "pointer", "&:hover": { backgroundColor: "#f0f0f0" } }}
					>
						MISS
					</TableCell>
				</TableRow>
			</TableBody>
		</Table>
	);
}
