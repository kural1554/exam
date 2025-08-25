'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating explanations for exam questions.
 *
 * - generateQuestionExplanations - A function that triggers the flow to generate explanations for a list of questions.
 * - GenerateQuestionExplanationsInput - The input type for the generateQuestionExplanations function, which is a list of question IDs.
 * - GenerateQuestionExplanationsOutput - The output type for the generateQuestionExplanations function, which is a map of question IDs to explanations.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuestionExplanationsInputSchema = z.array(z.object({
  questionId: z.string().describe('The ID of the question to generate an explanation for.'),
  questionText: z.string().describe('The text of the question.'),
  correctAnswer: z.string().describe('The correct answer to the question.'),
  userAnswer: z.string().describe('The answer provided by the user.'),
})).describe('A list of question IDs to generate explanations for.');
export type GenerateQuestionExplanationsInput = z.infer<typeof GenerateQuestionExplanationsInputSchema>;

const GenerateQuestionExplanationsOutputSchema = z.record(z.string(), z.string()).describe('A map of question IDs to AI-generated explanations.');
export type GenerateQuestionExplanationsOutput = z.infer<typeof GenerateQuestionExplanationsOutputSchema>;

export async function generateQuestionExplanations(input: GenerateQuestionExplanationsInput): Promise<GenerateQuestionExplanationsOutput> {
  return generateQuestionExplanationsFlow(input);
}

const questionExplanationPrompt = ai.definePrompt({
  name: 'questionExplanationPrompt',
  input: {schema: GenerateQuestionExplanationsInputSchema},
  output: {schema: GenerateQuestionExplanationsOutputSchema},
  prompt: `You are an expert tutor, skilled in explaining complex topics in a clear and concise manner.

  For each question, provide a detailed explanation of the correct solution and the reasoning behind it.
  The explanation should be easy to understand and should help the user learn from their mistakes.

  Here are the questions and the user's answers:
  {{#each this}}
  Question ID: {{questionId}}
  Question: {{questionText}}
  Correct Answer: {{correctAnswer}}
  User Answer: {{userAnswer}}
  Explanation:
  {{/each}}
  `,
});

const generateQuestionExplanationsFlow = ai.defineFlow(
  {
    name: 'generateQuestionExplanationsFlow',
    inputSchema: GenerateQuestionExplanationsInputSchema,
    outputSchema: GenerateQuestionExplanationsOutputSchema,
  },
  async input => {
    const {output} = await questionExplanationPrompt(input);
    return output!;
  }
);
