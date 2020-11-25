/********************************************************************************************************************************************
 * Il computer deve generare 16 numeri casuali tra 1 e 100.
 * I numeri non possono essere duplicati
 * In seguito deve chiedere all’utente (100 - 16) volte di inserire un numero alla volta, sempre compreso tra 1 e 100.
 * L’utente non può inserire più volte lo stesso numero.
 * Se il numero è presente nella lista dei numeri generati, la partita termina, altrimenti si continua chiedendo all’utente un altro numero.
 * La partita termina quando il giocatore inserisce un numero “vietato” o raggiunge il numero massimo possibile di numeri consentiti.
 * Al termine della partita il software deve comunicare il punteggio, cioè il numero di volte che l’utente ha inserito un numero consentito. 
 * 
 * BONUS
 * all’inizio il software richiede anche una difficoltà all’utente che cambia il range di numeri casuali:
 * con difficoltà 0 => tra 1 e 100
 * con difficoltà 1 =>  tra 1 e 80
 * con difficoltà 2 => tra 1 e 50
 * EXTRA
 * Giocare utilizzando un'interfaccia grafica
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

/**
 * Check if an item is contained into an array.
 * 
 * @param {array} sequence The array to check.
 * @param {number} item    The number to search for.
 * @return {boolean}  true il item is in the sequence, false otherwise.
 * */
function isInSequence(sequence, item){
    for(var i=0; i<sequence.length; i++){
        if(sequence[i] === item){
            return true;
        }
    }
    return false;
}

/**
 * Generates an array of random numbers between a minValue and a maxValue. 
 * 
 * @param {number} minValue The minimum value in the array.
 * @param {number} maxValue The maximum value in the array.
 * @param {number} sequenceLength Number of elements to generate inside the array.
 * @return {array} - The array of generated numbers.
 */
function getRandomExplosiveNumbers(minValue, maxValue, sequenceLength){
    var sequence = [];
    for (var i=0; i<sequenceLength; i++){
        var numeroCasuale;
        //continuo a generare un numero casuale fino a generare un numero che non è già presente in sequence
        do{
            numeroCasuale = getRandomIntegerMinMax(minValue, maxValue);
        } while(isInSequence(sequence, numeroCasuale));
        //Inserisco il numero casuale non ripetuto nell'array sequence
        sequence.push(numeroCasuale);
    }

    return sequence;
}

//Inizio parte extra
document.getElementById("btn-start").addEventListener("click", function(){
    var maxNumber;
    var numeriEsplosivi = [];
    document.getElementById("btn-start").disabled = true;
    var livelloDifficolta = document.getElementById("livello").value;
    switch(livelloDifficolta){
        case "facile":
            maxNumber = 100;
            numeriEsplosivi = getRandomExplosiveNumbers(1, maxNumber, 16);
            startGame(maxNumber, numeriEsplosivi);
            break;
        case "medio":
            maxNumber = 80;
            numeriEsplosivi = getRandomExplosiveNumbers(1, maxNumber, 16);
            startGame(maxNumber, numeriEsplosivi);
            break;
        case "difficile":
            maxNumber = 50;
            numeriEsplosivi = getRandomExplosiveNumbers(1, maxNumber, 16);
            startGame(maxNumber, numeriEsplosivi);
            break;
        default:
            document.getElementById("btn-start").disabled = false;
            alert("Livello di difficoltà non previsto");
    }
});

//Gioco
function startGame(maxNumber, numeriEsplosivi){
    //Creo i div che conterranno i numeri
    for(var i=1; i<=maxNumber; i++){
        var divContenitore = document.getElementById("contenitore").innerHTML;
        document.getElementById("contenitore").innerHTML = divContenitore + "<div class='number'>" + i + "</div>";
    }
    
    var elements = document.getElementsByClassName("number");
    
    var punteggio = 0;
    var gameOver = false;
    var numeriScelti = [];
    //Creo i listener dei vari div che contengono i numeri
    for(var i=0; i<elements.length; i++){
        elements[i].addEventListener("click", function(){
            if(!gameOver){
                var numero = Number(this.innerHTML);
                //Nota personale: uso il metodo includes che è equivalente alla mia funzione isInSequence, solo per ricordarmi della sua esistenza
                if(!numeriScelti.includes(numero)){
                    numeriScelti.push(numero);
                    if(numeriEsplosivi.includes(numero)){
                        this.classList.add("explosion");
                        document.getElementById("risultato").innerHTML = "SEI ESPLOSO! Hai totalizzato " + punteggio + " punti!";
                        showAllNumbers(elements, numeriScelti, numeriEsplosivi);
                        gameOver = true;
                    } else {
                        this.classList.add("safe");
                        punteggio++;
                        if(punteggio == elements.length - numeriEsplosivi.length){
                            document.getElementById("risultato").innerHTML = "HAI VINTO con il punteggio massimo di: " + punteggio + " punti!";
                            showAllNumbers(elements, numeriScelti, numeriEsplosivi);
                            gameOver = true;
                        }
                    }
                }
            }
        });
    }
}

//Funzione richiamata alla fine del gioco per mostrare le caselle non ancora selezionate dall'utente
function showAllNumbers(listElements, listUserNumbers, listExplosiveNumbers){
    for(var i=0; i<listElements.length; i++){
        var numero = Number(listElements[i].innerHTML);
        if(!listUserNumbers.includes(numero) && listExplosiveNumbers.includes(numero)){
            listElements[i].classList.add("show-explosion");
        } else if (!listUserNumbers.includes(numero) && !listExplosiveNumbers.includes(numero)){
            listElements[i].classList.add("show-safe");
        }
    }
}