
'use server';

/**
 * @fileOverview AI-powered event summary generation.
 *
 * This file defines a Genkit flow that generates a brief, non-spoiler summary
 * for a wrestling event given the event name and the matches.
 *
 * @function generateEventSummary - The main function to initiate the summary generation flow.
 * @typedef {AIGenerateEventSummaryInput} AIGenerateEventSummaryInput - Input type for the generateEventSummaryInput function.
 * @typedef {AIGenerateEventSummaryOutput} AIGenerateEventSummaryOutput - Return type for the generateEventSummaryOutput function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AIGenerateEventSummaryInputSchema = z.object({
  eventName: z.string().describe('The name of the wrestling event.'),
  matches: z.array(z.string()).describe('A list of matches scheduled for the event.'),
});
export type AIGenerateEventSummaryInput = z.infer<typeof AIGenerateEventSummaryInputSchema>;

const AIGenerateEventSummaryOutputSchema = z.object({
  summary: z.string().describe('Un breve resumen del evento, sin spoilers.'),
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
  prompt: `Eres un historiador de la lucha libre. Genera un resumen breve y sin spoilers para el siguiente evento en español.
Céntrate en las principales historias y rivalidades que conducen al evento. No reveles ningún resultado de los combates.
El resumen debe tener unas 2-3 frases.

Evento: {{{eventName}}}
Combates:
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
