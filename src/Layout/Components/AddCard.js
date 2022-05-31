import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api";
import CardForm from "./CardForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function AddCard() {
	const history = useHistory();

	const [deck, setDeck] = useState({});
	const [cardFront, setCardFront] = useState("");
	const [cardBack, setCardBack] = useState("");

	const { deckId } = useParams();
	useEffect(() => {
		setDeck({});
		const ac = new AbortController();

		async function getDeckById() {
			const response = await readDeck(deckId, ac.signal);
			setDeck(response);
		}

		getDeckById();

		return () => ac.abort();
	}, [deckId]);

	async function handleSubmit(event) {
		event.preventDefault();
		const card = { front: cardFront, back: cardBack };
		await createCard(deck.id, card);
		history.go(0);
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
							Add Card
						</li>
					</ol>
				</nav>
			</div>

			<div>
				<h2>{deck.name}: Add Card</h2>
			</div>

			<CardForm
				cardFront={cardFront}
				cardBack={cardBack}
				setCardFront={setCardFront}
				setCardBack={setCardBack}
				handleSubmit={handleSubmit}
			/>
		</div>
	);
}
