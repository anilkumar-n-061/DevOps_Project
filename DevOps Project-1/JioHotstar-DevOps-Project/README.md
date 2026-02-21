# Jio-Hotstar DevOps: End-to-End Automated Streaming Platform Deployment

# 🌟 Introduction

The Jio-Hotstar DevOps Project is a comprehensive, production-ready implementation of a modern DevSecOps pipeline. Inspired by the high-concurrency architecture of world-class streaming platforms like JioCinema and Disney+ Hotstar, this project demonstrates how to deploy a scalable React-based application onto Amazon EKS (Elastic Kubernetes Service) with a heavy emphasis on security and automation.

In today's fast-paced software environment, simply "deploying" is not enough. This project bridges the gap between development and operations by integrating a "Security-First" approach (DevSecOps). It automates the entire lifecycle—from infrastructure provisioning with Terraform to continuous monitoring with Prometheus and Grafana.

# 🏗️ Technical Architecture & Workflow
The architecture of this project follows a "Shift-Left" security approach, where security is integrated at every stage of the software development lifecycle (SDLC) rather than being an afterthought.

## The 7-Stage Workflow:
### 1. Infrastructure as Code (IaC):

a. Using Terraform, we provision the underlying AWS infrastructure, including a VPC, an EC2 instance for Jenkins, and the Amazon EKS Cluster. This ensures the environment is reproducible and version-controlled.

### 2. Continuous Integration (CI):

a. Jenkins triggers the pipeline upon a code push.

b. SonarQube performs Static Application Security Testing (SAST) to identify code smells and bugs.

c. OWASP Dependency-Check scans the project's libraries for known vulnerabilities (CVEs).

### 3. Container Management:

a. The application is containerized using Docker.

b. Trivy scans the Docker image for OS-level vulnerabilities before it is pushed to the registry (Docker Hub/ECR).

### 4. Continuous Delivery (CD) via GitOps:

a. Instead of Jenkins pushing directly to Kubernetes, we use ArgoCD.

b. ArgoCD monitors the Git repository for changes in the Kubernetes manifests and automatically "syncs" the state to the EKS Cluster. This prevents "configuration drift."

### 5. Traffic Management:

a. An AWS Load Balancer handles incoming user traffic, distributing it across the pods running in the EKS cluster to ensure high availability.

### 6. Observability & Monitoring:

a. Prometheus collects real-time metrics from the EKS nodes and containers.

b. Grafana visualizes these metrics in a dashboard, allowing us to monitor CPU/Memory usage and application health.

#### 7. Notification System:

a. The pipeline sends real-time status updates to Slack/Email to notify the team of successful deployments or build failures.


## Complete architecture - cicd-project

