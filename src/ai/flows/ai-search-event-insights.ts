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

const EventObjectSchema = z.object({
  id: z.string().describe('Un identificador único para el evento.'),
  text: z.string().describe('La descripción textual del evento a buscar.'),
});

const AISearchEventInsightsInputSchema = z.object({
  query: z.string().describe('La consulta de búsqueda del usuario.'),
  eventData: z.array(EventObjectSchema).describe('Array de objetos de evento para buscar.'),
});
export type AISearchEventInsightsInput = z.infer<typeof AISearchEventInsightsInputSchema>;

const AISearchEventInsightsOutputSchema = z.object({
  results: z
    .array(
      z.object({
        eventId: z.string().describe('El ID del evento coincidente.'),
        eventText: z.string().describe('El texto del evento coincidente.'),
        insights: z
          .string()
          .describe(
            'Perspectivas generadas por la IA sobre la relevancia del evento para la consulta (en español).'
          ),
      })
    )
    .describe('Resultados de búsqueda con datos de eventos y perspectivas generadas por la IA.'),
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
  prompt: `Eres un motor de búsqueda de IA para una cronología de eventos de lucha libre de la WWF del año 2000.
El usuario está buscando: {{{query}}}

Busca en los siguientes datos de eventos y devuelve solo los eventos que sean relevantes para la consulta del usuario.
Para cada evento relevante, proporciona una breve perspectiva de una oración en español que explique por qué coincide con la consulta.
Devuelve el 'eventId' y 'eventText' originales para cada resultado.

Datos del evento:
{{#each eventData}}
- ID: {{{this.id}}}, Texto: {{{this.text}}}
{{/each}}

Si ningún evento es relevante, devuelve un array vacío para los resultados.
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
