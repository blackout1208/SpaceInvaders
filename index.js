const readline = require('linebyline'),
    rl = readline(__dirname + '/Data/SpaceInvaders 2.0 .md');
const AppHelper = require('./Helpers/AppHelpers');
const now = require("performance-now");
const SpaceInvaders = require('./Models/SpaceInvaders');

let inputINDEX = 0;
let input = new Array(AppHelper.INPUTMAX);


rl.on('line', (line) => {
    if (line.trim() !== '') {
        input[inputINDEX++] = line.trim();
    }
})
    .on('error', (e) => {
        console.error(e);
    });

rl.on('close', () => {
    const spaceInvaders = new SpaceInvaders();
    spaceInvaders.SetInvaders = readInvaders();
    spaceInvaders.SetMap = readMap();
    console.log(`There are ${spaceInvaders.ScanInvaders()} invaders.`);
});

const readInvaders = () => {
    let invaders = new Array(AppHelper.INVADERSMAX);
    let invadersINDEX = 0;

    inputIndex = AppHelper.nextElementToRead(input);

    while (invadersINDEX < AppHelper.INVADERSMAX) {
        let aux = [];
        while (input[++inputIndex] !== '~~~~') {
            aux[aux.length] = input[inputIndex];
        }

        if (aux.length !== 0) {
            invaders[invadersINDEX++] = aux;
        }
    }

    return invaders;
}

const readMap = () => {
    let spaceMap = new Array(AppHelper.SPACEMAX);
    let spaceINDEX = 0;

    if (inputIndex === undefined) {
        return;
    }
    inputIndex = AppHelper.nextElementToRead(input, inputIndex);

    while (input[++inputIndex] !== '~~~~') {
        spaceMap[spaceINDEX++] = input[inputIndex];
    }
    return spaceMap;
}