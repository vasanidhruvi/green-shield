'use server';

/**
 * @fileOverview Personalized eco-tips AI agent.
 *
 * - getPersonalizedEcoTips - A function that provides personalized eco-tips.
 * - PersonalizedEcoTipsInput - The input type for the getPersonalizedEcoTips function.
 * - PersonalizedEcoTipsOutput - The return type for the getPersonalizedEcoTips function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedEcoTipsInputSchema = z.object({
  lifestyle: z
    .string()
    .describe('Description of the user lifestyle, spending habits, and mobility.'),
  location: z.string().describe('The user location.'),
  climateIssues: z.string().describe('The regional climate issues.'),
});
export type PersonalizedEcoTipsInput = z.infer<typeof PersonalizedEcoTipsInputSchema>;

const PersonalizedEcoTipsOutputSchema = z.object({
  tips: z.array(z.string()).describe('A list of personalized eco-tips.'),
});
export type PersonalizedEcoTipsOutput = z.infer<typeof PersonalizedEcoTipsOutputSchema>;

export async function getPersonalizedEcoTips(input: PersonalizedEcoTipsInput): Promise<PersonalizedEcoTipsOutput> {
  return personalizedEcoTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedEcoTipsPrompt',
  input: {schema: PersonalizedEcoTipsInputSchema},
  output: {schema: PersonalizedEcoTipsOutputSchema},
  prompt: `You are an AI assistant designed to provide personalized eco-tips to users based on their lifestyle, location and regional climate issues.\n\nConsider the user's lifestyle, spending habits, mobility, location, and the climate issues of their region to generate personalized and actionable eco-tips. The tips should be easy to implement in their daily lives.\n\nLifestyle: {{{lifestyle}}}\nLocation: {{{location}}}\nClimate Issues: {{{climateIssues}}}\n\nTips:
`,
});

const personalizedEcoTipsFlow = ai.defineFlow(
  {
    name: 'personalizedEcoTipsFlow',
    inputSchema: PersonalizedEcoTipsInputSchema,
    outputSchema: PersonalizedEcoTipsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
