// ####################### SEKUNDÄR FUNKTIONEN FÜR DAS SPIEL ###########################

function el(cssSelector){
    return document.querySelector(cssSelector);
};

function button(id){
    return document.getElementById(id);
};

// Funktion zum erzeugen der Klone der Objekte bei Start
function klonFabrik(){
    // Jede Funktion erzeugt die dazugehörigen klonen.
    let klonTier;
    for(let i = 0; i < tierAnzahlStart; i++){
        klonTier = Object.create(tierproto);
        klonTier.init();  
    };
    let klonGesicht;
    for(let i = 0; i < gesichtAnzahlStart; i++){
        klonGesicht = Object.create(gesichtproto);
        klonGesicht.init();
    };
    let klonUfo;
    for(let i = 0; i < ufoAnzahlStart; i++){
        klonUfo = Object.create(ufoproto);
        klonUfo.init();
    };
    let klonHaus;
    for(let i = 0; i < hausAnzahlStart; i++){
        klonHaus = Object.create(hausproto);
        klonHaus.init();
    };
}; 

// Funktion zum erzeugen der Klone der Objekte bei Ende
function klonFabrikEnde(){
    // Jede Funktion erzeugt die dazugehörigen klonen.
    let klontier;
    for(let i = 0; i < tierAnzahlEnde; i++){
        klontier = Object.create(tierproto);
        klontier.init();  
    };
    let klonGesicht;
    for(let i = 0; i < gesichtAnzahlEnde; i++){
        klonGesicht = Object.create(gesichtproto);
        klonGesicht.init();
    };
    let klonUfo;
    for(let i = 0; i < ufoAnzahlEnde; i++){
        klonUfo = Object.create(ufoproto);
        klonUfo.init();
    };
    let klonHaus;
    for(let i = 0; i < hausAnzahlEnde; i++){
        klonHaus = Object.create(hausproto);
        klonHaus.init();
    };

}; // Funktion zum erzeugen der Klone Ende

// DIESE FUNKTION IST NOCH NICHT IMPLEMENTIERT
// die 2 Konfabriken sollen zusammengeführt werden durch übergabeparameter
// function klonFabrikNeu(formName){
   
//     let klonRechteck;
//     for(let i = 0; i < formName; i++){
//         klonRechteck = Object.create(tierproto);
//         klonRechteck.init();  
//     };
//     let klonKreis;
//     for(let i = 0; i < formName; i++){
//         klonKreis = Object.create(gesichtproto);
//         klonKreis.init();
//     };
//     let klonQuadrat;
//     for(let i = 0; i < formName; i++){
//         klonQuadrat = Object.create(ufoproto);
//         klonQuadrat.init();
//     };
//     let klonneueForm;
//     for(let i = 0; i < formName; i++){
//         klonneueForm = Object.create(hausproto);
//         klonneueForm.init();
//     };
// };


// Funktion für das eliminieren eines Objekts
// ein Zufälliges Objekt wird hier entfernt
function eliminator(){
    let eli = null;
    
    // 0->Tier 1->Gesicht 2->Ufo 3->Haus
    eli = Math.floor(Math.random()*4);
    console.log("elimantor Variable :",eli);
    // Tier
    if (eli == 0){
        fehlendesObjekt = "Tier";
        tierAnzahlEnde = tierAnzahlStart - 1;
    };
    // Gesicht
    if (eli == 1){
        fehlendesObjekt = "Gesicht";
        gesichtAnzahlEnde = gesichtAnzahlStart - 1;
    };
    // Ufo
    if (eli == 2){
        fehlendesObjekt = "Ufo";
        ufoAnzahlEnde = ufoAnzahlStart - 1;
    };
    // Haus
    if (eli == 3){
        fehlendesObjekt = "Haus";
        hausAnzahlEnde = hausAnzahlStart - 1;
    };

    // Testausgabe
    console.log("Fehlendes Objekt: ",fehlendesObjekt);

}; // Eliminiator Funktion Ende

// Funktion zum Anzeigen aller Objekte
function render(){
    
    // Animation ( Bewegung ) startet erst bei bestimmten Schwieriegkeitgrad
    if(schwierigkeitID > 3){
        // Wenn man ihn nicht stoppt, werden die Formen immer schneller
        // Klärungsbedarf? Er muss aufjedenfall immer gecanceld werden!
        cancelAnimationFrame(ani);
        ani = requestAnimationFrame(render);
    };
    ctx.clearRect(0,0,co.width,co.height);

    // Mittels Schleife werden alle Formen durchgegangen und alle erstellt und bewegt
    tierSammler.forEach(function(klon){
        klon.darstellen();
        klon.move();  
    });
    gesichtSammler.forEach(function(klon){
        klon.darstellen();
        klon.move();
    });
    ufoSammler.forEach(function(klon){
        klon.darstellen();
        klon.move();
    });
    hausSammler.forEach(function(klon){
        klon.darstellen();
        klon.move();
    });
}; // Funktion zum Anzeigen aller Objekte Ende

