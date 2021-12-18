const input = `BC-gt
gt-zf
end-KH
end-BC
so-NL
so-ly
start-BC
NL-zf
end-LK
LK-so
ly-KH
NL-bt
gt-NL
start-zf
so-zf
ly-BC
BC-zf
zf-ly
ly-NL
ly-LK
IA-bt
bt-so
ui-KH
gt-start
KH-so`;

const links = input
    .split('\n')
    .map(l => l.split('-'));

const START = 0;
const END = -1;
const LARGE = 1;
const SMALL = 2;

class Cave {

    constructor(name) {
        this.name = name;
        this.linkedTo = [];
        this.type = this._getTypeForName(name);
        this.visited = false;
    }

    _getTypeForName(name) {
        return name === 'start'
            ? START
            : name === 'end'
            ? END
            : name[0] <= 'Z'
            ? LARGE
            : SMALL;
    }
}

const caves = links
    .reduce(
        (acc, [from, to]) => {
            const cave1 = acc.get(from) ?? new Cave(from);
            const cave2 = acc.get(to) ?? new Cave(to);

            cave1.linkedTo.push(to);
            cave2.linkedTo.push(from);

            return acc
                .set(from, cave1)
                .set(to, cave2);
        },
        new Map()
    );

function canVisitCave(name) {
    const cave = caves.get(name);

    return (cave.type !== SMALL || !cave.visited) && cave.type !== START;
}

function track(position, currentPath, completedPaths) {
    currentPath.push(position);
    const cave = caves.get(position);
    const links = cave.linkedTo;
    if (cave.type === END) {
        completedPaths.push([...currentPath]);
    } else {
        if (cave.type === SMALL) {
            cave.visited = true;
        }

        links
            .filter(canVisitCave)
            .forEach(link => track(link, currentPath, completedPaths));
    }

    currentPath.pop();
    if (cave.type === SMALL) {
        cave.visited = false;
    }

    return cave.type === START
        ? completedPaths
        : currentPath;
}

const paths = track('start', [], []);

console.log(paths.length);
