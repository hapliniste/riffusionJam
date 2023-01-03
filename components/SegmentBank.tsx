import React from 'react';

type Props = {
  segments: { id: string, enabled: boolean }[],
  onToggleSegment: (segment: { id: string, enabled: boolean }) => void,
};

const SegmentBank = ({ segments, onToggleSegment }: Props) => {
  return (
    <div>
      {segments.map(segment => (
        <div key={segment.id}>
          <input
            type="checkbox"
            checked={segment.enabled}
            onChange={() => onToggleSegment(segment)}
          />
          <span>{segment.id}</span>
        </div>
      ))}
    </div>
  );
};

export default SegmentBank;
