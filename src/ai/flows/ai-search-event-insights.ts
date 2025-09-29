'use server';

/**
 * @fileOverview AI-powered search for WWF event insights.
 *
 * This file defines a Genkit flow that allows users to search the event timeline
 * using keywords or natural language. The AI provides relevant search results
 * and contextual insights, highlighting key information within the entries that
 * match the query, even if the match isn't exact.
 *
 * @function searchEventInsights - The main function to initiate the search flow.
 * @typedef {AISearchEventInsightsInput} AISearchEventInsightsInput - Input type for the searchEventInsights function.
 * @typedef {AISearchEventInsightsOutput} AISearchEventInsightsOutput - Return type for the searchEventInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AISearchEventInsightsInputSchema = z.object({
  query: z.string().describe('The search query from the user.'),
  eventData: z.array(z.string()).describe('Array of event strings to search through.'),
});
export type AISearchEventInsightsInput = z.infer<typeof AISearchEventInsightsInputSchema>;

const AISearchEventInsightsOutputSchema = z.object({
  results: z
    .array(
      z.object({
        event: z.string().describe('The matching event data.'),
        insights: z
          .string()
          .describe(
            'AI-generated insights about the event relevance to the query.'
          ),
      })
    )
    .describe('Search results with event data and AI-generated insights.'),
});
export type AISearchEventInsightsOutput = z.infer<
  typeof AISearchEventInsightsOutputSchema
>;

export async function searchEventInsights(
  input: AISearchEventInsightsInput
): Promise<AISearchEventInsightsOutput> {
  return searchEventInsightsFlow(input);
}

const eventInsightPrompt = ai.definePrompt({
  name: 'eventInsightPrompt',
  input: {schema: AISearchEventInsightsInputSchema},
  output: {schema: AISearchEventInsightsOutputSchema},
  prompt: `You are an AI search engine for a timeline of 2000 WWF wrestling events.
The user is searching for: {{{query}}}

Search through the following event data and return only the events that are relevant to the user's query. For each relevant event, provide a short, one-sentence insight explaining why it matches the query.

Event Data:
{{#each eventData}}
- {{{this}}}
{{/each}}

If no events are relevant, return an empty array for the results.
`,
});

const searchEventInsightsFlow = ai.defineFlow(
  {
    name: 'searchEventInsightsFlow',
    inputSchema: AISearchEventInsightsInputSchema,
    outputSchema: AISearchEventInsightsOutputSchema,
  },
  async input => {
    const {output} = await eventInsightPrompt(input);
    return output!;
  }
);
