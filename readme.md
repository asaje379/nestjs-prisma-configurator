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

## **Getting started**

```bash
# Step 1: Create a new nestjs project
nest g new my-project

cd my-project
```

You can follow the nestjs first steps guide [here](https://docs.nestjs.com/first-steps).

```bash
# Step 2: Install nesty as dependency
npm i -D @asaje/nesty
```

```bash
# Step 3: create your config.yml file
touch config.yml

# Write your configs
```

```bash
# Step 4: Use nesty to initialise your project
npx nesty config.yml init
```

```bash
# Step 5: Execute migrations and start your dev server
npm run migrate
npm run dev
```

## **Features (available commands)**

**init**  
Initialize a new empty project

```bash
# Eg:
npx nesty config.yml init
```

**update**  
Use this command when your project is already configured and you want to make some updates

```bash
# Eg:
npx nesty config.yml update
```

**gen:prisma**  
Use this command to only generate the prisma configs

```bash
# Eg:
npx nesty config.yml gen:prisma
```

**gen:target**  
Use this command to only generate the config of a specific model or enum

```bash
# Eg:
npx nesty config.yml gen:target my-target
```

**gen:db**  
Use this command to only generate the database configs

```bash
# Eg:
npx nesty config.yml gen:db
```

**gen:env**  
Use this command to only generate the env configs

```bash
# Eg:
npx nesty config.yml gen:env
```

**gen:sdk**

Each time your project is built (the development server is started for example), a file named **api.json** is generated at the root of your project, this file is used to generate the equivalent sdk of your project.

```bash
# Eg:
npx nesty api.json gen:sdk
```

## **Write your config file**

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

#### **env**

This is where you can specify all your env variables for your different environments.
The syntax is:

```yml
# config.yml
env:
    env_name_1:
        key1: value1
        ...
        keyn: valueN
    ...
    env_name_N:
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

The available configurations are :

- **user**: database username, default set to _postgres_
- **pass**: database password, default set to _root_
- **port**: database port, default set to _5432_
- **name**: database name, default set to _test_
- **host**: database host, default set to _localhost_

#### **server**

The available configurations are:

- **port**: the server port
- **prefix**: the global api prefix, defautl set to _api_
- **doc**: swagger and redocs configs

The available configurations for **doc** are:

- **title**: the documentation page title
- **description**: the documentation page description
- **version**: the API version
- **path**: the base paths for the documentation page. **path.swagger** defines the swagger path and **path.redocs** the redocs path
- **auth**: the redocs page credentials. **auth.user** defines the username and **auth.pass** the password

#### **enums**

This is where you can specify all you enums.

The syntax is:

```yml
# config.yml
enums:
    enum_name_1:
      - value1
      - ...
      - valueN
    ...
    enum_name_N:
      - value1
      - ...
      - valueN
```

#### **models**

This is where you can specify all you models.

The syntax is:

```yml
# config.yml
models:
    model_name_1:
      column_name_1:
        attr_1: value1
        ...
        attr_N: valueN
      ...
      column_name_N:
        attr_1: value1
        ...
        attr_N: valueN
    ...
    model_name_N:
      column_name_1:
        attr_1: value1
        ...
        attr_N: valueN
      ...
      column_name_N:
        attr_1: value1
        ...
        attr_N: valueN
```

Available **attributes** are :

| Attribute   | Possible values                            |
| ----------- | ------------------------------------------ |
| id          | increment, uuid, cuid                      |
| type        | string, int, float, bool, ref, enum, date  |
| unique      | true, false                                |
| required    | true, false                                |
| default     | _the default value_                        |
| enum        | _the referenced enum_                      |
| model       | _the referenced model_                     |
| validations | _one of available validations_             |

The available **validations** are:

- min
- max
- minLength
- maxLength
- isInt
- isDate
- isEmail
- isString
- contains
- isEmpty
- isNotEmpty
- isDefined
- isOptional
- equals
- notEquals
- isIn
- isNotIn
- isBoolean
- isNumber
- isArray
- isEnum
- isPositive
- isNegative
- minDate
- maxDate
- isBooleanString
- isDateString
- notContains
- isAplha
- isAlphanumeric
- isDecimal
