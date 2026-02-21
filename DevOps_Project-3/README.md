# Secure VPC Architecture with Public and Private Subnets for Production Environment
## Overview :
This project's overview is depicted in the diagram below. The setup revolves around a Virtual Private Cloud (VPC) featuring both public and private subnets, thoughtfully distributed across two Availability Zones to ensure reliability.

Within each public subnet, there's a NAT gateway to facilitate outbound internet connectivity and a load balancer node for effective traffic distribution.

On the other hand, the project's servers reside in the private subnets. Their deployment and termination are automated through an Auto Scaling group, allowing them to dynamically adapt to workload changes. These servers play a pivotal role in receiving traffic from the load balancer and can access the internet through the NAT gateway when necessary


![image](https://github.com/itz-mathesh/aws-public-private-subnet-architecture/assets/144098846/9d656294-2011-4467-a620-63954d923710)

## Steps :
### Step 1 :
#### Create the VPC :
1. Open the Amazon VPC console by visiting https://console.aws.amazon.com/vpc/.
2. On the dashboard, click on "Create VPC."
3. Under "Resources to create," select "VPC and more."
4. Configure the VPC:<br>
   a. Provide a name for the VPC in the "Name tag auto-generation" field.<br>
   b. For the IPv4 CIDR block, leave it as default suggestion.<br>
5. Configure the subnets:<br>
   a. Set the "Number of Availability Zones" to 2 for increased resiliency across multiple Availability Zones.<br>
   b. Specify the "Number of public subnets" as 2.<br>
   c. Specify the "Number of private subnets" as 2.<br>
   d. For NAT gateways, choose "1 per AZ" to enhance resiliency.<br>
   g. For VPC endpoints, you can choose "None" .<br>
   h. Regarding DNS options, clear the checkbox for "Enable DNS hostnames."<br>

Once you've configured all the settings, click "Create VPC."

![vpc](https://github.com/user-attachments/assets/1244f142-d48f-4680-8eb0-9e6479e9a977)

![vpc1](https://github.com/user-attachments/assets/d5e2a49c-cc03-4eab-8cc2-7539873d4a25)

![vp2](https://github.com/user-attachments/assets/9ebe1fb6-321a-4c78-8651-b480a9a375be)

![vpc3](https://github.com/user-attachments/assets/fa48c023-f6b4-4717-8734-ee215941143e)


6. Now you can see you are successfully Created VPC .




### Step 2:
#### Creating the Auto Scaling Group :

![autoscale](https://github.com/user-attachments/assets/0c62a4a9-403d-403c-a216-bb8b913bc2d3)

![autoscale1](https://github.com/user-attachments/assets/4999bda3-c8f7-42d7-bea0-2d46f7dc3397)

![lunch_tmplete](https://github.com/user-attachments/assets/bfea52fa-dcb6-4b3f-a8bd-162a26871332)

![lunch_tmplete1](https://github.com/user-attachments/assets/59b2b6db-5425-414b-a914-3aa3751e7391)


1. Now you have to choose the Key-pair you created.

![lunch_tmplete2](https://github.com/user-attachments/assets/62bbbeab-180c-4216-ac0a-519ae73e7191)


![lunch_tmplete2](https://github.com/user-attachments/assets/c0b6082b-3784-45d6-a482-ebd285d4d3f3)

![lunch_tmplete3](https://github.com/user-attachments/assets/50e0a273-4f99-4e7b-8af1-b656999fca83)

![lunch_tmplete4](https://github.com/user-attachments/assets/c3ebdea5-5827-41ea-9a0a-01e9144c4307)

![autoscale2](https://github.com/user-attachments/assets/a687f76a-333f-4dd5-93d1-4bdd23945586)


2. Scroll Down and then Click "Next".
![autoscale3](https://github.com/user-attachments/assets/56a01de8-1f6c-4323-8e96-5beaaee767c1)

3. Scroll Down and then Click "Next".

![autoscale4](https://github.com/user-attachments/assets/577f6e14-989c-4370-8088-12d82e4c6082)

4. Scroll Down and then Click "Next".

![autoscale5](https://github.com/user-attachments/assets/039f2e78-8986-4444-8b4f-68631016e3dc)

5. Scroll Down and then Click "Skip to Review".

![autoscale6](https://github.com/user-attachments/assets/e23070be-49cc-4a52-a532-84efb2795520)
6. Now your are Successfully Created Auto Scaling Group.<br>
7. Open the AWS Management Console.<br>
8. Navigate to the EC2 console by clicking on "Services" in the top-left corner, then selecting "EC2" under the "Compute" section.<br>
9. In the EC2 dashboard, you'll find the "Instances" link on the left-hand navigation pane. Click on "Instances."<br>
10. Here, you should see the list of EC2 instances associated with your account. Look for the instances created by your Auto Scaling Group.<br>
Since you mentioned that the Auto Scaling Group launched instances in different AZs, you can check the "Availability Zone" column to verify that these instances are indeed distributed across multiple AZs.

### Step 3 :
#### Creating the Bastion Host :

1. Launch Instance as Specified below .

![bastion](https://github.com/user-attachments/assets/8f7c2d2e-6af6-481a-9b10-74e5c6147b21)

![bastion1](https://github.com/user-attachments/assets/d22380b6-906f-4f0f-9727-842d969c5fe3)

![bastion2](https://github.com/user-attachments/assets/a30010df-18df-435c-878b-54c91ba3a096)

![bastion3](https://github.com/user-attachments/assets/9e977d45-6bda-4970-814d-f4b845910cd4)


![instance](https://github.com/user-attachments/assets/b933bc48-64d2-49b0-a081-50a0a30ec112)


### Step 4: 
#### SSH into Private Instance

1. SSH into the Bastion Host Instance:
   To SSH into the private instances, we first need to connect to our Bastion host instance. From there, we'll be able to SSH into the private instance.
2. Ensure the PEM File is Present on the Bastion Host:
   Additionally, make sure that the PEM file is present on the Bastion host. Without it, you won't be able to SSH into the private instance from the Bastion host.
3. Open a Terminal:
   Open a terminal window on your local machine.
4. Execute the Following Commands:
   a. If your PEM file is named something like `<aws demo.pem>`, you must remove spaces in the filename. Please rename the file to something like `<aws_demo.pem>`.
   b. Copy the PEM file to the Bastion host using the `scp` command. Replace `<pem file location>` with the local and remote file paths, and `<bastion host public IP>` with the Bastion host's public IP address. 
   Example:
      ```
      scp -i /Users/mathesh/Downloads/aws_demo.pem /Users/mathesh/Downloads/aws_demo.pem ubuntu@34.229.240.123:/home/ubuntu
      ```
   c. The above command will copy the PEM file from your computer to the Bastion host. Once the file is successfully copied, move on to the next step.
   d. SSH into the Bastion host using the following command:
      ```
      ssh -i aws_demo.pem ubuntu@34.229.240.123
      ```
    e. After SSHing into the Bastion host, use the `ls` command to check if the `aws_demo.pem` file is present. If it's not there, double-check your previous commands.
    f. Now, you can SSH into the private instance using the following command, replacing `<private IP>` with the private instance's IP address:
      ```
      ssh -i aws_demo.pem ubuntu@<private IP>
      ```
    g. We will deploy our application on one of the private instances to test the load balancer.
    h. After successfully SSHing into the private instance, create an HTML file using the Vim text editor:
      ```
      vim demo.html
      ```
    i. This will open the Vim editor. Copy and paste any HTML content you like into the editor.
    j. For example:
      ```html
      <!DOCTYPE html>
      <html>
      <head>
      <title>Page Title</title>
      </head>
      <body>

      <h1>This is an AWS Demo Production</h1>
      </body>
      </html>
      ```
     k. After pasting the content, save the file by pressing 'Esc' to exit insert mode and then entering `:w` to save.
     l. Finally, start a Python HTTP server on port 8000 to deploy your application on the private instance:
      ```
      python3 -m http.server 8000
      ```
Now, your application is deployed on the private instance on port 8000.
### Note :
We intentionally deployed the application on only one instance to check if the Load Balancer will distribute 50% of the traffic to one instance (which will receive a response) and 50% to another instance (which will not receive a response).

### Step 4 :
#### Creating the Load Balancer :

1. Access the EC2 Terminal.
2. Follow the steps outlined below.

![loadbalancer](https://github.com/user-attachments/assets/1d179feb-277a-4f7c-b868-70199834c886)

![loadbalancer1](https://github.com/user-attachments/assets/096477e1-cde9-4348-a209-39258e2d7ead)

![loadbalancer2](https://github.com/user-attachments/assets/91f9143e-2322-4549-90f8-4c99a33c7fc9)

![loadbalancer3](https://github.com/user-attachments/assets/cbb8c99e-9131-403a-b8f6-8856beba2b24)

![loadbalancer4](https://github.com/user-attachments/assets/2b8dd308-5163-4d9f-803e-1515cb016321)

![loadbalancer5](https://github.com/user-attachments/assets/0e08c50e-713e-4ef5-b8cc-c11997d53bf2)

![loadbalancer6](https://github.com/user-attachments/assets/c461ae6d-a0ae-411a-bd6e-562ba80e7f60)

![loadbalancer7](https://github.com/user-attachments/assets/ba8d6e9b-f902-4341-bc5d-365eb0e37e4e)

![loadbalancer8](https://github.com/user-attachments/assets/622e894a-3273-4267-a8b4-2bf74c6cef8b)


Now We Successfully deployed Application securely in Private instance , We can access it through Internet using Load Balancer Securely .
