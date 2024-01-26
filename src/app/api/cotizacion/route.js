import { query } from "@/libs/db";


export async function POST(request) {

    const { objetoacotizar, cliente_id, producto_id, sumasegurada } = await request.json()

    if (!cliente_id || !producto_id || !sumasegurada) {
        return Response.json({ error: 'All fields are required' }, { status: 400 });
    }

    try {
        let date = new Date();
        let cotizacion = `${date.getFullYear()}${date.getMonth()}${date.getDay()}-${generateRandomNumber()}`
        const productos = await query('SELECT tasa FROM producto WHERE id = ?', [producto_id]);
        const prima = sumasegurada * productos[0].tasa
        const result = await query(
            'INSERT INTO cotizacion (cotizacion, cliente_id, producto_id, sumasegurada, taza, prima, objeto) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [cotizacion, cliente_id, producto_id, sumasegurada, productos[0].tasa, prima, objetoacotizar]
        );



        return Response.json({ id: result.insertId, cotizacion, message: 'Cotizacion creada', prima });
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


function generateRandomNumber() {
    return Math.floor(Math.random() * 10001);
}