// Diese Funktion bestimmt wieviele Formen pro Schwierigkeitsgrad zu sehen sind
// Mit Übergabeparaemtern wird die zufällige Anzahl berechnet
// Übergabeparameter ändern sich je nach Schwierigkeitsgrad ( schwierigkeitID )
// ceil -> damit mindestens 1 Form
// round bei Offset -> Damit (zb. beim anfang) auch 0 sein kann
function zufallsAnzahl(zufallswert, zufalloffset){
    tierAnzahlEnde = tierAnzahlStart        = (Math.ceil(Math.random() * zufallswert) + (Math.round(Math.random() * zufalloffset)));
    gesichtAnzahlEnde = gesichtAnzahlStart  = (Math.ceil(Math.random() * zufallswert) + (Math.round(Math.random() * zufalloffset)));
    ufoAnzahlEnde = ufoAnzahlStart          = (Math.ceil(Math.random() * zufallswert) + (Math.round(Math.random() * zufalloffset)));
    hausAnzahlEnde = hausAnzahlStart        = (Math.ceil(Math.random() * zufallswert) + (Math.round(Math.random() * zufalloffset)));
}; // zufallsAnzahl Ende

// ##### TIMER START #####

// Neuer Zeit Balken
function ampelBalkenEins(){
    // Fortschrittsbalken läuft mit Einblenden los
    el('#progressbar-inner').style.display = 'block';
    // Fortschrittsbalken übernimmt als Count-Down-Wert die Wartezeit in s
    el('#progressbar-inner').style.animationDuration = warteZeit / 1000 + 's';
}; // Ende f ampelBalken
// ENDE TEST

function ampelBalkenZwei(){
    // Test Fortschrittsbalken – einblenden des 2. inneren Progress Bars und als Animationsdauer die warteZeit in s zuweisen
    el('#progress-bar-inner').style.display = 'block';
    el('#progress-bar-inner').style.animationDuration = warteZeit / 1000 + 's';
}; // Neuer Zeit Balken Ende


// Timer Funktion mit Zahl Anzeige und Balken Start
//function timerZaehler(warteZeit) {
function timerZaehler() {
    // Ist für den Zähler, damit jede Sekunde ein Ton ausgegeben wird
    let playAudioHelfer = 0;
    // Macht die verbleibendeZeitZahl wieder sichtbar
    el("#verbleibendeZeitZahl").style.display="block";
    el("#verbleibendeZeitZahl").style.visibility="";
    // Speichert verbleibende Zeit
    let verbleibendeZeitAnzeige;
    let verbleibendeZeitAnzeigeString = "string";
    // Zeit wird Rückwärtsgezählt. Das ist der Subtrahend
    let zeitSub = 0;
    // Funktion wird alle 100 ms aufgerufen
    balkenTimer = setInterval(function(){
        // Balken stoppen wenn als nächstes 0 erreicht
        if(verbleibendeZeitAnzeige <= 0.1){
            clearInterval(balkenTimer);
        }
        // Subtrahend hochzählen ( 100ms Intervall beachten )
        zeitSub++;
        // verbleibende Zeit für HTML Ausgabe mit einer Nachkommastelle
        // Vorteil: Damit bleibt auch die Null bei z.b. 2.0
        verbleibendeZeitAnzeige = parseFloat((warteZeit/100-zeitSub)/10).toFixed(1);
        // Schreibt Sekunden in HTML und Ändert Farbe in Abhängigkeit der Verstrichenen Zeit
        if (verbleibendeZeitAnzeige > (warteZeit / 1000)/2){        // wird ab Häflte gelb
            el("#verbleibendeZeitZahl").style.color="green";
        }
        else if(verbleibendeZeitAnzeige > (warteZeit / 1000)/4){    // dazwischen orange
            el("#verbleibendeZeitZahl").style.color="yellow";
        }
        else if(verbleibendeZeitAnzeige > (warteZeit / 1000)/9){    // fast vor Ende orange
            el("#verbleibendeZeitZahl").style.color="orange";
        }
        else{                                                       // Danach Rot
            el("#verbleibendeZeitZahl").style.color="red";
        }
        // Zum Schluss muss der . Durch , ersetzt werden
        // Erst in String umwandeln, dann mit Replace ersetzen
        verbleibendeZeitAnzeigeString = verbleibendeZeitAnzeige.toString().replace(".",",");
        el("#verbleibendeZeitZahl").innerHTML=verbleibendeZeitAnzeigeString;

        // Jede Sekunde wird Ton ausgegeben
        // ein kleiner Zähler wurde dafür eingebaut
        // Zusätzlich wird als Spielerei immer der Rand des Canvas geändert
        playAudioHelfer++;
        if(playAudioHelfer == 10){
            playAudio("tick_wanduhr.mp3");   
            el('#canvas').style.border = `solid 10px ${randFarbe()}`;
        }
        // dei Töne sind nicht genau On Point. Daher manuell etwas vorher gesetzt
        // Man müsste die Sounddatei selber bearbeiten um das zu berichtigen
        else if(playAudioHelfer == 17){
            playAudio("tack_wanduhr.mp3"); 
        }
        // Zähler zurücksetzen damit wieder beim Tick begonnen wird
        else if(playAudioHelfer == 20){
            playAudioHelfer=0;  
            el('#canvas').style.border = `solid 10px ${randFarbe()}`;
        }
        // Kein tack mehr zum Schluss
        if (verbleibendeZeitAnzeige <= 1){
            playAudioHelfer=0;  ;
        };
        // Anderer Ton beim Ablauf
        if (verbleibendeZeitAnzeige == 0){
            playAudio("spawn.mp3");
            el('#canvas').style.border = `solid 10px ${randFarbe()}`;
            el("#verbleibendeZeitZahl").style.visibility="hidden";
        };
        
    },100);
}; // Timer Funktion Ende

