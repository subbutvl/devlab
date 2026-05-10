import fs from "fs";
import path from "path";

export function detectFramework(projectPath) {
  const files = fs.readdirSync(projectPath);

  if (files.includes("angular.json")) {
    return {
      framework: "Angular",
      category: "angular",
    };
  }

  if (files.includes("requirements.txt")) {
    return {
      framework: "Python",
      category: "python",
    };
  }

  if (files.includes("package.json")) {
    const packageJsonPath = path.join(projectPath, "package.json");

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, "utf-8"));

    const dependencies = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies,
    };

    if (dependencies.react) {
      return {
        framework: "React",
        category: "react",
      };
    }

    if (dependencies.vue) {
      return {
        framework: "Vue",
        category: "vue",
      };
    }

    return {
      framework: "Node",
      category: "experimental",
    };
  }

  return {
    framework: "Unknown",
    category: "experimental",
  };
}
