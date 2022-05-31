import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../../utils/api";
import CardForm from "./CardForm";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

export default function EditCard() {
	const history = useHistory();

	const [deck, setDeck] = useState({});
	const [card, setCard] = useState({});
	const [cardFront, setCardFront] = useState("");
	const [cardBack, setCardBack] = useState("");

	const { deckId, cardId } = useParams();
	useEffect(() => {
		setDeck({});
		setCard({});
		const ac = new AbortController();

		async function getDeckById() {
			const response = await readDeck(deckId, ac.signal);
			setDeck(response);
		}

		async function getCardById() {
			const response = await readCard(cardId, ac.signal);
			setCard(response);
			setCardFront(response.front);
			setCardBack(response.back);
		}

		getDeckById();
		getCardById();

		return () => ac.abort();
	}, [deckId, cardId]);

	async function handleSubmit(event) {
		event.preventDefault();
		card.front = cardFront;
		card.back = cardBack;
		await updateCard(card);
		history.push("/");
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
							Edit Card {card.id}
						</li>
					</ol>
				</nav>
			</div>

			<div>
				<h2>Edit Card</h2>
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
