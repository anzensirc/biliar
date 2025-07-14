import { useDebounce } from "./useDebounce";

interface useQueryBuilder {
  dataFilter: { key: string; value: string | undefined | null }[];
  delay?: number;
}

export default function useQueryBuilder({
  dataFilter,
  delay,
}: useQueryBuilder) {
  const params = new URLSearchParams();

  dataFilter.forEach((item) => {
    item.value && item.value !== "SEMUA" && params.append(item.key, item.value);
  });

  const debounceQuery = useDebounce({
    value: params.toString(),
    delay: delay || 0,
  });

  return debounceQuery;
}
