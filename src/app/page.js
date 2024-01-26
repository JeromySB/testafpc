"use client"
import { useState, useEffect } from "react";

import Image from "next/image";

export default function Home() {
	const [mode, setmode] = useState("")
	return (
		<div className="min-h-screen ">


			<div className="grid justify-items-center grid-cols-3 pt-8">
				<div></div>
				<div>
					<span
						className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm dark:border-green-800 dark:bg-green-600"
					>
						<button
							onClick={() => { setmode("createcotizacion") }}
							className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-800 focus:relative dark:text-gray-200 dark:hover:bg-green-800"
						>
							Cotizar
						</button>
						<button
							onClick={() => { setmode("createclient") }}
							className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-800 focus:relative dark:text-gray-200 dark:hover:bg-green-800"
						>
							Cliente
						</button>
					</span>

				</div>
				<div></div>
			</div>
			<div className="grid justify-items-center grid-cols-3 pt-8">
				<div></div>
				<div>
					<div>

						{mode == "createclient" && <CreateClientForm />}
						{mode == "createcotizacion" && <CreateCotizationForm />}

					</div>

				</div>
				<div></div>
			</div>
		</div>
	);
}




const CreateClientForm = () => {
	const [cedula, setCedula] = useState("")
	const [nombres, setNombres] = useState("");
	const [apellidos, setApellidos] = useState("")
	const [correo, setCorreo] = useState("")
	const [telefono, setTelefono] = useState("")

	async function handlePost(e) {
		e.preventDefault()
		if (cedula.length == 0) { alert("Por favor introduzca una cedula valido") }

		else if (nombres.length == 0) { alert("Por favor introduzca nombres validos") }

		else if (apellidos.length == 0) { alert("Por favor introduzca apellidos valido") }

		else if (correo.length == 0) { alert("Por favor introduzca un correo valido") }

		else if (telefono.length == 0) { alert("Por favor introduzca un telefono valido") }

		else { let cotizacionResult = await createClient(cedula, nombres, apellidos, correo, telefono) }





	}

	async function createClient(cedula, nombres, apellidos, correo, telefono) {

		const url = '/api/cliente';

		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ cedula, nombres, apellidos, telefono, email: correo }),
			});

			const result = await response.json();


			if (response.ok) {
				alert("Cliente creado")
			} else {
				alert("Hubo un error creando su clinte")
			}
		} catch (error) {
			console.error('Error:', error);
		}

	}


	return (
		<form onSubmit={handlePost}>

			<div className="mb-8">
				<div className="text-center sm:text-left">
					<h1 className="text-2xl font-bold text-white-900 sm:text-3xl">Creación de cliente</h1>

					<p className="mt-1.5 text-sm text-white-500">Rellena los campos para crear tu cliente</p>
				</div>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium dark:text-white">
					Cédula
				</label>

				<input
					type="text"
					value={cedula}
					onChange={(e) => setCedula(e.target.value)}
					placeholder=""
					className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
				/>
			</div>
			<div className="grid justify-items-center grid-cols-2 gap-4">
				<div className="mb-4">
					<label className="block text-sm font-medium dark:text-white">
						Nombres
					</label>

					<input
						type="text"
						value={nombres}
						onChange={(e) => setNombres(e.target.value)}

						placeholder="Pedro Juan"
						className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium dark:text-white">
						Apellidos
					</label>

					<input
						type="text"
						value={apellidos}
						onChange={(e) => setApellidos(e.target.value)}

						placeholder="Perez Rodriguez"
						className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
					/>
				</div>


			</div>
			<div className="grid justify-items-center grid-cols-2 gap-4">
				<div className="mb-4">
					<label className="block text-sm font-medium dark:text-white">
						Email
					</label>

					<input
						type="text"
						value={correo}
						onChange={(e) => setCorreo(e.target.value)}

						placeholder="ejemplo@ejemplo.com"
						className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
					/>
				</div>

				<div className="mb-4">
					<label className="block text-sm font-medium dark:text-white">
						Teléfono
					</label>

					<input
						type="tel"
						value={telefono}
						onChange={(e) => setTelefono(e.target.value)}

						placeholder="8296068699"
						className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
					/>
				</div>


			</div>

			<span
				className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm dark:border-green-800 dark:bg-green-600"
			>
				<button
					className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-800 focus:relative dark:text-gray-200 dark:hover:bg-green-800"
				>
					Guardar
				</button>
			</span>
		</form>)
}

