pipeline {
    agent any

    environment {
        TOMCAT_HOME = "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1"
        BACKEND_WAR_NAME = "jenkins-back.war"
        FRONTEND_APP_NAME = "blogsystem"
    }

    stages {

        // ===== FRONTEND BUILD =====
        stage('Build Frontend') {
            steps {
                dir('frontend') {
                    bat 'npm install'
                    bat 'npm run build'
                }
            }
        }

        // ===== FRONTEND DEPLOY =====
        stage('Deploy Frontend to Tomcat') {
            steps {
                bat """
                REM Remove old frontend folder if exists
                if exist "%TOMCAT_HOME%\\webapps\\%FRONTEND_APP_NAME%" (
                    rmdir /S /Q "%TOMCAT_HOME%\\webapps\\%FRONTEND_APP_NAME%"
                )
                REM Create frontend folder
                mkdir "%TOMCAT_HOME%\\webapps\\%FRONTEND_APP_NAME%"
                REM Copy new build
                xcopy /E /I /Y frontend\\dist\\* "%TOMCAT_HOME%\\webapps\\%FRONTEND_APP_NAME%"
                """
            }
        }

        // ===== BACKEND BUILD =====
        stage('Build Backend') {
            steps {
                dir('blogsystem') {
                    bat 'mvn clean package'
                }
            }
        }

        // ===== BACKEND DEPLOY =====
        stage('Deploy Backend to Tomcat') {
            steps {
                bat """
                REM Remove old backend WAR and exploded folder
                if exist "%TOMCAT_HOME%\\webapps\\%BACKEND_WAR_NAME%" (
                    del /Q "%TOMCAT_HOME%\\webapps\\%BACKEND_WAR_NAME%"
                )
                if exist "%TOMCAT_HOME%\\webapps\\jenkins-back" (
                    rmdir /S /Q "%TOMCAT_HOME%\\webapps\\jenkins-back"
                )
                REM Copy new WAR with correct name
                copy "blogsystem\\target\\jenkins-back.war" "%TOMCAT_HOME%\\webapps\\%BACKEND_WAR_NAME%"
                """
            }
        }
    }

    post {
        success {
            echo 'Deployment Successful!'
        }
        failure {
            echo 'Pipeline Failed.'
        }
    }
}
