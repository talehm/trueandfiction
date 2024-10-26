<template>
	<div class="nanogram-game">
		<h1>{{ title }}</h1>
		<div class="grid-wrapper">
			<div class="column-hints">
				<!-- Empty corner to align row and column hints -->
				<div class="hint-cell empty"></div>
				<!-- Column hints (aligned above the grid) -->
				<div v-for="(colHint, colIndex) in columnHints" :key="'col-hint-' + colIndex" class="column-hint-box">
					<div v-for="(num, numIndex) in colHint" :key="'col-num-' + colIndex + '-' + numIndex"
						class="hint-cell">
						{{ num }}
					</div>
				</div>
			</div>
			<div class="row-and-grid">
				<!-- Row hints (aligned to the left of the grid) -->
				<div class="row-hints">
					<div v-for="(rowHint, rowIndex) in rowHints" :key="'row-hint-' + rowIndex" class="row-hint-box">
						<div v-for="(num, numIndex) in rowHint" :key="'row-num-' + rowIndex + '-' + numIndex"
							class="hint-cell">
							{{ num }}
						</div>
					</div>
				</div>
				<!-- Game grid -->
				<div class="grid">
					<div v-for="(row, rowIndex) in userGrid" :key="rowIndex" class="grid-row">
						<div v-for="(cell, colIndex) in row" :key="`${colIndex}-${rowIndex}`" class="grid-cell"
							:class="{ 'filled': userGrid[rowIndex][colIndex] }" @click="toggleCell(rowIndex, colIndex)">
							{{ cell }}
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="controls">
			<button @click="checkSolution">Check</button>
			<button @click="getHints">Get Hint ({{ hints }})</button>
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			userGrid: [],
			rowHints: [],
			columnHints: [],
			hints: 3,
			title: "Nanogram Game",
			gameData: {
				type: 63,
				level: 62,
				title: "test",
				size: "5",
				solution: "[[0,0,1,1,0],[0,0,0,1,0],[1,1,1,0,1],[0,1,0,0,0],[1,0,1,1,0]]",
				difficulty: "Easy",
				helper_mode: true,
				hints: 3,
				points: 10,
				image: 686
			}
		};
	},
	created() {
		this.initializeGrid();
		this.calculateRowAndColumnHints();
	},
	methods: {
		initializeGrid() {
			const size = parseInt(this.gameData.size);
			this.userGrid = Array.from({ length: size }, () => Array(size).fill(false)); // Empty grid at the start
		},
		toggleCell(rowIndex, colIndex) {
			const solution = JSON.parse(this.gameData.solution);

			console.log(solution[rowIndex][colIndex], rowIndex, colIndex);
			this.$set(this.userGrid[rowIndex], colIndex, !this.userGrid[rowIndex][colIndex]);
			console.log(this.userGrid[rowIndex][colIndex]);

		},
		calculateRowAndColumnHints() {
			const solution = JSON.parse(this.gameData.solution);

			// Row hints
			this.rowHints = [
				[2, 1],  // First row
				[3, 1],  // Second row
				[1],     // Third row
				[1, 3],  // Fourth row
				[1, 1],  // Fifth row
			];

			// Column hints
			this.columnHints = [
				[2, 1],  // First column
				[2, 1],  // Second column
				[1, 1],  // Third column
				[2],     // Fourth column
				[2, 2],  // Fifth column
			];
		},
		getHints() {
			if (this.hints > 0) {
				// Reveal a hint for an unfilled cell
				const unfilledCells = [];
				const solution = JSON.parse(this.gameData.solution);
				this.userGrid.forEach((row, rowIndex) => {
					row.forEach((cell, colIndex) => {
						if (!cell && solution[rowIndex][colIndex] === 1) {
							unfilledCells.push({ rowIndex, colIndex });
						}
					});
				});

				if (unfilledCells.length) {
					const randomCell = unfilledCells[Math.floor(Math.random() * unfilledCells.length)];
					this.userGrid[randomCell.rowIndex][randomCell.colIndex] = true;
					this.hints--;
				}
			}
		},
		checkSolution() {
			// Compare the user's grid with the solution
			const solution = JSON.parse(this.gameData.solution);
			let allCorrect = true;

			this.userGrid.forEach((row, rowIndex) => {
				row.forEach((cell, colIndex) => {
					if (cell !== Boolean(solution[rowIndex][colIndex])) {
						this.incorrectCells[rowIndex][colIndex] = true; // Mark incorrect cells
						allCorrect = false;
					} else {
						this.incorrectCells[rowIndex][colIndex] = false; // Unmark if correct
					}
				});
			});

			if (allCorrect) {
				this.checkMessage = "Congratulations! You've filled the grid correctly.";
			} else {
				this.checkMessage = "There are some mistakes. Please review your grid.";
			}
		}
	}
};
</script>
<style scoped>
.nanogram-game {
	text-align: center;
}

.grid-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.column-hints {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
}

.column-hint-box {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
}

.row-and-grid {
	display: flex;
}

.row-hints {
	display: flex;
	flex-direction: column;
	justify-content: center;
}

.row-hint-box {
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
}

.grid {
	display: flex;
	flex-direction: column;
}

.grid-row {
	display: flex;
}

.grid-cell {
	width: 40px;
	height: 40px;
	border: 1px solid #ccc;
	cursor: pointer;
	transition: background-color 0.3s;
}

.grid-cell.filled {
	background-color: #000;
}

.hint-cell {
	width: 40px;
	height: 40px;
	display: flex;
	justify-content: center;
	align-items: center;
	border: 1px solid #ccc;
}

.hint-cell.empty {
	border: none;
}

.controls {
	margin-top: 20px;
}
</style>