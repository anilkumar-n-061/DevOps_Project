# Automated Image Resizing and Transfer System Using AWS Services

## Project Description:
This project focuses on building an automated system for image processing and management within the AWS ecosystem. The goal is to streamline the handling of images by automatically resizing them and transferring them to a designated storage location while keeping stakeholders informed through notifications. Key AWS services, such as Lambda, S3, and SNS, are used to orchestrate this workflow.

## Key Features:
1. Image processing automation: Automatically resize and optimize images upon upload.
2. Secure storage: Store processed images in a secure and reliable S3 bucket.
3. Real-time notifications: Receive immediate updates about image processing via SNS.
4. Scalable architecture: Design for scalability to handle image processing demands.
5. Cost-efficient solution: Leverage AWS serverless technologies to minimize operational costs.

## Overview :

![a1](https://github.com/itz-mathesh/image-resizing-using-s3-lambda-and-sns/assets/144098846/d806e90a-365e-4f59-a6ac-2606c74b79e3)



## Steps :
### Step 1 :
### Creating Source and Designation s3 Buckets :

1. Navigate to the S3 Console.
2. Follow the Outlined Steps below.

![s33](https://github.com/user-attachments/assets/c5529822-0274-4c91-8b58-f7161d423b1b)

![s31](https://github.com/user-attachments/assets/e37a50ef-c618-4afd-9bfd-36ab0e34679c) 


![s3](https://github.com/user-attachments/assets/b9d6a70e-32a2-4e19-981b-59d5972f4762)


3. Create the destination bucket using the same steps and name it with a unique name.

![s32](https://github.com/user-attachments/assets/d3856260-b835-404b-9860-9d4b8f955880)


4. As you can see above , I created two buckets one is Source bucket and another one is Destination bucket.

### Step 2 :
### Creating the SNS Notification :

1. Navigate to the SNS console.
2. Follow the Outlined Steps below.

![sns](https://github.com/user-attachments/assets/d41d9e94-1014-4a97-9b3c-a8fae3677d63)

![sns1](https://github.com/user-attachments/assets/f0093dc7-fd5d-4abd-ba66-78f7313dda3f)

![sns2](https://github.com/user-attachments/assets/747fe648-653f-4690-93bc-2ae69c0f1a01)

![sns3](https://github.com/user-attachments/assets/0c7fa65c-99b5-4932-96af-abcd5de20794)


3. Scroll down and Click "Create subscription" <br>
4. After this , you will receive some mail for Subscription Confirmation and you have to confirm that.<br>
5. You can use any other protocols also like SQS, HTTP, SMS etc .,<br>


![sms](https://github.com/user-attachments/assets/c20fcf81-3bfd-471a-afba-e35858ffcb54)

![sms1](https://github.com/user-attachments/assets/0159827d-6661-407b-80c1-f29f477ae815)


### Step 3 :
### Creating the Lambda :

1. Navigate to the Lambda Console.
2. Follow the Outlined steps below.

![lamb1](https://github.com/user-attachments/assets/554bb3f9-f970-4a50-b265-8569ae2abadc)

![lamb2](https://github.com/user-attachments/assets/353d1b18-4877-48c1-aaf4-93844bfe9d4a)


3. Now replace the default code with the image-resizing-s3.py and deploy the changes , Don't test the code now we have to do some more actions before testing.
4. After that , We have to give some permission for our Lambda Function to do our process (resizing) , For that navigate to the IAM Console and follow the below steps.

![iam](https://github.com/user-attachments/assets/fd4c76f4-a522-4640-bcbb-eaecd38871b0)

![iam1](https://github.com/user-attachments/assets/0c883af5-e950-4305-9546-393f2671fa65)

![iam2](https://github.com/user-attachments/assets/2eb83e20-90ba-4a1a-a722-57e0ed5b6e9a)


![iam3](https://github.com/user-attachments/assets/8456e48f-3632-4aad-a0a1-f73b18aeb5a1)


![iam4](https://github.com/user-attachments/assets/15498828-c130-4adf-afe2-83c70ecc9f29)

![iam5](https://github.com/user-attachments/assets/181abf65-b9d4-4148-9fad-2c4511733d90)

![iam6](https://github.com/user-attachments/assets/510fa011-f0da-4255-92b1-e0b2cfef3f09)


![iam7](https://github.com/user-attachments/assets/c91f2079-0e3c-4bcf-afb5-2b6221d3de29)

5. Now navigate to the Lambda Console and follow the steps below.

![iam8](https://github.com/user-attachments/assets/2248dd55-885b-4cf5-a90e-cf888ffe290b)

![iam9](https://github.com/user-attachments/assets/1c59c273-9fc4-43c7-977f-884acb8824e6)

![iam10](https://github.com/user-attachments/assets/443e9d3d-6bb9-4d79-985e-38c6c3f2fd12)


6. Now we have to trigger the function.


![trigger](https://github.com/user-attachments/assets/02c08142-dac0-4d15-8d1f-b86920927fc1)

![trigger1](https://github.com/user-attachments/assets/55050fcd-caba-423a-bc26-c0141c77f26d)


7. Now we have to go to code section , and scroll down to  layers.<br>
8. We have to add layer .<br>
9. May be you can think , why ?<br>
10. It's because for resize the image we upload in our source S3 bucket , We need a python library called pillow in our code to resize the image . We can manually add Pillow library also, But it's very time consuming and you have to do lot more , Instead of manually adding pillow library we are going to use layers for Some easy action.<br>
11. Follow the outlined Steps below.

![layer](https://github.com/user-attachments/assets/d9314372-1632-4ba1-8e84-498d9e22bc88)

![layer1](https://github.com/user-attachments/assets/aef87351-8fa7-4e63-b5c4-7f137d091932)


12.You can copy the arn from below.

```
arn:aws:lambda:ap-south-1:770693421928:layer:Klayers-p39-pillow:1
```

13. After done all the actions above , now we can test our code.

![test](https://github.com/user-attachments/assets/9abef56b-d495-4335-a7d0-03b9f6b6b584)

![test1](https://github.com/user-attachments/assets/d7ad4160-c2f4-405c-b84c-b15295979fa7)


14. It will show some results like below , It runs successfully but return some error because we still not upload the images in S3 yet.

![test-result](https://github.com/user-attachments/assets/0b039a6f-bc95-440f-8c74-a1859a04031b)



### Step 4 :
### Results :

1. Navigate to the S3 Console.
2. Upload Some images in  Source Bucket.

![out](https://github.com/user-attachments/assets/1a99c657-ee2b-46e6-bfad-c62c28397a19)

![out1](https://github.com/user-attachments/assets/1b664e4c-29e6-4527-96dc-996b42615c98)

![out2](https://github.com/user-attachments/assets/8a20a117-30d3-4838-91ed-953d250b0c2d)

![out3](https://github.com/user-attachments/assets/386fc57b-a203-497e-88f6-2c49a9d9c016)

![out4](https://github.com/user-attachments/assets/2e867750-44ea-402b-8f27-a08aac7413d2)

![output](https://github.com/user-attachments/assets/0784ee57-d1cf-4a18-afcf-b9dd701b1916)


### It Successfully resized the Image and sends me the Notification.


