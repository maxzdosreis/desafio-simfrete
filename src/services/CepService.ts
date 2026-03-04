import { FaixaCep } from "../models/FaixaCep";

export class CepService {
    private faixas: FaixaCep[]

    constructor(faixas: FaixaCep[]) {
        this.faixas = [...faixas].sort((a, b) => a.cepInicial - b.cepFinal)
    }

    buscarCidades(cep: number): string | null {
        let left = 0
        let right = this.faixas.length - 1

        while (left <= right) {
            const mid = Math.floor((left + right) / 2)
            const faixa = this.faixas[mid]
        
            if (cep < faixa.cepInicial) {
                right = mid - 1
            } else if (cep > faixa.cepFinal) {
                left = mid + 1
            } else {
                return faixa.cidade
            }
        }

        return null
    }
}