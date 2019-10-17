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

Still, you can run your own backend following this repo [flip-it-app backend](https://github.com/mauri1789/flip-it-app)
and then link it in the file `environment.dev.ts`

## Deployment

You'll need to set up your credentials with aws-cli and set the values for the deployment in `deployment.sh`

Run `npm run create` to create a static website in S3 with a cloudfront distribution and a custom Domain Name.
It usually takes about 15 min.

![aws_diagram](https://user-images.githubusercontent.com/16513413/67048324-06556880-f102-11e9-8ac7-e8b97b5234d3.png)

Run `npm run deploy` to create a production build and push it to S3.
At this point you should be able to visit your domain name and the site should be deployed.

Run `npm run update` to make updates to the stack created.

Run `npm run remove` to remove the stack created. Notice that the S3 bucket will not be deleted.
