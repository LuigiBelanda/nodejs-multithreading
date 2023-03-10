<h1 align="center"> :thread: Node Multithreading </h1>
Por meio da vídeo aula do <a href="https://www.youtube.com/live/f7MY2OtI7nA?feature=share">Erick Wendel</a> entendendo mais a fundo como o Node funciona (V8, libuv, event loop etc) e trabalhando com multi threads. 

## :test_tube: Teste
Para testar execute o arquivo `index.mjs` que usará também o `thread.mjs`. O `locking-node.mjs` é apenas a prova real de que podemos travar o Node. A versão do node usada foi: 18.14.0

## :link: Links de apoio

- https://nodejs.org/docs/latest-v18.x/api/child_process.html#child_processexecsynccommand-options

- https://docs.libuv.org/en/latest/threadpool.html

- https://nodejs.org/api/cli.html#uv_threadpool_sizesize

- https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject

- https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/Promise/resolve

- https://medium.com/trainingcenter/entendendo-promises-de-uma-vez-por-todas-32442ec725c2

- https://www.freecodecamp.org/portuguese/news/tudo-o-que-voce-precisa-saber-sobre-promise-all/

- https://nodejs.org/api/worker_threads.html#workerparentport

- https://nodejs.org/api/events.html#emitteronceeventname-listener

- https://nodesource.com/blog/worker-threads-nodejs/

- https://stackoverflow.com/questions/63224356/is-node-js-considered-multithreading-with-worker-threads/63225073#63225073

- https://gist.github.com/ngot/4e363c08c1a912f3f10fda882a9e3956

## :page_facing_up: Anotações do próprio vídeo

- https://github.com/nodejs/node/blob/v1.0.0-release/src/node.cc#L3

- https://dev.to/johnjardincodes/increase-node-js-performance-with-libuv-thread-pool-5h10

- https://github.com/bleedingcode/nodejs-performance-optimizations

- Is Node.js considered multithreading with worker threads?: https://stackoverflow.com/a/63225073/4087199

PID=34657
NUM=`ps M $PID | wc -l` && echo $((NUM-1))

- Process 
  - Your program itself
  - When you create copies of your Node.js program on your infraestructure usually you're creating new processes 

- Child Process or subprocesses
  - They stablish communication channels
  - Used to create a whole new process with dedicated memory and expensive
  - One process can have many threads
  - People used to use child process to offload the bottlenecks from a single process in Node.js 

- Threads
  - threads are small unities of processing and shares memory and resources 
  - uses a lot less memory and it lives inside a process 
  - used to perform CPU intensive tasks

- V8 is the JavaScript interpreter, the VM, who can actually get a JavaScript code and translate it to C++ instances 
  - this process is usually single threaded 
  - Node.js used to spin up 4 instances of the VM 

- Lib UV is the one who manages all async operations and threads 
  - Lib uv also has sincronous tasks that's why it spins up 4 threads by default
  - acts like an while loop asking for events
  - it's responsible to create threads, schedule async operations, create timers and more

- Node.js is actually a C++ program who makes an interface between V8 and LibUV
  - When using C++ you can either use LibUV threads or C++ native threads if you want
  - But to execute a JavaScript code, you must create an isolate, which is a new independent VM instance to run tasks

- Worker Threads 
  - it's still expensive because it creates a new V8 instance, a new event loop but still uses less resources 
  - it's thread safe because it will send events back to the main event loop
  - it doesn't make sense to spin a thread per request as it'll rely on event loop anyway, that's the main difference to Java and other programming languages