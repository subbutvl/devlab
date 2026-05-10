export const frameworkRuntimeMap = {
  React: {
    type: "vite",

    buildCommand: (runCommand, port) => {
      return `${runCommand} -- --port ${port} --strictPort`;
    },
  },

  Vue: {
    type: "vite",

    buildCommand: (runCommand, port) => {
      return `${runCommand} -- --port ${port} --strictPort`;
    },
  },

  Angular: {
    type: "angular",

    buildCommand: (runCommand, port) => {
      return `${runCommand} -- --port ${port}`;
    },
  },

  NextJS: {
    type: "next",

    buildCommand: (runCommand, port) => {
      return `${runCommand} -p ${port}`;
    },
  },

  CRA: {
    type: "cra",

    buildCommand: (runCommand, port) => {
      return `set PORT=${port} && ${runCommand}`;
    },
  },

  Python: {
    type: "python",

    buildCommand: (runCommand, port) => {
      return `${runCommand} --port ${port}`;
    },
  },
};
