export const formatPrice = (price) => {
  if (!price && price !== 0) {
    return "0₫";
  }

  const numericPrice =
    typeof price === "string"
      ? parseFloat(price.replace(/[,₫]/g, ""))
      : Number(price);

  if (isNaN(numericPrice)) {
    return "0₫";
  }

  const formattedNumber = new Intl.NumberFormat("vi-VN").format(numericPrice);
  return `${formattedNumber}₫`;
};
