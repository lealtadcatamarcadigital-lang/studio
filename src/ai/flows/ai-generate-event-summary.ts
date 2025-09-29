'use server';

/**
 * @fileOverview AI-powered event summary generation.
 *
 * This file defines a Genkit flow that generates a brief, non-spoiler summary
 * for a wrestling event given the event name and the matches.
 *
 * @function generateEventSummary - The main function to initiate the summary generation flow.
 * @typedef {AIGenerateEventSummaryInput} AIGenerateEventSummaryInput - Input type for the generateEventSummary function.
 * @typedef {AIGenerateEventSummaryOutput} AIGenerateEventSummaryOutput - Return type for the generateEventSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIGenerateEventSummaryInputSchema = z.object({
  eventName: z.string().describe('The name of the wrestling event.'),
  matches: z.array(z.string()).describe('A list of matches scheduled for the event.'),
});
export type AIGenerateEventSummaryInput = z.infer<typeof AIGenerateEventSummaryInputSchema>;

const AIGenerateEventSummaryOutputSchema = z.object({
  summary: z.string().describe('A brief, non-spoiler summary of the event.'),
});
export type AIGenerateEventSummaryOutput = z.infer<typeof AIGenerateEventSummaryOutputSchema>;

export async function generateEventSummary(input: AIGenerateEventSummaryInput): Promise<AIGenerateEventSummaryOutput> {
  return generateEventSummaryFlow(input);
}

const eventSummaryPrompt = ai.definePrompt({
  name: 'eventSummaryPrompt',
  input: {
    schema: AIGenerateEventSummaryInputSchema,
  },
  output: {
    schema: AIGenerateEventSummaryOutputSchema,
  },
  prompt: `You are a wrestling historian. Generate a short, non-spoiler summary for the following event.
Focus on the main storylines and rivalries leading into the event. Do not reveal any match outcomes.
The summary should be about 2-3 sentences.

Event: {{{eventName}}}
Matches:
{{#each matches}}
- {{{this}}}
{{/each}}
`,
});

const generateEventSummaryFlow = ai.defineFlow(
  {
    name: 'generateEventSummaryFlow',
    inputSchema: AIGenerateEventSummaryInputSchema,
    outputSchema: AIGenerateEventSummaryOutputSchema,
  },
  async input => {
    const {output} = await eventSummaryPrompt(input);
    return { summary: output!.summary };
  }
);
