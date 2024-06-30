| **Task**                                              | **Command**                       |
|-------------------------------------------------------|-----------------------------------|
| Run your **RESTful API** and **frontend applications** locally. | Backend - `npm run dev`. Frontend - `npm run start`                 |
| Run your **end-to-end tests** using **Cypress**.      | `npx cypress open`                |
| Create and apply a migration using **Prisma**.        | `npx prisma migrate dev`          |
| Reset your database using **Prisma**.                 | `npx prisma migrate reset`        |
| Seed **admin** users.                                 | `node prisma/seed.js`                    |
| Open **Prisma Studio**.                               | `npx prisma studio`               |
| Lint your code using **ESLint**.                      | `eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0 --fix`                    |
| Format your code using **Prettier**.                  | `npx prettier --write .`          |
