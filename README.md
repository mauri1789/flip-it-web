# Flip it App (Web)

Flip it app is a flashcards application

## Run it locally

Install dependencies and run the application

```
yarn
yarn start
```

## Backend

The application will try to connect to a backend server, which might not always be available.

Still, you can run your own backend following this repo [flip-it-app backend](https://github.com/mauri1789/flip-it-app), then link it in the file `environment.dev.ts`

And also in order to get the cognito authentication running this other repo [authorizer](https://github.com/mauri1789/authorizer)

## Deployment

You'll need to set up your credentials with aws-cli and set the values for the deployment in `deployment.sh`

Run `npm run create` to create a static website in S3 with a cloudfront distribution and a custom Domain Name.
It usually takes about 15 min.

![aws_diagram](https://user-images.githubusercontent.com/16513413/69202529-59af4200-0b18-11ea-85ca-ead59d3cc603.png)

Run `npm run deploy` to create a production build and push it to S3.
At this point you should be able to visit your domain name and the site should be deployed.

Run `npm run update` to make updates to the stack created.

Run `npm run remove` to remove the stack created. Notice that the S3 bucket will not be deleted.

## Release

- 1.0 Basic functionality. User can create, edit, delete Decks and Cards
- 1.1 Integrated with Authorizer. User can now signup, login and make secure http requests through the cognito Auth2.0 code flow
