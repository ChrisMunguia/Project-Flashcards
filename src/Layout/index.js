import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./Components/DeckList";
import StudyDeck from "./Components/StudyDeck";
import CreateDeck from "./Components/CreateDeck";
import ViewDeck from "./Components/ViewDeck";
import EditDeck from "./Components/EditDeck";
import AddCard from "./Components/AddCard";
import EditCard from "./Components/EditCard";

function Layout() {
	return (
		<div>
			<Header />
			<div className="container">
				<Switch>
					<Route exact path="/">
						<DeckList />
					</Route>
					<Route path={"/decks/new"}>
						<CreateDeck />
					</Route>
					<Route path={"/decks/:deckId/cards/:cardId/edit"}>
						<EditCard />
					</Route>
					<Route path={"/decks/:deckId/cards/new"}>
						<AddCard />
					</Route>
					<Route path={"/decks/:deckId/study"}>
						<StudyDeck />
					</Route>
					<Route path={"/decks/:deckId/edit"}>
						<EditDeck />
					</Route>
					<Route path={"/decks/:deckId"}>
						<ViewDeck />
					</Route>
					<Route>
						<NotFound />
					</Route>
				</Switch>
			</div>
		</div>
	);
}

export default Layout;
