import { query } from "@/libs/db";

export async function GET() {
    try {
        const rows = await query(
            'SELECT p.id as id, r.nombre as ramo, p.nombre as producto, p.tasa as tasa FROM ramo r LEFT JOIN producto p ON p.ramo_id = r.id'
        );
        return Response.json(rows);
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Internal Server Error' });
    }
}