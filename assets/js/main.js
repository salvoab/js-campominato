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

function getRandomExplosiveNumbers(sequence, maxValue, sequenceLength){
    for (var i=0; i<sequenceLength; i++){
        var numeroCasuale;
        //continuo a generare un numero casuale fino a generare un numero che non è già presente in sequence
        do{
            numeroCasuale = getRandomIntegerMinMax(1, maxValue);
        } while(isInSequence(sequence, numeroCasuale));
        //Inserisco il numero casuale non ripetuto nell'array sequence
        sequence.push(numeroCasuale);
    }

    return sequence;
}

//Il computer deve generare 16 numeri casuali tra 1 e 100. I numeri non possono essere duplicati.
var numeriEsplosivi = [];
var maxNumber = 100;
numeriEsplosivi = getRandomExplosiveNumbers(numeriEsplosivi, maxNumber, 16);
//test
//console.log(numeriEsplosivi);

//Chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100. L’utente non può inserire più volte lo stesso numero.
var numeriUtente = [];
var punteggio = 0;
var keepPlaying = true;

for (var i=0; i<(maxNumber-16) && keepPlaying; i++){
    var numeroInput;
    //Continuo a chiedere un numero all'utente se lo ha già inserito o se inserisce un NaN
    do{
        var numeroRipetuto = false;
        var outOfBoundNumber = false;
        numeroInput = parseInt( prompt("Inserisci un numero fra 1 e " + maxNumber) );
        if(isInSequence(numeriUtente, numeroInput)){
            numeroRipetuto = true;
            alert("Attenzione! Hai già inserito il numero " + numeroInput + ". Scegli un altro numero")
        }
        if(numeroInput < 1 || numeroInput > maxNumber){
            outOfBoundNumber = true;
            alert("Attenzione! Hai inserito un numero non valido! Puoi inserire solo numeri fra 1 e " + maxNumber);
        }
    } while(isNaN(numeroInput) || numeroRipetuto || outOfBoundNumber);
    //Inserisco il numero casuale non ripetuto nell'array numeriUtente
    numeriUtente.push(numeroInput);

    if(isInSequence(numeriEsplosivi, numeroInput)){
        keepPlaying = false;
        console.log("Il numero " + numeroInput + " era un numero esplosivo! Sei Esploso!");
    } else{
        keepPlaying = true;
        punteggio++;
        console.log("Il numero " + numeroInput + " non era un numero esplosivo! Complimenti!");
    }
}
//console.log("I numeri che hai inserito sono: ");
//console.log(numeriUtente);

if(numeriUtente.length == (maxNumber-16) ){
    console.log("Hai totalizzato il punteggio massimo che è di: " + punteggio + " punti!");
} else {
    console.log("Hai totalizzato: " + punteggio + " punti!");
}

console.log("I numeri esplosivi erano: [" + numeriEsplosivi + "]");