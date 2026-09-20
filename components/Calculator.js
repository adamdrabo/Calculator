'use client'
 
import { useState } from 'react'
import { OPERATORS, initialState, inputDigit, inputOperator, inputDecimal, evaluate, clear} from "@/utils/calculatorLogic"
 
const BUTTONS = [
  { label: "AC", value: "AC", type: "function", span: "col-span-3" },
  { label: "÷", value: "/", type: "operator" },
  { label: "7", value: "7", type: "digit" },
  { label: "8", value: "8", type: "digit" },
  { label: "9", value: "9", type: "digit" },
  { label: "×", value: "*", type: "operator" },
  { label: "4", value: "4", type: "digit" },
  { label: "5", value: "5", type: "digit" },
  { label: "6", value: "6", type: "digit" },
  { label: "−", value: "-", type: "operator" },
  { label: "1", value: "1", type: "digit" },
  { label: "2", value: "2", type: "digit" },
  { label: "3", value: "3", type: "digit" },
  { label: "+", value: "+", type: "operator" },
  { label: "0", value: "0", type: "digit", span: "col-span-2" },
  { label: ",", value: ".", type: "digit" },
  { label: "=", value: "=", type: "operator" },
]

const STYLES = {
  digit: "bg-zinc-800 text-white hover:bg-zinc-700",
  operator: "bg-orange-500 text-white hover:bg-orange-400",
  function: "bg-zinc-400 text-black hover:bg-zinc-300",
}

const DISPLAY_SYMBOLS = { "*": "×", "/": "÷", "-": "−" }

function formatToken(token) {
  return DISPLAY_SYMBOLS[token] ?? token.replace(".", ",")
}

function formatExpression(expression) {
  return expression.split(" ").map(formatToken).join(" ")
}



export default function Calculator() {
  const [state, setState] = useState(initialState);

 function handleClick(value) {
    if (value === "AC") {
      setState(clear());
    } else if (value === "=") {
      setState(evaluate(state));
    } else if (value === ".") {
      setState(inputDecimal(state));
    } else if (OPERATORS.includes(value)) {
      setState(inputOperator(state, value));
    } else {
      setState(inputDigit(state, value));
    }
  }

  const display = state.tokens.length > 0 ? state.tokens.join(" ") : "0";

  return (
    <div className="w-full max-w-sm">
        <div className="flex min-h-40 flex-col items-end justify-end gap-2 px-2 pb-4">
            <p className="min-h-7 break-all text-right text-xl text-zinc-400">
                {formatExpression(state.previousExpression)}
            </p>

            <p className="break-all text-right text-5xl font-light text-white sm:text-6xl">
                {display}
            </p>
        </div>

        <div className="grid grid-cols-4 gap-3">
            {BUTTONS.map((button) => (
                <button
                    key={button.value}
                    type='button'
                    onClick={() => handleClick(button.value)}
                    className={`rounded-full text-2xl font-medium transition-colors sm:text-3xl ${STYLES[button.type]} ${button.span ?? "aspect-square"}`}
                >
                    {button.label}
                </button>
            ))}

        </div>
    </div>
  )
}