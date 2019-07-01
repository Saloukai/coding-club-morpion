function modifyStatut(element, message) {
	element.innerHTML = message;
}

function isValid(valeur) {
	return valeur.innerHTML == 0;
}

function setSymbole(bouton, joueur) {
	bouton.innerHTML = joueur;
}

function searchWinner(pions, gamers, currentTurn) {
	if (pions[0].innerHTML == gamers[currentTurn] &&
		pions[1].innerHTML == gamers[currentTurn] &&
		pions[2].innerHTML == gamers[currentTurn])
		return true;

	if (pions[3].innerHTML == gamers[currentTurn] &&
		pions[4].innerHTML == gamers[currentTurn] &&
		pions[5].innerHTML == gamers[currentTurn])
		return true;

	if (pions[6].innerHTML == gamers[currentTurn] &&
		pions[7].innerHTML == gamers[currentTurn] &&
		pions[8].innerHTML == gamers[currentTurn])
		return true;

	if (pions[0].innerHTML == gamers[currentTurn] &&
		pions[3].innerHTML == gamers[currentTurn] &&
		pions[6].innerHTML == gamers[currentTurn])
		return true;

	if (pions[1].innerHTML == gamers[currentTurn] &&
		pions[4].innerHTML == gamers[currentTurn] &&
		pions[7].innerHTML == gamers[currentTurn])
		return true;

	if (pions[2].innerHTML == gamers[currentTurn] &&
		pions[5].innerHTML == gamers[currentTurn] &&
		pions[8].innerHTML == gamers[currentTurn])
		return true;

	if (pions[0].innerHTML == gamers[currentTurn] &&
		pions[4].innerHTML == gamers[currentTurn] &&
		pions[8].innerHTML == gamers[currentTurn])
		return true;

	if (pions[2].innerHTML == gamers[currentTurn] &&
		pions[4].innerHTML == gamers[currentTurn] &&
		pions[6].innerHTML == gamers[currentTurn])
		return true;
}

// Verifier l'ensemble des cases, si tous les éléments sont remplis => match nul
function matchNul(pions) {
	for (var i = 0, len = pions.length; i < len; i++) {
		if (pions[i].innerHTML == 0)
			return false
	}
	return true
}

// Fonction principale de la boucle de jeu
function main() {
	var currentTurn = Math.round((Math.random()));
	var isGameOver = false;
	var afficheur = document.querySelector("#gameStatus");
	var pions = document.querySelectorAll("#game button");

	modifyStatut(afficheur, "Le jeu peut démarrer.<br/>Joueur " + gamers[currentTurn] + " (" + gamersnom[currentTurn] + "), &#224; vous de jouer...");

	for (var i = 0, len = pions.length; i < len; i++) {
		pions[i].addEventListener("click", function () {
			if (isGameOver)
				return ;
 
			if (isValid(this)) {
				setSymbole(this, gamers[currentTurn]);
				if (searchWinner(pions, gamers, currentTurn)) {
					modifyStatut(afficheur, "Le joueur " + gamers[currentTurn] + " ("+ gamersnom[currentTurn] +") a gagné ! :D<br /><a href=\"index.html\">Rejouer ?</a>");
					isGameOver = true;
				} else if (matchNul(pions)) {
					modifyStatut(afficheur, "Match Nul ! :O<br /><a href=\"index.html\">Rejouer ?</a>");
					isGameOver = true;
				} else {
					currentTurn++;
					currentTurn = currentTurn % 2;
					modifyStatut(afficheur, "Joueur " + gamers[currentTurn] + " ("+ gamersnom[currentTurn] +"), c'est &#224; votre tour !");
				}
			} else {             
			modifyStatut(afficheur, "Quelqu'un a déjà joué ici !");
			}
		});
	}
}

function SelectVerif() {
	// Si le joueur selectionne un nom different du joueur précédent (ils ne peuvent pas prendre le meme personnage)
	if (this.innerHTML.split(">")[1] != gamersnom[currentSelection - 1]) {
		gamersnom[currentSelection] = this.innerHTML.split(">")[1];
		gamers[currentSelection] = this.innerHTML.split(">")[0] + ">";
		alert("Joueur " + (currentSelection + 1) + ", vous avez choisi " + gamersnom[currentSelection]);
		currentSelection++;
		modifyStatut(document.querySelector("#gameStatus"), "Joueur 2, choisissez votre poney préféré ! :)");

		// Une fois que les 2 joueurs ont sélectionné leur personnage, démarrer le jeu
		if (currentSelection > 1) {
			document.querySelector("#game").style.display = "";
			document.querySelector("#selecteur").style.display = "none";
			main();
		}
	} else {
		alert("Vous devez choisir un personnage différent de votre adversaire");
	}
}

function selecteur() {
	var afficheur = document.querySelector("#gameStatus");
	var poneys = document.querySelectorAll("#selecteur button");
	var images = ['<img src="img/ts.gif">', '<img src="img/rd.gif">', '<img src="img/aj.gif">', '<img src="img/pp.gif">', '<img src="img/r.gif">', '<img src="img/f.gif">'];
	var noms = ['Twilight Sparkle', 'Rainbow Dash', 'Applejack', 'Pinkie Pie', 'Rarity', 'Fluttershy'];

	document.querySelector("#game").style.display = "none"; // Ne pas afficher le jeu pendant la sélection des joueurs

	// Remplir les images + noms dans chaque case. Au moment du clique, appelle SelectVerif
	for (var i = 0, len = poneys.length; i < len; i++) {
		poneys[i].innerHTML = images[i] + noms[i];
		poneys[i].addEventListener("click", SelectVerif);
	}
	
	modifyStatut(afficheur, "Joueur " + (currentSelection + 1) + ", choisissez votre poney préféré ! :)");
}

var currentSelection = 0,
	gamers = ['', ''],
	gamersnom = ['', ''];

selecteur();