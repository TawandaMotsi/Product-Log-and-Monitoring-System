# Use an official OpenJDK runtime as a parent image
FROM eclipse-temurin:21-jdk-jammy AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven wrapper and pom.xml first to leverage Docker cache
COPY .mvn .mvn
COPY mvnw pom.xml ./

# Download dependencies first (this step is cached unless pom.xml changes)
RUN ./mvnw dependency:go-offline

# Now copy the rest of the source code
COPY src ./src

# Package the application
RUN ./mvnw clean package -DskipTests

# Use a smaller base image for the final container
FROM eclipse-temurin:21-jre-jammy

# Set the working directory in the new image
WORKDIR /app

# Copy the jar file from the builder stage
COPY --from=builder /app/target/*.jar app.jar

# Expose port (change this if your app uses a different port)
EXPOSE 8080

# Command to run the app
ENTRYPOINT ["java", "-jar", "app.jar"]
