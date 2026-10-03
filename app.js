// ========================================================================================================


// ▶ Réglages (à modifier) ====


// ↳ Supabase ====
const SUPABASE_LIEN = "https://vkyiwovwnylquaelzhtj.supabase.co"; // Lien du projet Supabase
const SUPABASE_CLE_PUBLIQUE = "sb_publishable_gJxdiDzMkRsy2h3APxdwAA_0lDhEygR"; // Clé Supabase publiable
const TABLE_CARTES = "bdd_cartes_vierge"; // Table des cartes (alimentée par R)
const TABLE_COLLECTION = "bdd_cartes_collection"; // Table de la collection (modifiée par le site)


// ↳ Classeur ====
const CARTES_PAR_PAGE = 9; // Cartes par page du classeur, soit le double par double page (à accorder avec --classeur-colonnes dans style.css)
const CARTES_PAR_LOT = 60; // Téléphone : cartes ajoutées en bas de la liste à l'approche de la fin (pas de pagination)
const TELEPHONE = matchMedia("(max-width: 700px)"); // Téléphone (largeur à accorder avec la ligne @media « Petit écran » de style.css)


// ↳ Prime de collection (primes de référence lues sur One Piece Encyclopédie à chaque connexion) ====
const PAGE_PRIMES = "https://onepiece.fandom.com/fr/api.php?action=parse&page=Primes/Avis_de_recherche&prop=text&formatversion=2&format=json&origin=*"; // Page « Primes/Avis de recherche », via l'API du wiki (origin=* : lecture autorisée depuis un autre site)
const MEMOIRE_PRIMES = "wanted-primes"; // Nom sous lequel le navigateur garde les dernières primes lues (secours si le wiki est indisponible)
const AVIS_PAR_DEFAUT = "www/wanted_icon.ico"; // Image de l'avis de recherche quand le personnage n'a pas d'avis sur le wiki (logo du site)
const TAILLE_AVIS_WIKI = 400; // Largeur demandée au wiki pour les images des avis de recherche, en pixels
const PRIME_DEPART = 1000000; // Prime de départ (première carte), multipliée par un même facteur jusqu'à la prime la plus haute (100 % de la collection)
const ETAPES_AVIS = 50; // Nombre maximal de personnages affichés avant la prime finale sur l'avis de recherche
const DUREE_ETAPE_AVIS = 100; // Durée d'affichage de chaque personnage, en millisecondes (la dernière étape dure deux fois plus, pour le suspense)


// ↳ Ordres d'affichage (filtres, tableau des séries et tri « Série (pertinence) ») ====
const ORDRE_SERIES = ["OP", "EB", "PRB", "ST"]; // Préfixes des séries, les autres à la fin
const ORDRE_CATEGORIES = ["DON!!", "Leader", "Character", "Event", "Stage"]; // Catégories
const ORDRE_RARETES = ["DON!!", "Promo", "Leader", "Common", "Uncommon", "Rare", "Super Rare", "Secret Rare"]; // Raretés
const ORDRE_VERSIONS = ["Normal", "Gold", "Foil", "Pirate Foil", "Textured Foil", "Full Art", "Alternate Art", "Treasure Rare", "Special Card", "Manga Art"]; // Versions (sans parenthèses)
const ORDRE_COULEURS = ["DON!!", "Red", "Green", "Blue", "Purple", "Black", "Yellow"]; // Couleurs


// ↳ Langues ====
const LANGUES = { jp: "Japonais", en: "Anglais", fr: "Français" }; // Langues suivies (code : nom affiché au survol)
const DRAPEAUX = { jp: "jp", en: "gb", fr: "fr" }; // Drapeau de chaque langue sur flagcdn.com (britannique pour l'anglais)


// ↳ Pastilles scintillantes (type de scintillement, étoile et lettres définis dans style.css) ====
const RARETES_BRILLANTES = ["DON!! Gold", "DON!! Foil", "Rare", "Super Rare", "Pirate Foil", "Textured Foil", "Full Art", "Secret Rare", "Alternate Art", "Treasure Rare", "Special Card", "Manga Art"]; // Paliers dont la pastille scintille (rareté pour une version normale, sinon version)


// ↳ Aperçu des visuels (survol de la loupe) ====
const ADRESSE_VISUEL = (numero, suffixe, langue) => `https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/one-piece/${numero.split("-")[0]}/${numero}${suffixe}_${langue}.webp`; // Visuel sur Limitless TCG (« OP12/OP12-010_EN.webp », versions parallèles « OP12-010_p1_EN.webp »…)
const VERSIONS_VISUELS = ["", ...Array.from({ length: 12 }, (_, i) => "_p" + (i + 1))]; // Suffixes testés pour chaque numéro : version de base puis versions parallèles _p1 à _p12
const LANGUES_VISUELS = ["EN", "JP"]; // Langues des visuels, dans l'ordre : le japonais sert de secours pour les cartes pas encore sorties en anglais


// ↳ Recherche Cardmarket (loupe sous les pastilles) ====
const RECHERCHE_CARDMARKET = (carte) => "https://www.cardmarket.com/fr/OnePiece/Products/Search?searchString=" + encodeURIComponent(carte.carte_nom + " " + carte.serie_id); // Recherche avec le nom de la carte et la série (ex. « Loki OP17 »)


