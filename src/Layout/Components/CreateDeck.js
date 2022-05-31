import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function CreateDeck() {
	const history = useHistory();

	const [deckName, setDeckName] = useState("");
	const [deckDescription, setDeckDescription] = useState("");

	async function handleSubmit(event) {
		event.preventDefault();
		const newDeck = { name: deckName, description: deckDescription };
		const response = await createDeck(newDeck);
		history.push(`/decks/${response.id}`);
	}

	return (
		<div>
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to={"/"}>
								<FontAwesomeIcon icon={faHome} className="pr-1" />
								Home
							</Link>
						</li>
						<li className="breadcrumb-item ">Create Deck</li>
					</ol>
				</nav>
			</div>

			<div>
				<h2>Create Deck</h2>
			</div>

			<DeckForm
				deckName={deckName}
				deckDescription={deckDescription}
				setDeckName={setDeckName}
				setDeckDescription={setDeckDescription}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
}
