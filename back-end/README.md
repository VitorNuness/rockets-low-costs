# Documentação do Sistema Rockets Low Costs - Backend (API)

## Dependências

Node v22.5.1^

Mongo DB [Instalação](https://www.mongodb.com/pt-br/docs/manual/administration/install-community/)

## Instalação

```bash
# clona do repositório
git clone https://github.com/VitorNuness/rockets-low-costs.git rockets

# acessa o diretório criado
cd rockets/back-end/

# instala as dependencias
npm i

# inicia servidor http://localhost:3001
npm run start
```

---

## Endpoints

### Login

**Rota:** `/login`

**Método:** `POST`

\***\*Descrição:\*\*** Autentica um usuário com base no nome fornecido.

**Request Body:**

```json
{
  "name": "string"
}
```

**Response:**
**200 OK:**

```json
{
  "_id": "string",
  "name": "string",
  "age": "age"
}
```

**404 NOT FOUND:** Nome não cadastrado.

---

### Registro

**Rota:** /register

**Método:** POST

\***\*Descrição:\*\*** Registra um novo usuário.

**Request Body:**

```json
{
  "name": "string",
  "password": "string"
}
```

**Response:**

**200 OK:**

```json
{
  "_id": "string",
  "name": "string",
  "age": "age"
}
```

**400 BAD REQUEST:** Erro ao registrar o usuário.

---

### Lançamentos

**Rota:** /:user/launches
**Métodos:** GET, POST, PUT

**Descrição:** Gerencia os lançamentos de um usuário.

**GET:**

**Descrição:** Obtém os lançamentos de um usuário.

**Response:** Retorna uma lista de lançamentos.

```json
[
  {
    "_id": "string",
    "rocket": {
      "name": "string",
      "engine": "string",
      "cost": "int",
      "image": "string",
      "status": "bool"
    },
    "mission": {
      "name": "string",
      "year": "string"
    },
    "profit": "int | null",
    "total": "double | null",
    "date": "string",
    "status": "boolean",
    "user": "string"
  }
]
```

**POST:**

**Descrição:** Cria um novo lançamento para o usuário.

**Request Body:**

```json
{
  "title": "string",
  "amount": "number"
}
```

**PUT:**

**Descrição:** Atualiza o lucro de um lançamento do usuário.

**Request Body:**

```json
{
  "launchId": "string",
  "profit": "number | null"
}
```

---

### Missões

**Rota:** /:user/missions

**Método: GET**

**Descrição:** Obtém as missões disponíveis para um usuário.

Consulte: [Documentação Space X](https://docs.spacexdata.com/#5fc4c846-c373-43df-a10a-e9faf80a8b0a)

---

## Conclusão

Esta documentação cobre a instalação do NestJS e os principais endpoints do sistema. Para mais detalhes sobre o NestJS, consulte a documentação oficial.