// ↳ Textes affichés ====
const TEXTES = {
  maj: "Mise à jour : " + (typeof DATE_MAJ === "undefined" ? "inconnue" : DATE_MAJ), // En-tête (date écrite dans maj.js par wanted_lancement.R)
  connexion: "Connexion...", // Pendant la connexion
  connexionImpossible: "Email ou mot de passe incorrect.", // Échec de connexion
  chargement: "Chargement des cartes...", // Pendant le chargement
  chargementImpossible: "Chargement impossible : ", // Échec du chargement (suivi du détail de l'erreur)
  enregistrementImpossible: "Enregistrement impossible : ", // Échec d'un enregistrement (suivi du détail de l'erreur)
  confirmationViderPanier: "Vider le panier ?", // Fenêtre de confirmation
  voirSerie: "Voir les cartes de la série", // Survol d'une ligne du tableau des séries
  aucunFiltre: "Toutes", // Résumé d'un filtre sans case cochée
  plusieursFiltres: " sélectionnées", // Résumé d'un filtre avec plusieurs cases cochées (précédé du nombre)
  compteurCartes: (n, total) => `${n} cartes / ${total}`, // Sous la déconnexion sur téléphone
  progression: (n, total) => `Tu as ${total ? Math.round(n / total * 100) : 0} % des cartes (${n}/${total})`, // Progression dans la barre latérale (avec le pourcentage)
  page: (page, nbPages) => `Page ${page} / ${nbPages}`, // Pagination
  primeEquivalente: (nom) => `Ta valeur est équivalente à celle de ${nom} !`, // Personnage dont la prime est la plus proche
  primeAucune: "Même Chopper vaut plus que toi...", // Aucune carte collectionnée
  serieConquise: "Équipage complet !", // Badge d'une série complète
  avisNom: (email) => String(email).split("@")[0].toUpperCase(), // Nom sur l'avis de recherche (partie de l'email avant « @ »)
  avisMontant: (montant) => montant.toLocaleString("fr-FR") + " Berrys", // Prime sur l'avis de recherche
  avisSansPrime: "Prime inconnue", // Avis de recherche quand les primes n'ont pas pu être lues
  avisEquivalente: "Ta valeur est équivalente à celle de" // Phrase au-dessus du nom du personnage sur l'avis de recherche
};


// ========================================================================================================


// ▶ Données en mémoire ====


const bdd = window.supabase.createClient(SUPABASE_LIEN, SUPABASE_CLE_PUBLIQUE); // Connexion à Supabase
const FILTRES = ["filtre-serie", "filtre-categorie", "filtre-rarete", "filtre-version", "filtre-couleur", "filtre-etat", "filtre-panier"]; // Filtres à cocher (barre latérale, puis icônes à côté du tri)
let utilisateur = null; // Utilisateur connecté
let cartes = []; // Toutes les cartes (avec leurs champs calculés)
let cartesParCle = {}; // Cartes rangées par clé, pour les retrouver sans parcourir toute la liste
let collection = {}; // Lignes de la collection de l'utilisateur, rangées par clé
let primes = []; // Primes de référence [personnage, berrys], lues sur One Piece Encyclopédie (la plus haute = 100 % de la collection)
let page = 1; // Double page affichée
let nbListe = CARTES_PAR_LOT; // Téléphone : nombre de cartes affichées dans la liste
const observateurListe = new IntersectionObserver((entrees) => { if (entrees[0].isIntersecting) { nbListe += CARTES_PAR_LOT; afficherCartes(); } }, { rootMargin: "800px" }); // Téléphone : lot suivant quand le bas de la liste approche
const visuelsTrouves = {}; // Visuels déjà cherchés, par numéro de carte (recherche faite une seule fois)
let loupeSurvolee = null; // Loupe survolée (un aperçu prêt après la sortie de la souris est ignoré)
let minuterieAvis = null; // Défilement en cours sur l'avis de recherche (arrêté si l'avis est rouvert ou fermé)


// ========================================================================================================


// ▶ Outils ====


// Raccourci pour récupérer un élément de la page par son id
const element = (id) => document.getElementById(id);


// Clé unique d'une carte ou d'une ligne de collection (série, numéro, version et numéro de version)
const cleCarte = (carte) => [carte.serie_id, carte.carte_id_court, carte.carte_version, carte.carte_version_num].join("|");


// Ligne de collection d'une carte (vide si la carte n'a jamais été cochée)
const ligneCollection = (carte) => collection[carte._cle] || {};


// Carte collectionnée dans au moins une langue
const estCollectionnee = (carte) => Object.keys(LANGUES).some((langue) => ligneCollection(carte)["carte_col_langue_" + langue] === 1);


// Rang d'une valeur dans un ordre imposé (sans tenir compte des majuscules, valeurs absentes de l'ordre à la fin)
const rang = (ordre, valeur) => {
  const i = ordre.findIndex((o) => o.toLowerCase() === String(valeur).toLowerCase());
  return i === -1 ? ordre.length : i;
};


// Valeurs uniques d'une liste (sans valeur vide), triées selon l'ordre imposé puis alphabétiquement, au format [valeur, libellé]
const valeursUniques = (valeurs, ordre = []) => [...new Set(valeurs)].filter(Boolean).sort((a, b) => rang(ordre, a) - rang(ordre, b) || a.localeCompare(b)).map((valeur) => [valeur, valeur]);


// Version regroupée pour le filtre : parenthèses retirées (« Alternate Art (Super) » → « Alternate Art »)
const versionRegroupee = (version) => String(version || "").replace(/\s*\(.*?\)/g, "").trim();


// Scintillement de la pastille d'une carte selon son palier, au format « don-gold » ou « super-rare » (vide si le palier ne scintille pas)
const eclatRarete = (carte) => rang(RARETES_BRILLANTES, carte._palier) < RARETES_BRILLANTES.length ? carte._palier.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") : "";


// Comparer deux séries : ordre des préfixes, puis numéro décroissant dans chaque groupe (OP17 → OP01)
const prefixeSerie = (id) => rang(ORDRE_SERIES, ORDRE_SERIES.find((o) => id.startsWith(o)));
const comparerSeries = (a, b) => prefixeSerie(a) - prefixeSerie(b) || b.localeCompare(a, undefined, { numeric: true });


// Comparer deux cartes (tri « Série (pertinence) ») : série, puis DON!!, cartes de la série, rééditions, puis numéro, rareté, version et numéro de version
const comparerCartes = (a, b) => comparerSeries(a.serie_id, b.serie_id) || a._groupe - b._groupe ||
  String(a.carte_id_court).localeCompare(String(b.carte_id_court), "fr", { numeric: true }) ||
  rang(ORDRE_RARETES, a.carte_rarete) - rang(ORDRE_RARETES, b.carte_rarete) ||
  rang(ORDRE_VERSIONS, a._version) - rang(ORDRE_VERSIONS, b._version) ||
  String(a.carte_version).localeCompare(String(b.carte_version), "fr") || a.carte_version_num - b.carte_version_num;


