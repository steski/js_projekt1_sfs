// ################ VARIABLEN START ################

// Für meine Übersicht wird jede Variable mit einem Inhalt deklariert, der Aufschluss über den Datentyp gibt ( z.B. 0 = Int, "string" = string)
// Dies muss man nicht machen, allerdings finde ich es so übersichtlicher

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
// timerZahlStopp als peudo Bool : 0 = Weiter, 1 = Stopp
let timerZahlStopp = 0;
// Zähler für die gesamte Zeit
let timerZahl = 0;
// Hilfsvariablen für Punktebrechnung
let timerZahlAlt = 0;
let diff = 0;
// soll wie Bool funktionieren, 1 = freundlich, 2 = traurig
// Durch IF Abfrage in Proto Form
let gesichtMund = 0;
// Variabel für AnimationFrame(render)
let ani;
// Variabel für den Timer. muss Außerhalb der Timer funktion deklariert werden, damit drauf zugegriffen werden kann
let balkenTimer;

// ################ VARIABLEN ENDE ################