package Parte1;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class Main {
    public static void main(String[] args){
        List<FaixaCEP> faixas  = new ArrayList<>();
        try(BufferedReader bufferedReader = new BufferedReader(new FileReader("src/entrada1.txt"))){
            String linha;
            while((linha = bufferedReader.readLine()) != null && !linha.equals("--")){
                String[] partes = linha.split(",");
                String nome = partes[0];
                int inicio = Integer.parseInt(partes[1]);
                int fim = Integer.parseInt(partes[2]);
                faixas.add(new FaixaCEP(nome, inicio, fim));
            }
            String cepBusca = bufferedReader.readLine();
            int cep = Integer.parseInt(cepBusca);
            for (FaixaCEP faixa : faixas){
                if (faixa.contem(cep)){
                    System.out.println(faixa.getCidade());
                    return;
                }
            }
            System.out.println("Cep não encontrado");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
}