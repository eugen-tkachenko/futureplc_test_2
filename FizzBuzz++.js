/* 2. FizzBuzz++ (Node/JS)

Testing: general programming, succinctness, readability

---

Write a script that will be executed from the command line.

The script should echo the numbers 1 to 500, each number being on a new line.

Output required in addition to the number:

If the number is divisible by 3 the script should echo 'FIZZ', if the
number is divisible by 5 the script should echo 'BUZZ'.

If the number is divisible by both 3 and 5 the script should echo 'FIZZBUZZ'.

If the number is a prime, echo 'FiZZBUZZ++'

The same script should also log the above output to a file called
fizzbuzz.log. Data that may already be in the fizzbuzz.log file should
not be overwritten.

*/

import { EOL } from "node:os";
import { open } from 'node:fs/promises';


function isDivisibleBy3(n) {
    return isDivisibleByNumber(n, 3);
}

function isDivisibleBy5(n) {
    return isDivisibleByNumber(n, 5);
}

function isDivisibleByNumber(n, d) {
    return n % d == 0;
}

function isPrime(n) {
    // 0 is not prime so are not negatives
    if (n < 0)
        return false;
    
    // for optimization reasons the furthest we go is i**0.5
    for (let j = 2; j <= Math.floor(n**0.5); j++) {
        // console.log([n, j, n % j])
        if (n % j == 0) {
            return false;
        }
    }

    return true;
}

async function FizzBuzz(max = 200, min = 1, path = './fizzbuzz.log') {

    let filehandle;
    let s = '';

    try {
        filehandle = await open(path, 'a');

        for (let i = min; i <= max; i++) {
            s = i + ' ';

            if (isDivisibleBy3(i)) s += 'FIZZ';
            if (isDivisibleBy5(i)) s += 'BUZZ';
            if (isPrime(i))        s = i + ' ' + 'FIZZBUZZ++';

            console.log(s);

            s += EOL;

            filehandle.write(s, 0, s.lenght, null, function(err) {
                if (err) throw 'Error writing the log file: ' + err;
            });
        }
    } catch (err) {
        console.log(err);
    } finally {
      await filehandle?.close();
    } 
}

FizzBuzz();