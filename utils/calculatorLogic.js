
const OPERATORS = ["*", "/", "+", "-"]

export const initialeState = {
    tokens: [],
    justEvaluated: false,
    previousExpression: ""
}

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
            if(right === 0) {
                throw new Error("Division par zéro")
            }
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



export function inputDigit(state, digit) {
    const { tokens, justEvaluated } = state

    if (justEvaluated || tokens.length === 0) {
        return { tokens: [digit], justEvaluated: false, previousExpression: "" }
    }

    const lastToken = tokens[tokens.length - 1]

    if (OPERATORS.includes(lastToken)) {
        return { ...state, tokens: [...tokens, digit] } 
    }

    
    return { ...state, tokens: [...tokens.slice(0, -1), lastToken + digit] }
}
