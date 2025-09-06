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
    console.log('action', action);
    fetchPosts({ conversation: 'Hello', action });
  }

  useEffect(() => {
    console.log('App useEffect: Calling fetchPosts'); // Added for debugging
    fetchPosts({ conversation: 'Hello', action: 'start' });
  }, [fetchPosts]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-gray-800 text-white p-4 flex-shrink-0">
        <h1 className="text-xl">Berlin-doc</h1>
      </header>
      <main className="flex-grow flex flex-col items-center p-4 space-y-4">
        <ImageWithPreloader height={500} src={mainImageSrc ? mainImageSrc : ''} alt="desc" loaderSize={40} />
        <div className="w-full max-w-4xl">
          <AIChat />
        </div>
        <div className="w-full max-w-4xl">
            <BodyMap 
                onSelectBodyPart={performTest}
            />
            <DiagnosisSubmission 
                onDiagnosisSubmit={submitDiagnosis}
            />
        </div>
      </main>
    </div>
  )
}

export default App