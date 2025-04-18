package Parte2;

public class Aresta {
    private String destino;
    private double custo;

    public Aresta(String destino, double custo) {
        this.destino = destino;
        this.custo = custo;
    }

    public String getDestino() {
        return destino;
    }

    public void setDestino(String destino) {
        this.destino = destino;
    }

    public double getCusto() {
        return custo;
    }

    public void setCusto(double custo) {
        this.custo = custo;
    }
}
