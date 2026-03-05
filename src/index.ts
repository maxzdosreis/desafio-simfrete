import { parse } from "node:path"
import { CepService } from "./services/CepService"
import { FileParser } from "./utils/FileParser"
import { GrafoService } from "./services/GrafoService"

function main() {
    const caminhoArquivo = "input.txt"

    try {
        const parsed = FileParser.parse(caminhoArquivo)

        if (parsed.tipo === "parte1") {
            console.log("Executando parte 1...\n")

            const cepService = new CepService(parsed.faixas)
            const cidade = cepService.buscarCidades(parsed.cepConsulta)

            if (cidade) {
                console.log(`CEP pertence à cidade: ${cidade}`)
            } else {
                console.log("CEP não encontrado em nenhuma faixa.")
            }
        } else if (parsed.tipo === "parte2") {
            console.log("Executando parte 2...\n")

            const cepService = new CepService(parsed.faixas)
            const cidadeOrigem = cepService.buscarCidades(parsed.cepOrigem)
            const cidadeDestino = cepService.buscarCidades(parsed.cepDestino)

            if (!cidadeOrigem || !cidadeDestino) {
                console.log("CEP origem ou destino não encontrado.")
                return
            }

            const grafoService = new GrafoService(parsed.arestas)
            const resultado = grafoService.calcularMenorCaminho(cidadeOrigem, cidadeDestino)

            if (!resultado) {
                console.log("Não existe caminho entre as cidades.")
                return
            }

            console.log("Rota encontrada: ")
            console.log(resultado?.rota.join(" -> "))
            console.log(`Custo total: R$ ${resultado?.custoTotal}`)

        }

    } catch (error) {
        console.error("Erro ao processar arquivo: ", error)
    }
}

main()