# quarkus-fullstack project

This project uses Quarkus, the Supersonic Subatomic Java Framework & VUE 3 for frontend.

If you want to learn more about Quarkus, please visit its website: https://quarkus.io/ .
More information on VUE is on website: https://github.com/vuejs/vue-next .

## Running the application in dev mode

To start development you need Postgress running. You can start it using docker:

```bash
docker-compose up -d db
```

VUE build included thanks to - https://quarkify.net/build-run-and-deploy-vuejs-app-with-quarkus/

You should start project in two separate consoles. Backend:

```bash
./mvnw quarkus:dev
```

and frontend:

```bash
cd webapp
npm run dev
```

## Packaging and running the application

The application can be packaged using `./mvnw package`.
It produces the `quarkus-fullstack-1.0.0-SNAPSHOT-runner.jar` file in the `/target` directory.
Be aware that it’s not an _über-jar_ as the dependencies are copied into the `target/lib` directory.

The application is now runnable using `java -jar target/quarkus-fullstack-1.0.0-SNAPSHOT-runner.jar`.

## Creating a native executable

You can create a native executable using: `./mvnw package -Pnative`.

Or, if you don't have GraalVM installed, you can run the native executable build in a container using: `./mvnw package -Pnative -Dquarkus.native.container-build=true`.

You can then execute your native executable with: `./target/quarkus-fullstack-1.0.0-SNAPSHOT-runner`

If you want to learn more about building native executables, please consult https://quarkus.io/guides/building-native-image.

## Creating docker image

Docker image could be build by using:

```bash
./mvnw clean package
docker build -f src/main/docker/Dockerfile.jvm -t quarkus-fullstack .
```