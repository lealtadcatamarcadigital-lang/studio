
'use client';

import Image from 'next/image';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';

export function LoadingSpinner() {
    const [progress, setProgress] = useState(13)
 
    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground">
        <div className="flex flex-col items-center gap-4">
            <div className="animate-pulse">
                <Image
                    src="https://i.imgur.com/ITpm1XW.png"
                    alt="Attitude Rewind Logo"
                    width={128}
                    height={128}
                    className="h-32 w-32"
                />
            </div>
            <h1 className="text-2xl font-bold font-headline">
                <span className="text-foreground">Attitude</span>
                <span className="text-red-500">Rewind</span>
            </h1>
            <Progress value={progress} className="w-[60%] mt-4" />
        </div>
    </div>
  );
}
