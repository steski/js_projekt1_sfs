// ################ VARIABLEN START ################

// Anzahl der Objekte zum Start des Spiels - int
let tierAnzahlStart, gesichtAnzahlStart, ufoAnzahlStart, hausAnzahlStart = 0;
// Anzahl der Objekte nach dem Start
// Wird zum Abgleich in Variabel gespeichert, damit das Programm weiß, was fehlt - int
let tierAnzahlEnde, gesichtAnzahlEnde, ufoAnzahlEnde, hausAnzahlEnde = 0;
// Variabel zum speichern des fehlenden Objektes - string
let fehlendesObjekt = "String";
// Zeit, die der Benutzer hat um die Formen zu merken, wird in Millisekunden angegeben - int
let warteZeit = 1000;
// Variabel für Schwierigkeitsgrad - int
let schwierigkeitID = 0;
// Varabel für Punkte - int
let punkte = 0;
// Variabel für Fehlversuche - int
let fehlversuche = 0;
// wie Bool 0 = Weiter, 1 = Stopp
let timerZahlStopp = 0;
// Zähler für die gesamte Zeit
let timerZahl = 0;
// Hilfsvariablen für Punktebrechnung
let timerZahlAlt = 0;
let diff = 0;
// wie Bool 1 = :), 2 = :()
// Durch IF Abfrage in Proto Form
let gesichtMund = 0;
// Variabel AnimationFrame(render)
let ani;
// Variabel für Timer. muss Außerhalb der Timer funktion deklariert werden, damit drauf zugegriffen werden kann
let balkenTimer;

// ################ VARIABLEN ENDE ################