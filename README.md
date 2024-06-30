# Mintep1 Quiz App
https://two4-mintep1-app-dev.onrender.com/api/v1/public/all
A URL to your RESTful API as a web service on Render. // Make home page


– A URL to your published RESTful API documentation. Each route needs to be documented. Include a
description, example request and example response.


### Repo Setup
Once cloned, open the repo in your preferred IDE. Then, open a terminal and run the following command

```bash
npm i
```

This will install the necessary dependencies. Then, run the commands in the scripts section as you please.


### Scripts

| **Task**                                              | **Command**                       |
|-------------------------------------------------------|-----------------------------------|
| Run your **RESTful API** and **frontend applications** locally. | Backend - `npm run dev`. Frontend - `npm run start`                 |
| Run your **end-to-end tests** using **Cypress**.      | `npm run cyop`                |
| Create and apply a migration using **Prisma**.        | `npm run mig`          |
| Reset your database using **Prisma**.                 | `npm run res`        |
| Seed **admin** users.                                 | `node prisma/seed.js`                    |
| Open **Prisma Studio**.                               | `npx prisma studio`               |
| Lint your code using **ESLint**.                      | `npm run lint`                    |
| Format your code using **Prettier**.                  | `npx prettier --write .`          |
