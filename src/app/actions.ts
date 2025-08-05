
'use server';

import {
  getPersonalizedEcoTips,
  type PersonalizedEcoTipsOutput,
} from '@/ai/flows/personalized-eco-tips';
import { z } from 'zod';

const formSchema = z.object({
  lifestyle: z.string().min(20, 'Please describe your lifestyle in at least 20 characters.'),
  location: z.string().min(3, 'Please enter a valid location.'),
  climateIssues: z.string().min(20, 'Please describe the climate issues in your region in at least 20 characters.'),
});

export type FormState = {
  message: string;
  tips?: string[];
  errors?: {
    lifestyle?: string[];
    location?: string[];
    climateIssues?: string[];
  }
}

export async function generateTips(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    lifestyle: formData.get('lifestyle'),
    location: formData.get('location'),
    climateIssues: formData.get('climateIssues'),
  });

  if (!validatedFields.success) {
    return {
      message: 'Please fix the errors below.',
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const result: PersonalizedEcoTipsOutput = await getPersonalizedEcoTips(validatedFields.data);
    if (result.tips && result.tips.length > 0) {
      return { message: 'Here are your personalized eco-tips!', tips: result.tips, errors: {} };
    } else {
      return { message: 'Could not generate tips based on your input. Please try a different description.' };
    }
  } catch (e) {
    console.error(e);
    return { message: 'An unexpected error occurred on the server. Please try again later.' };
  }
}
