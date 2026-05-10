import net from "net";

import { runningProjects } from "../managers/runtimeManager.js";

export function findAvailablePort(startPort = 6100) {
  return new Promise((resolve) => {
    function check(port) {
      const usedPorts = Array.from(runningProjects.values()).map(
        (runtime) => runtime.port,
      );

      if (usedPorts.includes(port)) {
        return check(port + 1);
      }

      const tester = net.createServer();

      tester.once("error", () => {
        check(port + 1);
      });

      tester.once("listening", () => {
        tester.close(() => {
          resolve(port);
        });
      });

      tester.listen(port, "127.0.0.1");
    }

    check(startPort);
  });
}
