import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { deleteDeck, readDeck } from "../../utils/api";
import Card from "./Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faHome,
	faPencil,
	faBookBookmark,
	faPlus,
	faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

export default function ViewDeck() {
	const [deck, setDeck] = useState({});
	const [cards, setCards] = useState([]);

	const { deckId } = useParams();
	useEffect(() => {
		setDeck({});
		setCards([]);
		const ac = new AbortController();

		async function getDeckById() {
			const response = await readDeck(deckId, ac.signal);
			setDeck(response);
			setCards(response.cards);
		}

		getDeckById();

		return () => ac.abort();
	}, [deckId]);

	const history = useHistory();

	async function handleDeleteDeck() {
		const result = window.confirm("Delete this Deck?\n\nYou will not be able to recover it.");
		if (result) {
			await deleteDeck(deck.id);
			history.push("/");
		}
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
						<li className="breadcrumb-item active">{deck.name}</li>
					</ol>
				</nav>
			</div>

			<div>
				<h4 className="card-subtitle py-2">{deck.name}</h4>
				<p className="card-text">{deck.description}</p>
				<div className="d-flex">
					<Link to={`/decks/${deck.id}/edit`} type="button" className="btn btn-secondary mr-2">
						<FontAwesomeIcon icon={faPencil} className="pr-1" />
						Edit
					</Link>
					<Link to={`/decks/${deck.id}/study`} type="button" className="btn btn-primary mr-2">
						<FontAwesomeIcon icon={faBookBookmark} className="pr-1" />
						Study
					</Link>
					<Link to={`/decks/${deck.id}/cards/new`} type="button" className="btn btn-primary">
						<FontAwesomeIcon icon={faPlus} className="pr-1" />
						Add Cards
					</Link>
					<button type="button" className="btn btn-danger ml-auto" onClick={handleDeleteDeck}>
						<FontAwesomeIcon icon={faTrashCan} className="pr-1" />
					</button>
				</div>
			</div>

			<div className="pt-4">
				<h2>Cards</h2>
			</div>

			<div>
				<ol className="p-0">
					{cards.map((card) => (
						<Card
							deck={deck}
							card={card}
							key={card.id}
							faPencil={faPencil}
							faTrashCan={faTrashCan}
							FontAwesomeIcon={FontAwesomeIcon}
						/>
					))}
				</ol>
			</div>
		</div>
	);
}
