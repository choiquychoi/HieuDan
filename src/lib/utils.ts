/**
 * Định dạng số tiền sang định dạng tiền tệ Việt Nam Đồng (VND)
 * Ví dụ: 3500000 -> 3.500.000 ₫
 * Nếu null, undefined hoặc <= 0 -> trả về "Liên hệ"
 */
export function formatCurrency(amount: number | null | undefined): string {
  if (amount === null || amount === undefined || amount <= 0) {
    return "Liên hệ";
  }
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(amount);
}

/**
 * Ghép chuỗi class CSS linh hoạt (loại bỏ giá trị falsy)
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(" ");
}
