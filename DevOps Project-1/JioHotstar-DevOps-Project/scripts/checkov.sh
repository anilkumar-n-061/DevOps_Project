#!/bin/zsh
sudo apt update
sudo apt install python3-pip
sudo apt install python3-venv
mkdir ~/my_terraform_env
cd ~/my_terraform_env
python3 -m venv venv
source venv/bin/activate
pip install checkov