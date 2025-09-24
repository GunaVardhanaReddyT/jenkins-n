pipeline {
    agent any
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
                bat '''
                REM Remove old frontend folder if exists
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\blogsystem" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\blogsystem"
                )
                mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\blogsystem"

                REM Copy new frontend build
                xcopy /E /I /Y frontend\\dist\\* "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\blogsystem"
                '''
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
                bat '''
                REM Remove old backend WAR and folder
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\jenkins-back.war" (
                    del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\jenkins-back.war"
                )
                if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\jenkins-back" (
                    rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\jenkins-back"
                )

                REM Rename WAR to jenkins-back.war for proper context path
                copy "blogsystem\\target\\blogsystem.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\jenkins-back.war"
                '''
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