// Icône du sprite de index.html (plusieurs noms = icônes superposées, par exemple une carte barrée)
const icone = (noms, classe = "") => `<svg class="icone ${classe}" viewBox="0 0 24 24">${noms.map((nom) => `<use href="#icone-${nom}"/>`).join("")}</svg>`;


// Drapeau d'une langue
const drapeau = (langue) => `<img class="drapeau" src="https://flagcdn.com/${DRAPEAUX[langue]}.svg" alt="${langue.toUpperCase()}" title="${LANGUES[langue]}">`;


// Symbole présent si au moins une carte de la liste porte un « X » dans la colonne (majuscules et espaces ignorés)
const aSymbole = (liste, colonne) => liste.some((carte) => String(carte[colonne] ?? "").trim().toUpperCase() === "X");


// Date au format JJ/MM/AAAA, quel que soit le format reçu de Supabase
const formaterDate = (date) => {
  const texte = String(date ?? "").trim();
  if (/^\d{4}-\d{2}-\d{2}/.test(texte)) return texte.slice(0, 10).split("-").reverse().join("/"); // AAAA-MM-JJ (avec ou sans heure)
  if (/^\d{8}$/.test(texte)) return texte.slice(6, 8) + "/" + texte.slice(4, 6) + "/" + texte.slice(0, 4); // AAAAMMJJ
  if (/^\d{4,5}(\.0+)?$/.test(texte)) return new Date((Number(texte) < 40000 ? Date.UTC(1970, 0, 1) : Date.UTC(1899, 11, 30)) + Number(texte) * 86400000).toLocaleDateString("fr-FR", { timeZone: "UTC" }); // Jours depuis 1970 (R) ou depuis 1899 (Excel)
  return texte; // Autre format laissé tel quel
};


// Tester une image : son adresse si elle existe, rien sinon
const testerImage = (adresse) => new Promise((resoudre) => { const image = new Image(); image.onload = () => resoudre(adresse); image.onerror = () => resoudre(null); image.src = adresse; });


// Visuels d'un numéro de carte, une case par version de VERSIONS_VISUELS (vide si absente) : en anglais, sinon en japonais (cherchés une seule fois par numéro)
const chercherVisuels = (numero) => visuelsTrouves[numero] ??= (async () => {
  for (const langue of LANGUES_VISUELS) {
    const adresses = await Promise.all(VERSIONS_VISUELS.map((suffixe) => testerImage(ADRESSE_VISUEL(numero, suffixe, langue))));
    if (adresses.some(Boolean)) return adresses; // Visuels trouvés dans cette langue (une case par version, vide si la version n'existe pas)
  }
  return []; // Aucun visuel
})();


// Masquer l'aperçu des visuels (sans erreur si le bloc de l'aperçu manque dans index.html)
const masquerApercu = () => { loupeSurvolee = null; if (element("apercu-carte")) element("apercu-carte").hidden = true; };


// Afficher un message sous la grille (vide = aucun message)
const afficherMessage = (texte) => element("message-application").textContent = texte;


// Remplir un filtre avec une case à cocher par option [valeur, libellé]
const remplirFiltre = (id, options) => element(id).querySelector(".filtre-options").innerHTML = options.map(([valeur, libelle]) => `<label><input type="checkbox" value="${valeur}"> ${libelle}</label>`).join("");


// Cases cochées d'un filtre
const casesCochees = (id) => [...element(id).querySelectorAll(".filtre-options input:checked")];


// Valeurs cochées d'un filtre
const valeursCochees = (id) => casesCochees(id).map((caseACocher) => caseACocher.value);


// Valeur retenue par un filtre (aucune case cochée = toutes les valeurs retenues)
const retenue = (cochees, valeur) => cochees.length === 0 || cochees.includes(valeur);


// Résumé affiché à côté du nom d'un filtre de la barre latérale : « Toutes », l'option cochée, ou le nombre d'options cochées
const resumerFiltre = (id) => {
  const resume = element(id).querySelector(".filtre-resume");
  if (!resume) return; // Filtre sans résumé (icônes à côté du tri)
  const cochees = casesCochees(id);
  resume.textContent = cochees.length === 0 ? TEXTES.aucunFiltre : cochees.length === 1 ? cochees[0].parentElement.textContent.trim() : cochees.length + TEXTES.plusieursFiltres;
};


// Prime de collection selon la part de cartes collectionnées (0 à 1) : de la prime de départ à la prime la plus haute, arrondie à 100 000 berrys (0 sans aucune carte)
const calculerPrime = (part) => {
  const primeMax = Math.max(...primes.map(([, montant]) => montant));
  return part === 0 ? 0 : Math.round(PRIME_DEPART * (primeMax / PRIME_DEPART) ** part / 100000) * 100000;
};


// Personnages utilisables comme équivalents : ceux qui ont une image d'avis de recherche (tous si aucune image n'a été lue, par exemple avec les primes gardées en secours)
const referencesAvecAvis = () => primes.some(([, , avis]) => avis) ? primes.filter(([, , avis]) => avis) : primes;


// Personnage dont la prime est la plus proche (écart relatif, adapté à des primes de 500 à plusieurs milliards de berrys)
const referenceProche = (prime) => referencesAvecAvis().reduce((proche, reference) => Math.abs(Math.log(reference[1] / prime)) < Math.abs(Math.log(proche[1] / prime)) ? reference : proche);


// Nom du personnage dont la prime est la plus proche
const primeProche = (prime) => referenceProche(prime)[0];


// Montant en berrys, avec espaces entre les milliers
const formaterBerrys = (montant) => "Tu vaux : " + montant.toLocaleString("fr-FR") + " ฿";


// Réduire la taille du texte d'un bloc sur une ligne pour qu'il tienne dans sa largeur (taille du CSS si elle suffit)
const ajusterTaille = (bloc) => {
  bloc.style.fontSize = ""; // Repartir de la taille du CSS
  if (bloc.scrollWidth > bloc.clientWidth) bloc.style.fontSize = parseFloat(getComputedStyle(bloc).fontSize) * bloc.clientWidth / bloc.scrollWidth + "px";
};


// Vider la recherche et décocher tous les filtres (sans réafficher les cartes)
const viderFiltres = () => {
  element("recherche").value = "";
  FILTRES.forEach((id) => { casesCochees(id).forEach((caseACocher) => caseACocher.checked = false); resumerFiltre(id); });
};


