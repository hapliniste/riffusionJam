import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";

import RecordButton from '../components/RecordButton';
import SegmentBank from '../components/SegmentBank';

import {
  AppState,
  InferenceInput,
  InferenceResult,
  PromptInput,
} from "../types";


export default function Home() {

    //CODE TO MANAGE RECORDING
    const [recording, setRecording] = useState(false);
    const [segments, setSegments] = useState([]);
  
    const handleStartRecording = () => {
      // Prompt user for permission to use microphone and start recording
      setRecording(true);
    };
  
    const handleStopRecording = () => {
      // Stop recording and add recorded segment to the segment bank
      setRecording(false);
      //setSegments(segments => [...segments, { id: Date.now(), enabled: true }]);
    };
  
    const handleToggleSegment = useCallback(
      segment => {
        // Enable or disable the specified segment
        setSegments(segments =>
          segments.map(s => (s.id === segment.id ? { ...s, enabled: !s.enabled } : s))
        );
      },
      []
    );

    const handleSegmentReady = () => {
      setSegments(segments => [...segments, { id: Date.now(), enabled: true }]);
    }


  return (
    <>
      <RecordButton recording={recording} onStartRecording={handleStartRecording} onStopRecording={handleStopRecording} onSegmentReady={handleSegmentReady} />
      <SegmentBank segments={segments} onToggleSegment={handleToggleSegment} />
    </>
  );
}
