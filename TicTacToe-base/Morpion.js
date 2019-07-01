// Mes variables globales (je peux les utiliser dans n'importe quelle fonction)
var game = document.querySelector("#game");
var afficheur = document.querySelector("#gameStatus");
var currentSelection = 0;

function selection() {
    var avatars = document.querySelectorAll("#selecteur button");
    var images = ['<img src="img/ts.gif">', '<img src="img/rd.gif">', '<img src="img/aj.gif">', '<img src="img/pp.gif">', '<img src="img/r.gif">', '<img src="img/f.gif">'];
	var noms = ['Twilight Sparkle', 'Rainbow Dash', 'Applejack', 'Pinkie Pie', 'Rarity', 'Fluttershy'];

    game.style.display = 'none';
    for (var i = 0, len = avatars.length; i < len; i++) {
		avatars[i].innerHTML = images[i] + noms[i];
		avatars[i].addEventListener("click", setAvatar);
    }
    
    modifyStatut("Joueur " + (currentSelection + 1) + ", choisissez votre avatar !");
}

function setAvatar() {

}

function modifyStatut(message) {
	afficheur.innerHTML = message;
}

selection();