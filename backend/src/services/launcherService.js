import { spawn } from "child_process";

// import open from "open";

import kill from "kill-port";

import {
  runningProjects,
  runtimeStatuses,
} from "../managers/runtimeManager.js";

import { findAvailablePort } from "../utils/findAvailablePort.js";

import { resolvePreferredPort } from "../utils/resolvePreferredPort.js";

export async function launchProject(project) {
  try {
    if (runningProjects.has(project.id)) {
      return {
        success: false,
        message: "Project already running",
      };
    }

    const preferredPort = resolvePreferredPort(project);

    const port = await findAvailablePort(preferredPort);

    const runtime = {
      process: null,
      port,
      url: `http://localhost:${port}`,
    };

    runningProjects.set(project.id, runtime);

    runtimeStatuses.set(project.id, "running");

    let command = process.platform === "win32" ? "npm.cmd" : "npm";

    let args = [];

    if (project.packageManager === "yarn") {
      command = process.platform === "win32" ? "yarn.cmd" : "yarn";
    }

    if (project.framework === "NextJS") {
      args = ["run", project.runScript || "dev", "--", "-p", port.toString()];
    } else if (project.framework === "CRA") {
      command = process.platform === "win32" ? "cmd" : "npm";

      args =
        process.platform === "win32"
          ? [
              "/c",
              `set PORT=${port} && npm run ${project.runScript || "start"}`,
            ]
          : ["run", project.runScript || "start"];
    } else {
      args = [
        "run",
        project.runScript || "dev",
        "--",
        "--port",
        port.toString(),
        "--strictPort",
      ];
    }

    const child = spawn(command, args, {
      cwd: project.path,
      shell: true,
    });

    runtime.process = child;

    child.on("error", (error) => {
      console.error(error);

      runtimeStatuses.set(project.id, "error");

      runningProjects.delete(project.id);
    });

    child.stdout.on("data", (data) => {
      console.log(`[${project.title}] ${data}`);
    });

    child.stderr.on("data", (data) => {
      console.error(`[${project.title}] ${data}`);
    });

    child.on("close", () => {
      runningProjects.delete(project.id);

      const currentStatus = runtimeStatuses.get(project.id);

      if (currentStatus !== "stopped") {
        runtimeStatuses.set(project.id, "error");
      }
    });

    return {
      success: true,
      port,
      url: `http://localhost:${port}`,
    };
  } catch (error) {
    console.error(error);

    runtimeStatuses.set(project.id, "error");

    return {
      success: false,
      message: "Failed to launch project",
    };
  }
}

export async function stopProject(projectId) {
  try {
    const runtime = runningProjects.get(projectId);

    if (!runtime) {
      return {
        success: false,
        message: "Project not running",
      };
    }

    runtimeStatuses.set(projectId, "stopped");

    const process = runtime.process;

    if (process) {
      process.kill("SIGTERM");
    }

    await kill(runtime.port);

    runningProjects.delete(projectId);

    return {
      success: true,
    };
  } catch (error) {
    console.error(error);

    runtimeStatuses.set(projectId, "error");

    return {
      success: false,
      message: "Failed to stop project",
    };
  }
}
