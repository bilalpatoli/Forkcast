import { buildRecommendationPrompt } from "@/lib/openai/prompts";
import type { DishRecommendationResult } from "@/types/recommendation";
import type { RestaurantPhoto, RestaurantReview } from "@/types/restaurant";
import { ApiError } from "@/lib/api/errors";
import { isDishRecommendationResult } from "@/lib/validators/recommendations";

type GetDishRecommendationsInput = {
  restaurantName: string;
  reviews: RestaurantReview[];
  photos: RestaurantPhoto[];
};

const fallbackRecommendation: DishRecommendationResult = {
  topDishes: [],
  whatToOrder:
    "Recommendations are not available yet. Check the reviews for repeated dish mentions.",
  summary: "Forkcast needs review and photo evidence before suggesting dishes."
};

export async function getDishRecommendations(
  input: GetDishRecommendationsInput
): Promise<DishRecommendationResult> {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return fallbackRecommendation;
  }

  const prompt = buildRecommendationPrompt(input);
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
      input: [
        {
          role: "system",
          content:
            "Return concise dish recommendations as JSON that matches the schema."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      text: {
        format: {
          type: "json_schema",
          name: "dish_recommendations",
          strict: true,
          schema: {
            type: "object",
            additionalProperties: false,
            required: ["topDishes", "whatToOrder", "summary"],
            properties: {
              topDishes: {
                type: "array",
                maxItems: 5,
                items: {
                  type: "object",
                  additionalProperties: false,
                  required: ["name", "reason"],
                  properties: {
                    name: { type: "string" },
                    reason: { type: "string" }
                  }
                }
              },
              whatToOrder: { type: "string" },
              summary: { type: "string" }
            }
          }
        }
      }
    })
  });

  if (!response.ok) {
    throw new ApiError("OpenAI recommendation request failed", response.status);
  }

  const data = (await response.json()) as OpenAIResponse;
  const outputText = data.output
    ?.flatMap((item) => item.content ?? [])
    .find((content) => content.type === "output_text")?.text;

  if (!outputText) {
    return fallbackRecommendation;
  }

  let recommendation: unknown;

  try {
    recommendation = JSON.parse(outputText);
  } catch {
    return fallbackRecommendation;
  }

  if (!isDishRecommendationResult(recommendation)) {
    return fallbackRecommendation;
  }

  return recommendation;
}

type OpenAIResponse = {
  output?: {
    content?: {
      type: string;
      text?: string;
    }[];
  }[];
};
