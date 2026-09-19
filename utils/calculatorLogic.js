
const OPERATORS = ["*", "/", "+", "-"]

export function calculate(tokens) {
   const values = []

   for(const token of tokens) {
     if (OPERATORS.includes(token)) {
        values.push(token)
     } else {
        values.push(Number(token))
     }
   }

   let  i = 0

   while (i < values.length) {
     const token = values[i]

     if (token === "*" || token === "/") {
        const left = values[i - 1]
        const right = values [i + 1]

        let result

        if (token === "*") {
            result = left * right
        } else {
            result = left / right
        }

        values.splice(i - 1, 3, result)
     } else {
        i++
     }
   }

     let  j = 0

   while (j < values.length) {
     const token = values[j]

     if (token === "+" || token === "-") {
        const left = values[j - 1]
        const right = values [j + 1]

        let result

        if (token === "+") {
            result = left + right
        } else {
            result = left - right
        }

        values.splice(j - 1, 3, result)
     } else {
        j++
     }
   }


   return values[0]
}