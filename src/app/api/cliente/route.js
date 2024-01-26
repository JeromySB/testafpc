import { query } from "@/libs/db";

export async function POST(request) {
    const { cedula, nombres, apellidos, telefono, email } = await request.json();

    if (!cedula || !nombres || !apellidos || !telefono || !email) {
        return Response.json({ error: 'All fields are required' }, { status: "500" });
    }

    try {

        const result = await query(
            'INSERT INTO cliente (cedula, nombres, apellidos, telefono, email) VALUES (?, ?, ?, ?, ?)',
            [cedula, nombres, apellidos, telefono, email]
        );

        return Response.json({ id: result.insertId, message: 'Client created successfully' });

    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}


export async function GET(request) {
    const { searchParams } = new URL(request.url)
    const cedula = searchParams.get('cedula')

    try {


        // Query to get the client by cedula
        const rows = await query(
            'SELECT * FROM cliente WHERE cedula = ?',
            [cedula]
        );

        // Check if a matching client was found
        if (rows.length === 0) {
            return Response.json({ error: 'Client not found' }, { status: 403 });
        }

        // Send the JSON response with the client data
        return Response.json(rows[0]);
    } catch (error) {
        console.error('Error:', error);
        return Response.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}