![Untitled (7)](https://github.com/user-attachments/assets/7b5442a1-1ee9-4492-807e-c660c3698731)

## Step1: Admin Server Installation via VSCode & Terraform 

```
provider "aws" {
    region = "us-east-1"
    access_key = "xxx"
    secret_key = "xx"
}

resource "aws_instance" "admin" {
    ami = "ami-04b4f1a9cf54c11d0"
    instance_type = "t2.medium"
    security_groups = [ "default" ]
    key_name = "project"
    root_block_device {
      volume_size = 30
      volume_type = "gp2"
      delete_on_termination = true
    }
    tags = {
      Name = "Admin-server"
    }

}

output "PublicIP" {
    value =  aws_instance.admin.public_ip
}

```

## terraform commands:

```
terraform init
```

```
terraform plan
```

```
terraform apply
```

```
terraform destroy
```

## Step2: Installing the jenkins:

ref: https://www.jenkins.io/doc/book/installing/linux/#debianubuntu

```
sudo apt update
sudo apt install fontconfig openjdk-21-jre -y
java -version

sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install jenkins -y
```
```
sh jenkins.sh
```

## To verify the jenkins status

```
systemctl enable jenkins
systemctl start jenkins
systemctl status jenkins

```

## Step3: Docker Installation

```
sudo apt update
sudo apt install ca-certificates curl gnupg -y
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt update
apt-cache policy docker-ce
sudo apt install docker-ce -y
sudo systemctl status docker
```

## Step4: Terraform Installation 

```
sudo apt-get update && sudo apt-get install -y gnupg software-properties-common
wget -O- https://apt.releases.hashicorp.com/gpg | \
gpg --dearmor | \
sudo tee /usr/share/keyrings/hashicorp-archive-keyring.gpg > /dev/null
gpg --no-default-keyring \
--keyring /usr/share/keyrings/hashicorp-archive-keyring.gpg \
--fingerprint
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(grep -oP '(?<=UBUNTU_CODENAME=).*' /etc/os-release || lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update
sudo apt-get install terraform -y
```

## Step5: Setup Kubernetes on Amazon EKS

#### Pre-requisites: 
- an EC2 Instance 
  - Install AWSCLI latest verison
    ```
    apt install unzip -y
    curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
    unzip awscliv2.zip
    sudo ./aws/install
    ```
  - configure the aws 
    ```commandline
    root@ip-172-31-22-54:~# aws configure
    AWS Access Key ID [None]: xxx
    AWS Secret Access Key [None]: xx
    Default region name [None]: us-east-1
    Default output format [None]: json
    ```
    
1. Setup kubectl   
   a. Download kubectl version latest.
   b. Grant execution permissions to kubectl executable   
   c. Move kubectl onto /usr/local/bin   
   d. Test that your kubectl installation was successful    

   ```sh 
   curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
   chmod +x ./kubectl
   mv ./kubectl /usr/local/bin 
   kubectl version --client
   ```

## AWSCLI

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```
## KUBECTL

```bash
curl -O https://s3.us-west-2.amazonaws.com/amazon-eks/1.29.3/2024-04-19/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /usr/local/bin
kubectl version --client
```

## EKSCTL

```bash
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```


## Step6: * Create Service account/ROLE/BIND-ROLE/Token

## Create Service Account, Role & Assign that role, and create a secret for Service Account and genrate a Token

### Creating Service Account


```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: jenkins
  namespace: microdegree
```

### Create Role 


```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: app-role
  namespace: microdegree
rules:
  - apiGroups:
        - ""
        - apps
        - autoscaling
        - batch
        - extensions
        - policy
        - rbac.authorization.k8s.io
    resources:
      - pods
      - secrets
      - componentstatuses
      - configmaps
      - daemonsets
      - deployments
      - events
      - endpoints
      - horizontalpodautoscalers
      - ingress
      - jobs
      - limitranges
      - namespaces
      - nodes
      - pods
      - persistentvolumes
      - persistentvolumeclaims
      - resourcequotas
      - replicasets
      - replicationcontrollers
      - serviceaccounts
      - services
    verbs: ["get", "list", "watch", "create", "update", "patch", "delete"]
```

### Bind the role to service account


```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-rolebinding
  namespace: microdegree 
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: app-role 
subjects:
- namespace: microdegree 
  kind: ServiceAccount
  name: jenkins 
```

### Generate token using service account in the namespace

[Create Token]

```token.yml
apiVersion: v1
kind: Secret
metadata:
  name: mysecretname
  namespace: microdegree
  annotations:
    kubernetes.io/service-account.name: jenkins
type: kubernetes.io/service-account-token
```


## Step7: Add Tools for Java & NodejS

<img width="1652" height="661" alt="image" src="https://github.com/user-attachments/assets/0228e334-6dea-4005-96c7-5d74008b22eb" />

<img width="1483" height="773" alt="nodejs" src="https://github.com/user-attachments/assets/9a9ce220-9559-4032-a4b6-1a8baba8ce23" />


## Step8: Configure Email Setup 
```
E-mail Notification

1) gmail setup
 Obtain application specific password
• sing-in to gmail account >> navigate to settings >> privacy and security settings
• setup two step verification settings (because without two step verification we cannot generate application specific password)
• after setting up two step verification setting in gmail account navigate back to security and privacy settings
• click on application specific password >> give the name of the application in the drop down as Jenkins (google by default does not have any specific application password setting for Jenkins) >> this will generate password note down the password generated
Note : Since the Password has a overall control over you gmail account disclosing it may lead serious consequences
2. Setup SMTP configuration for sending the gmail
• navigate in the following path from dashboard after logging in manage Jenkins >> configure system >> scroll down to email notification section
• enter the following parameters
• smtp server : smtp.gmail.com
• default user email suffix : @gmail.com
• select advanced
• check smtp authentication
• username : (Your gmail id)
• password : (application specific password generated from previous step)
• check use SSL
• SMTP port : 465
• Reply to address : noreply@gmail.com(optional)
• Charset : UTF-8 (by default it is UTF-8)
• select Test configuration mail
• Test e-mail recipient : <enter recipient email id >
click on test configuration which will send a test mail to the recipient e-mail id

Also add to Extended E-mail Notification

Also add to Extended E-mail Notification


SMTP server --> smtp.gmail.com
SMTP Port ---> 465
Advanced-credentials-->username and password --> gmail and app password + check use ssl
```

## Step9: Install Required Plugins 

<img width="1512" height="826" alt="image" src="https://github.com/user-attachments/assets/f1eb9686-68b0-4e65-a91b-d19f54df49be" />

<img width="1517" height="295" alt="image" src="https://github.com/user-attachments/assets/321b43e0-cf3f-4661-ad58-07b5c8e5a720" />


## Jio Hotstar Web Page

url:http://af51eb587f6444a30b43ece4a189b100-1821373873.us-east-1.elb.amazonaws.com/

<img width="1913" height="968" alt="image" src="https://github.com/user-attachments/assets/bb94f853-8e55-4d26-b342-4ca03df98aa5" />

<img width="1381" height="592" alt="image" src="https://github.com/user-attachments/assets/de51abc2-489f-470c-a022-bb651bc829cd" />


## Step10: Destrory EKS Cluster 

<img width="925" height="565" alt="image" src="https://github.com/user-attachments/assets/17326ede-f353-477c-bde4-04296396e17e" />

<img width="1328" height="302" alt="image" src="https://github.com/user-attachments/assets/4d8d84c3-3f69-4697-8145-95bbad74322f" />

<img width="932" height="557" alt="image" src="https://github.com/user-attachments/assets/401b0f45-fe11-40c5-a361-1690b3249a0d" />






