pipeline {
    agent any
    tools {
        maven "maven"
        jdk "jdk-17"
    }
    stages {
        stage("Connect to Database") {
            steps {
                script {
                    // Ejecutar un comando de prueba para verificar la conexión
                    bat """
                    psql -h localhost -U postgres -d TingesoDB -c 'SELECT 1;'
                    """
                }
            }
        }
        stage("Build JAR File") {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Sof-1215/Lab1Tingeso']])
                dir("tingesoProyect") {
                    bat "mvn clean install"
                }
            }
        }
        stage("Test") {
            steps {
                dir("tingesoProyect") {
                    bat "mvn test"
                }
            }
        }
        stage("Build and Push Docker Image") {
            steps {
                dir("tingesoProyect") {
                    script {
                        withDockerRegistry(credentialsId: 'docker-credentials') {
                            bat "docker build -t sof1215/tingesoproyect ."
                            bat "docker push sof1215/tingesoproyect"
                        }
                    }
                }
            }
        }
        stage("Disconnect from Database") {
            steps {
                script {
                    // No es necesario cerrar la conexión al usar comandos directos
                    echo 'Conexión a la base de datos gestionada mediante comandos.'
                }
            }
        }
    }
}

