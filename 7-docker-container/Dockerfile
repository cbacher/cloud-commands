FROM openjdk:11
ARG JAR_FILE=target/*.jar
COPY ${JAR_FILE} db-demo.jar
ENTRYPOINT ["java","-jar","/db-demo.jar"]