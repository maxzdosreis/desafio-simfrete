package Parte1;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

//TIP To <b>Run</b> code, press <shortcut actionId="Run"/> or
// click the <icon src="AllIcons.Actions.Execute"/> icon in the gutter.
public class Main {
    public static void main(String[] args) throws IOException {
        List<FaixaCEP> faixas  = new ArrayList<>();
        try(BufferedReader bufferedReader = new BufferedReader(new FileReader("entrada1.txt"))){
            String linha;
            while((linha = bufferedReader.readLine()) != null && !linha.equals("--")){
                String[] partes = linha.split(",");
                faixas.add(new FaixaCEP(partes[0], Integer.parseInt(partes[1]), Integer.parseInt(partes[2])));
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
        }
    }
}