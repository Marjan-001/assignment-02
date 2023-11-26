### How can anyone run this project locally
## step:1
 install nodejs and npm in your pc
## step 2
 clone the project repository: https://github.com/Marjan-001/assignment-02
## step 3
navigate project directory
## step 3
intall dependencies:
npm init -y
## step 4
create a .env file and set environment variables
PORT:5000
DATABASE_URL:....
BCRYPT_SALT_ROUNDS=12

## step 5
run the application in development mode 
npm run start:dev
production mode:
npm run build
npm run start:prod
### step 6
to fix lint:
npm run lint:fix
