import { useState } from "react";
import "./App.css";

interface Pokemon {
	id: number;
	name: string;
	imageUrl: string;
}
function App() {
	const [id, setId] = useState("");
	const [pokemon, setPokemon] = useState<Pokemon>();

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		try {
			const res = await fetch("http://localhost:3001/pokemon/" + id);
			const data = await res.json();
			setPokemon(data);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='flex flex-col gap-4'>
			<form onSubmit={handleSubmit}>
				<input
					type='number'
					onChange={(e) => setId(e.target.value)}
					value={id}
				/>
				<button>Submit</button>
			</form>

			{pokemon && (
				<div>
					<div>{pokemon?.id}</div>
					<div>{pokemon?.name}</div>
					<div>
						<img
							className='w-12 h-12 rounded-full ring ring-cyan-300'
							src={pokemon?.imageUrl}
							alt={`${pokemon.name}`}
						/>
					</div>
				</div>
			)}
		</div>
	);
}

export default App;
