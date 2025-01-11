import { TextFieldInput } from '@remix-practice/design-system';
import { useSearchParams } from '@remix-run/react';

export const SearchBar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') ?? '';

  return (
    <TextFieldInput
      type='search'
      name='query'
      placeholder='Search'
      aria-label='Search contacts'
      value={query}
      onChange={(e) => {
        setSearchParams((prev) => ({ ...prev, query: e.currentTarget.value }));
      }}
    />
  );
};
