
'use client';

import Image from 'next/image';
import { Progress } from './ui/progress';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function LoadingSpinner() {
    const [progress, setProgress] = useState(13)
 
    useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500)
      return () => clearTimeout(timer)
    }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="flex flex-col items-center gap-4">
            <div className="animate-pulse">
                <Image
                    src="https://i.imgur.com/ITpm1XW.png"
                    alt="Attitude Rewind Logo"
                    width={192}
                    height={192}
                    className="h-48 w-48"
                />
            </div>
            <h1 className="text-3xl font-bold font-headline">
                <span className="text-white">Attitude</span>
                <span className="text-red-500">Rewind</span>
            </h1>
            <Progress value={progress} className={cn("w-[60%] mt-4", "progress-red")} />
        </div>
    </div>
  );
}
