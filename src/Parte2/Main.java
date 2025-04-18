package Parte2;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        Map<String, List<Aresta>> grafo = new HashMap<>();
        List<FaixaCEP> faixas = new ArrayList<>();
        try(BufferedReader bufferedReader = new BufferedReader(new FileReader("src/entrada2.txt"))) {
            String linha;
            while((linha = bufferedReader.readLine()) != null && !linha.equals("--")){
                String[] partes = linha.split(",");
                String nome = partes[0];
                int inicio = Integer.parseInt(partes[1]);
                int fim = Integer.parseInt(partes[2]);
                faixas.add(new FaixaCEP(nome, inicio, fim));
            }
            while ((linha = bufferedReader.readLine()) != null && !linha.equals("--")) {
                String[] partes = linha.split(",");
                double custo = Double.parseDouble(partes[2]);
                grafo.computeIfAbsent(partes[0], k -> new ArrayList<>())
                        .add(new Aresta(partes[1], custo));
                grafo.computeIfAbsent(partes[1], k -> new ArrayList<>())
                        .add(new Aresta(partes[0], custo));
            }
            String[] ceps = bufferedReader.readLine().split(",");
            int cepOrigem = Integer.parseInt(ceps[0]);
            int cepDestino = Integer.parseInt(ceps[1]);

            String cidadeOrigem = getCidadePorCep(cepOrigem, faixas);
            String cidadeDestino = getCidadePorCep(cepDestino, faixas);

            if(cidadeOrigem == null || cidadeDestino == null){
                System.out.println("Cidade de origem ou destino não encontrada");
                return;
            }

            Map<String, Double> dist = new HashMap<>();
            Map<String, String> prev = new HashMap<>();
            PriorityQueue<String> fila = new PriorityQueue<>(Comparator.comparingDouble(dist::get));
            Set<String> visitado = new HashSet<>();

            for(String cidade : grafo.keySet()){
                dist.put(cidade, Double.POSITIVE_INFINITY);
            }
            dist.put(cidadeOrigem, 0.0);
            fila.add(cidadeOrigem);

            while(!fila.isEmpty()){
                String atual = fila.poll();
                if(visitado.contains(atual)) continue;
                visitado.add(atual);

                for(Aresta aresta : grafo.getOrDefault(atual, List.of())){
                    double novoCusto = dist.get(atual) + aresta.getCusto();
                    if(novoCusto < dist.get(aresta.getDestino())){
                        dist.put(aresta.getDestino(), novoCusto);
                        prev.put(aresta.getDestino(), atual);
                        fila.add(aresta.getDestino());
                    }
                }
            }
            if(!dist.containsKey(cidadeDestino) || dist.get(cidadeDestino) == Double.POSITIVE_INFINITY){
                System.out.println("Não há rota disponível!");
                return;
            }

            List<String> rota = new ArrayList<>();
            for(String at = cidadeDestino; at != null; at = prev.get(at)){
                rota.add(at);
            }
            Collections.reverse(rota);
            System.out.println("Rota: " + String.join(" -> ", rota));
            System.out.print("Custo: R$ " + String.format("%.2f", dist.get(cidadeDestino)));
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    private static String getCidadePorCep(int cep, List<FaixaCEP> faixas) {
        for (FaixaCEP faixa : faixas) {
            if(faixa.contem(cep)) return faixa.getCidade();
        }
        return null;
    }
}