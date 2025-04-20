import { Advocate } from '@/app/api/advocates/route';

export interface GetAdvocateParams {
  search?: string;
  offset?: number;
  limit?: number;
}

export interface AdvocateResponse {
  data: Advocate[];
  count: number;
}

export async function getAdvocates({
  limit,
  search,
  offset,
}: GetAdvocateParams): Promise<AdvocateResponse | null> {
  const baseUrl = 'http://localhost:3000/api/advocates/';
  const params = new URLSearchParams();

  search && params.append('search', search);
  offset && params.append('offset', offset.toString());
  limit && params.append('limit', limit.toString());

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const advocatesResponse = await fetch(url);

    if (!advocatesResponse.ok) {
      throw new Error(`HTTP error! status: ${advocatesResponse.status}`);
    }

    const advocatesResponseJson = await advocatesResponse.json();

    return {
      data: advocatesResponseJson.data,
      count: advocatesResponseJson.count,
    };
  } catch (error) {
    console.error('Error fetching advocate data:', error);
    return null;
  }
}
