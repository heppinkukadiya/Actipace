module.exports = {
    apps: [
        {
            name: "Actipace",
            script: "index.js",
            args: "start",
            cwd: "/home/dev/Actipace/server",
            env: {
                NODE_ENV: "production"
            }
        }
    ]
};
