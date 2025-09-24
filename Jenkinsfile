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
            if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\blogsystem" (
                rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\blogsystem"
            )
            mkdir "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\blogsystem"
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
            if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\jenkins-back.war" (
                del /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\jenkins-back.war"
            )
            if exist "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\jenkins-back" (
                rmdir /S /Q "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\jenkins-back"
            )
            copy "blogsystem\\target\\*.war" "C:\\Program Files\\Apache Software Foundation\\Tomcat 10.1\\webapps\\"
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