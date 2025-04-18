# 📦 Desafio de Programação - Identificação de Cidade por CEP e Cálculo de Rota

Este repositório contém a solução de um desafio de programação dividido em duas partes:

- **Parte 1**: Identificar a cidade correspondente a um determinado CEP com base em faixas.
- **Parte 2**: Calcular a rota de menor custo entre duas cidades, identificadas por CEPs, utilizando grafos ponderados.

---

## 📁 Estrutura do Projeto

```plaintext
DesafioSimFrete/
├── src/
│   ├── Parte1/
│   │   ├── FaixaCEP.java
│   │   └── Main.java
│   │
│   └── Parte2/
│       ├── Aresta.java
│       ├── FaixaCEP.java
│       └── Main.java
│
├── entrada1.txt
├── entrada2.txt
└── README.md
```

## 🚀 Como Executar

### 🔧 Pré-requisitos:

- Java 17 ou superior instalado 
- IDE como IntelliJ, NetBeans, VS Code ou terminal com javac e java

### Executar Parte 1:
1. Acesse o diretório Parte1
2. Certifique-se de que o arquivo entrada1.txt está presente na raiz do projeto
3. Compile e execute com:
```plaintext
javac src/Parte1/Main.java -d bin
java -cp bin Parte1.Main
```

### Executar Parte 2:
1. Acesse o diretório Parte2
2. Certifique-se de que o arquivo entrada2.txt está presente na raiz do projeto
3. Compile e execute com:
```plaintext
javac src/Parte2/Main.java -d bin
java -cp bin Parte2.Main
```

### 🧪 Parte 1 - Cidade por CEP
##### 📄 Formato de Entrada (entrada1.txt)
```plaintext
CidadeA,10000000,10009999
CidadeB,20000000,20009999
--
10005000
```

##### 💡 Saída Esperada
```plaintext
CidadeA
```

### 🧪 Parte 2 - Rota de Menor Custo
##### 📄 Formato de Entrada (entrada2.txt)
```plaintext
CidadeX,10000000,10005000
CidadeY,20000000,20005000
CidadeZ,30000000,30005000
--
CidadeX,CidadeY,10.5
CidadeY,CidadeZ,5.25
--
10001000,30002000
```

##### 💡 Saída Esperada
```plaintext
Rota: CidadeX -> CidadeY -> CidadeZ
Custo total: 15.75
```

### ✅ Funcionalidades Implementadas
- 📥 Leitura de arquivos de entrada 
- 🔍 Mapeamento de CEP para cidade com base em faixas 
- 📊 Construção de grafo ponderado e não-direcionado 
- 📈 Algoritmo de Dijkstra para menor caminho 
- 🧾 Impressão da rota e custo total formatado