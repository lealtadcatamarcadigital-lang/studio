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
  results: z.array(
    z.object({
      event: z.string().describe('The matching event data.'),
      insights: z.string().describe('AI-generated insights about the event relevance to the query.'),
    })
  ).describe('Search results with event data and AI-generated insights.'),
});
export type AISearchEventInsightsOutput = z.infer<typeof AISearchEventInsightsOutputSchema>;

export async function searchEventInsights(input: AISearchEventInsightsInput): Promise<AISearchEventInsightsOutput> {
  return searchEventInsightsFlow(input);
}

const eventInsightPrompt = ai.definePrompt({
  name: 'eventInsightPrompt',
  input: {
    schema: z.object({
      query: z.string(),
      event: z.string(),
    }),
  },
  output: {
    schema: z.string(),
  },
  prompt: `You are an AI assistant that provides insights on the relevance of a WWF event to a user's search query.\n  The user is searching for: {{{query}}}\n  The event data is: {{{event}}}\n  Provide a short explanation of why this event is relevant to the search query. If the event is not relevant, explain why.  Be concise.
  `,
});

const searchEventInsightsFlow = ai.defineFlow(
  {
    name: 'searchEventInsightsFlow',
    inputSchema: AISearchEventInsightsInputSchema,
    outputSchema: AISearchEventInsightsOutputSchema,
  },
  async input => {
    const results = [];
    for (const event of input.eventData) {
      const {output} = await eventInsightPrompt({
        query: input.query,
        event: event,
      });

      results.push({
        event: event,
        insights: output!,
      });
    }

    return {results: results};
  }
);
