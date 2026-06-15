git branch -M main
git remote add origin https://github.com/perlov3301/vswr_db_frequences.git
git push -u origin main

(Z_L = 75 - j25), (Z_0 = 50) vswr=1.77_
zl=9.33-39.2i z0=50 vswr =  8.7250
z0=50 Z_L = 100 + j25  VSWR=2.16
Z₀ = 100 Ω, Zᴸ = 40 + j70 Ω, line length = 0.3λ → VSWR = 3.86 

  gamma:   db     vswr
 v*0.099 -0.043  1.22
 v*0.2   -0.177  1.5
 v*0.3   -0.41   1.86
 v*0.333 -0.51   2.0
 v*0.5   -1.25   3.0
 v*0.59  -1.87   3.87
 v*0.706 -3.00   5.8
 v*0.949 -10.0   38
 v*0.95  -10.1   39
 v*0.972 -12.6   70
 v*0.9802  -14.1  100
 v*0.99    -17.03   199
 v*0.995   -20      399
 v*0.998   -24      999

// 1. Your array of input IDs
const inputIds = ['input1', 'input2', 'input3'];

// 2. Map through IDs, get their values, and convert them to numbers
const numbersArray = inputIds.map(id => {
  const inputElement = document.getElementById(id);
  
  // Use Number() to convert the string value into a number
  return inputElement ? Number(inputElement.value) : 0; 
});

console.log(numbersArray); // Output: [10, 25, 42]
   
if i am confident that all IDs exist on the page:
const numbersArray = inputIds.map(id => 
    Number(document.getElementById(id)?.value || 0));

Ethan Bortnick - Piano Prodigy 