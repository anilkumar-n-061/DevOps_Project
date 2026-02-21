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

<img width="1665" height="778" alt="image" src="https://github.com/user-attachments/assets/7d6da8ec-a5d8-4698-ab28-065175bd155c" />


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

<img width="1894" height="374" alt="image" src="https://github.com/user-attachments/assets/1a0ed224-d5e4-4e3f-be39-a0ef7f3453cf" />


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
<img width="1891" height="401" alt="image" src="https://github.com/user-attachments/assets/f194abfa-4cc9-40ef-b05f-a0fd8b083a76" />

### Jenkins Set-Up

#### Enter Default Password
```
cat /var/lib/jenkins/secrets/initialAdminPassword
```
![jenkins-set1](https://github.com/user-attachments/assets/cc09f1c4-4e4d-4a8e-bde2-678b38f5fd71)

## Step9: Install Required Plugins 

<img width="995" height="914" alt="image" src="https://github.com/user-attachments/assets/c0a3229d-5c90-456e-bd0d-09d5964f0b2c" />

<img width="1517" height="814" alt="image" src="https://github.com/user-attachments/assets/79ea2751-5f13-4f2d-85f4-830e3e1ea04e" />


#### Add Credentials AWS Access key & Secret access key

```
1. Go to manage jenkins
2. Go to Credentials
3. System >>> Global
4. Add Credentials
5. Secrete Text  Add Details
```
<img width="1918" height="944" alt="image" src="https://github.com/user-attachments/assets/0a6c477a-7993-4d8f-a726-326138c35fe7" />

#### Add Docker Credentials

<img width="1905" height="940" alt="image" src="https://github.com/user-attachments/assets/19e0f516-e934-4df2-ab74-574abbedbdf0" />

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

### Add Tools 
#### JDK Tool Install
<img width="1635" height="520" alt="image" src="https://github.com/user-attachments/assets/2c91fece-a537-4373-94cf-a1844b5eea27" />

#### SonarQube Scanner installations
<img width="1592" height="536" alt="image" src="https://github.com/user-attachments/assets/99a22fdc-4998-4df3-afe5-8ea626838bca" />


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

## AWS CLI Installation

```bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
```
<img width="693" height="57" alt="image" src="https://github.com/user-attachments/assets/ebd4c299-5af8-45a2-a9a2-75b28bf1c26b" />

### AWS CLI Configure 
```
root@ip-172-31-81-213:~/Jio-hotstar-DevSecOps-Project/scripts# aws configure
AWS Access Key ID [None]: **************
AWS Secret Access Key [None]: ************
Default region name [None]: us-east-1
Default output format [None]: json
```
<img width="705" height="110" alt="image" src="https://github.com/user-attachments/assets/7aa04646-688c-474f-b191-cee0f27f4370" />


## KUBECTL Installation & Set-Up

```bash
curl -O https://s3.us-west-2.amazonaws.com/amazon-eks/1.29.3/2024-04-19/bin/linux/amd64/kubectl
chmod +x ./kubectl
mv ./kubectl /usr/local/bin
kubectl version --client
```

### kubectl setup
```
ls -a
cd .kube
ls
```
#### configure file is missiing 
```
aws eks update-kubeconfig --region {AWS_REGION} --name {CLUSTER_NAME}
```
<img width="932" height="131" alt="image" src="https://github.com/user-attachments/assets/d69e29e1-4f8f-4c9b-8b82-720de4522091" />


## EKSCTL

```bash
curl --silent --location "https://github.com/weaveworks/eksctl/releases/latest/download/eksctl_$(uname -s)_amd64.tar.gz" | tar xz -C /tmp
sudo mv /tmp/eksctl /usr/local/bin
eksctl version
```


## Step6: * Create Service account/ROLE/BIND-ROLE/Token

## Create Service Account, Role & Assign that role, and create a secret for Service Account and genrate a Token

### Creating Service Account
```
vi service.yaml
```
```yaml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: jenkins
  namespace: microdegree
```
```
kubectl apply -f sa.yaml -n microdegree
```
<img width="657" height="104" alt="image" src="https://github.com/user-attachments/assets/bc3617e9-4a75-4d9f-82ff-6d1a36e0d1fc" />

### Create Role 
```
vi role.yaml
```
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
```
kubectl apply -f role.yaml -n microdegree
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
```
kubectl apply -f rolebind.yaml -n microdegree
```

### Generate token using service account in the namespace

[Create Token]
```
vi token.yaml
```
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
```
kubectl apply -f token.yaml -n microdegree
```
```
kubectl describe secret/mysecretname -n microdegree
```
#### Add tocken to jenkins Credentials 

<img width="1897" height="936" alt="image" src="https://github.com/user-attachments/assets/2e5eb944-ffbf-4039-a62c-e5fb49082ed0" />



## Step7: Add Tools for Java & NodejS

<img width="1483" height="773" alt="nodejs" src="https://github.com/user-attachments/assets/9a9ce220-9559-4032-a4b6-1a8baba8ce23" />

#### Add Role to Admin Server 
```
1. Go to Iam role
2. Create Role Add permissions
    AdministratorAccess
    AmazonEC2FullAccess
    AWSCloudFormationFullAccess
    IAMFullAccess

3. Assigne Role to Admin Server
```
<img width="1912" height="476" alt="image" src="https://github.com/user-attachments/assets/cc3b5f4d-4225-4827-b10b-e0aff4ed0a9e" />

<img width="1756" height="340" alt="image" src="https://github.com/user-attachments/assets/ec7086f6-3a8b-4042-8c5a-74e842fb9a5d" />


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

## Jio Hotstar Web Page

url: http://a38ce6e2fde284505bdb796a8398f3cf-481808960.us-east-1.elb.amazonaws.com/

<img width="1584" height="699" alt="image" src="https://github.com/user-attachments/assets/3e28fc21-c95b-4d03-b8ae-53b225250c54" />

<img width="1920" height="1001" alt="image" src="https://github.com/user-attachments/assets/2bd79779-7ab5-4d31-b530-57ec747e9753" />


## Step10: Destrory EKS Cluster 

<img width="1284" height="798" alt="image" src="https://github.com/user-attachments/assets/e0fd7f81-ea02-4ab6-8b94-36914ffcd13f" />

<img width="1636" height="681" alt="image" src="https://github.com/user-attachments/assets/36cb0608-49b4-4e7e-953d-98f305602cb3" />

<img width="1920" height="506" alt="image" src="https://github.com/user-attachments/assets/ea23eebd-ee6e-4241-85fa-da7f8528db11" />

<img width="1395" height="830" alt="image" src="https://github.com/user-attachments/assets/2dab9ef9-9b93-443a-9554-3798b9090e52" />

## Step11: Terminate (delete) Admin Server
<img width="1658" height="330" alt="image" src="https://github.com/user-attachments/assets/f06fcd61-a974-42cc-b949-553cff030c8a" />

<img width="894" height="502" alt="image" src="https://github.com/user-attachments/assets/d33b3c30-67e1-4e52-a099-65d8e3927ac8" />






