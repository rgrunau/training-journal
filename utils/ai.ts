import { OpenAI } from 'langchain/llms/openai'
import { StructuredOutputParser } from 'langchain/output_parsers'
import { PromptTemplate } from 'langchain/prompts'
import z from 'zod'

const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    mood: z
      .string()
      .describe('The mood of the person who wrote journal entry.'),
    summary: z
      .string()
      .describe('A quick summary of the entire journal entry.'),
    negative: z
      .boolean()
      .describe(
        'Whether the journal entry is negative? (i.e. does it contain negative emotions?)'
      ),
    color: z
      .string()
      .describe(
        'A hexadecimal color code representing the mood of the journal entry. Example: #FF0000 for mad.'
      ),
  })
)

const getPrompt = async (content: string) => {
  const format_instructions = parser.getFormatInstructions()

  const prompt = new PromptTemplate({
    template: `Analyze the following journal entry. Follow the instructions and format your response to 
      match the format instructions, no matter what! \n{format_instructions}\n{entry}`,
    inputVariables: ['entry'],
    partialVariables: { format_instructions },
  })
  const input = await prompt.format({
    entry: content,
  })
  return input
}

export const analyzeJournalEntry = async (content: string) => {
  const input = await getPrompt(content)
  const model = new OpenAI({
    temperature: 0,
    modelName: 'gpt-3.5-turbo',
    openAIApiKey: process.env.OPENAI_API_KEY,
  })
  const result = await model.call(input)
  try {
    return parser.parse(result)
  } catch (e) {
    console.log(e)
  }
}
