@echo off
if not exist "%~dp0.mvn\wrapper\maven-wrapper.jar" (
    echo Error: Maven Wrapper JAR not found.
    exit /b 1
)
java -Dmaven.multiModuleProjectDirectory=%~dp0 -cp %~dp0.mvn\wrapper\maven-wrapper.jar org.apache.maven.wrapper.MavenWrapperMain %*
