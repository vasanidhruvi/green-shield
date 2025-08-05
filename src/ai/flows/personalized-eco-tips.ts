'use server';

/**
 * @fileOverview Personalized eco-tips AI agent.
 *
 * - getPersonalizedEcoTips - A function that provides a personalized eco-action plan.
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

const ActionStepSchema = z.object({
    title: z.string().describe("A short, catchy title for the action step."),
    description: z.string().describe("A detailed description of the action step and why it's beneficial."),
    category: z.enum(["Transport", "Food", "Home", "Shopping", "Community"]).describe("The category of the tip."),
    difficulty: z.enum(["Easy", "Medium", "Hard"]).describe("The difficulty level of implementing this step.")
});

const PersonalizedEcoTipsOutputSchema = z.object({
  planTitle: z.string().describe("A creative and inspiring title for the user's personalized eco-plan."),
  introduction: z.string().describe("A brief, encouraging introduction to the action plan."),
  actionSteps: z.array(ActionStepSchema).describe('A list of personalized action steps.'),
});
export type PersonalizedEcoTipsOutput = z.infer<typeof PersonalizedEcoTipsOutputSchema>;

export async function getPersonalizedEcoTips(input: PersonalizedEcoTipsInput): Promise<PersonalizedEcoTipsOutput> {
  return personalizedEcoTipsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedEcoTipsPrompt',
  input: {schema: PersonalizedEcoTipsInputSchema},
  output: {schema: PersonalizedEcoTipsOutputSchema},
  prompt: `You are an AI assistant designed to create a personalized "Eco-Action Plan" for users based on their lifestyle, location, and regional climate issues.

Generate a creative and inspiring plan with actionable, personalized steps. Each step should be categorized and have a difficulty rating.

The plan should be tailored to the user's specific context.

Lifestyle: {{{lifestyle}}}
Location: {{{location}}}
Climate Issues: {{{climateIssues}}}
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
