import React, { useState } from 'react';
import { useConversationStore } from '../store/useConversationStore';

type ImageWithPreloaderProps = React.ImgHTMLAttributes<HTMLImageElement> & {
    loaderSize?: number;
};

const spinnerStyle = (size: number) => ({
    width: size,
    height: size,
    border: '4px solid #ccc',
    borderTop: '4px solid #333',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: 'auto',
    display: 'block',
});

const spinnerKeyframes = `
@keyframes spin {
  to { transform: rotate(360deg); }
}
`;

export const ImageWithPreloader: React.FC<ImageWithPreloaderProps> = ({
    loaderSize = 32,
    ...imgProps
}) => {
    const {isLoading } = useConversationStore();

    return (
        <div style={{ height: '500px', position: 'relative', display: 'inline-block' }}>
            <style>{spinnerKeyframes}</style>
            {(isLoading) && (
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    zIndex: 1,
                }}>
                    <div style={spinnerStyle(loaderSize)} />
                </div>
            )}
            {imgProps.src && (
                <img
                    {...imgProps}
                    style={{
                        opacity: isLoading ? 0 : 1,
                        transition: 'opacity 0.3s',
                        display: 'block',
                        ...imgProps.style,
                    }}
                    onLoad={(e) => {
                        imgProps.onLoad?.(e);
                    }}
                />
            )}
        </div>
    );
};