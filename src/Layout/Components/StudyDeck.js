import React, { useEffect, useState } from "react";
import { useHistory, useParams, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function StudyDeck() {
	const history = useHistory();

	const [deck, setDeck] = useState({});
	const [cards, setCards] = useState([]);
	const [currentCard, setCurrentCard] = useState({});
	const [isCardFlipped, setIsCardFlipped] = useState(false);

	const { deckId } = useParams();
	useEffect(() => {
		setDeck({});
		setCards([]);
		const ac = new AbortController();

		async function getDeckById() {
			const response = await readDeck(deckId, ac.signal);
			setDeck(response);
			setCards(response.cards);
			setCurrentCard(response.cards[0]);
		}

		getDeckById();

		return () => ac.abort();
	}, [deckId]);

	function handleCardFlip() {
		if (cards.indexOf(currentCard) + 1 >= cards.length) {
			handleRestart();
		} else {
			setCurrentCard(cards[cards.indexOf(currentCard) + 1]);
			setIsCardFlipped(!isCardFlipped);
		}
	}

	function handleRestart() {
		const result = window.confirm("Restart cards?\n\nClick 'cancel' to return to the home page.");
		result ? setCurrentCard(cards[0]) : history.push("/");
	}

	return (
		<div>
			<div>
				<nav aria-label="breadcrumb">
					<ol className="breadcrumb">
						<li className="breadcrumb-item">
							<Link to={"/"}>
								<FontAwesomeIcon icon={faHouse} className="pr-1" />
								Home
							</Link>
						</li>
						<li className="breadcrumb-item text-primary">{deck.name}</li>
						<li className="breadcrumb-item active" aria-current="page">
							Study
						</li>
					</ol>
				</nav>
			</div>

			<div>
				<h2>{deck.name}: Study</h2>
			</div>

			<div>
				{cards.length < 3 ? (
					<div>
						<h3 className="card-subtitle py-2">Not enough cards.</h3>
						<p className="card-text">
							You need at least 3 cards to study. There are {cards.length} cards in this deck
						</p>
						<Link to={`/decks/${deck.id}/cards/new`} type="button" className="btn btn-primary">
							<FontAwesomeIcon icon={faPlus} className="pr-1" />
							Add Cards
						</Link>
					</div>
				) : (
					<div className="card-body">
						<h4 className="card-subtitle pb-2">
							Card {cards.indexOf(currentCard) + 1} of {cards.length}
						</h4>
						{isCardFlipped ? (
							<p className="card-text">{currentCard.back}</p>
						) : (
							<p className="card-text">{currentCard.front}</p>
						)}
						<button
							type="button"
							className="btn btn-secondary mr-2"
							onClick={() => {
								setIsCardFlipped(!isCardFlipped);
							}}
						>
							Flip
						</button>
						{isCardFlipped && (
							<button type="button" className="btn btn-primary" onClick={handleCardFlip}>
								Next
							</button>
						)}
					</div>
				)}
			</div>
		</div>
	);
}
