// ################################# ALLES WAS MIT DEN CANVAS FORMEN ZU TUN HAT ##################################

// Funktionen, die direkt mit den Formen zu tun haben sind hier

// Array für alle Objekte
let tierSammler = [];
let gesichtSammler = [];
let ufoSammler = [];
let hausSammler = [];

// Canvas Elemente mit Standartnamen
let co = el('#canvas');
let ctx = co.getContext('2d');

// Anmerkung: Formeln ( Grenzen zum Abprallen in der Move Funktion der Formen ) sind nicht mathematisch Korrekt. 
// Hätte bei mir zuviel Zeit gekostet, daher kann es vorkommen, dass die Formen ein paar Pixel zu früh oder zu spät abprallen.

// ################ PROTO OBJEKTE START ################
// TIER START
let tierproto = {
    // Startposition
    x : 0,
    y : 0,
    // Länge,, Höhe
    w : 0,
    h : 0,
    // Farbe
    col : "string",
    // Bewegungsrichtung
    rx : 0,
    ry : 0,
    // Geschwindigkeit
    spX : 0,
    spY : 0,
    init: function(){
        // Funkton für zufällige Farben aufrufen
        this.col = zufallFarben();

        // Breite der form bestimmem mit offset
        this.w = Math.ceil(Math.random() * 50 + 70);
        // Höhe hängt von Breite ab
        this.h = this.w/3;

        // Anfangspunkt
        this.x = Math.ceil(Math.random() * (co.width));
        this.y = Math.ceil(Math.random() * (co.height));

        // Objekt bleibt immer im Canvas
        // Evnentuell Später mit Formel überarbeiten
        if (this.x > 1090){
            this.x = 800;
        };
        if (this.x < 50){
            this.x = 200;
        };
        if (this.y > 430){
            this.y = 220
        };
        if (this.y < 10){
            this.y = 280
        };

        // zufällige Geschwindigkeit
        this.spX = zufallGeschwindigkeit();
        this.spY = zufallGeschwindigkeit();

        // Zufällige Richtung 0 oder 1
        this.rx = Math.round(Math.random() * 1);
        this.ry = Math.round(Math.random() * 1);
        
        // Alles ins Array hinzufügen
        tierSammler.push(this);
    },    
    move: function(){
        // Animationsraum, grenzen
        // Somit bleibt es immer im Canvas Rahmen (der in HTML generiert wird)

        // rechts
        if(this.x > co.width-this.w){
            this.rx = 1;
        };
        // links
        if(this.x < this.w/2.2){
            this.rx = 0;
        };

        // unten
        if(this.y > co.height-this.h*2){
            this.ry = 1;
        };

        // oben
        if(this.y < 0){
            this.ry = 0;
        };

        //Bewegung x Achse
        if(this.rx === 0){
            this.x += this.spX;
        };

        if(this.rx === 1){
            this.x -= this.spX;
        };

        //Bewegung < Achse
        if(this.ry === 0){
            this.y += this.spY;
        };
        if(this.ry === 1){
            this.y -= this.spY;
        };
    },
    darstellen: function(){
        ctx.fillStyle = this.col;                     // Farbe zuweisen
        // Das Tier Objekt wird ausschließlich in Abhängigkeit der Länge (w) berechnet, somit bleiben Proportionen immer gleich
        // rumpf
        ctx.fillRect(this.x,this.y,this.w,this.w/3);
        // linkes bein
        ctx.fillRect(this.x+(this.w/7),this.y,this.w/7,this.w/1.5);
        // rechtes bein
        ctx.fillRect(this.x+this.w-(this.w/5),this.y,this.w/7,this.w/1.5);
        // hals
        ctx.fillRect(this.x-this.w/10,this.y+this.w/10,this.w/10,this.w/6);
        // kopf
        ctx.beginPath();                            
        ctx.arc(this.x-this.w/4,this.y+this.w/6,this.w/5,0,2 * Math.PI,true); 
        ctx.fill(); 
        // Mund linie 
        ctx.beginPath(); 
        ctx.moveTo(this.x-this.w/5, this.y+this.w/4);
        ctx.lineTo(this.x-this.w/2.2, this.y+this.w/4); 
        ctx.stroke();
        // auge
        ctx.beginPath();                            
        ctx.arc(this.x-this.w/3,this.y+this.w/8,this.w/15,0,2 * Math.PI,true); 
        ctx.stroke();   

    }   
}; // TIER ENDE

