pipeline{
    agent any
    tools{
        maven "maven"

    }
    stages{
        stage("Build JAR File"){
            steps{
                checkout scmGit(branches: [[name: '*/main']], extensions: [], userRemoteConfigs: [[url: 'https://github.com/Sof-1215/Lab1Tingeso']])
                dir("tingesoProyect"){
                    sh "mvn clean install"
                }
            }
        }
        stage("Test"){
            steps{
                dir("tingesoProyect"){
                    sh "mvn test"
                }
            }
        }        
        stage("Build and Push Docker Image"){
            steps{
                dir("tingesoProyect"){
                    script{
                         withDockerRegistry(credentialsId: 'docker-credentials'){
                            sh "docker build -t sof1215/tingesoproyect ."
                            sh "docker push sof1215/tingesoproyect"
                        }
                    }                    
                }
            }
        }
    }
}
