const todos = [
    { id : 1, title : 'ranger le bureau', completed : false },
    { id : 3, title : 'laver le sol', completed : true },
    { id : 2, title : 'brosser le chien', completed : false },
]

const map = new Map(todos.map(element => [element.id, element])) // Array to map

map.get(4) // Récupérer un élément par sa clé, renvoit undefined si l'élément n'éxiste pas
map.has(3) // Déterminer si une clé éxiste

console.log(map.entries()) // Récupérer le tableau de clé valeur

map.forEach(element => element) // Parcourir le tablelau de valeur
map.forEach((value, key, wholeMap) => key) // Parcourir le tablelau clé/valeur

map.keys() // Liste des clés
map.values() // Liste des valeurs
