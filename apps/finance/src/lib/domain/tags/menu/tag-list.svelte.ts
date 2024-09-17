import type { QueryObserverResult } from '@tanstack/svelte-query';

import type { Tag } from '$lib/db';

import { useBookTags } from '$lib/hooks';

type UseTagListArgs = {
  book: string;
  filterTags?: (tag: Tag) => boolean;
};

/**
 * Hook to get the list of tags for a book, allowing filtering based on the hook.
 */
export const useTagList = ({ book, filterTags }: UseTagListArgs) => {
  const tagsQuery = useBookTags(book);
  let tags = $state<Tag[]>([]);

  // Somehow TS is not properly inferring the type of the query
  tagsQuery.subscribe(({ data }: QueryObserverResult<null | Tag[], Error>) => {
    if (!data) {
      tags = [];
      return;
    }

    if (filterTags) {
      tags = data.filter(filterTags);
    }
  });

  return { tags, tagsQuery };
};