// UFO START
let ufoproto = {
    // Startposition
    x : 0,
    y : 0,
    // Radius
    r : 0,
    // Farbe
    col :  "string",
    // Bewegungsrichtung
    rx : 0,
    ry : 0,
    // Geschwindigkeit
    spX : 0,
    spY : 0,
    init: function(){
        // Funkton für zufällige Farben aufrufen
        this.col = zufallFarben();

        // Radius der form bestimmen
        this.r = Math.ceil(Math.random() * 50 + 25);

        // Anfangspunkt  bestimmen
        this.x = Math.ceil(Math.random() * (co.width));
        this.y = Math.ceil(Math.random() * (co.height));

        // Objekt bleibt immer im Canvas
        // Evnentuell Später mit Formel überarbeiten
        if (this.x > 1110){
            this.x = 700;
        };
        if (this.x < 90){
            this.x = 300;
        };
        if (this.y > 480){
            this.y = 350
        };
        if (this.y < 50){
            this.y = 150
        };
        
        // zufällige Geschwindigkeit
        this.spX = zufallGeschwindigkeit();
        this.spY = zufallGeschwindigkeit();

        // Zufällige Richtung 0 oder 1
        this.rx = Math.round(Math.random() * 1);
        this.ry = Math.round(Math.random() * 1);

        // Alles ins Array hinzufügen
        ufoSammler.push(this);
    },    
    move: function(){
        // Animationsraum, grenzen
        // Somit bleibt es immer im Canvas Rahmen (der in HTML generiert wird)

        // rechts
        if(this.x > co.width-this.r*1.5){
            this.rx = 1;
        };

        // links
        if(this.x < this.r*1.5){
            this.rx = 0;
        };

        // unten
        if(this.y > co.height-this.r/3){
            this.ry = 1;
        };

        // oben
        if(this.y < this.r/1.5){
            this.ry = 0;
        };

        //Bewegung x Achse
        if(this.rx === 0){
            this.x += this.spX;
        };

        if(this.rx === 1){
            this.x -= this.spX;
        };

        //Bewegung < Achse
        if(this.ry === 0){
            this.y += this.spY;
        };
        if(this.ry === 1){
            this.y -= this.spY;
        };
    },
    darstellen: function(){
        ctx.fillStyle = this.col;                   // Farbe zuweisen
        // Alles in Abhängigkeit des Radius (r) erstellen, damit proportionen immer gleich bleiben
        // dach
        ctx.beginPath();                            
        ctx.arc(this.x,this.y,this.r/1.5,0,1 * Math.PI,true); 
        ctx.fill();     
        // rumpf
        ctx.beginPath();                            
        ctx.ellipse(this.x, this.y, this.r/3, this.r*1.5, Math.PI / 2, 0, 2 * Math.PI);
        ctx.fill();    
        // dachfester
        ctx.beginPath();                            
        ctx.arc(this.x,this.y,this.r/2,0,1 * Math.PI,true); 
        ctx.stroke();  
        // dachfenster linie unten
        ctx.beginPath(); 
        ctx.moveTo(this.x-this.r/2, this.y);
        ctx.lineTo(this.x+this.r/2, this.y); 
        ctx.stroke();
    }   
}; // UFO ENDE

