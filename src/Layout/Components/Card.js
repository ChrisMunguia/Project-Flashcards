import React from "react";
import { useHistory, Link } from "react-router-dom";
import { deleteCard } from "../../utils/api";

export default function Card({ deck, card, faPencil, faTrashCan, FontAwesomeIcon }) {
	const history = useHistory();

	async function handleDelete() {
		const result = window.confirm("Delete this card?\n\nYou will not be able to recover it.");
		if (result) {
			await deleteCard(card.id);
			history.go(0);
		}
	}

	return (
		<div className="card">
			<div className="card-body">
				<div className="d-flex justify-content-between">
					<div className="pl-2">
						<h5>Question</h5>
						<p className="card-text pr-2">{card.front}</p>
					</div>
					<div className="pl-2">
						<h5>Answer</h5>
						<p className="card-text">{card.back}</p>
					</div>
				</div>
				<div className="d-flex justify-content-end mt-2">
					<Link
						to={`/decks/${deck.id}/cards/${card.id}/edit`}
						type="button"
						className="btn btn-secondary mr-2"
					>
						<FontAwesomeIcon icon={faPencil} className="pr-1" />
						Edit
					</Link>
					<button type="button" onClick={handleDelete} className="btn btn-danger">
						<FontAwesomeIcon icon={faTrashCan} className="pr-1" />
					</button>
				</div>
			</div>
		</div>
	);
}
