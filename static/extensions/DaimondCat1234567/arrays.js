/*
   Created with ExtForge
   https://jwklong.github.io/extforge
*/
(async function(Scratch) {
    const variables = {};


    if (!Scratch.extensions.unsandboxed) {
        alert("This extension needs to be unsandboxed to run!")
        return
    }

    const ExtForge = {
        Broadcasts: new function() {
            this.raw_ = {};
            this.register = (name, blocks) => {
                this.raw_[name] = blocks;
            };
            this.execute = async (name) => {
                if (this.raw_[name]) {
                    await this.raw_[name]();
                };
            };
        },

        Variables: new function() {
            this.raw_ = {};
            this.set = (name, value) => {
                this.raw_[name] = value;
            };
            this.get = (name) => {
                return this.raw_[name] ?? null;
            }
        },

        Vector: class {
            constructor(x, y) {
                this.x = x;
                this.y = y;
            }

            static from(v) {
                if (v instanceof ExtForge.Vector) return v
                if (v instanceof Array) return new ExtForge.Vector(Number(v[0]), Number(v[1]))
                if (v instanceof Object) return new ExtForge.Vector(Number(v.x), Number(v.y))
                return new ExtForge.Vector()
            }

            add(v) {
                return new Vector(this.x + v.x, this.y + v.y);
            }

            set(x, y) {
                return new Vector(x ?? this.x, y ?? this.y)
            }
        },

        Utils: {
            setList: (list, index, value) => {
                [...list][index] = value;
                return list;
            },
            lists_foreach: {
                index: [0],
                value: [null],
                depth: 0
            },
            countString: (x, y) => {
                return y.length == 0 ? 0 : x.split(y).length - 1
            }
        }
    }

    class Extension {
        getInfo() {
            return {
                "id": "ArraysByDCat",
                "name": "Arrays",
                "color1": "#cbe4ff",
                "blocks": [{
                    "opcode": "block_0ac111a5600d8ba4",
                    "text": "list with [db3a3a41f77a58eb]",
                    "blockType": "reporter",
                    "arguments": {
                        "db3a3a41f77a58eb": {
                            "type": "string"
                        }
                    }
                }, {
                    "opcode": "block_9f67ea88664f4bc8",
                    "text": "item [d2173188c3155c68] of [cb5db6c14a397264]",
                    "blockType": "reporter",
                    "arguments": {
                        "d2173188c3155c68": {
                            "type": "number",
                            "defaultValue": 1
                        },
                        "cb5db6c14a397264": {
                            "type": "string"
                        }
                    }
                }, {
                    "opcode": "block_e8230f3848cde6cd",
                    "text": "join [8e56b4c4d41a07e2] with [a6737aa7252d7533]",
                    "blockType": "reporter",
                    "arguments": {
                        "8e56b4c4d41a07e2": {
                            "type": "string"
                        },
                        "a6737aa7252d7533": {
                            "type": "string"
                        }
                    }
                }, {
                    "opcode": "block_20302e14b6d23c3e",
                    "text": "keys pressed",
                    "blockType": "reporter",
                    "arguments": {}
                }, {
                    "opcode": "block_1fadbb4790f52755",
                    "text": "index of [906a48797d78a3a4] in [bd9080af32d32891]",
                    "blockType": "reporter",
                    "arguments": {
                        "906a48797d78a3a4": {
                            "type": "string"
                        },
                        "bd9080af32d32891": {
                            "type": "string"
                        }
                    }
                }, {
                    "opcode": "block_706408811c42a599",
                    "text": "empty list",
                    "blockType": "reporter",
                    "arguments": {}
                }, {
                    "opcode": "block_fa371b24f59fa4bd",
                    "text": "[d581a34ca5537166] is in [565364348cf040ba]",
                    "blockType": "Boolean",
                    "arguments": {
                        "d581a34ca5537166": {
                            "type": "string"
                        },
                        "565364348cf040ba": {
                            "type": "string"
                        }
                    }
                }]
            }
        }
        async block_0ac111a5600d8ba4(args) {
            return ([args["db3a3a41f77a58eb"]])
        }
        async block_9f67ea88664f4bc8(args) {
            ExtForge.Variables.set("TEMP", args["cb5db6c14a397264"])
            return ((((value) => value && value.length ? value : [value])(ExtForge.Variables.get("TEMP"))[args["d2173188c3155c68"] - 1]))
        }
        async block_e8230f3848cde6cd(args) {
            ExtForge.Variables.set("TEMP", args["8e56b4c4d41a07e2"])
            ExtForge.Variables.set("T2", args["a6737aa7252d7533"])
            return ((((value) => value && value.length ? value : [value])(ExtForge.Variables.get("TEMP")).concat(((value) => value && value.length ? value : [value])(ExtForge.Variables.get("T2")))))
        }
        async block_20302e14b6d23c3e(args) {
            return (Scratch.vm.runtime.ioDevices.keyboard.getAllKeysPressed())
        }
        async block_1fadbb4790f52755(args) {
            ExtForge.Variables.set("TEMP", args["bd9080af32d32891"])
            return ((((value) => value && value.length ? value : [value])(ExtForge.Variables.get("TEMP")).indexOf(args["906a48797d78a3a4"]) + 1))
        }
        async block_706408811c42a599(args) {
            return ([])
        }
        async block_fa371b24f59fa4bd(args) {
            ExtForge.Variables.set("TEMP", args["565364348cf040ba"])
            return ((((value) => value && value.length ? value : [value])(ExtForge.Variables.get("TEMP")).includes(args["d581a34ca5537166"])))
        }
    }

    let extension = new Extension();
    // code compiled from extforge

    Scratch.extensions.register(extension);
})(Scratch);
