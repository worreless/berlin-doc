import React, { useState } from 'react';
import { useDiagnosisStore } from '../store/useDiagnosisStore';

interface DiagnosisSubmissionProps {
    onDiagnosisSubmit: (diagnosis: string) => void;
}
  
const DiagnosisSubmission: React.FC<DiagnosisSubmissionProps> = ({ onDiagnosisSubmit }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const { diagnosisResponse } = useDiagnosisStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Submitting diagnosis:', inputValue);
    onDiagnosisSubmit(inputValue);
    setInputValue('');
  };

  const buttonStyle = {
    width: '100%',
    padding: '0.5rem 1rem',
    borderRadius: '0.5rem',
    fontWeight: '600',
    transition: 'background-color 0.2s ease',
    backgroundColor: inputValue.trim() === '' ? '#9ca3af' : '#2563eb',
    color: 'white',
    cursor: inputValue.trim() === '' ? 'not-allowed' : 'pointer'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '2rem',
        borderRadius: '0.75rem',
        width: '100%',
        maxWidth: '28rem'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '1.5rem',
          color: '#1f2937'
        }}>Submit Your Diagnosis</h1>
        
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter diagnosis here when ready"
                style={{
                    boxSizing: 'border-box',
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    outline: 'none',
                    maxWidth: '100%'
                }}
            />
            <button
                type="submit"
                disabled={inputValue.trim() === ''}
                style={buttonStyle}
            >
                Submit
            </button>
        </form>

        {diagnosisResponse && (
          <div style={{
            marginTop: '1.5rem',
            padding: '1rem',
            backgroundColor: '#dbeafe',
            border: '1px solid #bfdbfe',
            color: '#1e40af',
            borderRadius: '0.5rem'
          }}>
            <h2 style={{
              fontWeight: '600',
              marginBottom: '0.25rem'
            }}>Feedback:</h2>
            <p style={{ wordWrap: 'break-word' }}>{diagnosisResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiagnosisSubmission;