// ========================================================================================================


// ▶ Fonctions ====


// Charger toutes les lignes d'une table (par paquets de 1000, la limite de Supabase) ====
async function chargerTable(table, tri) {

  let lignes = [];
  for (let debut = 0; ; debut += 1000) {
    const { data, error } = await bdd.from(table).select("*").order(tri).range(debut, debut + 999);
    if (error) throw error;
    lignes = lignes.concat(data);
    if (data.length < 1000) break;
  }
  return lignes;

}


// Calculer une seule fois les champs utiles au filtrage et au tri de chaque carte ====
function preparerCartes() {

  cartes.forEach((carte) => {
    carte._cle = cleCarte(carte); // Clé unique
    carte._don = carte.carte_categorie === "DON!!"; // Carte DON!!
    carte._version = versionRegroupee(carte.carte_version); // Version regroupée pour le filtre et le tri
    carte._couleurs = carte._don ? ["DON!!"] : String(carte.carte_couleur || "").split(/[\/ +]/).filter(Boolean); // Couleurs pour le filtre (les DON!! forment leur propre couleur)
    carte._pastilles = carte._don ? ["black"] : carte._couleurs.map((couleur) => couleur.toLowerCase()); // Couleurs du liseré et des pastilles (DON!! en noir)
    carte._groupe = carte._don ? 0 : String(carte.carte_id_court).startsWith(carte.serie_id) ? 1 : 2; // 0 = DON!!, 1 = carte de la série, 2 = réédition
    carte._palier = carte._version === "Normal" ? carte.carte_rarete : carte._don ? "DON!! " + carte._version : carte._version; // Palier de scintillement : rareté si version normale, sinon version (« DON!! Gold » pour les DON!!)
    carte._infos = [carte._don ? null : carte.carte_categorie, carte.carte_rarete, carte.carte_version === "Normal" ? null : carte.carte_version + (carte.carte_version_num > 1 ? " " + carte.carte_version_num : "")].filter(Boolean).join(", "); // Texte « catégorie, rareté, version » (« DON!!, Gold » pour les DON!!, « Manga Art 2 » pour une deuxième version)
    carte._eclat = eclatRarete(carte); // Scintillement de la pastille (vide = pastille mate)
  });
  cartesParCle = Object.fromEntries(cartes.map((carte) => [carte._cle, carte]));

}


// Lire les primes canons connues sur One Piece Encyclopédie : une ligne [personnage, berrys, image de l'avis de recherche] par personnage, de la plus haute à la plus basse ====
async function chargerPrimes() {

  // Page du wiki (HTML renvoyé par l'API)
  const reponse = await fetch(PAGE_PRIMES);
  if (!reponse.ok) throw new Error("réponse " + reponse.status);
  const page = new DOMParser().parseFromString((await reponse.json()).parse.text, "text/html");

  // Nettoyer la page : retirer les références [12] et séparer les primes d'un même personnage (une par ligne)
  page.querySelectorAll("sup").forEach((reference) => reference.remove());
  page.querySelectorAll("br").forEach((saut) => saut.replaceWith("\n"));

  // Premier tableau avec les colonnes « Noms » et « Primes » (onglet « Primes Connues Canons »), colonne « Avis de recherche » si elle existe
  const titres = (tableau) => [...tableau.querySelectorAll("th")].map((titre) => titre.textContent.trim());
  const tableau = [...page.querySelectorAll("table")].find((tableau) => titres(tableau).includes("Noms") && titres(tableau).includes("Primes"));
  if (!tableau) throw new Error("tableau des primes introuvable");
  const [colonneNom, colonnePrime, colonneAvis] = ["Noms", "Primes", "Avis de recherche"].map((titre) => titres(tableau).indexOf(titre));

  // Image du dernier avis de recherche d'une cellule (images chargées à la demande sur le wiki : adresse dans data-src), à la largeur TAILLE_AVIS_WIKI
  const imageAvis = (cellule) => {
    const adresses = [...(cellule?.querySelectorAll("img") ?? [])].map((image) => image.dataset.src || image.getAttribute("src") || "").filter((adresse) => adresse.startsWith("http"));
    return adresses.length ? adresses.at(-1).replace(/\/scale-to-width-down\/\d+/, "/scale-to-width-down/" + TAILLE_AVIS_WIKI) : null;
  };

  // Une prime par personnage : la plus haute (en général la dernière), sans les primes hors-série ni les primes approximatives de la Cross Guild
  const liste = [...tableau.querySelectorAll("tr")]
    .map((ligne) => [...ligne.querySelectorAll("td")])
    .filter((cellules) => cellules.length > colonnePrime)
    .map((cellules) => {
      const nom = cellules[colonneNom].textContent.trim();
      const texte = cellules[colonnePrime].textContent.replace(/[\d \u00a0\u202f,.]+\(hors-série\)/g, "");
      const montants = (texte.match(/\d{1,3}(?:[ \u00a0\u202f,.]\d{3})+|\d+/g) || []).map((montant) => Number(montant.replace(/\D/g, "")));
      return [nom, texte.includes("CROSS GUILD") || montants.length === 0 ? null : Math.max(...montants), colonneAvis >= 0 ? imageAvis(cellules[colonneAvis]) : null];
    })
    .filter(([nom, montant]) => nom && montant !== null && !["Pirate", "Criminel"].includes(nom) && !nom.startsWith("Postulant"));

  // De la plus haute à la plus basse prime (ordre de la page conservé en cas d'égalité)
  if (liste.length === 0) throw new Error("aucune prime lue");
  return liste.sort((a, b) => b[1] - a[1]);

}


