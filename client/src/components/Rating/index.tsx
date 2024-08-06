import { Star } from "lucide-react";

type RatingProps = {
  rating: number;
};

export default function Rating({ rating }: RatingProps) {
  return [1, 2, 3, 4, 5].map((i) => (
    <Star
      key={i}
      className="h-4 w-4"
      color={i <= rating ? "#F9D71C" : "#D1D5DB"}
    />
  ));
}
