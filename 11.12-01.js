const input = `2138862165
2726378448
3235172758
6281242643
4256223158
1112268142
1162836182
1543525861
1882656326
8844263151`;

const statusGrid = input
    .split('\n')
    .map(l => l.trim())
    .filter(x => x)
    .map(l => l.split('').map(Number));

function raiseAllLevels() {
    statusGrid.forEach(l => l.forEach((_, i) => l[i]++));
}

function hasFlashingOctopuses() {
    return statusGrid
        .some(l => l.some(x => x > 9));
}

function raiseNeighbourLevels(xCentre, yCentre) {
    const xMin = Math.max(xCentre - 1, 0);
    const xMax = Math.min(xCentre + 1, 9);
    const yMin = Math.max(yCentre - 1, 0);
    const yMax = Math.min(yCentre + 1, 9);

    for (let x = xMin; x <= xMax; x++) {
        for (let y = yMin; y <= yMax; y++) {
            statusGrid[y][x]++;
        }
    }
}

function flash() {
    let count = 0;
    statusGrid
        .forEach((l, y) => {
            l.forEach((v, x) => {
                if (v > 9) {
                    raiseNeighbourLevels(x, y);
                    statusGrid[y][x] = NaN;
                    count++;
                }
            });
        });

    return count;
}

function resetLevels() {
    statusGrid.forEach(l =>
        l.forEach((x, i) => {
            if (Number.isNaN(x)) l[i] = 0;
        })
    );
}

function processStep() {
    let flashes = 0;
    raiseAllLevels();
    while (hasFlashingOctopuses()) {
        flashes += flash();
    }

    resetLevels();

    return flashes;
}

let totalFlashes = 0;
for (let i = 0; i < 100; i++) {
    totalFlashes += processStep();
}

console.log(totalFlashes);