// Démarrer l'application une fois connecté ====
async function demarrer() {

  // Basculer de l'écran de connexion à l'écran de l'application
  element("ecran-connexion").hidden = true;
  element("ecran-application").hidden = false;
  element("utilisateur-email").textContent = utilisateur.email;
  afficherMessage(TEXTES.chargement);

  // Charger les cartes et la collection de l'utilisateur
  try {
    cartes = await chargerTable(TABLE_CARTES, "carte_id_long");
    const lignesCollection = await chargerTable(TABLE_COLLECTION, "ligne_id");
    collection = Object.fromEntries(lignesCollection.map((ligne) => [cleCarte(ligne), ligne]));
  } catch (erreur) {
    afficherMessage(TEXTES.chargementImpossible + erreur.message);
    return;
  }
  preparerCartes();

  // Lire les primes sur le wiki sans retarder l'affichage, puis réafficher la prime (dernières primes gardées par le navigateur en secours)
  chargerPrimes()
    .then((liste) => { primes = liste; try { localStorage.setItem(MEMOIRE_PRIMES, JSON.stringify(liste)); } catch { } })
    .catch((erreur) => { console.warn("Primes illisibles sur le wiki :", erreur); try { primes = JSON.parse(localStorage.getItem(MEMOIRE_PRIMES)) || []; } catch { primes = []; } })
    .finally(afficherCartes);
  afficherMessage("");

  // Remplir le filtre des séries (une option par série, dans l'ordre des séries)
  const series = Object.values(Object.fromEntries(cartes.map((carte) => [carte.serie_id, carte])));
  remplirFiltre("filtre-serie", series.sort((a, b) => comparerSeries(a.serie_id, b.serie_id)).map((carte) => [carte.serie_id, carte.serie_id + " - " + carte.serie_nom]));

  // Remplir les autres filtres (une carte multicolore apparaît dans chacune de ses couleurs)
  remplirFiltre("filtre-categorie", valeursUniques(cartes.map((carte) => carte.carte_categorie), ORDRE_CATEGORIES));
  remplirFiltre("filtre-rarete", valeursUniques(cartes.map((carte) => carte.carte_rarete), ORDRE_RARETES));
  remplirFiltre("filtre-version", valeursUniques(cartes.map((carte) => carte._version), ORDRE_VERSIONS));
  remplirFiltre("filtre-couleur", valeursUniques(cartes.flatMap((carte) => carte._couleurs), ORDRE_COULEURS));

  // Afficher les cartes
  afficherCartes();

}


// Afficher les visuels de toutes les versions du numéro de la carte, à côté de la loupe survolée ou en plein écran avec le bouton œil (rien si aucun visuel n'existe) ====
async function afficherApercu(loupe, pleinEcran = false) {

  // Visuels de toutes les versions du numéro de la carte, sans les versions promo (ignorés si la souris a quitté la loupe entre-temps)
  loupeSurvolee = loupe;
  const exclus = typeof VISUELS_FILTRES === "undefined" ? new Set() : VISUELS_FILTRES; // Visuels promo à écarter (fichier visuels.js, vide s'il manque)
  const visuels = (await chercherVisuels(loupe.dataset.numero)).filter((adresse, version) => adresse && !exclus.has(loupe.dataset.numero + VERSIONS_VISUELS[version]));
  if (loupeSurvolee !== loupe || visuels.length === 0) return;

  // Remplir l'aperçu : toutes les versions possibles sur une ligne, dans l'ordre de Limitless (l'utilisateur repère la sienne)
  const apercu = element("apercu-carte");
  apercu.innerHTML = visuels.map((adresse) => `<img src="${adresse}" alt="">`).join("");
  apercu.classList.toggle("plein-ecran", pleinEcran);
  apercu.style.left = apercu.style.top = ""; // Position du survol précédent effacée
  apercu.hidden = false;
  if (pleinEcran) return; // Plein écran : centré par style.css, versions qui défilent de gauche à droite

  // Placer l'aperçu à droite de la loupe (à gauche s'il n'y a pas la place), sans sortir de la fenêtre
  const zoneLoupe = loupe.getBoundingClientRect(), zoneApercu = apercu.getBoundingClientRect();
  const gauche = zoneLoupe.right + 8 + zoneApercu.width <= window.innerWidth ? zoneLoupe.right + 8 : zoneLoupe.left - 8 - zoneApercu.width;
  apercu.style.left = Math.max(8, gauche) + "px";
  apercu.style.top = Math.max(8, Math.min(zoneLoupe.top, window.innerHeight - zoneApercu.height - 8)) + "px";

}


// Construire la vignette d'une carte ====
function vignette(carte) {

  const ligne = ligneCollection(carte);
  const actif = (colonne) => ligne[colonne] === 1 ? "actif" : ""; // Langue cochée ou carte dans le panier
  const disponible = (langue) => carte["serie_langue_" + langue] == 1 ? "" : "disabled"; // Langue sortie pour la série
  const classes = ["carte", estCollectionnee(carte) ? "collectionnee" : "", carte._don ? "don" : ""].join(" ");
  const boutonsLangues = Object.keys(LANGUES).map((langue) => `<button data-colonne="carte_col_langue_${langue}" class="${actif("carte_col_langue_" + langue)}" ${disponible(langue)} title="${LANGUES[langue]}"><img src="https://flagcdn.com/${DRAPEAUX[langue]}.svg" alt="${langue.toUpperCase()}"></button>`).join("");
  return `
    <article class="${classes}" data-couleur="${carte._pastilles[0] || ""}" data-couleur-2="${carte._pastilles[1] || ""}">
      <div class="carte-pastilles">${carte._pastilles.map((couleur) => `<span class="carte-pastille" data-couleur="${couleur}"${carte._eclat ? ` data-eclat="${carte._eclat}"` : ""}></span>`).join("")}</div>
      <a class="carte-loupe" href="${RECHERCHE_CARDMARKET(carte)}" target="_blank" rel="noopener" aria-label="Chercher sur Cardmarket" data-numero="${carte.carte_id_court}">${icone(["loupe"])}</a>
      <button type="button" class="bouton-apercu" data-numero="${carte.carte_id_court}" title="Voir les visuels">${icone(["oeil"])}</button>
      <p class="carte-serie">${carte.serie_id}</p>
      <p class="carte-numero">${carte.carte_id_court}</p>
      <h3 class="carte-nom">${carte.carte_nom}</h3>
      <p class="carte-infos">${carte._infos}</p>
      <div class="carte-boutons" data-cle="${carte._cle}">
        ${boutonsLangues}
        <button data-colonne="carte_panier" class="panier ${actif("carte_panier")}" title="Panier">${icone(["caddie"])}</button>
      </div>
    </article>`;

}


