module.exports = {
    apps: [
        {
            name: "Actipace",
            script: "server/index.js",   // ← adjust if your entry file name differs
            cwd: __dirname,              // ensures PM2 runs in the server folder
            env: {
                NODE_ENV: "production",
                PORT: 4000
            }
        }
    ]
};
