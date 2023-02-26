# nesty

## **Description**

A tool for easily configure NestJS/Prisma project based on yml file

## **Installation**

```bash
npm i -D @asaje/nesty
```

or

```bash
yarn add -D @asaje/nesty
```

## **Features**

## **How it works**

### **Create a NestJS project**

The first step is to create an empty NestJS project. You can follow the installation guide [here](https://docs.nestjs.com/first-steps).

### **Create the config file**

A this stage, create a **config.yml** file at the root of your project. You can call your config file whatever you want.

You can define in your configuration file five (5) configuration groups.

- **env**: for the configuration of environment variables
- **database**: for database configuation (only PostgresSQL databases are supported for the moment)
- **server**: for server configuration
- **enums**: list of all prisma schema enums
- **models**: list of all prisma schema models

An example of config file is

```yml
env:
  dev:
    key: 'xxxxxxxxx'
  default:
    key: 'xxxxxxxxx'

database:
  dev:
    user: postgres
    pass: root
    port: 5432
    name: foo
    host: localhost

  default:
    user: john
    pass: p455w0rd
    port: 5432
    name: todo
    host: my.domain.app

server:
  port: 4300
  prefix: 'api'
  doc:
    title: 'TODO API'
    description: 'The todo API description'
    version: '1.0'
    path:
      swagger: 'docs'
      redocs: 'redocs'
    auth:
      user: 'admin'
      pass: 'admin'

enums:
  todo-status:
    - CREATED
    - PENDING
    - COMPLETED

models:
  todo:
    id:
      type: string
      id: uuid
    label:
      type: string
      validations:
        isString:
        minLength: 3
        maxLength: 10
    duration:
      type: int
      validations:
        isInt:
        min: 1
        max: 10
    status:
      type: enum
      enum: TodoStatus
      validations:
        isEnum: TodoStatus
    author:
      type: ref
      model: Author

  author:
    id:
      type: string
      id: uuid
    name:
      type: string
```

## **In depth on the creation of the configuration file**

#### **env**

This is where you can specify all your env variables for your different environments.
The syntax is:

```yml
# config.yml
env:
    _env_name_1_:
        key1: value1
        ...
        keyn: valueN
    ...
    _env_name_N_:
        key1: value1
        ...
        keyn: valueN
```

If you have two environments **dev** and **prod** for example, your configuration file should look like this

```yml
# config.yml
env:
  dev:
    api_key: xxxxxxxxx
  prod:
    api_key: xxxxxxxxx
```

As result, two files will be generated: _**.env.dev**_ and _**.env.prod**_

_NB_: If you want to process **.env** without a specific environment suffix, you must use **default** as the environment name.

#### **database**

As for the **env** part, you can define database configurations for each of your working environments. The defaut environment is named **default**.

The availabale configurations are :

- **user**: database username, default set to _postgres_
- **pass**: database password, default set to _root_
- **port**: database port, default set to _5432_
- **name**: database name, default set to _test_
- **host**: database host, default set to _localhost_