// Zählt Sekunden hoch
function timerZahlFunktion(){
    setInterval(sekundenZaehler,1000)
};

function sekundenZaehler(){
            // Mit dieser Variable für der Start / Stopp des Timers kontrolliert
            // wird im laufe des Spiels mehrmals auf 1 oder 0 gesetzt (Bool)
            if(timerZahlStopp === 1){
                //clearInterval(timerZahlStopp);
                clearInterval(timerZahl);
            }
            // Wenn TimerZahlStopp 0 ist. Zeit wird weitergezählt
            else{
                // TimerZahl hochzählen und immer im HTML Element ausgeben
                timerZahl++;
                el("#spieldauer").innerHTML=timerZahl;
            };
};

function randFarbe(){
    let index = Math.floor(Math.random() * allefarbRaeume.length);
    let farbe = allefarbRaeume[index];
    return farbe;
};

// ##### TIMER ENDE #####

// Funktionen zum ändern der Sichtbarkeit der Buttons
// Macht Rate Buttons Unsichtbar - Immer zum Start einer neuen Runde
function rateButtonsUnsichtbar(){
    el('#ratentext').style.display="none";
    el("#tier").style.display="none";
    el("#ufo").style.display="none";
    el("#gesicht").style.display="none";
    el("#haus").style.display="none";
}; 
// Macht Rate Buttons Sichbtar - Immer zum Ende der Runde
function rateButtonsSichtbar(){
    // Balken unsichtbar machen für Neustart
    el('#progress-bar-inner').style.display = 'none';
    el('#progressbar-inner').style.display = 'none';
    
    el('#info1').innerHTML = `Welche Form fehlt?`;
    el('#ratentext').style.display="block";
    el("#tier").style.display="block";
    el("#ufo").style.display="block";
    el("#gesicht").style.display="block";
    el("#haus").style.display="block";
}; 

// Zeigt freundliche Smileys an
function richtigeWahlAnzeige(){
    // 1 setzen für große und freundlichen Smiley
    gesichtMund = 1;
    gesichtAnzeigen();
    // wieder 0 Setzen, damit Proto Form nicht beeionflusst wird
    gesichtMund = 0;
};

function falscheWahlAnzeige(){
    // 2 setzen für große und traurigen Smiley
    gesichtMund = 2;
    gesichtAnzeigen();
    // wieder 0 Setzen, damit Proto Form nicht beeionflusst wird
    gesichtMund = 0;
};

