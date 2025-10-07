// Name: JavaScript
// ID: shaman2016JavaScriptRunner
// Author: SHAMAN2016 <https://scratch.mit.edu/users/SHAMAN2016/>

(function (Scratch) {
    "use strict";

    if (!Scratch.extensions.unsandboxed) {
        return alert("This extension needs to be unsandboxed to run!");
    }

    function output(out) {
        return out;
    }

    class JavaScriptExtension {
        getInfo() {
            return {
                "id": "shaman2016JavaScriptRunner",
                "name": "JavaScript",
                "color1": "#0fbd8c",
                "blocks": [
                    {
                        "opcode": "command",
                        "text": "JS [CODE]",
                        "blockType": Scratch.BlockType.COMMAND,
                        "arguments": {
                            "code": {
                                "type": Scratch.ArgumentType.STRING,
                                "defaultValue": "alert(\"Hello World\")"
                            }
                        }
                    },
                    {
                        "opcode": "reporter",
                        "text": "JS [CODE]",
                        "blockType": Scratch.BlockType.REPORTER,
                        "arguments": {
                            "CODE": {
                                "type": Scratch.ArgumentType.STRING,
                                "defaultValue": "output(\"Hello World\")"
                            }
                        }
                    },
                    {
                        "opcode": "boolean",
                        "text": "JS [CODE]",
                        "blockType": Scratch.BlockType.BOOLEAN,
                        "arguments": {
                            "CODE": {
                                "type": Scratch.ArgumentType.STRING,
                                "defaultValue": "output(\"1 < 2\")"
                            }
                        }
                    }
                ]
            }
        }

        command (args) {
            eval(args.CODE);
        }
        reporter (args) {
            return (eval(args.CODE));
        }
        boolean (args) {
            return (eval(args.CODE));
        }
    }

    Scratch.extensions.register(new JavaScriptExtension);
})(Scratch);
