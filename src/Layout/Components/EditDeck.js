import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "./DeckForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function EditDeck() {
	const history = useHistory();

	const [deck, setDeck] = useState({});
	const [deckName, setDeckName] = useState("");
	const [deckDescription, setDeckDescription] = useState("");

	const { deckId } = useParams();
	useEffect(() => {
		setDeck({});
		const ac = new AbortController();

		async function getDeckById() {
			const response = await readDeck(deckId, ac.signal);
			setDeck(response);
			setDeckName(response.name);
			setDeckDescription(response.description);
		}

		getDeckById();

		return () => ac.abort();
	}, [deckId]);

	async function handleSubmit(event) {
		event.preventDefault();
		deck.name = deckName;
		deck.description = deckDescription;
		const response = await updateDeck(deck);
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
						<li className="breadcrumb-item text-primary">{deck.name}</li>
						<li className="breadcrumb-item active" aria-current="page">
							Edit Deck
						</li>
					</ol>
				</nav>
			</div>

			<div>
				<h2>Edit Deck</h2>
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
