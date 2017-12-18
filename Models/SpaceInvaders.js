'use strict';
const AppHelper = require('./../Helpers/AppHelpers');

class SpaceInvaders {
    constructor() {
        this._invaders = new Array(AppHelper.INVADERSMAX);
        this._spaceMap = new Array(AppHelper.SPACEMAX);
    }

    set SetInvaders(invaders){
        this._invaders = invaders;
    }

    set SetMap(spaceMap){
        this._spaceMap = spaceMap;
    }

    ScanInvaders(input, inputIndex){
        let invadersINDEX = -1;
        let countINVADERS = 0;

        while (++invadersINDEX < AppHelper.INVADERSMAX) {
            const INVX = Math.floor(this._invaders[invadersINDEX].length / 2);
            const INVL = this._invaders[invadersINDEX].length;
            const MINPOS = INVX;
            const MAXPOS = ((this._spaceMap.length - 1) - ((INVL - 1) - INVX));
            const lengthValue = ((MAXPOS - MINPOS) > INVL) ? MAXPOS - MINPOS : this._spaceMap.length;

            let auxSpaceMap = new Array(lengthValue);
            let auxIndex = 0;

            let i = MINPOS;
            for (; i < MAXPOS; i++) {
                auxSpaceMap[auxIndex++] = this._spaceMap[i];
            }

            auxIndex = 0;
            for (; auxIndex < auxSpaceMap.length; auxIndex++) {
                const indexes = AppHelper.getLineIndexes(auxSpaceMap[auxIndex], this._invaders[invadersINDEX][INVX]);
                if (indexes !== undefined) {
                    if (this.CheckInvaderPresence(indexes, auxIndex, this._invaders[invadersINDEX], INVX, INVL)) {
                        countINVADERS++;
                    }
                }
            }
        }
        return countINVADERS;
    }

    CheckInvaderPresence(indexes, auxIndex, invader, invaderMiddle, invaderLength){
        const middlePointMap = invaderMiddle + auxIndex;
        const minRange = middlePointMap - invaderMiddle;
        const maxRange = middlePointMap + ((invaderLength - 1) - invaderMiddle);
        const lengthString = invader[invaderMiddle].length;

        let i = 0;
        let isFound = false;

        for (; i < indexes.length; i++) {
            let auxSpaceMap = new Array(maxRange - minRange + 1);
            let auxPos = 0;
            let c = minRange;

            for (; c <= maxRange; c++) {
                auxSpaceMap[auxPos++] = this._spaceMap[c].substring(indexes[i], indexes[i] + lengthString);
            }
            
            auxPos = 0;
            for (; auxPos < auxSpaceMap.length; auxPos++) {
                if (auxSpaceMap[auxPos] !== invader[auxPos]) {
                    break;
                }
                else {
                    isFound = true;
                }
            }
        }
        return isFound;
    }
}

module.exports = SpaceInvaders;