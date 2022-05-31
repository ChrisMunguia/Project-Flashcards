import React from "react";
import { Link } from "react-router-dom";

export default function CardForm({ cardFront, cardBack, setCardFront, setCardBack, handleSubmit }) {
	return (
		<div>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="form-group">
					<label htmlFor="front">Front</label>
					<textarea
						type="text"
						className="form-control"
						id="front"
						placeholder="Front side of card"
						onChange={(e) => setCardFront(e.target.value)}
						value={cardFront}
					/>
				</div>
				<div className="form-group">
					<label htmlFor="back">Back</label>
					<textarea
						type="text"
						className="form-control"
						id="back"
						placeholder="Back side of card"
						onChange={(e) => setCardBack(e.target.value)}
						value={cardBack}
					/>
				</div>
				<Link to={`/`} type="cancel" className="btn btn-secondary mr-2">
					Done
				</Link>
				<button type="submit" className="btn btn-primary">
					Save
				</button>
			</form>
		</div>
	);
}
