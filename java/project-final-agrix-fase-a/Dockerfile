FROM maven:3-openjdk-17 as build-image
WORKDIR /to-build-app
COPY . .
RUN mvn install
RUN mvn dependency:go-offline
RUN mvn package -DskipTests
FROM eclipse-temurin:17-jdk-jammy
WORKDIR /app
COPY --from=build-image /to-build-app/target/*.jar .
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/app.jar"]