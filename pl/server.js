const express = require("express");
const vm = require("vm");

const app = express();
app.use(express.json({ limit: "10mb" }));

app.post("/run", (req, res) => {
    try {
        let code = req.body.code;

        let output = "";

        // capturar console.log
        const sandbox = {
            console: {
                log: (...args) => {
                    output += args.join(" ") + "\n";
                }
            }
        };

        vm.createContext(sandbox);
        vm.runInContext(code, sandbox, { timeout: 5000 });

        res.json({ result: output || "sin salida" });

    } catch (e) {
        res.json({ error: e.toString() });
    }
});

app.listen(3000, () => console.log("RUNNING"));