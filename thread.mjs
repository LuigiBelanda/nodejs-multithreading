// https://nodejs.org/api/worker_threads.html#workerparentport
// https://nodejs.org/api/events.html#emitteronceeventname-listener
// https://nodesource.com/blog/worker-threads-nodejs/

import { threadId, parentPort } from "node:worker_threads";

// once = Às vezes, você deseja que seu aplicativo responda
// a um evento (ou tipo de evento) apenas uma vez (ou seja, a primeira vez que o evento ocorre).
// Para fazer isso, o Node fornece o método once(). Ele é usado exatamente como
// os métodos addListener() e on(), mas permite responder ao evento apenas uma vez
parentPort.once("message", ({ from, to }) => {
    console.log({ from, to, threadId });

    console.time(`Benchmark-${threadId}`);

    let count = 0;
    for (let index = from; index < to; index++) {
        count++;
    }

    console.timeEnd(`Benchmark-${threadId}`);
    parentPort.postMessage(`I'm ${threadId} done! with ${count} items!`);
});
