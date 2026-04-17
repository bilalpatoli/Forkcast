export type DishRecommendation = {
  name: string;
  reason: string;
};

export type DishRecommendationResult = {
  topDishes: DishRecommendation[];
  whatToOrder: string;
  summary: string;
};

