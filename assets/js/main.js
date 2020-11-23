/********************************************************************************************************************************************
 * Il computer deve generare 16 numeri casuali tra 1 e 100.
 * I numeri non possono essere duplicati
 * In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
 * L’utente non può inserire più volte lo stesso numero.
 * Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
 * La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
 * Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito. 
**********************************************************************************************************************************************/

/**
 * Generates a random integer number between a minimum and a maximum number (both included).
 * 
 * @param {number} min  minimum random number.
 * @param {number} max  maximum random number.
 * @return {number}     random number between min and max
 */
function getRandomIntegerMinMax(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isInSequence(sequence, item){
    for(var i=0; i<sequence.length; i++){
        if(sequence[i] === item){
            return true;
        }
    }
    return false;
}


var numeriEsplosivi =[];
for (var i=0; i<16; i++){
    var numeroCasuale;
    //continuo a generare un numero casuale fino a generare un numero che non è già presente in numeriEsplosivi
    do{
        numeroCasuale = getRandomIntegerMinMax(1,100);
        //test
        console.log(numeroCasuale);
    } while(isInSequence(numeriEsplosivi, numeroCasuale));
    //Inserisco il numero casuale non ripetuto nell'array numeriEsplosivi
    numeriEsplosivi.push(numeroCasuale);
}
//test
console.log(numeriEsplosivi);