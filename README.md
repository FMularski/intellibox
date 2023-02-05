![logo](https://user-images.githubusercontent.com/26598200/216815918-faea729a-2216-484b-9fa1-da1e410a4120.gif)


![GitHub repo size](https://img.shields.io/github/repo-size/FMularski/intellibox)
![GitHub last commit](https://img.shields.io/github/last-commit/FMularski/intellibox?color=yellow)
![GitHub top language](https://img.shields.io/github/languages/top/FMularski/intellibox?color=purple)
![Website](https://img.shields.io/website?url=https%3A%2F%2Fintellibox.herokuapp.com%2F)

## 📁 Created with
* Django 3.2.6
* DRF 3.12.4
* AWS
  * RDS PostgreSQL
  * S3 Bucket
* Sass
* jQuery, Ajax


## 📁 About
Intellibox is a file storage web app. It allows users to upload and store their files in virtual boxes. The purpose of this app is to allow users to access their favourite or currently needed files whenever it is required. 

## 📁 Core features
* **Authentication system**
  * Registration and login using django authentication system and ModelForms  
  ![login](https://user-images.githubusercontent.com/26598200/216816380-266ce2e3-710c-44c1-acfc-4207196ed9c3.gif)


  * Resetting password using django class-based views
  ![reset](https://user-images.githubusercontent.com/26598200/216816445-d53dcffd-b669-41cc-8f99-1ba6b332ccea.gif)

* **File storage system**
  * Uploading files
  ![upload](https://user-images.githubusercontent.com/26598200/216824481-da4e1e31-7f0d-42de-b23e-6c0a1b3d574f.gif)
  * Creating boxes for better file organization
  ![box](https://user-images.githubusercontent.com/26598200/216824486-ec03bfda-91b4-431f-8ae6-679ac29ab6a7.gif)
  * Context menu with the following options:
    * preview
    * download
    * delete
    * move
    * mark as favourite
    * copy url
  ![preview](https://user-images.githubusercontent.com/26598200/216833104-61375906-2e15-4763-8d5a-6dbd6f03d5f5.gif)
  * Sorting items by:
    * favourite
    * name
    * size
    * modified date
  ![sort](https://user-images.githubusercontent.com/26598200/216833409-f4ad62b1-33da-42d6-8a5a-68f305dc81e1.gif)
  
## 📁 Download and run 
```bash
git clone https://github.com/FMularski/django-chat-app.git
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver
```

## 📁 Or experience it LIVE
[Intellibox on Heroku](https://intellibox.herokuapp.com/)


  
