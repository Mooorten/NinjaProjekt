//Opretter en konstant, kalder den "add" og gør så den bruger vores math.js klasse.
const add = require('./math.js')

//Opretter en konstant, kalder den "result" og tilføjer 2 og 3 til den.
const result = add(2,3);

//Konsollen udskriver resultatet, lidt det samme som en sout.
console.log("The result is " + result)