// GESICHT START
let gesichtproto = {
    // Startposition
    x : 0,
    y : 0,
    // Radius
    r : 0,
    // bestimmt of Gesicht freundlich oder traurig ist
    // ist sozusagen Bool ( 0 oder 1 oder 2) Für Mund ( freundlich oder traurig ) - 66% chance auf freundlich
    m : 0,
    // bestimmt Größe Offset des Gesicht für richtigeWahlAnzeige() und falscheWahlAnzeige()
    o : 25,
    // Farbe
    col : "string",
    // Bewegungsrichtung
    rx : 0,
    ry : 0,
    // Geschwindigkeit
    spX : 0,
    spY : 0,
    init: function(){
        // Funkton für zufällige Farben aufrufen
        this.col = zufallFarben();

        // Radius der form bestimmen
        if (gesichtMund != 0){
            this.o = 100;
        };
        this.r = Math.ceil(Math.random() * 50 + this.o);

        // Standart Wert ist 0. Somit wird Abfrage nur bei 
        // richtigeWahlAnzeige() und falscheWahlANzeige() funktion ausgeführt.
        if (gesichtMund == 1){
            this.m = 1;
        }
        else if( gesichtMund == 2){
            this.m = 2;
        }
        // bei Standartwert 0
        else{
            // Zufällig 0 oder 1 oder 2 bestimmen
            this.m = Math.floor(Math.random()*3);
        };

        // Anfangspunkt der Form
        this.x = Math.ceil(Math.random() * (co.width+this.r*2));
        this.y = Math.ceil(Math.random() * (co.height+this.r*2));

        // Objekt bleibt immer im Canvas
        // Evnentuell Später mit Formel überarbeiten
        if (this.x > 1110){
            this.x = 600;
        };
        if (this.x < 90){
            this.x = 400;
        };
        if (this.y > 450){
            this.y = 300
        };
        if (this.y < 75){
            this.y = 200
        };

        // zufällige Geschwindigkeit
        this.spX = zufallGeschwindigkeit();
        this.spY = zufallGeschwindigkeit();

        // Zufällige Richtung 0 oder 1
        this.rx = Math.round(Math.random() * 1);
        this.ry = Math.round(Math.random() * 1);

        // Alles ins Array hinzufügen
        gesichtSammler.push(this);
    },
    move: function(){
        // Animationsraum, grenzen
        // Somit bleibt es immer im Canvas Rahmen (der in HTML generiert wird)

        // rechts
        if(this.x > co.width-this.r){
            this.rx = 1;
        };

        // links
        if(this.x < this.r){
            this.rx = 0;
        };

        // unten
        if(this.y > co.height-this.r){
            this.ry = 1;
        };

        // oben
        if(this.y < this.r){
            this.ry = 0;
        };

        //Bewegung x Achse
        if(this.rx === 0){
                this.x += this.spX;
        };

        if(this.rx === 1){
            this.x -= this.spX;
        };

        //Bewegung y Achse
        if(this.ry === 0){
            this.y += this.spY;
        };
        if(this.ry === 1){
            this.y -= this.spY;
        };
    },
    darstellen: function(){
        ctx.fillStyle = this.col;                   // Farbe zuweisen
        
        // Hauptkreis für Gesicht
        ctx.beginPath();                            
        ctx.arc(this.x,this.y,this.r,0,2 * Math.PI,true); 
        ctx.fill();       
        
        // rechtes ohr
        ctx.beginPath();                            
        ctx.arc(this.x+this.r/1.5,this.y-this.r/1.5,this.r/2,0,2 * Math.PI,true); 
        ctx.fill();    

        // linkes ohr
        ctx.beginPath();                            
        ctx.arc(this.x-this.r/1.5,this.y-this.r/1.5,this.r/2,0,2 * Math.PI,true); 
        ctx.fill();    

        // mund freundlich wenn m = 0 oder m = 1 ( somit werden 2/3 der Smileys freundlich )
        if (this.m == 0 || this.m == 1){    
            ctx.beginPath();
            ctx.arc(this.x,this.y+this.r/3,this.r/2,0,1 * Math.PI,false);
            ctx.stroke();
        }
        // mund traurig wenn m = 2
        else{
            // mund traurig
            ctx.beginPath();
            ctx.arc(this.x,this.y+this.r/1.3,this.r/2,0,1 * Math.PI,true);
            ctx.stroke();
        };

        // linkes Auge
        ctx.beginPath();
        ctx.arc(this.x+this.r/2,this.y-this.r/3,this.r/5,0,2 * Math.PI,true);
        ctx.stroke();

        // rechtes Auge
        ctx.beginPath();
        ctx.arc(this.x-this.r/2,this.y-this.r/3,this.r/5,0,2 * Math.PI,true);
        ctx.stroke();

        // nase
        ctx.beginPath();
        ctx.arc(this.x,this.y,this.r/7,0,2 * Math.PI,true);
        ctx.stroke();
    }
}; // KREIS ENDE

