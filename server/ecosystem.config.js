module.exports = {
    apps: [
        {
            name: "Actipace",
            script: "npm",
            args: "start",
            cwd: "/home/dev/Actipace/server",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};
