import { TextFieldInput } from '@remix-practice/design-system';
import { Form, useSearchParams, useSubmit } from '@remix-run/react';

export const SearchBar = () => {
  const submit = useSubmit();

  const [searchParams] = useSearchParams();
  const query = searchParams.get('query');

  return (
    <Form
      onChange={(event) => {
        const isFirstSearch = query === null;
        submit(event.currentTarget, {
          replace: !isFirstSearch,
        });
      }}
      role='search'
    >
      <TextFieldInput
        type='search'
        name='query'
        placeholder='Search'
        value={query ?? ''}
        aria-label='Search contacts'
      />
    </Form>
  );
};
