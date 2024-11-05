pipeline {
    agent any
    tools {
        maven "maven"
        jdk "jdk-17"
    }
    environment {
        // Variables de entorno para la conexión a la base de datos
        DB_URL = 'jdbc:postgresql://localhost:5432/TingesoDB'
        DB_DRIVER = 'org.postgresql.Driver'
    }
    stages {
        stage("Connect to Database") {
            steps {
                script {
                    // Asignación directa de usuario y contraseña
                    def dbUser = 'postgres'
                    def dbPassword = 'Silvestre9+' // Usar con precaución
                    
                    // Intentar crear la conexión
                    try {
                        sql = groovy.sql.Sql.newInstance(DB_URL, dbUser, dbPassword, DB_DRIVER)
                        echo 'Conexión a la base de datos establecida correctamente.'
                    } catch (Exception e) {
                        error "No se pudo establecer la conexión a la base de datos: ${e.message}"
                    }
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
                    // Cerrar la conexión si fue creada
                    if (sql) {
                        sql.close()
                        echo 'Conexión a la base de datos cerrada.'
                    }
                }
            }
        }
    }
}
