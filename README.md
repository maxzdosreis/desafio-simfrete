# Desafio Técnico - Simfrete

## Descrição

Este projeto foi desenvolvido como solução para o **Desafio Técnico de Desenvolvedor Backend Jr da Simfrete**.

A aplicação lê um arquivo de entrada contendo:

- Faixas de CEP associadas a cidades
- Conexões entre cidades com seus respectivos custos
- Uma consulta de CEP origem e destino

Com base nessas informações, o sistema é capaz de:

1. Identificar a cidade correspondente a um CEP.
2. Calcular o **menor custo de transporte entre duas cidades** utilizando o algoritmo de **Dijkstra**.

---

# Tecnologias utilizadas

- **Node.js**
- **TypeScript**
- Estruturas de dados (`Map`)
- Algoritmo de grafos (**Dijkstra**)
- Manipulação de arquivos (`fs`)

---

# Estrutura do projeto
```
src/
├── models
│ ├── Aresta.ts
│ └── FaixaCep.ts
│
├── services
│ ├── CepService.ts
│ └── GrafoService.ts
│
├── utils
│ └── FileParser.ts
│
└── index.ts
```

### Descrição dos componentes

#### models

Representam as estruturas de dados utilizadas no sistema.

- `FaixaCep`: representa uma faixa de CEP associada a uma cidade
- `Aresta`: representa uma conexão entre duas cidades

---

#### services

Contêm a lógica principal da aplicação.

- `CepService`: responsável por identificar a cidade de um CEP
- `GrafoService`: responsável por calcular o menor caminho entre cidades utilizando o algoritmo de Dijkstra

---

#### utils

- `FileParser`: responsável por ler e interpretar o arquivo `input.txt`

---

#### index.ts

Ponto de entrada da aplicação. Responsável por:

- Ler o arquivo de entrada
- Identificar o tipo de operação
- Executar os serviços necessários
- Exibir o resultado no console

---

# Como executar o projeto

### 1 - Clone o projeto

```
git clone https://github.com/seu-usuario/desafio-simfrete.git
```

### 2 - Entre na pasta do projeto

```
cd desafio-simfrete
```

### 3 - Instale as dependências

```
npm install
```

### 4 - Compile o projeto

```
npm run build
```

### 5 - Execute o projeto

```
npm start
```

---

# Arquivo de Entrada (input.txt)

O programa utiliza um arquivo chamado input.txt na raiz do projeto.

## Windows (PowerShell)

```
New-Item input.txt
```

## Linux / Mac

```
touch input.txt
```

## Exemplos:

### Parte 1: Identificar cidade a partir do CEP
O arquivo de entrada deve conter:
- Linhas com cidade, CEP inicial, CEP final
- Uma linha com `--`
- Um CEP para consulta

```
E,20000000,20001000
H,30000125,30000375
T,90000500,90001500
R,80000125,80000375
M,60000000,60000500
N,60000125,60000375
L,50000125,50000375
S,90000000,90002000
P,70000500,70001500
B,00000500,00001500
Q,80000000,80000500
O,70000000,70002000
J,40000125,40000375
K,50000000,50000500
C,10000000,10002000
F,20000250,20000750
A,00000000,00002000
I,40000000,40000500
D,10000500,10001500
G,30000000,30000500
--
60000330
```

- Saída esperada:
O programa deve informar a qual cidade pertence o CEP informado.

### Parte 2: Menor custo entre cidades
O arquivo de entrada deve conter:
- Faixas de CEP
- Uma linha com `--`
- Conexões entre cidades com custo
- Uma linha com `--`
- CEP origem e CEP destino

```
K,50000000,50000500
A,00000000,00000500
L,50000125,50000375
Q,80000000,80000500
B,00000125,00000375
E,20000000,20000500
M,60000000,60000500
D,10000375,10001125
H,30000125,30000375
O,70000000,70001000
I,40000000,40001000
N,60000125,60000375
S,90000000,90001500
F,20000125,20000375
P,70000250,70000750
G,30000000,30000500
C,10000000,10001500
J,40000250,40000750
T,90000375,90001125
R,80000125,80000375
--
O,D,44.27
I,T,27.68
S,C,26.34
S,E,17.41
B,O,45.89
S,I,39.53
E,S,28.40
E,N,28.10
M,I,45.30
S,G,40.30
B,I,49.07
O,P,21.38
J,S,22.40
I,N,48.42
K,N,40.63
S,O,38.53
G,I,41.27
A,H,44.85
K,F,41.38
T,M,29.51
L,Q,43.44
B,R,30.36
I,E,46.10
H,T,27.77
I,P,16.24
R,L,45.11
T,J,48.42
G,J,43.37
D,M,15.38
O,R,30.39
M,B,29.43
D,G,30.46
A,C,38.98
K,B,48.46
F,N,15.53
Q,J,37.77
B,H,40.48
O,G,48.95
O,I,26.53
R,K,24.64
J,K,21.34
T,J,46.43
D,C,42.10
L,N,46.63
S,N,46.14
K,N,19.13
G,I,44.50
N,T,26.27
G,N,23.63
S,O,15.70
--
10001086,80000245
```

- Saída esperada:

O programa deve retornar:

- A rota de menor custo entre as cidades
- O custo total da rota

# Observações
- Caso um CEP não pertença a nenhuma faixa cadastrada, o programa informa que não foi encontrado.
- Caso não exista caminho entre as cidades, o programa informa que não existe rota possível.
- O grafo de cidades é tratado como bidirecional
- Caso não exista caminho entre as cidades, o sistema exibirá:

```
Não existe caminho entre as cidades.
```


# Autor

Desenvolvido por **Max dos Reis**

- GitHub: [@maxzdosreis](https://github.com/maxzdosreis)