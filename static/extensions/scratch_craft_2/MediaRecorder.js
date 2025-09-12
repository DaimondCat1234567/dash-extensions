(function (Scratch) {
    "use strict";

    class MediaRecorder {
        constructor() {
            this.mediaRecorder = null;
            this.chunks = [];
            this.recording = false;
        }

        getInfo() {
            return {
                id: "MediaRecord",
                name: "MediaRecorder",
                color1: "#29beb8",
                blocks: [
                    {
                        opcode: "startRecording",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "Start recording"
                    },
                    {
                        opcode: "stopRecording",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "Stop recording"
                    },
                    {
                        opcode: "saveRecording",
                        blockType: Scratch.BlockType.COMMAND,
                        text: "Save recording"
                    }
                ]
            };
        }

        async startRecording(args) {
            if (this.recording) return;

            try {
                const stream = await navigator.mediaDevices.getDisplayMedia({
                    video: {
                        cursor: "always"
                    },
                    audio: true
                });

                const mimeTypes = [
                    'video/webm;codecs=vp9,opus',
                    'video/mp4;codecs=h264,aac'
                ];

                const supportedMimeType = navigator.mediaRecorder.isTypeSupported(mimeTypes[0])
                    ? mimeTypes[0]
                    : mimeTypes[1];

                this.mediaRecorder = new MediaRecorder(stream, { mimeType: supportedMimeType });

                this.mediaRecorder.ondataavailable = event => {
                    if (event.data.size > 0) {
                        this.chunks.push(event.data);
                    }
                };

                this.mediaRecorder.onstop = () => {
                    this.recording = false;
                    this.chunks = [];
                };

                this.mediaRecorder.start();
                this.recording = true;
                console.log('Запись начата');
            } catch (error) {
                console.error('Ошибка при инициализации записи:', error);
            }
        }

        stopRecording(args) {
            if (this.mediaRecorder) {
                this.mediaRecorder.stop();
                this.recording = false;
                console.log('Запись остановлена');
            }
        }

        saveRecording(args) {
            if (!this.recording) return;

            const that = this;
            this.mediaRecorder.onstop = () => {
                const blob = new Blob(that.chunks, { type: 'video/mp4' });
                that.chunks = [];

                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.style.display = 'none';
                a.href = url;
                a.download = 'recording.mp4';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);

                URL.revokeObjectURL(url);
            };
        }
    }

    Scratch.extensions.register(new MediaRecorder());
})(Scratch);