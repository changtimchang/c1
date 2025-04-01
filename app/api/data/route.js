import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET(request) {
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page')) || 1; // 기본값은 페이지 1
  const limit = 10; // 페이지당 데이터 수
  const offset = (page - 1) * limit; // 오프셋 계산

  try {
    const totalCountResult = await pool.query('SELECT COUNT(*) FROM simdata'); // 전체 데이터 수
    const totalCount = parseInt(totalCountResult.rows[0].count);
    const totalPages = Math.ceil(totalCount / limit); // 전체 페이지 수
    const result = await pool.query(`SELECT * FROM simdata LIMIT $1 OFFSET $2`, [limit, offset]); // 데이터 가져오기

    return new Response(JSON.stringify({ data: result.rows, totalPages }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Database query error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}