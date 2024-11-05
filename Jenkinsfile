pipeline {
    agent any
    tools {
        maven "maven"
        jdk "jdk-17"
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
        stage("Test") {
            steps {
                dir("tingesoProyect") {
                    bat "mvn test"
                }
            }
        }        
        stage("Database Operation") {
            steps {
                script {
                    // Configuración de la conexión a la base de datos
                    def dbUrl = 'jdbc:postgresql://localhost:5432/TingesoDB'
                    def dbUser = 'postgres'
                    def dbPassword = 'Silvestre9+'
                    def driver = 'org.postgresql.Driver'
                    
                    // Cargar el driver JDBC
                    @Grab(group='org.postgresql', module='postgresql', version='42.3.1') // Ajusta la versión según sea necesario
                    import groovy.sql.Sql
                    
                    // Crear la conexión
                    def sql = Sql.newInstance(dbUrl, dbUser, dbPassword, driver)
                    
                    // Realizar una consulta
                    sql.eachRow('SELECT * FROM users') { row ->
                        echo "Fila: ${row}"
                    }
                    
                    // Cerrar la conexión
                    sql.close()
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
