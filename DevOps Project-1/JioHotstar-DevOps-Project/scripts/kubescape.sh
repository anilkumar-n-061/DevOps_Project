#!/bin/zsh
curl -s https://raw.githubusercontent.com/kubescape/kubescape/master/install.sh | /bin/bash
aws eks update-kubeconfig --region us-east-1 --name microdegree-cluster
# kubescape scan deployment.yml
# kubescape scan control C-0013 deployment.yml -v