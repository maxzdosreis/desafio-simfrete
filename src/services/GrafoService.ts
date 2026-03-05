import { Aresta } from "../models/Aresta";

export class GrafoService {
    private grafo: Map<string, Aresta[]>

    constructor(arestas: { origem: string; destino: string; custo: number}[]) {
        this.grafo = new Map()

        for (const aresta of arestas) {
            if (!this.grafo.has(aresta.origem)) {
                this.grafo.set(aresta.origem, [])
            }

            this.grafo.get(aresta.origem)!.push({
                destino: aresta.destino,
                custo: aresta.custo
            })

            if(!this.grafo.has(aresta.destino)) {
                this.grafo.set(aresta.destino, [])
            }

            this.grafo.get(aresta.destino)!.push({
                destino: aresta.origem,
                custo: aresta.custo
            })
        }
    }

    calcularMenorCaminho(origem: string, destino: string): {
        rota: string[]
        custoTotal: number
    } | null {
        const distancias = new Map<string, number>()
        const anteriores = new Map<string, string | null>()
        const fila: { cidade: string; custo: number}[] = []

        for (const cidade of this.grafo.keys()) {
            distancias.set(cidade, Infinity)
            anteriores.set(cidade, null)
        }

        distancias.set(origem, 0)
        fila.push({ cidade: origem, custo: 0})

        while (fila.length > 0) {
            //console.log("Fila tamanho:", fila.length)

            fila.sort((a,b) => a.custo - b.custo)

            const atual = fila.shift()!
            const cidadeAtual = atual.cidade

            if (atual.custo > (distancias.get(cidadeAtual) ?? Infinity)) {
                continue
            }

            if (cidadeAtual === destino) {
                break
            }

            const vizinhos = this.grafo.get(cidadeAtual) || []

            for (const vizinho of vizinhos) {
                //console.log("Visitando:", cidadeAtual, "->", vizinho.destino)
                const novaDistancia = distancias.get(cidadeAtual)! + vizinho.custo

                if (novaDistancia < (distancias.get(vizinho.destino) ?? Infinity)) {
                    distancias.set(vizinho.destino, novaDistancia)
                    anteriores.set(vizinho.destino, cidadeAtual)

                    fila.push({ 
                        cidade: vizinho.destino,
                        custo: novaDistancia
                    })
                }   
            }
        }

        if (!distancias.has(destino) || distancias.get(destino) === Infinity) {
            return null
        }

        const rota: string[] = []
        let atual: string | null = destino
        
        while (atual !== null) {
            rota.unshift(atual)
            atual = anteriores.get(atual) ?? null
        }

        return {
            rota,
            custoTotal: distancias.get(destino)!
        }
    }
}