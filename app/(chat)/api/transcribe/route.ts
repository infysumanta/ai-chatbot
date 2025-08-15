import { NextRequest, NextResponse } from 'next/server';
import { experimental_transcribe as transcribe } from 'ai';
import { openai } from '@ai-sdk/openai';

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;

    if (!audioFile) {
      return NextResponse.json(
        { error: 'No audio file provided' },
        { status: 400 }
      );
    }

    // Convert File to Uint8Array for AI SDK transcription
    const arrayBuffer = await audioFile.arrayBuffer();
    const audioBuffer = new Uint8Array(arrayBuffer);
    
    // Use AI SDK's experimental transcribe function
    const result = await transcribe({
      model: openai.transcription('whisper-1'),
      audio: audioBuffer,
    });

    return NextResponse.json({
      transcript: result.text,
      language: result.language,
      durationInSeconds: result.durationInSeconds,
    });
  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: 'Failed to transcribe audio' },
      { status: 500 }
    );
  }
}