/**
 * Chuẩn hóa chuỗi tiếng Việt (loại bỏ dấu và chuyển về chữ thường)
 * để hỗ trợ tìm kiếm không phân biệt dấu.
 * Ví dụ: "Đàn Bầu" -> "dan bau", "Tỳ Bà" -> "ty ba"
 */
export function normalizeVietnamese(str: string): string {
  if (!str) return "";
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .trim();
}

/**
 * Kiểm tra xem chuỗi nguồn (source) có chứa từ khóa tìm kiếm (query) hay không,
 * hỗ trợ cả tiếng Việt có dấu và không dấu.
 */
export function matchesSearch(source: string, query: string): boolean {
  if (!query.trim()) return false;
  const normalizedSource = normalizeVietnamese(source);
  const normalizedQuery = normalizeVietnamese(query);
  return normalizedSource.includes(normalizedQuery);
}
