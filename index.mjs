// https://docs.libuv.org/en/latest/threadpool.html
// https://nodejs.org/api/cli.html#uv_threadpool_sizesize
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject
// https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve
// https://medium.com/trainingcenter/entendendo-promises-de-uma-vez-por-todas-32442ec725c2
// https://www.freecodecamp.org/portuguese/news/tudo-o-que-voce-precisa-saber-sobre-promise-all/
// UV_THREADPOOL_SIZE=10 node <file_name>

import { execSync } from "node:child_process";
import { Worker } from "node:worker_threads";

// pega a quantidade de threads do process e conta
function getCurrentThreadCount() {
    return parseInt(execSync(`ps -M ${process.pid} | wc -l`).toString());
}

function createThread(data) {
    const worker = new Worker("./thread.mjs");

    const p = new Promise((resolve, reject) => {
        worker.once("message", (message) => {
            return resolve(message);
        });

        worker.once("Error: ", reject);
    });

    worker.postMessage(data);
    return p;
}

// -1 (ignora o próprio process)
const nodejsDefaultThreadNumber = getCurrentThreadCount() - 1;

console.log(
    `I'm running`,
    process.pid,
    `Default threads: ${nodejsDefaultThreadNumber}`
);

let nodejsThreadCount = 0;
const intervalId = setInterval(() => {
    // console.log(`Running at every sec: ${new Date().toISOString()}`);

    // dessa forma vemos somente as threads que criamos manualmente
    const currentThreads = getCurrentThreadCount() - nodejsDefaultThreadNumber;

    if (currentThreads == nodejsThreadCount) return;
    nodejsThreadCount = currentThreads;

    console.log("Threads: ", nodejsThreadCount);
});

await Promise.all([
    createThread({
        to: 1e7,
        from: 0,
    }),

    createThread({
        to: 1e7,
        from: 0,
    }),

    createThread({
        to: 1e5,
        from: 0,
    }),
    createThread({
        to: 1e4,
        from: 0,
    }),
    createThread({
        to: 1e3,
        from: 0,
    }),
]).then((results) => console.log(results));

clearInterval(intervalId);
