import { ComponentProps, useState } from "react";
import { FormRegister } from "types/UseForm";

import styles from "./Rating.module.scss";

type RatingProps = {
  rating?: number;
  color?: string;
  size?: number;
  disabled?: boolean;
  register?: ReturnType<FormRegister>;
  onChange?: (rating: number) => void;
} & ComponentProps<"div">;

const Rating = ({
  rating = 0,
  color = "#faa500",
  size = 25,
  disabled = false,
  className,
  register,
  onChange,
}: RatingProps) => {
  let [value, setValue] = useState(rating);

  const starFilled = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
    >
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z" />
    </svg>
  );

  const starOutline = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill={color}
      viewBox="0 0 24 24"
    >
      <path d="M12 5.173l2.335 4.817 5.305.732-3.861 3.71.942 5.27-4.721-2.524-4.721 2.525.942-5.27-3.861-3.71 5.305-.733 2.335-4.817zm0-4.586l-3.668 7.568-8.332 1.151 6.064 5.828-1.48 8.279 7.416-3.967 7.416 3.966-1.48-8.279 6.064-5.827-8.332-1.15-3.668-7.569z" />
    </svg>
  );

  let star = Array(value)
    .fill(starFilled)
    .concat(Array(5 - value).fill(starOutline));

  return (
    <div
      className={`${styles.container} ${className || ""}`.trim()}
      {...(!disabled && { onMouseLeave: () => setValue(rating) })}
      {...(register && { ...register })}
    >
      {star.map((list, index) => {
        return (
          <div
            key={index}
            style={{ cursor: disabled ? "default" : "pointer" }}
            {...(!disabled && {
              onMouseEnter: () => setValue(index + 1),
              onClick: () => onChange?.(index + 1),
            })}
          >
            {list}
          </div>
        );
      })}
    </div>
  );
};

export default Rating;
