/* This is the /api/quiz/generate endpoint.
 *
 * Its purpose is to generate a new quiz into the database using some
 * external AI service given a simple text topic from a user.
 *
 * JWT authorization is required for this endpoint.
 */

import { ChatOpenAI } from "@langchain/openai";
import { HumanMessage, SystemMessage } from "@langchain/core/messages";
import { verifyAndRefreshJWT } from "../utils/jwtService.js";
import {
  BAD_REQUEST,
  INTERNAL_ERROR,
  SUCCESS,
  UNAUTHORIZED,
} from "../utils/responseCodeConstants.js";

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

const SYSTEM_PROMPT = `
You are a quiz-generating AI that creates multiple-choice questions about any topic.

Given a topic, return a JSON object with the following structure:

Do not include any helper text or explanations. Output only the JSON object.

{
  "summary": "A concise summary of the quiz content in at most 10 words.",
  "questions": [
    {
      "question": "The text of the question",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": "One of the options, exactly matching one above"
    },
    ...
  ]
}

Rules:
- At no point should the response contain any text other than a valid JSON object.
- Return exactly 10 quiz questions in the "questions" array.
- Each question must have:
  - A "question" field (the text of the question)
  - An "options" field (array of 4 answer choices)
  - A "correctAnswer" field (must match one of the options exactly)
- The "summary" field must be a single string with at most 10 words.
- The entire response must be valid JSON.
- If the topic is too broad or complex, generate simple and straightforward questions.
- Increase difficulty gradually from question 1 to 10.
- If the topic is inappropriate or explicit, return an empty array as the "questions" value and an empty string as the "summary".
- Questions and answers must be appropriate for a college classroom and must not contain sensitive or explicit content.

Do not include any helper text or explanations. Output only the JSON object in valid JSON format.
`;

const model = new ChatOpenAI({
  openAIApiKey: OPENAI_API_KEY,
  modelName: "gpt-4.1-mini",
  temperature: 0.7,
});

export async function generateQuiz(req, res, next) {
  // Expects a topic in the request body
  const { topic, jwt } = req.body;

  const [jwtPayload, jwtRefreshStr, jwtVerified] = verifyAndRefreshJWT(jwt);
  if (!jwtVerified)
    return res.status(UNAUTHORIZED).json({ error: "JWT invalid or expired" });

  if (!topic) {
    res.status(BAD_REQUEST).json({
      questions: "",
      summary: "",
      error: "Topic is required",
      jwt: jwtRefreshStr,
    });
  }

  const messages = [new SystemMessage(SYSTEM_PROMPT), new HumanMessage(topic)];

  try {
    const response = await model.invoke(messages);
    const responseParsed = JSON.parse(response.content);

    if (responseParsed.questions.length < 5) {
      throw new Error("Invalid Topic, Try again with a different topic.");
    }

    const questionsString = JSON.stringify(responseParsed.questions);
    const summaryString = responseParsed.summary;

    const result = await req.app.locals.mongodb
      .collection("Quizzes")
      .insertOne({
        title: topic,
        summary: summaryString,
        questions: responseParsed.questions, // an object array: [{question: "", options: [], correctAnswer: ""}, {question: "", options: [], correctAnswer: ""}, ...]
        created_by_id: jwtPayload.userId,
      });

    res.status(SUCCESS).json({
      quizID: result.insertedId.toString(),
      questions: questionsString,
      summary: summaryString,
      error: "",
      jwt: jwtRefreshStr,
    });
  } catch (error) {
    res.status(INTERNAL_ERROR).json({
      questions: "",
      summary: "",
      error: "Error: " + error.message,
      jwt: jwtRefreshStr,
    });
  }
}