// Afficher les cartes filtrées de la double page en cours ====
function afficherCartes() {

  // Aperçu des visuels masqué (la loupe survolée va disparaître)
  masquerApercu();

  // Cartes retenues par la recherche et les filtres (plusieurs cases cochées = l'une ou l'autre, aucune case = pas de filtre)
  const recherche = element("recherche").value.toLowerCase();
  const [series, categories, raretes, versions, couleurs, etats, paniers] = FILTRES.map(valeursCochees);
  const cartesAffichees = cartes.filter((carte) =>
    retenue(series, carte.serie_id) &&
    (carte.carte_nom + " " + carte.carte_id_court).toLowerCase().includes(recherche) &&
    retenue(categories, carte.carte_categorie) &&
    retenue(raretes, carte.carte_rarete) &&
    retenue(versions, carte._version) &&
    (couleurs.length === 0 || carte._couleurs.some((couleur) => couleurs.includes(couleur))) &&
    retenue(etats, estCollectionnee(carte) ? "oui" : "non") &&
    retenue(paniers, ligneCollection(carte).carte_panier === 1 ? "oui" : "non")
  );

  // Tri selon le choix de la liste (« |desc » = ordre inverse, « serie_id » = tri par pertinence)
  const [colonneTri, sensTri] = element("choix-tri").value.split("|");
  const sens = sensTri === "desc" ? -1 : 1;
  cartesAffichees.sort((a, b) => colonneTri === "serie_id" ? comparerCartes(a, b) : String(a[colonneTri] ?? "").localeCompare(String(b[colonneTri] ?? ""), "fr", { numeric: true }) * sens);

  // Progression (séries cochées, ou toutes les cartes si aucune série cochée)
  const cartesSeries = cartes.filter((carte) => retenue(series, carte.serie_id));
  element("progression").textContent = TEXTES.progression(cartesSeries.filter(estCollectionnee).length, cartesSeries.length);
  element("compteur-cartes").textContent = TEXTES.compteurCartes(cartes.filter(estCollectionnee).length, cartes.length); // Toute la collection, quels que soient les filtres

  // Prime de collection (toutes les cartes, quels que soient les filtres) et personnage à la prime la plus proche
  ["prime-montant", "prime-equivalente"].forEach((id) => element(id).hidden = primes.length === 0); // Montant et prime équivalente masqués si les primes n'ont pas pu être chargées (progression toujours affichée)
  if (primes.length > 0) {
    const prime = calculerPrime(cartes.filter(estCollectionnee).length / Math.max(1, cartes.length));
    element("prime-montant").textContent = formaterBerrys(prime);
    element("prime-equivalente").textContent = prime > 0 ? TEXTES.primeEquivalente(primeProche(prime)) : TEXTES.primeAucune;
  }

  // Nombre de cartes dans le panier (pastille masquée si le panier est vide)
  const nbPanier = cartes.filter((carte) => ligneCollection(carte).carte_panier === 1).length;
  element("compteur-panier").textContent = nbPanier;
  element("compteur-panier").hidden = nbPanier === 0;

  // Nombre de filtres cochés sur le bouton des filtres (téléphone, pastille masquée si aucun)
  const nbFiltres = FILTRES.reduce((n, id) => n + casesCochees(id).length, 0);
  element("compteur-filtres").textContent = nbFiltres;
  element("compteur-filtres").hidden = nbFiltres === 0;

  // Téléphone : liste continue sur toute la largeur, prolongée par lots, sans pagination
  observateurListe.disconnect();
  if (TELEPHONE.matches) {
    element("grille-cartes").innerHTML = `<div class="liste-cartes">${cartesAffichees.slice(0, nbListe).map(vignette).join("")}</div>${cartesAffichees.length > nbListe ? `<div id="suite-liste"></div>` : ""}`;
    if (element("suite-liste")) observateurListe.observe(element("suite-liste"));
    return element("pagination").hidden = true;
  }

  // Double page en cours
  const nbPages = Math.max(1, Math.ceil(cartesAffichees.length / (2 * CARTES_PAR_PAGE)));
  page = Math.min(page, nbPages);
  const cartesPage = cartesAffichees.slice((page - 1) * 2 * CARTES_PAR_PAGE, page * 2 * CARTES_PAR_PAGE);

  // Afficher la double page (chaque page complétée par des pochettes vides)
  const pageClasseur = (liste) => `<div class="page-classeur">${liste.map(vignette).join("")}${"<div class='emplacement-vide'></div>".repeat(CARTES_PAR_PAGE - liste.length)}</div>`;
  element("grille-cartes").innerHTML = pageClasseur(cartesPage.slice(0, CARTES_PAR_PAGE)) + pageClasseur(cartesPage.slice(CARTES_PAR_PAGE));

  // Pagination (masquée s'il n'y a qu'une double page)
  element("pagination").innerHTML = `
    <button data-page="${page - 1}" ${page === 1 ? "disabled" : ""}>◀</button>
    <span>${TEXTES.page(page, nbPages)}</span>
    <button data-page="${page + 1}" ${page === nbPages ? "disabled" : ""}>▶</button>`;
  element("pagination").hidden = nbPages === 1;

}


// Afficher le résumé de la collection par série ====
function afficherSeries() {

  // Regrouper les cartes par série
  const series = {};
  cartes.forEach((carte) => (series[carte.serie_id] ??= []).push(carte));

  // Une ligne par série, dans l'ordre des séries
  element("tableau-series").innerHTML = Object.values(series)
    .sort((a, b) => comparerSeries(a[0].serie_id, b[0].serie_id))
    .map((liste) => {
      const serie = liste[0];
      const langues = Object.keys(LANGUES).filter((langue) => serie["serie_langue_" + langue] == 1);
      const possedees = liste.filter(estCollectionnee).length;
      const pourcentage = Math.round(possedees / liste.length * 100);
      const parLangue = (langue) => langues.includes(langue) ? liste.filter((carte) => ligneCollection(carte)["carte_col_langue_" + langue] === 1).length : "–";
      return `
        <tr>
          <td class="serie-id">${serie.serie_id}</td>
          <td>${serie.serie_nom}</td>
          <td>${formaterDate(serie.serie_date_sortie)}</td>
          <td>${possedees} / ${liste.length}</td>
          ${Object.keys(LANGUES).map((langue) => `<td>${parLangue(langue)}</td>`).join("")}
          <td class="serie-langues">${langues.map(drapeau).join("")}</td>
          <td><div class="progression-serie"><div class="barre"><div class="barre-remplie" style="width: ${pourcentage}%"></div>${possedees === liste.length ? `<span class="badge-conquise">${TEXTES.serieConquise}</span>` : ""}</div><span>${pourcentage} %</span></div></td>
          <td>${aSymbole(liste, "serie_symbole_crayon") ? icone(["crayon"], "symbole") : ""}</td>
          <td>${aSymbole(liste, "serie_symbole_langue") ? icone(["drapeau"], "symbole") : ""}</td>
          <td><button type="button" class="bouton-voir-serie" data-serie="${serie.serie_id}" title="${TEXTES.voirSerie}">${icone(["fleche"])}</button></td>
        </tr>`;
    }).join("");

}


