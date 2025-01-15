export const textLimitHelper = ({
  text, 
  limit
}: {
  text: string | null, 
  limit: number
}) => {
  if (text && text?.length > limit) {
    const limitedText = text?.slice(0, limit - 3);

    return `${limitedText}...`
  }

  return text
}