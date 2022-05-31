import React, { useEffect, useState } from "react";
import { listDecks } from "../../utils/api/index";
import { Link } from "react-router-dom";
import Deck from "./Deck";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function DeckList() {
	const [decks, setDecks] = useState([]);

	useEffect(() => {
		const ac = new AbortController();

		async function loadDecks() {
			const response = await listDecks(ac.signal);
			setDecks(response);
		}

		loadDecks();

		return () => ac.abort();
	}, []);

	return (
		<div>
			<Link to={"/decks/new"} className="btn btn-secondary mb-2">
				<FontAwesomeIcon icon={faPlus} className="pr-1" />
				Create Deck
			</Link>
			<ol className="p-0">
				{decks.map((deck) => (
					<Deck deck={deck} key={deck.id} />
				))}
			</ol>
		</div>
	);
}
