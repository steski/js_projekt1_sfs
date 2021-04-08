// Hier wurden Manuell Farben ausgewählt, welche Sich besser unterscheiden lassen
// Zufallsfunktion erzeugt desöfteren blöde Farben (zu ähnlich, zu weiß etc.)
// Somit werden Farben aus diesem Array hinzugefügt
// mittels Splice wird es auch keine doppelten Farben geben
// bis 40 Farben schafft es eh keiner, falls doch, wird Zufällig gewählt
// splice wird dann beim Schwierigkeitsgrad, bei dem mehr als 40 Farben auftreten können entfernt

let allefarbRaeume = [
        'firebrick',
        'deeppink',
        'mediumorchid',
        'darkblue',
        'dodgerblue',
        'cyan',
        'gold',
        'darkorange',
        'lightseagreen',
        'dimgray',
        'crimson',
        'salmon',
        'indigo',
        'blue',
        'rgb(129, 75, 75)',
        'deepskyblue',
        'limegreen',
        'goldenrod',
        'green',
        'teal',
        'red',
        'indianred',
        'fuchsia',
        'darkmagenta',
        'mediumslateblue',
        'darkturquoise',
        'orange',
        'greenyellow',
        'olivedrab',
        'darkgray',
        'maroon',
        'tomato',
        'darkviolet',
        'cornflowerblue',
        'chocolate',
        'black',
        'yellow',
        'burlywood',
        'springgreen',
        'darkslategray'
];
let kopieallefarbRaeume = [];
