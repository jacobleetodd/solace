import db from '../../../db';
import { advocates } from '../../../db/schema';
import { ilike, count, or } from 'drizzle-orm';

/**
 * NOTE: ideally we would infer the type from the database schema or actively validate the type
 * tried using the deprecated InferModel function but ran into issues with specialties
 * a tool like drizzle-zod would be a better solution but not using it here to limit scope
 */
export type Advocate = {
  id: number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string[];
  yearsOfExperience: number;
  phoneNumber: number;
  createdAt: Date | null;
};

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const search = params.get('search');
  const offset = params.get('offset');
  const limit = params.get('limit');

  const data = await db
    .select()
    .from(advocates)
    .where(
      or(
        search ? ilike(advocates.firstName, `%${search}%`) : undefined,
        search ? ilike(advocates.lastName, `%${search}%`) : undefined,
        search ? ilike(advocates.city, `%${search}%`) : undefined,
        search ? ilike(advocates.degree, `%${search}%`) : undefined
        // TODO: add specialties to this search
        // TODO: add years of experience to this search
      )
    )
    .limit(Number(limit ?? 20))
    .offset(Number(offset ?? 0))
    .then((result) => result);

  const totalRecords = await db
    .select({ count: count() })
    .from(advocates)
    .where(
      or(
        search ? ilike(advocates.firstName, `%${search}%`) : undefined,
        search ? ilike(advocates.lastName, `%${search}%`) : undefined,
        search ? ilike(advocates.city, `%${search}%`) : undefined,
        search ? ilike(advocates.degree, `%${search}%`) : undefined
      )
    )
    .then((result) => {
      return result[0]?.count ?? 0;
    });

  return Response.json({
    data,
    count: totalRecords,
    params: Object.fromEntries(params),
  });
}
