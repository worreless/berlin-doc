import { useEffect, useState } from 'react';
import { ImageWithPreloader } from './components/ImageWithPreloader';
import { AIChat } from './components/AIChat';
import BodyMap from './components/BodyMap';
import './App.css'
import { useConversationStore } from './store/useConversationStore';
import DiagnosisSubmission from './components/DiagnosisSubmission';
import { useDiagnosisStore } from './store/useDiagnosisStore';

function App() {
  const { mainImageSrc, fetchPosts } = useConversationStore();
  const { submitDiagnosis } = useDiagnosisStore();
//   const [imageURL, setImageURL] = useState('');

  const performTest = async (action: string) => {
    fetchPosts({ conversation: 'Hello', action });
  }

  useEffect(() => {
    console.log('App useEffect: Calling fetchPosts'); // Added for debugging
    fetchPosts({ conversation: 'Hello', action: 'start' });
  }, [fetchPosts]);
  return (
    <>
      <ImageWithPreloader src={mainImageSrc ? mainImageSrc : ''} height={500} alt="desc" loaderSize={40} />
      <AIChat />
      <BodyMap 
        onSelectBodyPart={performTest}
      />
      <DiagnosisSubmission 
        onDiagnosisSubmit={submitDiagnosis}
      />
    </>
  )
}

export default App
