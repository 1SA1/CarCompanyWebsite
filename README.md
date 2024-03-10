The project is a car management system designed to facilitate the tracking and management of cars. It provides functionality for users to add, edit, and delete car listings. Additionally, users can view a list of all cars available in the system. The system also includes a logging feature to record user actions, such as adding or editing cars. Authentication is implemented to ensure that only authenticated users can access the system's features. The frontend is built using React, providing a modern and interactive user interface, while the backend is developed with Laravel, offering a robust and secure backend infrastructure. Overall, the project aims to streamline car management tasks and enhance the user experience for both administrators and users.


Install:
Step1: Download Repo
Step2: Composer Update
Step3: Create a .env and database add its name to .env file
Step3: php artisan migrate
Step4: npm run dev
step5: php artisan serve


+------------+          +--------------+          +-----------------+
|   cars     |          |  car_photos  |          |      logs       |
+------------+          +--------------+          +-----------------+
| id         | <----+   | id           |   +----> | id              |
| make       |      |   | car_id (FK)  |   |      | user_id (FK)    |
| model      |      |   | url/file    |   |      | action          |
| year       |      |   | created_at   |   |      | created_at      |
| price      |      |   | updated_at   |   |      | updated_at      |
| description|      |   +--------------+   |      +-----------------+
| available  |      +---------------------+
| created_at |                            +-------------------------+
| updated_at |                                                      |
+------------+                                                      |
                                                                   |
                                                                   v
                                                            +----------------+
                                                            |     users      |
                                                            +----------------+
                                                            | id             |
                                                            | name           |
                                                            | email          |
                                                            | password       |
                                                            | remember_token |
                                                            | created_at     |
                                                            | updated_at     |
                                                            +----------------+
