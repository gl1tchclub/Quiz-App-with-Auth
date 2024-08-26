# Mintep1 Quiz App

**Home Page for API:** https://two4-mintep1-app-dev.onrender.com/api/v1/

[Documentation](https://documenter.getpostman.com/view/28760893/2sA3duGt59)

### Repo Setup
Once cloned, open the repo in your preferred IDE. Then, open a terminal and run the following command

```bash
npm i
```

This will install the necessary dependencies. Then, run the commands in the scripts section as you please.

DATABASE_URL="postgresql://db_24_db_jq1q_user:ZeULUDDTXKQY5z2AEjcrRACA7vaOLEXM@dpg-cr5qff3qf0us739s6e1g-a.oregon-postgres.render.com/db_24_db_jq1q"
# used to sign the JWT
JWT_SECRET="xxX_Gr4y$0n$w4gG4mer_Xxx"
# how long JWT is live for
JWT_LIFETIME=1hr


### Scripts and Quiz Frontend Instructions
To log into an admin account, use the following account details:

**Username**: admin1

**Password**: p@ssw0rd

Seeding admin users is run automatically upon migration, so they will automatically be in the database. To see them in the database, navigate to the user dashboard page where you will see, if logged into an admin account, a table of all the users in the database.

To seed the basic users, you must be logged into an admin account. Then, navigate to the seed page through the navbar options under "User". There, you will be taken to the /seedBasicUsers endpoint. This will automatically seed the 5 basic users from the Github gist. You may return to the user dashboard to see the updated list.

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
