const INPUTMAX = 100;
const INVADERSMAX = 2;
const SPACEMAX = 1;

const nextElementToRead = (input, inputIndex) => {
    if(inputIndex === undefined){
        inputIndex = -1;
    }
    while (input[++inputIndex] !== '~~~~');
    return inputIndex;
}

const getLineIndexes = (lineString, value) => {
    let indexes = [];
    let i = -1;
    while ((i = lineString.indexOf(value, i + 1)) !== -1) {
        indexes.push(i);
    }
    return indexes.length === 0 ? undefined : indexes;
}

module.exports = {
    INPUTMAX,
    INVADERSMAX,
    SPACEMAX,
    nextElementToRead,
    getLineIndexes
}