const CreateCotizationForm = () => {
	const [productData, setproductData] = useState([])
	const [clientData, setClientData] = useState({})
	const [productvalue, setProductvalue] = useState("")
	const [objetoActorizar, setObjetoActorizar] = useState("")
	const [monto, setmonto] = useState("")


	async function getClient(cedula) {
		const url = `/api/cliente?cedula=${cedula}`;

		const response = await fetch(url);

		if (response.ok) {

			const responseData = await response.json();
			return responseData;
		}

	}

	async function handleInput(e) {

		let cedula = e.target.value

		if (cedula.length == 11) {
			let data = await getClient(cedula)
			setClientData({
				name: `${data.nombres} ${data.apellidos}`,
				id: data.id
			})


		}
	}


	async function handlePost(e) {
		e.preventDefault()
		console.log(e)
		if (!clientData?.id) {
			alert('Debes agregar un cliente')
		} else if (productvalue.length == 0) {
			alert("Debese seleccionar un producto")

		} else if (objetoActorizar.length == 0) {
			alert("Describa el objeto a cotizar")
		} else if (objetoActorizar.length == 0) {
			alert("Describa el objeto a cotizar")
		} else if (objetoActorizar.length == 0) {
			alert("Describa el objeto a cotizar")
		} else {
			let cotizacionResult = await createCotizacion(objetoActorizar, clientData?.id, productvalue, monto)
			alert(`${cotizacionResult.message}\nValor de Prima: ${cotizacionResult.prima}\nNumero de cotización: ${cotizacionResult.cotizacion}`)

		}

	}

	async function handleSelectChange(e) {
		let value = e.target.value
		setProductvalue(value)

	}

	async function createCotizacion(objetoacotizar, cliente_id, producto_id, sumasegurada,) {
		const url = `/api/cotizacion`;

		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ objetoacotizar, cliente_id, producto_id, sumasegurada, }),
		});


		if (response.ok) {

			const responseData = await response.json();
			return responseData;
		}

	}

	async function getProducts() {
		const url = "/api/product/list";

		try {
			const response = await fetch(url, {
				method: "GET",
				headers: {
					"accept": "*/*",
				}
			});


			if (response.ok) {
				let data = await response.json()
				setproductData(data)
			}

		} catch (error) {
			console.error("Error fetching data:", error.message);
			throw error;
		}
	}

	useEffect(() => {
		getProducts()
	}, [])


	return (
		<form onSubmit={handlePost}>


			<div className="mb-8">
				<div className="text-center sm:text-left">
					<h1 className="text-2xl font-bold text-white-900 sm:text-3xl">Cotización</h1>

					<p className="mt-1.5 text-sm text-white-500">Completa el htmlFormulario y obten tu cotizacion</p>
				</div>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium dark:text-white">
					Cedula
				</label>

				<input
					type="number"
					placeholder=""
					onChange={handleInput}
					className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
				/>
			</div>

			<div className="mb-4">
				<label className="block text-sm font-medium dark:text-white">
					Cliente
				</label>

				<input
					type="email"
					placeholder={clientData?.name}
					disabled
					className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
				/>
			</div>


			<div className="mb-4">
				<label className="block text-sm font-medium dark:text-white"> Producto </label>

				<select
					onChange={handleSelectChange}
					className="mt-1.5 w-full rounded-lg border-gray-700 sm:text-sm dark:text-white dark:bg-gray-800"
				>
					<GroupedDataComponent data={productData} />
				</select>
			</div>
			<div className="mb-4">
				<label className="block text-sm font-medium dark:text-white">
					Objeto de cotizacion
				</label>

				<input
					type="text"
					placeholder="Jeep"
					onChange={(e) => setObjetoActorizar(e.target.value)}

					className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
				/>
			</div>


			<div className="grid justify-items-center grid-cols-2 gap-4">
				<div className="mb-4">
					<label className="block text-sm font-medium dark:text-white">
						Suma Asegurada
					</label>

					<input
						type="number"
						onChange={(e) => setmonto(e.target.value)}

						placeholder="1000000.00"
						className="mt-1 w-full rounded-md border-gray-200 shadow-sm dark:border-gray-700 dark:bg-gray-800 dark:text-white sm:text-sm"
					/>
				</div>


			</div>
			<span
				className="inline-flex -space-x-px overflow-hidden rounded-md border bg-white shadow-sm dark:border-green-800 dark:bg-green-600"
			>
				<button
					className="inline-block px-4 py-2 text-sm font-medium text-gray-700 hover:bg-green-800 focus:relative dark:text-gray-200 dark:hover:bg-green-800"
				>
					Guardar
				</button>
			</span>
		</form>)
}



const GroupedDataComponent = ({ data }) => {
	// Organizar los datos por ramos
	const groupedData = {};
	data.forEach(item => {
		if (!groupedData[item.ramo]) {
			groupedData[item.ramo] = [];
		}
		groupedData[item.ramo].push(item);
	});

	return (
		<> {Object.entries(groupedData).map(([ramo, productos]) => (
			<optgroup key={ramo} label={ramo}>
				{productos.map(producto => (
					<option key={producto.producto} value={producto.id}>
						{producto.producto}
					</option>
				))}
			</optgroup>
		))}</>

	);
};