// lässt Gesichter Anzeigen. Wir nach Richtiger oder Falscher Wahl angezeigt
function gesichtAnzeigen(){
   
    // Feld leer machen
    canvasLeeren()
    // Nur Gesichter Anzeigen
    let klonGesicht;
    // Gesichter Anzeigen
    for(let i = 0; i < 20; i++){
        klonGesicht = Object.create(gesichtproto);
        klonGesicht.init();
    };
    console.log(schwierigkeitID);
    if(schwierigkeitID>3){
        cancelAnimationFrame(ani);
    }
    gesichtSammler.forEach(function(klon){
        klon.darstellen();
    });
};

// Leert Canvas mit allen Sammlern, wird mehrmals gebraucht, daher ausgelagert
function canvasLeeren(){
    cancelAnimationFrame(ani);
    ctx.clearRect(0,0,co.width,co.height);
    gesichtSammler = [];
    tierSammler = [];
    ufoSammler = [];
    hausSammler = [];
};

// Audio Funktion Start
function playAudio(soundName){
    sound = new Audio();
    sound.src=`sound/${soundName}`;
    sound.volume = 0.3;
    sound.play();
}; // Audio Fnktion Ende

// CHEATS
// alles was mit Cheats zu tun hat wird hier gespeichert, damit es keiner sieht
// Cheats werden nicht kommentiert ;)
document.addEventListener('keydown',keyDown);

let cheat;

function keyDown(b){
        cheat = b.key;
        if (cheat == 'b'){
            console.log("Cheat Modus Aktiviert");
            console.log("Fehlendes Objekt: ",fehlendesObjekt);
            if (fehlendesObjekt == "Tier"){
                el("#tier").style.backgroundColor="white";
                setTimeout(function(){el("#tier").style.backgroundColor="#FE642E";},100);
                setTimeout(function(){el("#tier").style.backgroundColor="white";},200);
                setTimeout(function(){el("#tier").style.backgroundColor="#FE642E";},300);
                setTimeout(function(){el("#tier").style.backgroundColor="white";},400);
                setTimeout(function(){el("#tier").style.backgroundColor="#FE642E";},500);
            }
            else if(fehlendesObjekt == "Gesicht"){
                el("#gesicht").style.backgroundColor="white";
                setTimeout(function(){el("#gesicht").style.backgroundColor="#FE642E";},100);
                setTimeout(function(){el("#gesicht").style.backgroundColor="white";},200);
                setTimeout(function(){el("#gesicht").style.backgroundColor="#FE642E";},300);
                setTimeout(function(){el("#gesicht").style.backgroundColor="white";},400);
                setTimeout(function(){el("#gesicht").style.backgroundColor="#FE642E";},500);
            }
            else if(fehlendesObjekt == "Ufo"){
                el("#ufo").style.backgroundColor="white";
                setTimeout(function(){el("#ufo").style.backgroundColor="#FE642E";},100);
                setTimeout(function(){el("#ufo").style.backgroundColor="white";},200);
                setTimeout(function(){el("#ufo").style.backgroundColor="#FE642E";},300);
                setTimeout(function(){el("#ufo").style.backgroundColor="white";},400);
                setTimeout(function(){el("#ufo").style.backgroundColor="#FE642E";},500);
            }
            else if(fehlendesObjekt == "Haus"){
                el("#haus").style.backgroundColor="white";
                setTimeout(function(){el("#haus").style.backgroundColor="#FE642E";},100);
                setTimeout(function(){el("#haus").style.backgroundColor="white";},200);
                setTimeout(function(){el("#haus").style.backgroundColor="#FE642E";},300);
                setTimeout(function(){el("#haus").style.backgroundColor="white";},400);
                setTimeout(function(){el("#haus").style.backgroundColor="#FE642E";},500);
            };
        };
};






// Alter timer Funktion
// Problem: Ist erst später gestartet, Grund: Anonyme Funktionaufruf. Wurde berichtigt. Dient mir zu veranschaulichung

// // Funktion zum Anzeigen der gesamt verstrichenen Zeit
// function timerZahlFunktion(){
//     // Aktualisiert sich jede Sekunde
//         timerZahl = setInterval(function(){
//             // Mit dieser Variable für der Start / Stopp des Timers kontrolliert
//             // wird im laufe des Spiels mehrmals auf 1 oder 0 gesetzt (Bool)
//             if(timerZahlStopp === 1){
//                 //clearInterval(timerZahlStopp);
//                 clearInterval(timerZahl);
//             }
//             // Wenn TimerZahlStopp 0 ist. Zeit wird weitergezählt
//             else{
//                 // TimerZahl hochzählen und immer im HTML Element ausgeben
//                 timerZahl++;
//                 el("#spieldauer").innerHTML=timerZahl;
//             };
//         },1000);    
// }; // Funktion für Zeit Ende
