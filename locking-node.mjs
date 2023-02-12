const intervalId = setInterval(() => {
    console.log(`Running at every sex: ${new Date().toISOString()}`);
}, 200);

// com este FOR grande acabamos travando o Node 
for (let index = 0; index < 1e20; index++);
