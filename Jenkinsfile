pipeline {
    agent any
    tools {
        maven "maven"
        jdk "jdk-17"
    }
    environment {
        // Variables de entorno para la conexión a la base de datos
        DB_URL = 'jdbc:postgresql://localhost:5432/TingesoDB'
        DB_USER = postgres  // Usa las credenciales de Jenkins
        DB_PASSWORD = Silvestre9+
        DB_DRIVER = 'org.postgresql.Driver'
        // Variable para almacenar la conexión
        SQL_CONNECTION = ''
    }
    stages {
        stage("Build JAR File") {
            steps {
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Sof-1215/Lab1Tingeso']])
                dir("tingesoProyect") {
                    bat "mvn clean install"
                }
            }
        }
        stage("Database Connection Test") {
            steps {
                script {
                    // Intentar crear la conexión
                    try {
                        SQL_CONNECTION = groovy.sql.Sql.newInstance(DB_URL, DB_USER, DB_PASSWORD, DB_DRIVER)
                        echo 'Conexión a la base de datos establecida correctamente.'
                    } catch (Exception e) {
                        error "No se pudo establecer la conexión a la base de datos: ${e.message}"
                    }
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
    }
    post {
        always {
            script {
                // Cerrar la conexión
                if (SQL_CONNECTION) {
                    SQL_CONNECTION.close()
                    echo 'Conexión a la base de datos cerrada.'
                }
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
}

        }
    }
}

