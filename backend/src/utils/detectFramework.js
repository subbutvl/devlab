import fs from "fs";
import path from "path";

export function detectFramework(projectPath) {
  const files = fs.readdirSync(projectPath);

  // const hasPnpm = files.includes("pnpm-lock.yaml");

  // const hasYarn = files.includes("yarn.lock");

  // const packageManager = hasPnpm ? "pnpm" : hasYarn ? "yarn" : "npm";

  const hasYarn = files.includes("yarn.lock");

  const packageManager = hasYarn ? "yarn" : "npm";

  if (files.includes("angular.json")) {
    return {
      framework: "Angular",

      category: "angular",

      packageManager,

      runScript: "start",
    };
  }

  if (files.includes("requirements.txt")) {
    return {
      framework: "Python",

      category: "python",

      packageManager: "python",

      runScript: "",
    };
  }

  if (files.includes("package.json")) {
    const packageJsonPath = path.join(projectPath, "package.json");

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (dependencies.next) {
      return {
        framework: "NextJS",

        category: "react",

        packageManager,

        runScript: "dev",
      };
    }

    if (dependencies["react-scripts"]) {
      return {
        framework: "CRA",

        category: "react",

        packageManager,

        runScript: "start",
      };
    }

    if (dependencies.react) {
      return {
        framework: "React",

        category: "react",

        packageManager,

        runScript: "dev",
      };
    }

    if (dependencies.vue) {
      return {
        framework: "Vue",

        category: "vue",

        packageManager,

        runScript: "dev",
      };
    }

    return {
      framework: "Node",

      category: "experimental",

      packageManager,

      runScript: "start",
    };
  }

  return {
    framework: "Unknown",

    category: "experimental",

    packageManager: "npm",

    runScript: "",
  };
}
