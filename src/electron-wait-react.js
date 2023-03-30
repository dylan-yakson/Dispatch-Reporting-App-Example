const net = require("net");
const { exec } = require("child_process");

const port = process.env.PORT ? process.env.PORT - 100 : 3000;

process.env.ELECTRON_START_URL = `http://localhost:${port}`;

const client = new net.Socket();

let startedElectron = false;
const tryConnection = () =>
  client.connect({ port }, () => {
    client.end();
    if (!startedElectron) {
      console.log("starting electron");
      startedElectron = true;
      const electron = exec("npm run electron");
      electron.stdout.on("data", (data) => {
        console.log(`stdout: ${data.toString()}`);
      });
    }
  });

tryConnection();

client.on("error", (error) => {
  console.log(error);
  setTimeout(tryConnection, 1000);
});
