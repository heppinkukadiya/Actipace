module.exports = {
    apps: [
        {
            name: "Actipace",
            script: "index.js",
            cwd: "/home/dev/Actipace/server",
            env: {
                NODE_ENV: "production",
                PORT: 4000
            }
        }
    ]
};
