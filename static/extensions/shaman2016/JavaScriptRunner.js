// Name: JavaScript
// ID: shaman2016JavaScriptRunner
// Author: SHAMAN2016 <https://scratch.mit.edu/users/SHAMAN2016/>

(function (Scratch) {
    "use strict";

    if (!Scratch.extensions.unsandboxed) {
        return alert("This extension needs to be unsandboxed to run!");
    }

    const Cast = Scratch.Cast;

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
                        "text": "command [CODE]",
                        "blockType": Scratch.BlockType.COMMAND,
                        "arguments": {
                            "CODE": {
                                "type": Scratch.ArgumentType.STRING,
                                "defaultValue": "alert(\"Hello World\")"
                            }
                        }
                    },
                    {
                        "opcode": "reporter",
                        "text": "reporter [CODE]",
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
                        "text": "boolean [CODE]",
                        "blockType": Scratch.BlockType.BOOLEAN,
                        "arguments": {
                            "CODE": {
                                "type": Scratch.ArgumentType.STRING,
                                "defaultValue": "output(1 < 2)"
                            }
                        }
                    },
                    {
                        "opcode": "array",
                        "text": "array [CODE]",
                        "blockType": Scratch.BlockType.ARRAY,
                        "arguments": {
                            "CODE": {
                                "type": Scratch.ArgumentType.STRING,
                                "defaultValue": "output([\"apple\", \"banana\"])"
                            }
                        }
                    },
                    {
                        "opcode": "object",
                        "text": "object [CODE]",
                        "blockType": Scratch.BlockType.OBJECT,
                        "arguments": {
                            "CODE": {
                                "type": Scratch.ArgumentType.STRING,
                                "defaultValue": "output({\"apple\": \"banana\"})"
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
            const string = Cast.toString(eval(args.CODE));
            return string;
        }
        boolean (args) {
            const boolean = Cast.toBoolean(eval(args.CODE));
            return boolean;
        }
        array (args) {
            const array = Cast.toList(eval(args.CODE));
            return array;
        }
        object (args) {
            const object = Cast.toObject(eval(args.CODE));
            return object;
        }
    }

    Scratch.extensions.register(new JavaScriptExtension);
})(Scratch);