// HAUS START
let hausproto = {
    // Startposition
    x : 0,
    y : 0,
    // Länge, Breite
    w : 0,
    h : 0,
    z : 0,
    // Farbe
    col : "string",
    // Bewegungsrichtung
    rx : 1,
    ry : 1,
    // Geschwindigkeit
    spX : 0,
    spY : 0,
    init: function(){
        // Funkton für zufällige Farben aufrufen
        this.col = zufallFarben();

        // Breite und höhe bestimmen
        this.w = Math.ceil(Math.random() * 50 + 50);
        this.h = this.w

        // Zufallsfaktor der größe mit offset
        this.z = (Math.random()* 1 + 1.2);

        // Anfangspunkt bestimmen
        this.x = Math.ceil(Math.random() * (co.width-this.w));
        this.y = Math.ceil(Math.random() * (co.height-this.h));

        // Objekt bleibt immer im Canvas
        // Evnentuell Später mit Formel überarbeiten
        if (this.x > 1130){
            this.x = 550;
        };
        if (this.x < 70){
            this.x = 450;
        };
        if (this.y > 375){
            this.y = 250
        };
        // da 0 ist das Obsolet
        if (this.y < 0){
            this.y = 100
        };

        // zufällige Geschwindigkeit
        this.spX = zufallGeschwindigkeit();
        this.spY = zufallGeschwindigkeit();

        // Zufällige Richtung 0 oder 1
        this.rx = Math.round(Math.random() * 1);
        this.ry = Math.round(Math.random() * 1);

        // Alles ins Array hinzufügen
        hausSammler.push(this);
    },
    move: function(){
        // Animationsraum, grenzen
        // Somit bleibt es immer im Canvas Rahmen (der in HTML generiert wird)

        // rechts
        if(this.x > co.width-50){
            this.rx = 1;
        };

        // links
        if(this.x < 50){
            this.rx = 0;
        };

        // unten
        if(this.y > co.height-110){
            this.ry = 1;
        };

        // oben
        if(this.y < 0){
            this.ry = 0;
        };

        //Bewegung x Achse
        if(this.rx === 0){
                this.x += this.spX;
        };

        if(this.rx === 1){
            this.x -= this.spX;
        };

        //Bewegung y Achse
        if(this.ry === 0){
            this.y += this.spY;
        };
        if(this.ry === 1){
            this.y -= this.spY;
        };
    },
    darstellen: function(){
        ctx.fillStyle = this.col;                   // Farbe zuweisen
                   
        // Die Häuser habe ich ( vorerst ) ohne Breite und Länge gemacht.
        // Grund: Malen von Formen erfordert sehr viel jetzt

        //                  X                   Y
        // Haus
        ctx.beginPath();    
        ctx.moveTo(this.x, this.y);                                            // Oberster Punkt
        ctx.lineTo(this.x-100/this.z, this.y+100/this.z);                      // Linker Punkt Dach
        ctx.lineTo(this.x-90/this.z, this.y+100/this.z);                       // Links oben haus
        ctx.lineTo(this.x-90/this.z, this.y+200/this.z);                       // Links Unten Haus
        ctx.lineTo(this.x+90/this.z, this.y+200/this.z);                       // Rechts Unten Haus
        ctx.lineTo(this.x+90/this.z, this.y+100/this.z);                       // rechts oben haus
        ctx.lineTo(this.x+100/this.z, this.y+100/this.z);                      // Rechter Punkt Dach
        ctx.closePath();
        ctx.fill();                                

        // Fenster
        ctx.beginPath(); 
        ctx.lineTo(this.x+60/this.z, this.y+120/this.z);                       // rechts oben
        ctx.lineTo(this.x+10/this.z, this.y+120/this.z);                       // links oben
        ctx.lineTo(this.x+10/this.z, this.y+170/this.z);                       // links unten
        ctx.lineTo(this.x+60/this.z, this.y+170/this.z);                       // rechts unten
        ctx.closePath();
        ctx.stroke();

        // Tür
        ctx.beginPath(); 
        ctx.lineTo(this.x-20/this.z, this.y+120/this.z);                       // rechts oben
        ctx.lineTo(this.x-70/this.z, this.y+120/this.z);                       // links oben
        ctx.lineTo(this.x-70/this.z, this.y+199/this.z);                       // links unten
        ctx.lineTo(this.x-20/this.z, this.y+199/this.z);                       // rechts unten        
        ctx.closePath();
        ctx.stroke();
    }
}; // HAUS ENDE

// ################ PROTO OBJEKTE ENDE ################

// Funktion für Zufällige Farben

// Hier werden zufällige farben aus dem Farbarray genommen
function zufallFarben(){
    if(schwierigkeitID > 18){
        // wird ab Schwierigkeit 18 aufgerufen, da ab dann mehr als 40 Farben vorkommen können
        // Splice Methode funktioniert somit nicht mehr, da Array nur 40 Farben hat
        // r g b werte zufällig ermitteln
        let r = Math.floor( Math.random () * 256);  // eventuell bis 240+- um Weiß auszuschließen?
        let g = Math.floor( Math.random () * 256);
        let b = Math.floor( Math.random () * 256);
        farbe = `rgb(${r},${g},${b})`;
        // Farbwert als String ausgeben
        return farbe;
    }
    else{
        // zufälligen Index aus den (derzeit 40) Farben ermitteln
        let index = Math.floor(Math.random() * kopieallefarbRaeume.length);
        // eine Farbe herausnehmen
        let farbe = kopieallefarbRaeume.splice(index, 1)[0];
        // Farbe zurückgeben
        return farbe;
    };
};

function zufallGeschwindigkeit(){
    let speed = Math.random() * 1 / 5;
    return speed;
}
