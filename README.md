## README

### Instruções de Uso

Para rodar este projeto, siga estas etapas:

1. **Configuração do Banco de Dados PostgreSQL:**
    - Certifique-se de ter o Docker instalado em sua máquina.
    - Execute o seguinte comando para iniciar um contêiner PostgreSQL:
        ```bash
        docker-compose up -d
        ```
    - Isso iniciará um contêiner PostgreSQL usando as configurações especificadas no arquivo `docker-compose.yml`. O banco de dados estará disponível na porta 5435.

2. **Instalação das Dependências e Execução do Projeto:**
    - Certifique-se de ter o Node.js e o npm instalados em sua máquina.
    - Clone este repositório e navegue até o diretório do projeto.
    - Renomeie o arquivo `.env.example` para `.env` e configure as variáveis de ambiente, se necessário.
    - Execute o seguinte comando para instalar as dependências:
        ```bash
        npm install
        ```
    - Execute o seguinte comando para compilar o projeto:
        ```bash
        npm run build
        ```
    - Por fim, execute o projeto com o seguinte comando:
        ```bash
        npm run start:prod
        ```
    - O projeto estará disponível em `http://localhost:3001`.

### Informações sobre Ferramentas

As ferramentas utilizadas neste projeto incluem:

- **Nest.js**: Framework para construção de aplicativos Node.js escaláveis.
- **TypeScript**: Superset tipado de JavaScript utilizado para escrever o código do projeto.
- **TypeORM**: ORM (Object-Relational Mapping) utilizado para mapear objetos JavaScript para relações de banco de dados.
- **Swagger**: Ferramenta para documentação de APIs RESTful.
- **Docker**: Utilizado para criar e gerenciar contêineres de aplicativos e banco de dados.
- **Redis**: Banco de dados em memória utilizado para caching e armazenamento de sessão.
- **PostgreSQL**: Banco de dados relacional utilizado para armazenar dados do aplicativo.

### Links Úteis

- **Documentação**: [[Swagger](http://localhost:3001/api#/)]
- **Repositório do GitHub**: [Inserir link para o repositório do GitHub]
- **Aplicação em Produção**: [Inserir link para a aplicação em produção, se aplicável]

Para mais detalhes sobre como configurar e executar o projeto, consulte a seção de instruções de uso acima.