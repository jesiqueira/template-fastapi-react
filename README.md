# 🏨 Template Full-Stack: FastAPI & React (PostGIS Ready)

Este é um template profissional e seguro para o desenvolvimento de aplicações modernas, focado em **Separação de Responsabilidades (SRP)**, **Segurança (JWT)** e **Geoprocessamento (PostGIS)**.

## 🛠️ Tecnologias Utilizadas

*   **Backend:** Python 3.12 (FastAPI).
*   **Database:** PostgreSQL 16 + PostGIS (Image Alpine).
*   **Frontend:** React + Vite + TypeScript (Tailwind CSS).
*   **DevOps:** Docker & Docker Compose (Zero Vulnerabilities Strategy).
*   **Qualidade de Código:** Black (Python) e ESLint + Prettier (React).

## 🏗️ Estrutura do Projeto
```text
template-fastapi-react/
├── .env.example              # Exemplo de variáveis de ambiente (Segurança)
├── docker-compose.yml        # Orquestração (PostgreSQL/PostGIS + API + Front)
├── backend/
│   ├── app/
│   │   ├── api/v1/           # Rotas (SRP: Apenas recebe e responde)
│   │   ├── core/             # Config: Segurança (JWT), Logs e Env Vars
│   │   ├── db/               # Sessão do banco e Base Model
│   │   ├── models/           # Entidades SQLAlchemy (Singular/PostGIS)
│   │   ├── schemas/          # Pydantic (Segurança: Validação de entrada)
│   │   ├── crud/             # Operações atômicas de banco (SRP)[cite: 3]
│   │   └── services/         # Regras de negócio complexas (SRP)
│   ├── alembic/              # Migrations do banco
│   ├── main.py               # Ponto de entrada da aplicação
│   └── requirements.txt      # Dependências (FastAPI, SQLAlchemy, Alembic, Psycopg2)
└── frontend/
    ├── src/
    │   ├── api/            # Configuração do Axios e interceptors (Segurança)
    │   ├── components/     # Componentes reutilizáveis (Botões, Inputs, Cards)
    │   ├── contexts/       # Contextos globais (Autenticação, Tema)
    │   ├── hooks/          # Hooks personalizados (ex: useAuth, usePousada)
    │   ├── layouts/        # Estruturas de página (Sidebar, Navbar)
    │   ├── pages/          # Telas da aplicação (Login, Dashboard, Mapa)
    │   ├── routes/         # Definição das rotas e proteção de acesso
    │   └── types/          # Interfaces TypeScript (espelhando os Schemas do Back)
    ├── .env.example        # Exemplo: VITE_API_URL=http://localhost:8000/api/v1
    └── tailwind.config.js  # Configurações de estilo
```
## 1. Requisitos
*   **Docker** e **Docker Compose** instalados.
*   Ambiente Recomendado: **Debian / WSL 2**.

---

## 2. Configuração Inicial
Clone o repositório e configure as variáveis de ambiente necessárias para o projeto:

```bash
# Cria o arquivo .env a partir do modelo de exemplo
cp .env.example .env
```
## 3. Build e Execução
O processo de build utiliza o estágio development com atualização de patches de segurança via apk upgrade para garantir um ambiente estável e seguro.
```bash
# Build das imagens (puxando as versões mais recentes das bases)
docker-compose build --pull

# Subir os containers em modo background
docker-compose up -d
```
## 4. Acesso às Ferramentas

Após a inicialização, os serviços estarão disponíveis nos seguintes endereços:

| Serviço | Endereço |
| :--- | :--- |
| **Frontend (React)** | [http://localhost:5173](http://localhost:5173) |
| **API (Swagger UI)** | [http://localhost:8000/docs](http://localhost:8000/docs) |
| **pgAdmin** | [http://localhost:8080](http://localhost:8080) |

> **Nota para DBA:** Ao configurar o servidor no pgAdmin, utilize o host `database` (nome do serviço definido no Docker Compose) em vez de `localhost`.

---

## 🔐 Segurança e Padrões

*   **JWT (JSON Web Token):** Autenticação robusta implementada de ponta a ponta, utilizando `AuthContext` no frontend para gestão de estado e `OAuth2PasswordBearer` no backend para proteção de rotas.
*   **Docker Network:** Todos os serviços estão isolados na rede interna `app-network`. Isso garante que a comunicação entre o banco de dados e a API seja totalmente privada e invisível para redes externas.
*   **No Expose:** Seguindo o princípio de menor privilégio (Least Privilege), as portas não são expostas via `Dockerfile`. O mapeamento de portas é realizado estritamente conforme a necessidade através do arquivo `docker-compose.yml`.