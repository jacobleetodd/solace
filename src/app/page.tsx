import { Advocates } from '@/components/Advocates';
import { getAdvocates } from '@/queries/advocates';

export type AdvocatePageParams = {
  page?: string;
  search?: string;
};

export default async function Home({
  searchParams,
}: {
  searchParams: AdvocatePageParams;
}) {
  const limit = 5;
  const page = Number(searchParams.page ?? 0);
  const search = searchParams.search ?? '';

  const advocateResponse = await getAdvocates({
    limit,
    offset: page * limit,
    search,
  });

  if (advocateResponse === null) {
    throw Error('Could not load the advocates!');
  }

  return (
    <Advocates advocateResponse={advocateResponse} params={searchParams} />
  );
}
