import type { V2_MetaFunction } from "@remix-run/react";
import { Queue } from "sst/node/queue";
import { SQSClient, SendMessageCommand } from "@aws-sdk/client-sqs";

const sqs = new SQSClient({});

export const meta: V2_MetaFunction = () => {
  return [{ title: "New Remix App" }];
};

export async function loader() {
  const command = new SendMessageCommand({
    QueueUrl: Queue.queue.queueUrl,
    MessageBody: "Hello from Next.js!",
  });
  await sqs.send(command);

  return {}
}

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.4" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  );
}
