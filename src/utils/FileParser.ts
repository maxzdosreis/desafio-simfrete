import * as fs from "fs"
import { FaixaCep } from "../models/FaixaCep"

export interface ParsedParte1 {
    tipo: "parte1"
    faixas: FaixaCep[]
    cepConsulta: number
}

export interface ParsedParte2 {
    tipo: "parte2"
    faixas: FaixaCep[]
    arestas: {
        origem: string
        destino: string
        custo: number
    }[]
    cepOrigem: number
    cepDestino: number
}

export type ParsedInput = ParsedParte1 | ParsedParte2

export class FileParser {
    static parse(caminhoArquivo: string): ParsedInput {
        const conteudo = fs.readFileSync(caminhoArquivo, "utf-8")

        const linhas = conteudo.split("\n").map(l => l.trim()).filter(l => l.length > 0)

        const secoes: string[][] = []
        let secaoAtual: string[] = []

        for (const linha of linhas) {
            if (linha === "--") {
                secoes.push(secaoAtual)
                secaoAtual = []
            } else {
                secaoAtual.push(linha)
            }
        }

        if (secaoAtual.length > 0) {
            secoes.push(secaoAtual)
        }

        if (secoes.length === 2) {
            return this.parseParte1(secoes)
        }

        if (secoes.length === 3) {
            return this.parseParte2(secoes)
        }

        throw new Error("Formato de arquivo inválido.") 
    }

    private static parseFaixas(linhas: string[]): FaixaCep[] {
        return linhas.map(linha => {
            const partes = linha.split(",")

            if (partes.length !== 3) {
                throw new Error(`Linha de faixa inválida: ${linha}`)
            }

            const cidade = partes[0]
            const cepInicial = parseInt(partes[1], 10)
            const cepFinal = parseInt(partes[2], 10)

            if (isNaN(cepInicial) || isNaN(cepFinal)) {
                throw new Error(`CEP inválido na linha: ${linha}`)
            }

            return {
                cidade,
                cepInicial,
                cepFinal
            }
        })
    }

    private static parseParte1(secoes: string[][]): ParsedParte1 {
        const faixas = this.parseFaixas(secoes[0])

        const cepLinha = secoes[1][0]
        const cepConsulta = parseInt(cepLinha, 10)
        
        if (isNaN(cepConsulta)) {
            throw new Error("CEP de consulta inválido.")
        }

        return {
            tipo: "parte1",
            faixas,
            cepConsulta
        }
    }

    private static parseParte2(secoes: string[][]): ParsedParte2 {
        const faixas = this.parseFaixas(secoes[0])

        const arestas = secoes[1].map(linha => {
            const partes = linha.split(",")

            if (partes.length !== 3) {
                throw new Error(`Linha de aresta inválida: ${linha}`)
            }

            const origem = partes[0]
            const destino = partes[1]
            const custo = parseFloat(partes[2])

            if (isNaN(custo)) {
                throw new Error(`Custo inválido na linha: ${linha}`)
            }

            return {
                origem,
                destino,
                custo
            }
        })

        const ultimaLinha = secoes[2][0]
        const partesCep = ultimaLinha.split(",")

        if (partesCep.length !== 2) {
            throw new Error("Linha final de CEPs inválida.")
        }

        const cepOrigem = parseInt(partesCep[0], 10)
        const cepDestino = parseInt(partesCep[1], 10)

        if (isNaN(cepOrigem) || isNaN(cepDestino)) {
            throw new Error("CEP origem/destino inválido.")
        }

        return {
            tipo: "parte2",
            faixas,
            arestas,
            cepOrigem,
            cepDestino
        }
    }
}