// Ouvrir l'avis de recherche : logo qui saute, puis affiche avec la prime qui défile jusqu'à sa valeur ====
function ouvrirAvis() {

  // Petit saut du logo (animation relancée à chaque clic)
  const logo = element("bouton-logo");
  logo.classList.remove("saute");
  void logo.offsetWidth; // Recalcul forcé pour relancer l'animation
  logo.classList.add("saute");

  // Prime, personnage équivalent et progression (toute la collection, quels que soient les filtres)
  const possedees = cartes.filter(estCollectionnee).length;
  const prime = primes.length > 0 ? calculerPrime(possedees / Math.max(1, cartes.length)) : null;
  element("avis-nom").textContent = TEXTES.avisNom(utilisateur?.email ?? "");
  ["avis-equivalente", "avis-personnage"].forEach((id) => element(id).textContent = ""); // Remplis pendant le défilement de la prime
  element("avis-progression").textContent = TEXTES.progression(possedees, cartes.length);
  element("avis-recherche").hidden = false;

  // Défilement de personnage en personnage : chaque étape affiche la prime exacte du personnage nommé, puis la prime finale et son équivalent
  clearTimeout(minuterieAvis);
  if (prime === null) return element("avis-montant").textContent = TEXTES.avisSansPrime;
  const paliers = referencesAvecAvis().filter(([, montant]) => montant < prime).sort((a, b) => a[1] - b[1]); // Personnages dont la prime est sous la prime finale, de la plus basse à la plus haute
  const nbEtapes = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : Math.min(ETAPES_AVIS, paliers.length); // Aucune étape si les animations sont réduites
  const etapes = [...Array.from({ length: nbEtapes }, (_, i) => paliers[Math.floor(i * paliers.length / nbEtapes)]), prime > 0 ? [referenceProche(prime)[0], prime, referenceProche(prime)[2]] : [null, prime, null]]; // Personnages répartis régulièrement, puis la prime finale
  etapes.forEach(([, , avis]) => { if (avis) new Image().src = avis; }); // Avis de recherche préchargés pour s'afficher sans attente
  const afficherEtape = (i) => {
    const [nom, montant, avis] = etapes[i];
    element("avis-portrait").src = avis || AVIS_PAR_DEFAUT; // Avis de recherche du personnage (logo du site s'il n'en a pas)
    element("avis-montant").textContent = TEXTES.avisMontant(montant);
    ajusterTaille(element("avis-montant")); // Montant réduit s'il dépasse la largeur de l'affiche
    element("avis-equivalente").textContent = nom ? TEXTES.avisEquivalente : TEXTES.primeAucune; 
    element("avis-personnage").textContent = nom ?? ""; 
    if (i < etapes.length - 1 && !element("avis-recherche").hidden) minuterieAvis = setTimeout(() => afficherEtape(i + 1), DUREE_ETAPE_AVIS); // Étape suivante, toutes de même durée
  };
  afficherEtape(0);

}


// Fermer l'avis de recherche
const fermerAvis = () => { clearTimeout(minuterieAvis); element("avis-recherche").hidden = true; };


// Afficher un onglet et masquer les autres ====
function afficherOnglet(id) {

  document.querySelectorAll(".onglet").forEach((bouton) => bouton.classList.toggle("actif", bouton.dataset.onglet === id));
  document.querySelectorAll(".onglet-contenu").forEach((onglet) => onglet.hidden = onglet.id !== id);
  if (id === "onglet-series") afficherSeries(); // Résumé recalculé à chaque ouverture (collection à jour)

}


// Cocher ou décocher une langue ou le panier d'une carte, puis enregistrer dans Supabase ====
async function basculer(cle, colonne) {

  // Carte concernée et nouvelle valeur (0 devient 1, 1 devient 0)
  const carte = cartesParCle[cle];
  const nouvelleValeur = ligneCollection(carte)[colonne] === 1 ? 0 : 1;

  // Enregistrer dans Supabase
  const { data, error } = await bdd.from(TABLE_COLLECTION)
    .upsert({
      utilisateur_id: utilisateur.id,
      serie_id: carte.serie_id,
      carte_id_court: carte.carte_id_court,
      carte_version: carte.carte_version,
      carte_version_num: carte.carte_version_num,
      [colonne]: nouvelleValeur
    }, { onConflict: "utilisateur_id,serie_id,carte_id_court,carte_version,carte_version_num" })
    .select()
    .single();

  // Message si erreur, sinon mise à jour de l'affichage
  if (error) return afficherMessage(TEXTES.enregistrementImpossible + error.message);
  collection[cle] = data;
  afficherCartes();

}


// Vider le panier : retirer toutes les cartes du panier, puis enregistrer dans Supabase ====
async function viderPanier() {

  // Demander confirmation
  if (!confirm(TEXTES.confirmationViderPanier)) return;

  // Enregistrer dans Supabase (uniquement les lignes de l'utilisateur présentes dans le panier)
  const { data, error } = await bdd.from(TABLE_COLLECTION)
    .update({ carte_panier: 0 })
    .eq("utilisateur_id", utilisateur.id)
    .eq("carte_panier", 1)
    .select();

  // Message si erreur, sinon mise à jour de l'affichage
  if (error) return afficherMessage(TEXTES.enregistrementImpossible + error.message);
  data.forEach((ligne) => collection[cleCarte(ligne)] = ligne);
  afficherCartes();

}


