(function(){

// ############################ SPIELABLAUF FUNKTIONEN START #############################

// Zurückstzen Start
function zurücksetzen(){
    // Spielfeld leeren

        // Andere Möglichkeit Spielfeld zurückzusetzen, es wird einfach alles weiß gemacht
        // ctx.fillStyle = "rgba(255, 255, 255, 1)";
        // ctx.fillRect(0, 0, co.width, co.height);
    
    // Extra Funktion
    // hier wird alles im Canvas gelöscht
    canvasLeeren();
    // Spielvariablen zurücksetzen
    fehlendesObjekt = "string";
}; // Zurücksetzen Ende


// Neues Spiel Funktion, Alles wird zurückgesetzt
function neuesSpiel(){
    // Komplettes Neu Laden der Seite bei einem Neuen Spiel
    // Somit wird sichergestellt, dass alles zurückgesetzt wurde
    // Es ist nicht mehr nötig die Variablen Neu zu setzen und die Sichtbarkeit zu ändern
    location.reload();
};
// #################################### START DES SPIELS ####################################################

// Spiel Starten Funktion, hier wird das Spiel gestartet
// Countdown wird angezeigt

const spielErstmaligStarten = async () => {
    // Relevante Buttons und Texte werden für den Spielstart geändert (Inhalt, Sichtbarkeit, Farbe)
    el('#zeitinfo').style.display="none";
    el('#zeit').style.display="none";
    el("#spielStarten").style.display="none";
    el("#neuesSpiel").style.display="block";

    // 3-2-1 Countdown
    startCountDown();
    await delay(3000);
    // Canvasl Leeren für SFS Schriftzug
    canvasLeeren();
    // Timer mit dem 1. Balken wird aufgerufen
    //timerZaehler(warteZeit);
    ampelBalkenEins();
    // Timer Stopp wird 0 gesetzt --> Timer läuft weiter (bzw fängt in diesem Falle an)
    timerZahlStopp = 0;
    // Funktion zum Anzeigen der zeit wird aufgurfen ( fängt hier an )
    timerZahlFunktion()
    
    el("#level").style.display="block";
    el("#info1").style.display="block";
    el("#spieldauer").style.display="block";
    el("#naechsteRunde").style.display="none";
    el('#fehlversuche').style.color="#4CAF50";
    el('#punkte').innerHTML = `Punkte: ${punkte}`;

    // Startvariablen werden gesetzt
    schwierigkeitID = 1;
    fehlversuche = 4;
    el('#fehlversuche').innerHTML = `Du hast noch ${fehlversuche} Fehlversuche`;

    // Beginn der Schwierigkeitsfunktion
    schwierigkeit();
};

// Schwierigkeits Funktionen Start
// Hier werden bestimmt wieviele Formen erscheinen
// die ersten Grade wiederholen sich und sich Hardcoded um eine feinere Abstufung für einen besseren Spielfluss zu erreichen
function schwierigkeit(){ 
    // Grad 1 2 3 : 1 Form Anzeigen
    if (schwierigkeitID == 1 || schwierigkeitID == 2 || schwierigkeitID == 3){
        zufallsAnzahl(1,0);
    }
    // Grad 3 4 5: mehr Formen Anzeigen
    else if(schwierigkeitID == 4 || schwierigkeitID == 5 || schwierigkeitID == 6){
        zufallsAnzahl(1,1);
    }
    // Grad 4 5 6
    else if(schwierigkeitID == 7 || schwierigkeitID == 8 || schwierigkeitID == 9){
        zufallsAnzahl(2,1);
    }
    // weitere grade
    else if(schwierigkeitID == 10 || schwierigkeitID == 11 || schwierigkeitID == 12){
        zufallsAnzahl(2,2);
    }
    //  weitere grade
    else if(schwierigkeitID == 13|| schwierigkeitID == 14 || schwierigkeitID == 15){
        zufallsAnzahl(3,2);
    }
    // Danach: Erhöhung des Schwierigkeitsgrades bis ins Unendliche
    else{
        // Anzahl der Formen ist hier nicht mehr Hardcoded, sondern erhöht sich langsam in Abhängig vom Schwierigkeitsgrad
        zufallsAnzahl((Math.ceil(schwierigkeitID/5)),(Math.ceil(schwierigkeitID/4)));
    };
    el('#level').innerHTML = `Level: ${schwierigkeitID}`;
    //console.log("Schwierigkeit: ",schwierigkeitID);
    console.log("Gesamt Formen: ",tierAnzahlStart+hausAnzahlStart+ufoAnzahlStart+gesichtAnzahlStart)
    // Startet das Spiel mit der berechneten Anzahl der Formen
    spielStarten();
}; // Schwierigkeits Funktionen Ende

// Funktion zum Starten der Ersten Phase jeder Runde
// Hier wird das Spiel gestartet, nachdem alle Variablen entsprechend gespeichert wurden
function spielStarten(){

    // neue Kopie des Farbarrays wird erstellt, nur bis lvl 18 Relevant
    kopieallefarbRaeume = [...allefarbRaeume];
    // Anweisung für den Benutzer
    el('#info1').innerHTML = `Merke dir die Formen!`;
    el("#info1").style.color="rgb(200, 200, 150)";
    // Spielfeld zurücksetzen
    zurücksetzen();
    // Rate Button unsichtbar machen
    rateButtonsUnsichtbar()
    // Ausführung
    klonFabrik();
    render();
    // Timer mit dem 1. Balken wird aufgerufen
    //timerZaehler(warteZeit);
    timerZaehler();
    ampelBalkenEins();
    // Timout bevor es weiter geht
    setTimeout(spielMerken,warteZeit);
}; // Funktionen zum Starten der ersten Phase Ende

// Funktion zum Start der nächsten Phase des Spiels - hier wird eine Form weniger angezeigt
// Hier kommt alles rein, was mit der nächsten Phase des Spiels zu tun hat
    // ein Objekt eliminieren
    // Objekte wieder anzeigen ( ebenfalls Zufällig )
function spielMerken(){

    // neue Kopie des Farbarrays wird erstellt, nur bis lvl 18 Relevant
    kopieallefarbRaeume = [...allefarbRaeume];
    // Anweisung für den Benutzer
    el('#info1').innerHTML = `Eine Form fehlt hier!`;
    // Spielfeld zurücksetzem
    zurücksetzen();
    // Eine Form weniger
    eliminator();
    // Ausführung
    klonFabrikEnde();
    render();
    // Timer mit dem 2. Balken wird aufgerufen

    // BUG: Ältere Rechner (Connis Cimdata Rechner) sind anscheinend nicht schnell genug. der 2. Timer wird nicht ausgelöst weil der erste noch läuft
    // Durch den kleinen Timeout konnte das Problem umgangen werden.
    // Bei noch älteren Rechnern vielleicht noch mehr Timeout?
    clearInterval(balkenTimer);
    //timerZaehler(warteZeit);
    setTimeout(timerZaehler,100);
    //timerZaehler();
    setTimeout(ampelBalkenZwei,100);
    // Rate Button nach Timeout Sichtbar machen
    setTimeout(rateButtonsSichtbar,warteZeit+100);

    // Ab hier muss der Benutzer Den richtigen ( Oder falschen ) Button mit der entsprechenden Form drücken
    // Spiel verbleibt bis dahin in diesem Zustand

}; //Funktion zum Start der nächsten Phase Ende

// ##### Welche Form Fehlt? Start #####

// Hier sind die Funktionen für die Clicks - Spiel geht nach einem Click weiter
// Jeder Button steht für die entsprechende Form und ruft die Überprüfung auf Richtig oder Falsch auf
function tierFehlt(){
    // Richtig
    if (fehlendesObjekt == "Tier"){
        richtigeWahl();
    // Falsch
    }else{
        falscheWahl();
    };
    // Rate Buttons nach Klick Unsichtbar machen
    rateButtonsUnsichtbar();  
};

function ufoFehlt(){
    // Richtig
    if (fehlendesObjekt == "Ufo"){
        richtigeWahl();
    // Falsch
    }else{
        falscheWahl();
    };
    // Rate Buttons nach Klick Unsichtbar machen
    rateButtonsUnsichtbar();
};

function gesichtFehlt(){
    // Richtig
    if (fehlendesObjekt == "Gesicht"){
        richtigeWahl();
    // Falsch
    }else{
        falscheWahl();
    };
    // Rate Buttons nach Klick Unsichtbar machen
    rateButtonsUnsichtbar(); 
};

function hausFehlt(){
    // Richtig
    if (fehlendesObjekt == "Haus"){
        richtigeWahl();
    // Falsch
    }else{
        falscheWahl();
    };
    // Rate Buttons nach Klick Unsichtbar machen
    rateButtonsUnsichtbar(); 
};

// ##### Welche Form Fehlt? Ende ##### 

// ##### Richtig oder Falsch Start#####

// Wenn die richtige Form angeklickt wurde
function richtigeWahl(){
    playAudio("ParadiseIsland.mp3");     // Sound
    // Nach einer Runde ( nach der Wahl ) wird der Timer Stopp gesetzt. Zeit zählt somit nicht weiter
    // Zwischen den Runden ist also immer eine beliebig Lange Pause ( Klo etc. )
    timerZahlStopp = 1
    // freundliche Gesichter Anzeigen
    richtigeWahlAnzeige();
    // Info text für den Benutzer ändern
    el('#info1').innerHTML = `Super! Das war richtig!`;
    el("#info1").style.color="#4CAF50";

    // Punkte zählen und anzeigen,
        // Mathematisch sicherlich nicht ganz Korrekt --> Zeit Problem
        // Weniger Zeit soll Mehr Punkte bringen (da schwieriger), Mehr Zeit soll weniger Punkte bringen
        // die Zeit für die aktuelle Runde (diff) soll ebenfalls mit reinspielen
        
    // Zeit, die man für die Runde gebraucht hat
    diff = timerZahl - timerZahlAlt
    // Die alten Punkte werden immer dazu addiert
    punkte = Math.floor((schwierigkeitID * 10 + 1/(warteZeit/10000)) / (diff/100)) + punkte;
    // Alte Zeit wird für Differenz nach der Berechnung der Punkte gespeichert
    timerZahlAlt = timerZahl;
    el('#punkte').innerHTML = `Punkte: ${punkte}`;

    // Schwierigkeitsgrad erhöhen
    schwierigkeitID++;
    // Button zum starten der nächsten Runde sichtbar machen
    el('#naechsteRunde').innerHTML = 'nächste Runde';
                //el("#naechsteRunde").style.display="block";
    setTimeout(naechsteRundeButton,1000);
}; // richtigeWahl Funkton Ende

// Wenn die falsche Form angeklickt wurde
function falscheWahl(){
    playAudio("pfeif.mp3");     // Sound
    // Ein Fehlversuch wird abgezogen
    fehlversuche--;
    // traurige Gesichter Anzeigen
    falscheWahlAnzeige()
    // Alle Fehlversuche verbraucht
    if (fehlversuche == 0){
        playAudio("winner.mp3");     // Sound
        // Timer Stopp wird gesetzt, da Spiel hier aufhört und die Zeit angezeigt bleibt
        timerZahlStopp = 1;
        // Informationen für das Ende werden angezeigt
        el('#fehlversuche').innerHTML = `Du hast alle Fehlversuche aufgebraucht`;
        el("#fehlversuche").style.color="red";
        el('#info1').innerHTML = `Schlecht! Du hast verloren!`;
        el("#info1").style.color="red";
        punkte = 0;
        // Anschließend sollte der Neustart Button betätigt werden
        // Spiel verbleibt bis dahin in diesem Zustand 
    }
    // Nicht alle Fehlversuche verbraucht
    else{
        // Timer Stopp wird wieder nach Wahl gesetzt
        timerZahlStopp = 1
        // Info Text für Benutzer wird geändert
        el('#info1').innerHTML = `Schlecht! Das war falsch!`;
        el("#info1").style.color="red";
        if (fehlversuche == 3){
            el('#fehlversuche').innerHTML = `Du hast noch ${fehlversuche} Fehlversuche`;
            el("#fehlversuche").style.color="yellow";
        }
        else if(fehlversuche == 2){
            el('#fehlversuche').innerHTML = `Du hast noch ${fehlversuche} Fehlversuche`;
            el("#fehlversuche").style.color="orange";
        }
        else if(fehlversuche == 1){
            el('#fehlversuche').innerHTML = `Du hast noch ${fehlversuche} Fehlversuch`;
            el("#fehlversuche").style.color="red";
        };
        // Diese 2 Anweisungen sind immer vorhanden, wenn das Spiel weiter geht.
        el('#naechsteRunde').innerHTML = 'Runde wiederholen';
                    //el("#naechsteRunde").style.display="block";
        setTimeout(naechsteRundeButton,1000);
        // Anschließend sollte der Nächste Runde Knopf gedrückt werden
        // Spiel verbleibt bis dahin in diesem Zustand
    }; 
}; // FalscheWahl Funktion Ende

// Button soll verzögert mit einem Timeout kommen. Man könnte es auch mit Anonymen Funktion im Settimeout machen,
// aber so finde ich es übersichtlicher
function naechsteRundeButton(){
    el("#naechsteRunde").style.display="block";
};
// ##### Richtig oder Falsch Ende #####

// Funktion zum Sarten der nächsten Runde
// function naechsteRunde(){
const naechsteRunde = async () => {
    
     // Button zum starten der nächsten Runde unsichtbar machen
    el("#naechsteRunde").style.display="none";
    // Schwierigkeitsfunktion aufrufen
    el("#spieldauer").style.display="block";
    // Ab hier beginnt die nächste Runde

    // 3-2-1 Countdown
    startCountDown();
    await delay(3000);
    // Timer Stopp wird 0 gesetzt --> Timer läuft weiter
    timerZahlStopp = 0

    schwierigkeit();
}; // Nächste Runde Ende

// ############################ SPIELABLAUF FUNKTIONEN ENDE #############################

// ################ BUTTONS SPIELSTEUERUNG ################

button('spielStarten').addEventListener('click',spielErstmaligStarten);
// button('spielStarten').addEventListener('click',ampelBalkenEins);

button('neuesSpiel').addEventListener('click',neuesSpiel);

button('naechsteRunde').addEventListener('click',naechsteRunde);
// button('naechsteRunde').addEventListener('click',ampelBalkenEins);

button('tier').addEventListener('click',tierFehlt);
button('ufo').addEventListener('click',ufoFehlt);
button('gesicht').addEventListener('click',gesichtFehlt);
button('haus').addEventListener('click',hausFehlt);

button('5s').addEventListener('click',funfSekunden);
button('10s').addEventListener('click',zehnSekunden);
button('20s').addEventListener('click',zwanzigSekunden);
button('30s').addEventListener('click',dreissigSekunden);
button('60s').addEventListener('click',sechzigSekunden);

function funfSekunden(){
    warteZeit = 5000;
    zeitspeichern();
};
function zehnSekunden(){
    warteZeit = 10000;
    zeitspeichern();
};
function zwanzigSekunden(){
    warteZeit = 20000;
    zeitspeichern();
};
function dreissigSekunden(){
    warteZeit = 30000;
    zeitspeichern();
};
function sechzigSekunden(){
    warteZeit = 60000
    zeitspeichern();
};

function zeitspeichern(){
    el('#zeit').style.display="none";
    el('#zeitinfo').innerHTML="Zeit gespeichert, es kann losgehen";
    el('#spielStarten').style.display="block";
};

// ################ BUTTONS ENDE ################

// ################### CANVAS TIMER ###################

// Wird beim Start angezeigt
canvasTimer("S-F-S");

// Delay Funktion mit Promise, damit er immer wartet --> Funktioniert wesentlich besser als Settimeout
const delay = millisekunden => new Promise(ergebnis => setTimeout(ergebnis, millisekunden));

// Countdownzähler mithilfe der neuen Funktion
const startCountDown = async () => {
    playAudio("tick_wanduhr.mp3");
    canvasTimer(3);
    await delay(1000);
    playAudio("tick_wanduhr.mp3");
    canvasTimer(2);
    await delay(1000);
    playAudio("tick_wanduhr.mp3");
    canvasTimer(1);
    await delay(1000);
    playAudio("spawn.mp3");
};

// Inhalt in Canvas Anzeigen
// es gibt 3 2 1 und S-F-S als Inhalt --> Style wird durch die IFs bestimmt
function canvasTimer(inhalt){
    // Canvas Leeren
    canvasLeeren();
    // Schatten
    ctx.fillStyle = "#252525";
    // Ändern bei SFS
    if(inhalt == "S-F-S"){
        ctx.font = '400px Arial';
        ctx.fillText(inhalt,100,380)
    }
    else{
        ctx.font = '500px Arial';
        ctx.fillText(inhalt,495,415)
    }
    // Inhalt
    // Farben ändern falls Zahl
    if(inhalt == 3){
        ctx.fillStyle = "#4CAF50";
    }
    else if(inhalt == 2){
        ctx.fillStyle = "yellow";
    }
    else{
        ctx.fillStyle = "red";
    };
    // Ändern bei SFS
    if(inhalt == "S-F-S"){
        ctx.fillStyle = "#4CAF50";
        ctx.font = '400px Arial';
        ctx.fillText(inhalt,80,400)
    }
    else{
        ctx.font = '500px Arial';
        ctx.fillText(inhalt,480,430) 
    };
};

}());