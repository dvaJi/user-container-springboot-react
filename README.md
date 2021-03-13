# App users list

This example app shows how to create a Spring Boot API and CRUD (create, read, update, and delete) its data with a React app.

## Getting Started

### Start app using docker compose

Run the following command:

```
docker-compose up
```

Navigate to [http://localhost:3000/](http://localhost:3000/)

### Without docker

#### Configure Database

Create a Postgresql database.

#### API

At `/api` directory, open `src/main/resources/application.properties`
Modify based these values based on the previous datababase created previously.

```
spring.datasource.url= jdbc:postgresql://localhost:5432/testdb
spring.datasource.username=postgres
spring.datasource.password=123
```

Then run the following commands:

```
mvn spring-boot:run
```

#### WEB

At `/web` directory, run the following commands:

```
npm install
npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/)

## Links

This example uses the following open source libraries:

- [React](https://reactjs.org/)
- [Antd](https://ant.design/docs/react/introduce)
- [Spring Boot](https://spring.io/projects/spring-boot)
- [Spring Security](https://spring.io/projects/spring-security)
