FROM maven:3.6.1-jdk-8-alpine AS MAVEN_BUILD
COPY ./ ./
RUN mvn clean package -Dmaven.test.skip=true

FROM openjdk:8-jre-alpine
COPY --from=MAVEN_BUILD /target/simplecrud-0.0.1-SNAPSHOT.jar /app.jar

EXPOSE 8080
CMD ["java", "-jar", "/app.jar"]