// ========================================================================================================


// ▶ Événements ====


// Connexion
element("formulaire-connexion").addEventListener("submit", async (evenement) => {
  evenement.preventDefault();
  element("message-connexion").textContent = TEXTES.connexion;
  const { data, error } = await bdd.auth.signInWithPassword({ email: element("email").value, password: element("mot-de-passe").value });
  if (error) return element("message-connexion").textContent = TEXTES.connexionImpossible;
  element("message-connexion").textContent = "";
  utilisateur = data.user;
  demarrer();
});


// Afficher ou masquer le mot de passe
element("bouton-voir-mot-de-passe").addEventListener("click", () => {
  const champ = element("mot-de-passe");
  champ.type = champ.type === "password" ? "text" : "password";
});


// Déconnexion
element("bouton-deconnexion").addEventListener("click", async () => {
  await bdd.auth.signOut();
  location.reload();
});


// Changement de tri, de recherche ou d'icône de filtre (retour à la première double page)
const filtrer = () => { page = 1; nbListe = CARTES_PAR_LOT; afficherCartes(); };
TELEPHONE.addEventListener("change", () => { if (cartes.length) filtrer(); }); // Passage téléphone ↔ ordinateur (rotation, fenêtre redimensionnée) : liste ou classeur
element("choix-tri").addEventListener("change", filtrer);
element("recherche").addEventListener("input", filtrer);
element("filtre-etat").addEventListener("change", filtrer);
element("filtre-panier").addEventListener("change", filtrer);


// Case cochée ou décochée dans un filtre de la barre latérale : mettre à jour son résumé puis filtrer
document.querySelector(".barre-outils").addEventListener("change", (evenement) => {
  const filtre = evenement.target.closest(".filtre");
  if (!filtre) return;
  resumerFiltre(filtre.id);
  filtrer();
});


// Bouton des filtres (téléphone) : afficher ou masquer la prime, les filtres, le tri et les icônes
element("bouton-filtres").addEventListener("click", () => element("bouton-filtres").setAttribute("aria-expanded", element("onglet-cartes").classList.toggle("filtres-ouverts")));


// Réinitialiser la recherche et tous les filtres
element("bouton-reinitialiser").addEventListener("click", () => { viderFiltres(); filtrer(); });


// Clic sur un onglet
document.querySelectorAll(".onglet").forEach((bouton) => bouton.addEventListener("click", () => afficherOnglet(bouton.dataset.onglet)));


// Clic sur la flèche d'une série : onglet « Cartes » filtré sur cette série, autres filtres remis à zéro
element("tableau-series").addEventListener("click", (evenement) => {
  const fleche = evenement.target.closest(".bouton-voir-serie");
  if (!fleche) return;
  viderFiltres();
  const caseSerie = element("filtre-serie").querySelector(`input[value="${fleche.dataset.serie}"]`);
  if (caseSerie) caseSerie.checked = true;
  resumerFiltre("filtre-serie");
  afficherOnglet("onglet-cartes");
  filtrer();
  window.scrollTo(0, 0);
});


// Clic sur le logo : avis de recherche ; fermeture par la croix, un clic à côté de l'affiche ou la touche Échap
element("bouton-logo").addEventListener("click", ouvrirAvis);
element("bouton-fermer-avis").addEventListener("click", fermerAvis);
element("avis-recherche").addEventListener("click", (evenement) => { if (evenement.target === evenement.currentTarget) fermerAvis(); });
document.addEventListener("keydown", (evenement) => { if (evenement.key === "Escape") { fermerAvis(); masquerApercu(); } }); // Échap ferme aussi l'aperçu plein écran


// Clic sur le bouton pour vider le panier
element("bouton-vider-panier").addEventListener("click", viderPanier);


// Survol de la loupe d'une vignette (souris uniquement) : aperçu des visuels de la carte, masqué en quittant la loupe ou en faisant défiler la page
element("grille-cartes").addEventListener("mouseover", (evenement) => {
  const loupe = evenement.target.closest(".carte-loupe");
  if (loupe && loupe !== loupeSurvolee && matchMedia("(hover: hover)").matches) afficherApercu(loupe);
});
element("grille-cartes").addEventListener("mouseout", (evenement) => {
  const loupe = evenement.target.closest(".carte-loupe");
  if (loupe && !loupe.contains(evenement.relatedTarget)) masquerApercu();
});
window.addEventListener("scroll", masquerApercu, { passive: true });
element("apercu-carte").addEventListener("click", masquerApercu); // Toucher l'aperçu plein écran le ferme


// Clic sur l'œil (aperçu plein écran), un drapeau ou un caddie d'une vignette
element("grille-cartes").addEventListener("click", (evenement) => {
  const oeil = evenement.target.closest(".bouton-apercu");
  if (oeil) return afficherApercu(oeil, true);
  const bouton = evenement.target.closest("button[data-colonne]");
  if (bouton) basculer(bouton.parentElement.dataset.cle, bouton.dataset.colonne);
});


// Clic sur une flèche de pagination (changement de double page puis retour en haut)
element("pagination").addEventListener("click", (evenement) => {
  const bouton = evenement.target.closest("button[data-page]");
  if (!bouton) return;
  page = Number(bouton.dataset.page);
  afficherCartes();
  window.scrollTo({ top: 0, behavior: "smooth" });
});


// Flèches ← → du clavier pour changer de double page (onglet « Cartes » uniquement, sauf pendant une saisie)
document.addEventListener("keydown", (evenement) => {
  const index = { ArrowLeft: 0, ArrowRight: 1 }[evenement.key];
  if (index === undefined || element("ecran-application").hidden || element("onglet-cartes").hidden || document.activeElement.matches("input[type=search], input[type=text], select")) return;
  evenement.preventDefault();
  element("pagination").querySelectorAll("button")[index]?.click();
});


// ========================================================================================================


// ▶ Au chargement de la page ====


// Date de mise à jour dans l'en-tête
element("maj").textContent = TEXTES.maj;


// Reprendre la session si l'utilisateur est déjà connecté
bdd.auth.getSession().then(({ data }) => {
  if (!data.session) return;
  utilisateur = data.session.user;
  demarrer();
});


// ========================================================================================================