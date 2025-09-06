import React, { useState } from 'react';

interface BodyPartProps {
  partName: string;
  pathData: string;
  isSelected: boolean;
}

interface BodyMapProps {
    onSelectBodyPart: (action: string) => void;
  }

interface BodyPartActions {
  [key: string]: string[];
}

const bodypartActions: BodyPartActions = {
  'Torso': [
    'Perform an X-ray',
    'CT Scan of the Chest',
    'Collect a sputum culture'
  ],
  'Head': [
    'Order a CT scan of the head',
    'Swab the nasal passages',
    'Examine the lymph nodes',
    'Perform visual inspection'
  ],
};

const BodyMap = ({ onSelectBodyPart }: BodyMapProps) => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);

  const handlePartClick = (partName: string) => {
    setSelectedPart(partName);
  };

  const BodyPart: React.FC<BodyPartProps> = ({ partName, pathData, isSelected }) => (
    <path
      d={pathData}
      className={`
        cursor-pointer transition-all duration-300 transform
        ${isSelected ? 'fill-blue-500 scale-105' : 'fill-gray-400 hover:fill-gray-500'}
      `}
      onClick={() => handlePartClick(partName)}
      style={{ transformOrigin: 'center' }}
      aria-label={`Select ${partName}`}
    />
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-sans">
      <div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full text-center">

        {!selectedPart && (
            <div className="flex justify-center items-center mb-6">
                <svg
                    width="200"
                    height="350"
                    viewBox="0 0 200 350"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-auto max-h-[300px] sm:max-h-[350px]"
                >
                    <BodyPart
                        partName="Torso"
                        pathData="M100 80 C120 100, 120 200, 100 220 C80 200, 80 100, 100 80Z"
                        isSelected={selectedPart === 'Torso'}
                    />

                    <BodyPart
                        partName="Head"
                        pathData="M100 70 C120 50, 80 50, 100 70Z"
                        isSelected={selectedPart === 'Head'}
                    />

                    <BodyPart
                        partName="Left Arm"
                        pathData="M95 100 Q60 120, 50 160 C40 200, 70 220, 70 180 Q60 140, 95 120Z"
                        isSelected={selectedPart === 'Left Arm'}
                    />

                    <BodyPart
                        partName="Right Arm"
                        pathData="M105 100 Q140 120, 150 160 C160 200, 130 220, 130 180 Q140 140, 105 120Z"
                        isSelected={selectedPart === 'Right Arm'}
                    />

                    <BodyPart
                        partName="Left Leg"
                        pathData="M95 215 Q80 250, 80 280 Q80 320, 70 330 Q60 340, 70 350 H80 V225 Z"
                        isSelected={selectedPart === 'Left Leg'}
                    />

                    <BodyPart
                        partName="Right Leg"
                        pathData="M105 215 Q120 250, 120 280 Q120 320, 130 330 Q140 340, 130 350 H120 V225 Z"
                        isSelected={selectedPart === 'Right Leg'}
                    />
                </svg>
            </div>
        )}
        

        <p className="text-xl text-gray-700 font-semibold mb-4">
          Selected Part: <span className="text-blue-600 font-extrabold">{selectedPart || 'None'}</span>
        </p>

        {selectedPart && (
          <div className="flex flex-wrap justify-center gap-2">
            {bodypartActions[selectedPart]?.map((action, index) => (
              <button
                key={index}
                onClick={() => onSelectBodyPart(action)}
                className="px-4 py-2 bg-green-500 text-white font-bold rounded-full shadow-lg hover:bg-green-600 transition-colors duration-300 text-sm"
              >
                {action}
              </button>
            ))}
            <button
              onClick={() => {
                setSelectedPart(null);
              }}
              className="px-6 py-2 bg-red-500 text-white font-bold rounded-full shadow-lg hover:bg-red-600 transition-colors duration-300 text-sm"
            >
              Clear Selection
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BodyMap;
