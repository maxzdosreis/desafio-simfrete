package Parte1;

public class FaixaCEP {
    private String cidade;
    private int inicio;
    private int fim;

    public FaixaCEP(String cidade, int inicio, int fim) {
        this.cidade = cidade;
        this.inicio = inicio;
        this.fim = fim;
    }

    public String getCidade() {
        return cidade;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public int getInicio() {
        return inicio;
    }

    public void setInicio(int inicio) {
        this.inicio = inicio;
    }

    public int getFim() {
        return fim;
    }

    public void setFim(int fim) {
        this.fim = fim;
    }

    public boolean contem(int cep){
        return cep >= inicio && cep <= fim;
    }
}
