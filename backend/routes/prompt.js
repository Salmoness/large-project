import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `
    You are a quiz-generating AI that creates multiple-choice questions about any topic.

    Given a topic, return exactly 10 quiz questions in strict JSON format. Each question must have:
    - A "question" field (the text of the question)
    - An "options" field (array of 4 answer choices)
    - A "correctAnswer" field (must match one of the options exactly)

    The entire response must be a valid JSON array of 10 such question objects.

    Example input:
    "Photosynthesis"

    Example output:
    [
    {
        "question": "What is the main purpose of photosynthesis?",
        "options": ["Produce oxygen", "Absorb carbon dioxide", "Generate glucose", "Break down food"],
        "correctAnswer": "Generate glucose"
    },
    ...
    ]`;

const model = new ChatOpenAI({
    openAIApiKey: OPENAI_API_KEY,
    modelName: "gpt-4.1-mini",
    temperature: 0.7,
});


export async function prompt(req, res, next) {
    // Expects a topic in the request body
    const { topic } = req.body;
    if (!topic) {
        res.status(400).json({ questions: topic, error: "Topic is required" });
    }

    const messages = [
        new SystemMessage(SYSTEM_PROMPT),
        new HumanMessage(topic)
    ];

    try {
        const response = await model.invoke(messages);
        // Parse the response as JSON 
        const parsedResponse = JSON.parse(response.content);
        res.status(200).json({ questions: parsedResponse, error: ""});
    } 
    catch (error) {
        res.status(400).json({ questions: "", error: "Error: " + error.message });
    }
}