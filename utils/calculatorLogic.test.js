import { describe, it, expect } from "vitest"
import { calculate, inputDigit, inputDecimal, inputOperator, initialState, evaluate, clear } from "./calculatorLogic"

describe("calculate",() => {
    it("respecte la priorité des opérations", () => {
        expect(calculate(["3", "+", "5", "*", "2"])).toBe(13)
    })

    it("traite * et / gauche à droite", () => {
        expect(calculate(["8", "/", "2", "*", "2"])).toBe(8)
    })

    it("traite + et − de gauche à droite", () => {
        expect(calculate(["10", "-", "4", "-", "3"])).toBe(3)
    })

    it("lance une erreur en cas de division par zéro", () => {
        expect(() => {calculate(["7", "/", "0"])}).toThrow("Division par zéro")
    })
})

describe("inputDigit", () => {
    it("ajoute le chiffre au dernier nombre", () => {
        const state = { ...initialState, tokens: ["7"]}
        expect(inputDigit(state, 5).tokens).toEqual(["75"])
    })

     it("crée un nouveau nombre après un opérateur", () => {
        const state = { ...initialState, tokens: ["7", "+"]}
        expect(inputDigit(state, "5").tokens).toEqual(["7", "+", "5"])
    })

    it("démarre un nouveau calcul après =", () => {
        const state = { tokens: ["14"], justEvaluated: true, previousExpression: "7 + 7" }
        expect(inputDigit(state, "5").tokens).toEqual(["5"])
    })
})


describe("inputOperator", () => {
    it("remplace un opérateur existant", () => {
        const state = { ...initialState, tokens: ["7", "+"]}
        expect(inputOperator(state, "*").tokens).toEqual(["7", "*"])
    })

    it("ignore la touche après une erreur", () => {
        const state = { ...initialState, tokens: ["Erreur"]}
        expect(inputOperator(state, "+")).toBe(state)
    })
})

describe("inputDecimal", () => {
   it("commence par 0. quand tokens est vide", () => {
        expect(inputDecimal(initialState).tokens).toEqual(["0."])
   })

   it("ignore un second point", () => {
        const state = { ...initialState, tokens: ["3.5"] }
        expect(inputDecimal(state)).toBe(state)
   })
})

describe("evaluate", () => {
    it("corrige l'imprécision des nombres décimaux", () => {
        const state = { ...initialState, tokens: ["0.1", "+", "0.2"] }
        expect(evaluate(state).tokens).toEqual(["0.3"])
    })

    it("affiche Erreur en cas de division par zéro", () => {
        const state = { ...initialState, tokens: ["7", "/", "0"] }
        expect(evaluate(state).tokens).toEqual(["Erreur"])
    })
})

describe("clear", () => {
    it("remet la calculatrice à son état initial", () => {
        expect(clear()).toEqual(initialState)
    })
})
 
        
        