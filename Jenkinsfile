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
                    def dbUser = 'postgres' // Usuario de la base de datos
                    def dbPassword = 'Silvestre9+' // Contraseña de la base de datos
                    def dbUrl = 'localhost' // Host de la base de datos
                    def dbName = 'TingesoDB' // Nombre de la base de datos

                    // Ejecutar un comando SQL simple para verificar la conexión
                    bat """
                    set PGPASSWORD=${dbPassword}
                    psql -h ${dbUrl} -U ${dbUser} -d ${dbName} -c 'SELECT 1;'
                    unset PGPASSWORD
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


