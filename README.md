# coinmates

A service for bill splitting with friends. A small project to refresh React & Spring.

![Screenshots](images/screenshots.png)

(click on the image to enlarge)

## Technologies

- Frontend:
  - React + React Router, React Hook Form, Zod
  - Bootstrap (without js)
  - Jest
  - Vite
  - TypeScript
- Backend:
  - Spring Framework + Web, Security, JPA, H2
  - Lombok, Mapstruct
  - JUnit
  - Gradle
  - Java

## Limitations / TODO

- Add remember me functionality
- Write more tests

## Running

You will need Java JDK 17, as well as Node.js 16 and npm.
In `/frontend`, install the dependencies by running `npm install`.

Then, in the respective directories, you can run the frontend with the command

```
npm run dev
```

and the backend with the command

```
./gradlew bootRun
```

The frontend is then available at `http://localhost:5173`.
