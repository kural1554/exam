'use server';
/**
 * @fileOverview This file defines a Genkit flow for adaptive exam question selection.
 *
 * The flow adjusts the difficulty of exam questions based on the user's performance.
 * It exports the AdaptiveExamQuestionSelectionInput and AdaptiveExamQuestionSelectionOutput types,
 * as well as the adaptiveExamQuestionSelection function to trigger the flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptiveExamQuestionSelectionInputSchema = z.object({
  currentDifficulty: z
    .number()
    .describe('The current difficulty level of the exam (e.g., 1-10).'),
  userAnswerCorrect: z
    .boolean()
    .describe('Whether the user answered the previous question correctly.'),
  examType: z.string().describe('The type of exam (e.g., Math, Science).'),
});
export type AdaptiveExamQuestionSelectionInput = z.infer<
  typeof AdaptiveExamQuestionSelectionInputSchema
>;

const AdaptiveExamQuestionSelectionOutputSchema = z.object({
  newDifficulty: z
    .number()
    .describe(
      'The new difficulty level for the next question, adjusted based on user performance.'
    ),
  reasoning: z
    .string()
    .describe(
      'The reasoning behind the adjustment of the difficulty level, for debugging purposes.'
    ),
});
export type AdaptiveExamQuestionSelectionOutput = z.infer<
  typeof AdaptiveExamQuestionSelectionOutputSchema
>;

export async function adaptiveExamQuestionSelection(
  input: AdaptiveExamQuestionSelectionInput
): Promise<AdaptiveExamQuestionSelectionOutput> {
  return adaptiveExamQuestionSelectionFlow(input);
}

const adaptiveExamQuestionSelectionPrompt = ai.definePrompt({
  name: 'adaptiveExamQuestionSelectionPrompt',
  input: {schema: AdaptiveExamQuestionSelectionInputSchema},
  output: {schema: AdaptiveExamQuestionSelectionOutputSchema},
  prompt: `You are an AI that helps adjust the difficulty of exam questions based on a user's performance.

  The current exam type is: {{{examType}}}
  The current difficulty level is: {{{currentDifficulty}}}
  The user's last answer was correct: {{{userAnswerCorrect}}}

  Based on this information, determine the new difficulty level for the next question.

  If the user answered correctly, increase the difficulty slightly (e.g., by 1 or 2 levels), but do not exceed a maximum difficulty of 10.
  If the user answered incorrectly, decrease the difficulty slightly (e.g., by 1 or 2 levels), but do not go below a minimum difficulty of 1.

  Provide a brief explanation of why you adjusted the difficulty level in the reasoning field.

  Return the new difficulty level and the reasoning behind it.
  `,
});

const adaptiveExamQuestionSelectionFlow = ai.defineFlow(
  {
    name: 'adaptiveExamQuestionSelectionFlow',
    inputSchema: AdaptiveExamQuestionSelectionInputSchema,
    outputSchema: AdaptiveExamQuestionSelectionOutputSchema,
  },
  async input => {
    const {output} = await adaptiveExamQuestionSelectionPrompt(input);
    return output!;
  }
);
