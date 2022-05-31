import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faBookBookmark, faTrashCan } from "@fortawesome/free-solid-svg-icons";

export default function Deck({ deck }) {
	const history = useHistory();

	async function handleDelete() {
		const result = window.confirm("Delete this Deck?\n\nYou will not be able to recover it.");
		if (result) {
			await deleteDeck(deck.id);
			history.go(0);
		}
	}

	return (
		<div className="card">
			<div className="card-body">
				<div className="d-flex justify-content-between">
					<h5 className="card-title">{deck.name}</h5>
					<h6 className="card-subtitle text-muted">{deck.cards.length} cards</h6>
				</div>
				<p className="card-text">{deck.description}</p>
				<Link to={`decks/${deck.id}`} type="button" className="btn btn-secondary mr-2">
					<FontAwesomeIcon icon={faEye} className="pr-2" />
					View
				</Link>
				<Link to={`decks/${deck.id}/study`} type="button" className="btn btn-primary">
					<FontAwesomeIcon icon={faBookBookmark} className="pr-2" />
					Study
				</Link>
				<div className="float-right">
					<button type="button" onClick={handleDelete} className="btn btn-danger">
						<FontAwesomeIcon icon={faTrashCan} />
					</button>
				</div>
			</div>
		</div>
	);
}
