import React, { useState, useEffect, useRef } from 'react';

type Props = {
    recording: boolean,
    onStartRecording: () => void,
    onStopRecording: () => void,
    onSegmentReady: (buffer: Blob) => void,
    bufferLength?: number,
};

const RecordButton = ({ recording, onStartRecording, onStopRecording, onSegmentReady, bufferLength = 4 }: Props) => {
    const mediaRecorderRef = useRef<MediaRecorder>();
    const chunksRef = useRef<Blob[]>([]);
    let mediaRecorder;

    const handleRecording = (event) => {
        chunksRef.current.push(event.data)
        console.log("STREAM+")
    }

    useEffect(() => {
        if (recording) {
            // Initialize media recorder
            navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then(mediaStream => {
                    mediaRecorder = new MediaRecorder(mediaStream);

                    console.log("STARTING MEDIA STREAM")

                    // Start recording and save chunks
                    mediaRecorder.start(100);
                    mediaRecorder.addEventListener('dataavailable', handleRecording);//event => chunksRef.current.push(event.data));
                    mediaRecorderRef.current = mediaRecorder;
                });
        } else {
            if (mediaRecorderRef.current) {
                mediaRecorderRef.current.stop();

                // Stop recording and return last 4 seconds of recording as a single Blob
                const buffer = new Blob(chunksRef.current.slice(-Math.ceil(bufferLength * parseInt(mediaRecorderRef.current.mimeType.split('/')[1]))), { type: mediaRecorderRef.current.mimeType });
                console.log("SEGMENTS SHOULD BE SENT")
                console.log(buffer)
                onSegmentReady(buffer);

                //try{mediaRecorderRef.current.stop();}
                //catch{}
            }
        }
    }, [recording, bufferLength, onStopRecording]);

    return (
        <button
            className={`rounded-full h-16 w-16 focus:outline-none ${recording ? 'bg-red-700' : 'bg-gray-600'}`}
            onClick={recording ? onStopRecording : onStartRecording}
        >
            <div className="rounded-full h-6 w-6 bg-red-500 flex items-center mx-auto"></div>
        </button>
    );
};

export default RecordButton