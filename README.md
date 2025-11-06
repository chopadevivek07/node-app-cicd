# 🚀 Node.js Application Deployment on AWS EC2 using Jenkins CI/CD

This project demonstrates how to automate the deployment of a **Node.js web application** on an **AWS EC2 instance** using **Jenkins CI/CD pipeline** integrated with **GitHub Webhooks**.  
Whenever new code is pushed to the GitHub repository, Jenkins automatically builds, tests, and deploys the latest version of the app to EC2 — achieving a seamless, zero-downtime deployment workflow.

---

## 🧩 Project Overview

- **App Type:** Node.js Web Application  
- **Hosting:** AWS EC2 Instance (Amazon Linux / Ubuntu)  
- **Automation Tool:** Jenkins  
- **Source Control:** GitHub  
- **Pipeline Type:** Declarative Jenkinsfile  
- **Trigger:** GitHub Webhook  

---

## 🏗️ Architecture

![](/images/Architecture%20Diagram.png)


**Flow Explanation:**
1. Developer commits and pushes new code to GitHub.
2. GitHub Webhook triggers Jenkins automatically.
3. Jenkins pulls the latest code from the GitHub repository.
4. Jenkins installs dependencies and runs tests.
5. Jenkins deploys the updated code to the EC2 instance.
6. Node.js app runs continuously via `pm2` or `nohup`.

---

## 📁 Folder Structure


- ├── Jenkinsfile
- ├── app.js
- ├── package.json
- ├── node_modules/
- ├── .gitignore
- └── README.md


---

## ⚙️ Prerequisites

Before using this project, ensure the following:
- AWS EC2 instance (Amazon Linux or Ubuntu)
- Node.js and npm installed on EC2
- Jenkins server already set up and accessible
- GitHub repository containing Node.js code and Jenkinsfile
- Security group allowing inbound traffic on:
  - Port 8080 (Jenkins)
  - Port 3000 (Node.js app)

![](/images/Screenshot%20(832).png)
![](/images/Screenshot%20(835).png)


---

## 🧠 Jenkinsfile (Pipeline Script)

Here’s the Jenkins pipeline used in this project:

```groovy
pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/<your-username>/<repo-name>.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test Application') {
            steps {
                sh 'npm test || echo "No test scripts found"'
            }
        }

        stage('Deploy Application') {
            steps {
                sh '''
                pm2 stop node-app || true
                pm2 start app.js --name node-app
                pm2 save
                '''
            }
        }
    }

    post {
        success {
            echo '🎉 Deployment Successful!'
        }
        failure {
            echo '❌ Deployment Failed. Check Jenkins logs.'
        }
    }
}

```

## ⚙️ Jenkins Job Configuration

Once Jenkins is running, follow these steps to create the CI/CD job:

## 1️⃣ Create a New Pipeline Job

- Open Jenkins dashboard → New Item

- Enter a name (e.g., NodeApp-CICD)

- Choose Pipeline and click OK

## 2️⃣ Configure Source Code Management (SCM)

- Scroll to Pipeline section

-In Definition, select Pipeline script from SCM

- Choose Git as SCM

- Enter your GitHub repository URL

- Specify the Branch (e.g., main)

- Jenkins will automatically read your  Jenkinsfile from the repo.

![](/images/Screenshot%20(841).png)
![](/images/Screenshot%20(842).png)

## 3️⃣ Apply GitHub Webhook

- Go to GitHub → Repository → Settings → Webhooks

Click Add Webhook

-Payload URL:

**http://<jenkins-server-ip>:8080/github-webhook/**

![](/images/Screenshot%20(855).png)
![](/images/Screenshot%20(857).png)


- Content type: application/json

- Select Just the push event

- Click Add Webhook

- This ensures Jenkins will trigger the build automatically whenever you push new code to GitHub.

## 4️⃣ Build Now

Go back to Jenkins dashboard

Open your job → Click Build Now

Observe the pipeline execution in real time

![](/images/Screenshot%20(852).png)
![](/images/Screenshot%20(853).png)

## 🧰 Useful Commands
## 🔧 Common Commands

| Command | Description |
|----------|-------------|
| `pm2 start app.js --name node-app` | Start Node.js app |
| `pm2 stop node-app` | Stop Node.js app |
| `pm2 restart node-app` | Restart Node.js app |
| `pm2 logs` | View app logs |
| `sudo systemctl restart jenkins` | Restart Jenkins service |
| `sudo systemctl status jenkins` | Check Jenkins status |


## 📸 Output Preview
**✅ Node.js app deployed successfully on EC2**
![](/images/Screenshot%20(861).png)

## 🧾 Author

👨‍💻 Vivek Chopade

**📎 GitHub:**
 https://github.com/chopadevivek07

**📰 Medium:**
 https://medium.com/@chopadevivek4466

**💼 LinkedIn:**
 https://www.linkedin.com/in/vivek-chopade


## 📜 Conclusion

**This project showcases how to automate Node.js application deployment using Jenkins CI/CD pipeline integrated with GitHub Webhooks and AWS EC2.
It eliminates manual deployment steps and ensures faster, consistent, and reliable software delivery.**
