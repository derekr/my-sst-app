import { StackContext, RemixSite, Queue, Api } from "sst/constructs";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "api", {
    routes: {
      "GET /": "packages/functions/src/lambda.handler",
    },
  });
  stack.addOutputs({
    ApiEndpoint: api.url,
  });

  const queue = new Queue(stack, "queue", {
    consumer: "packages/functions/src/consumer.handler",
  });

  // Create the Remix site
  const site = new RemixSite(stack, "Site", {
    path: "my-remix-app/",
    bind: [queue],
    nodejs: {
      format: 'esm'
    }
  });

  // Add the site's URL to stack output
  stack.addOutputs({
    URL: site.url || "localhost",
  });

  // const web = new StaticSite(stack, "web", {
  //   path: "packages/web",
  //   buildOutput: "dist",
  //   buildCommand: "npm run build",
  //   environment: {
  //     VITE_APP_API_URL: api.url,
  //   },
  // });

  // stack.addOutputs({
  //   WebEndpoint: web.url,
  // });
}