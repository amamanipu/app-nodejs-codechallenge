# PROYECTO APP-NODEJS-KAFKA-TS

El proyecto ha sido desarrollado con NodeJS, Koa y Kafka. Utilizando el lenguaje de programación Typescript.

1. anti-fraud: Valida si el valor de la transación si es aprobado o rechazado.
2. transaction: Obtiene la transacción, registra la transacción y actualiza el estado de la transacción.

Seguir los siguientes pasos para usar el proyecto.

### Descargar e instalar versión de nodejs >= 20.x.x
- ```https://nodejs.org/en/download```

### Clonar el repositorio app-nodejs-kafka-ts
- Ejecutar el comando: ```git clone https://github.com/amamanipu/app-nodejs-kafka-ts.git```

### Descargar dependencias y ejecutar microservicio anti-fraud en local
- Ubicarnos en microservicio: ```cd anti-fraud```
- Descargar dependencias: ```npm install```
- Ejecutar microservicio: `npm run dev`

### Descargar dependencias y ejecutar microservicio transaction en local
- Ubicarnos en microservicio: ```cd transaction```
- Descargar dependencias: ```npm install```
- Ejecutar microservicio: ```npm run dev```

### Ejecutar pruebas unitarias en cada microservicio
- Ejecutar el comando: ```npm run test```

### Estructura del Proyecto
 La carpeta contiene:

- `anti-fraud` - Contiene codigo de validar de transacción.
- `transaction` - Contiene codigo de obtener, registrar y actualizar transacción. 

```
.
├── anti-fraud
│   ├── src        
│   │   ├── common
│   │   │   └── constants.ts
│   │   ├── infrastructure
│   │   │   └── kafka
│   │   │       ├── consumers
│   │   │       │   └── transaction.consumer.ts
│   │   │       └── producers
│   │   │           └── transactionStatus.producer.ts
│   │   └── main.ts
│   ├── package.json
│   └── tsconfig.json
│
├── transaction
│   ├── src     
│   │   ├── application
│   │   │   └── services 
│   │   │       └── transaction.service.ts  
│   │   ├── common
│   │   │   └── constants.ts
│   │   ├── domain
│   │   │   └── repositories 
│   │   │       └── transaction.repository.ts  
│   │   ├── infrastructure
│   │   │   ├── graphql
│   │   │   │   ├── transaction
│   │   │   │   │   ├── transaction.resolver.ts
│   │   │   │   │   └── transaction.schema.ts
│   │   │   │   └── schema.ts
│   │   │   ├── kafka
│   │   │   │   ├── consumers
│   │   │   │   │   └── transactionStatus.consumer.ts
│   │   │   │   └── producers
│   │   │   │       └── transaction.producer.ts
│   │   │   └── orm
│   │   │       └── sequelize
│   │   │           └── postgresql
│   │   │               ├── models
│   │   │               │   ├── transaction.model.ts
│   │   │               │   ├── transactionStatus.model.ts
│   │   │               │   └── transactionType.model.ts
│   │   │               ├── repositories
│   │   │               │   └── transaction.repository.ts
│   │   │               └── connection.ts
│   │   ├── container.ts
│   │   └── main.ts
│   ├── test   
│   ├── package.json
│   └── tsconfig.json
│
└── README.md
```

### Uso de Graphql

- URI: ```http://localhost:3000/graphql```

```graphql
query {
    transaction(transactionExternalId: "2a6d5b76-cf85-406a-9c62-877cfe3e36fc") {
        transactionExternalId,
        transactionType {
            name
        },
        transactionStatus {
            name
        },
        value,
        createdAt
    }
}
```

```graphql
mutation {
  createTransaction(
    TransactionInput: {
      accountExternalIdDebit: "d6eb621f-6dd0-4cdc-93f5-07f51b249b51",
      accountExternalIdCredit: "d6eb621f-6dd0-4cdc-93f5-07f51b249b51",
      tranferTypeId: 1,
      value: 750
    }
  ) {
    transactionExternalId
  }
}
```
