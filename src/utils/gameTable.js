export function generateTable(rows, columns, mines) {
    let field = [];
    for (let i = 0; i < rows; i++) {
        field[i] = [];
        for (let j = 0; j < columns; j++) {
            field[i][j] = 0;
        }
    }

    for (let i = 0; i < mines; i++) {
        let x = Math.floor(Math.random() * rows);
        let y = Math.floor(Math.random() * columns);
        field[x][y] = "M";
    }

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < columns; j++) {
            if (field[i][j] === "M") continue;
            let minesAround = 0;
            for (let x = -1; x <= 1; x++) {
                for (let y = -1; y <= 1; y++) {
                    if (i + x >= 0 && i + x < rows && j + y >= 0 && j + y < columns) {
                        if (field[i + x][j + y] === "M") minesAround++;
                    }
                }
            }
            field[i][j] = minesAround;
        }
    }

    return field;
}

export function generateEmptyTable(tableWidth, tableHeight) {
    return Array(tableHeight).fill().map(() => Array(tableWidth).fill('C'))
}

export function generateOpenedTable(tableWidth, tableHeight) {
    return Array(tableHeight).fill().map(() => Array(tableWidth).fill('O'))
}