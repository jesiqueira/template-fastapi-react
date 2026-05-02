# Estágio de desenvolvimento usando Alpine para máxima segurança e leveza
FROM python:3.12-alpine AS development

# Segurança e Performance: Impede arquivos .pyc e garante logs em tempo real
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# 1. DEPENDÊNCIAS DE SISTEMA (Alpine)
# 'apk add' é o gerenciador do Alpine. 
# Adicionamos bibliotecas essenciais para compilar o driver do Postgres/PostGIS
RUN apk add --no-cache \
    postgresql-dev \
    gcc \
    python3-dev \
    musl-dev \
    curl

# 2. DEPENDÊNCIAS PYTHON
# Atualizamos o pip para evitar falhas de segurança conhecidas
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r requirements.txt

# 3. CÓDIGO FONTE
COPY . .

# Nota de Segurança: EXPOSE removido para evitar exposição desnecessária.
# O mapeamento será feito exclusivamente via docker-compose.yml.