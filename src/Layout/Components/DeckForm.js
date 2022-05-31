import React from "react";
import { Link } from "react-router-dom";

export default function DeckForm({
	deckName,
	deckDescription,
	setDeckName,
	setDeckDescription,
	handleSubmit,
}) {
	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="form-group">
					<label htmlFor="deckName">Name</label>
					<input
						type="text"
						className="form-control"
						id="deckName"
						placeholder="Deck Name"
						onChange={(e) => setDeckName(e.target.value)}
						value={deckName}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="description">Description</label>
					<textarea
						type="text"
						className="form-control"
						id="description"
						placeholder="Brief description of the deck"
						rows="4"
						onChange={(e) => setDeckDescription(e.target.value)}
						value={deckDescription}
					/>
				</div>
				<Link to={"/"} type="cancel" className="btn btn-secondary mr-2">
					Cancel
				</Link>
				<button type="submit" className="btn btn-primary">
					Submit
				</button>
			</form>
		</div>
	);
}
