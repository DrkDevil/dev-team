---
name: data-fetching
description: "Guides loading and changing server data with TanStack Query and the Supabase client: query keys, loading, empty and error states, mutations with invalidation, optimistic updates, pagination and response validation. Use whenever a screen reads or writes data."
user-invocable: false
---

# Data fetching

```ts
export function useRecentOrders(userId: string) {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('id, placed_at, status, total_cents')
        .eq('user_id', userId)
        .order('placed_at', { ascending: false })
        .limit(20);
      if (error) throw error;
      return OrderList.parse(data);
    },
  });
}

export function useCancelOrder(userId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => supabase.from('orders').update({ status: 'cancelled' }).eq('id', id).throwOnError(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders', userId] }),
  });
}
```

## Rules
- Server data lives in the query cache, never in a client store.
- Every query's UI handles loading, empty and error, and errors offer a retry.
- Query keys include every input the data depends on.
- Use optimistic updates only when rollback is simple and the failure case is handled.
- Paginate or virtualize long lists; never fetch unbounded rows.
- Select only the columns you need, rely on row-level security, and never ship the service-role
  key to the browser.
