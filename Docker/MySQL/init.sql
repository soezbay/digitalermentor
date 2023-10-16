DROP DATABASE IF EXISTS digitalerMentorDB;
Create DATABASE digitalerMentorDB;
USE digitalerMentorDB;


Create Table Studiengang (
	Kuerzel varchar(5) Primary Key,
	Name varchar(50),
	Standort varchar(50),
	Abschlussart varchar(10),
	Regelstudienzeit smallint,
	Studienbeginn varchar(20)
	);

Create Table Benutzer (
	BenutzerID varchar(10) Primary Key,
	Martrikelnummer int,
	Vorname varchar(50),
	Nachname varchar(50),
	Fachsemester int,
	EMail varchar(50),
	Passwort varchar(100),
	Bild BLOB,
	Einstellung varchar(10),
	Kuerzel varchar(5),
	FOREIGN KEY (Kuerzel) REFERENCES Studiengang(Kuerzel)
	);
    
Create Table Modul ( 
	Kuerzel varchar(5) Primary Key,
	Name varchar(50),
	Verantwortlicher varchar(100),
	Dozent varchar(50),
	Sprache varchar (50),
	Turnus varchar(50),
	Leistungspunkte smallint,
	Arbeitsaufwand smallint,
	Teilnehmerzahl varchar(20),
	VoraussetzungenPflicht text,
	VoraussetzungenEmpfohlen text,
	Pruefungsleistung text,
	Lernergebnisse text,
	Inhalt text,
	Extrakurse text
	);
	
Create Table Pflicht ( 
	StudiengangKuerzel VARCHAR(5),
	ModulKuerzel varchar(5),
	Semester smallint,
	FOREIGN KEY (StudiengangKuerzel) REFERENCES Studiengang(Kuerzel),
	FOREIGN KEY (ModulKuerzel) REFERENCES Modul(Kuerzel)
	);
	
CREATE Table Wahlpflicht (
	StudiengangKuerzel VARCHAR(5),
	ModulKuerzel VARCHAR(5),
	Semester smallint,
	FOREIGN KEY (StudiengangKuerzel) REFERENCES Studiengang(Kuerzel),
	FOREIGN KEY (ModulKuerzel) REFERENCES Modul(Kuerzel)
	);
	
Create Table Bewertung (
	BewertungsID varchar(50) Primary Key,
	BewertugsGruppe varchar(20),
	Bewertung float,
	ErstelltAm date,
	Kuerzel VARCHAR(5),
	BenutzerID varchar(10),
	FOREIGN KEY (Kuerzel) REFERENCES Modul(Kuerzel) On Delete CASCADE,
	FOREIGN KEY (BenutzerID) REFERENCES Benutzer(BenutzerID) On Delete CASCADE
	);
	
Create TABLE Kalendereintrag (
	Datum datetime,
	Eintrag text,
	BenutzerID varchar(10),
	CONSTRAINT KalendereintragsID PRIMARY KEY (Datum, BenutzerID),
	FOREIGN KEY (BenutzerID) REFERENCES Benutzer(BenutzerID) On DELETE CASCADE
	);
	
Create TABLE Ziel (
	ZielID varchar(20) PRIMARY KEY,
	Titel varchar(50),
	BenutzerID varchar(10),
	FOREIGN KEY (BenutzerID) REFERENCES Benutzer(BenutzerID) On DELETE CASCADE
	);

Create TABLE CPZiel (
	ZielID varchar(20) PRIMARY Key,
	Titel varchar(50),
	Semester varchar(20),
	CPAnzahl smallint,
	BenutzerID varchar(10),
	FOREIGN KEY (ZielID) REFERENCES Ziel(ZielID) On DELETE CASCADE,
	FOREIGN KEY (BenutzerID) REFERENCES Benutzer(BenutzerID) On DELETE CASCADE
	);
	
Create TABLE ModulZiel (
	ZielID varchar(20) PRIMARY Key,
	Titel varchar(50),
	Semester smallint,
	BenutzerID varchar(10),
	Kuerzel VARCHAR(5),
	FOREIGN KEY (Kuerzel) REFERENCES Modul(Kuerzel) On DELETE CASCADE,
	FOREIGN KEY (ZielID) REFERENCES Ziel(ZielID) On DELETE CASCADE,
	FOREIGN KEY (BenutzerID) REFERENCES Benutzer(BenutzerID) On DELETE CASCADE
	);
    
Create Table Pruefung (
	PruefungsID varchar(10) Primary Key,
	Semester smallint,
	Datum datetime,
	Kuerzel VARCHAR(5),
	FOREIGN KEY (Kuerzel) REFERENCES Modul(Kuerzel)
    );    
	
Create Table Note (
	PruefungsID varchar(10),
	BenutzerID varchar(10),
	Note smallint,
	Status varchar(20),
	Versuch smallint,
	CONSTRAINT NotenID PRIMARY KEY (PruefungsID, BenutzerID),
	FOREIGN KEY (PruefungsID) REFERENCES Pruefung(PruefungsID),
	FOREIGN KEY (BenutzerID) REFERENCES Benutzer(BenutzerID)
	);

INSERT INTO Modul (Kuerzel, Name, Verantwortlicher, Dozent, Sprache, Turnus, Leistungspunkte, Arbeitsaufwand, Teilnehmerzahl, VoraussetzungenPflicht, VoraussetzungenEmpfohlen, Pruefungsleistung, Lernergebnisse, Inhalt, Extrakurse) 
VALUES ("ADS", "Algorithmen und Datenstrukturen", "Prof. Dr. Wolfram Conen", "Prof. Dr. Wolfram Conen", "Deutsch", "Sommersemester", 6, 180, NULL, NULL, "Logik und diskrete Strukturen, Einführung in die Programmierung", "Klausur", NULL, NULL, NULL);

Insert into Modul Value("BAIN","Bachelor-Arbeit Informatik","Studiengangsbeauftragte/r Informatik","Alle Professoren der Fachgruppe Informatik","Deutsch","Jederzeit",12,360,null,null,"150 Leistungspunkte","Siehe § 24 und § 25 der Rahmenprüfungsordnung",Null,Null,Null);

Insert into Modul Value("BSY","Betriebssysteme","Prof. Dr. Andreas Cramer","Prof. Dr. Andreas Cramer","Deutsch","Wintersemester",6,180,null,null,"Technische Grundlagen der Informatik","Klausur",Null,Null,Null);

Insert into Modul Value("BV","Bildverarbeitung","Prof. Dr. Hartmut Surmann","Prof. Dr. Hartmut Surmann","Deutsch","Wintersemester",6,180,null,null,"Algorithmen und Datenstrukturen, Einführung in die Programmierung, Objektorientierte Programmierung, Prozedurale Programmierung, Grundlagen der Mathematik für Informatiker, Lineare Algebra","Klausur",Null,Null,Null);

Insert into Modul Value("DBA","Datenbanksysteme","Prof. Dr. Katja Zeume","Prof. Dr. Katja Zeume","Deutsch","Wintersemester",6,180,null,null,"Einführung in die Programmierung","Klausur",Null,Null,Null);

Insert into Modul Value("EZS","Echtzeitsysteme","Prof. Dr. Ekkehard Schrey","Prof. Dr. Ekkehard Schrey","Deutsch","Sommersemester",6,180,null,null,"Technische Grundlagen der Informatik, Logik & Diskrete Strukturen, Einführung in die Programmierung, Objektorientierte Programmierung, Prozedurale Programmierung, Betriebssysteme","Klausur",Null,Null,Null);

Insert into Modul Value("EPR","Einführung in die Programmierung","Prof. Dr. Marcel Luis","Prof. Dr. Marcel Luis","Deutsch","Wintersemester",7,210,null,null,null,"Klausur",Null,Null,Null);

Insert into Modul Value("GMI","Grundlagen der Mathematik für Informatiker","Prof. Dr. Laura Anderle","Prof. Dr. Laura Anderle","Deutsch","",7,210,null,null,null,"Klausur",Null,Null,Null);

Insert into Modul Value("IDB","Internet-Datenbanken","Prof. Dr. Katja Zeume","Prof. Dr. Katja Zeume","Deutsch","Sommersemester",6,180,null,null,"Datenbanksysteme, Internetsprachen","Klausur",Null,Null,Null);

Insert into Modul Value("INP","Internet-Protokolle","Prof. Dr. (TU NN) Norbert Pohlmann","Prof. Dr. (TU NN) Norbert Pohlmann","Deutsch","Sommersemester",6,180,null,null,null,"Klausur",Null,Null,Null);

Insert into Modul Value("INS","Internet-Sprachen","Prof. Dr. Andreas Cramer","Prof. Dr. Andreas Cramer","Deutsch","Wintersemester",6,180,null,"„Einführung in die Programmierung","Objektorientierte Programmierung","Klausur",Null,Null,Null);

Insert into Modul Value("KBIN","Kolloquium zur Bachelor-Arbeit Informatik","Studiengangsbeauftragte/r Informatik","Alle Professoren der Fachgruppe Informatik","Deutsch","Jederzeit",3,90,null,"Siehe § 26 der Rahmenprüfungsordnung und § 16 der Studiengangsprüfungsordnung","Siehe § 26 der Rahmenprüfungsordnung und § 16 der Studiengangsprüfungsordnung",Null,Null,Null,Null);

Insert into Modul Value("LDS","Logik und diskrete Strukturen","Prof. Dr. Wolfram Conen","Prof. Dr. Wolfram Conen","Deutsch","Wintersemester",6,180,null,null,null,"Klausur",Null,Null,Null);

Insert into Modul Value("MIN","Mathematik für Informatiker","Prof. Dr. Laura Anderle","Prof. Dr. Laura Anderle","Deutsch","Sommersemester",6,180,null,null,"Grundlagen der Mathematik für Informatiker","Klausur",Null,Null,Null);

Insert into Modul Value("MCI","Mensch-Computer-Interaktion","Prof. Dr. Jens Gerken","Prof. Dr. Jens Gerken","Deutsch","Wintersemester",6,180,null,null,"EPR, OPR, DSG","Klausur",Null,Null,Null);

Insert into Modul Value("OPR","Objektorientierte Programmierung","Prof. Dr. Marcel Luis","Prof. Dr. Marcel Luis","Deutsch","Sommersemester",7,210,null,null,"Einführung in die Programmierung","Klausur",Null,Null,Null);

Insert into Modul Value("PXP","Praxisphase","Praxisphasen-Beauftragte/r des Fachbereichs Informatik","Alle Professoren der Fachgruppe Informatik","Deutsch","Sommersemester",15,450,null,"90 Leistungspunkte","Es sollten alle Modulprüfungen des dritten Fachsemesters bestanden sein.","Bescheinigung des Arbeitgebers über die Tätigkeit im Unternehmen, keine Benotung Bescheinigung des Betreuers über das Erstellen und die Abgabe des Berichtes, keine Benotung",Null,Null,Null);

Insert into Modul Value("PPR","Prozedurale Programmierung","Prof. Dr. Ulrike Griefahn","Lehrbeauftragte/r","Deutsch","Wintersemester",6,180,null,null,"Einführung in die Programmierung, Objektorientierte Programmierung, Algorithmen und Datenstrukturen","Klausur",Null,Null,Null);

Insert into Modul Value("REN","Rechnernetze","Prof. Dr. Detlef Mansel","Prof. Dr. Detlef Mansel","Deutsch","Sommersemester",5,150,null,null,null,"Klausur",Null,Null,Null);

Insert into Modul Value("ROB","Robotik","Prof. Dr. Hartmut Surmann","Prof. Dr. Hartmut Surmann","Deutsch","Sommersemester",6,180,null,null,"Algorithmen und Datenstrukturen, Einführung in die Programmierung, Objektorientierte Programmierung, Prozedurale Programmierung, Grundlagen der Mathematik für Informatiker, Lineare Algebra","Klausur",Null,Null,Null);

Insert into Modul Value("SPIN","Softwareprojekt Informatik","Studiengangsbeauftragte/r Informatik","Alle Professoren der Fachgruppe Informatik","Deutsch","Sommersemester",12,360,null,"Einführung in die Programmierung, Objektorientierte Programmierung, Algorithmen und Datenstrukturen, unbenotetes Testat oder unbenoteter Vortrag, regelmäßige Anwesenheit bei Projektbesprechungen","Die Inhalte der Module Mensch-Computer-Interaktion, und Softwaretechnik gehören zusätzlich für jedes Projekt zu den Minimalvoraussetzungen. Die Inhalte der Module Datenbanksysteme, Internetsprachen und/oder Prozedurale Programmierung können abhängig von der Studienrichtung für die meisten weiteren Projekte Voraussetzung sein. Projektspezifisch kann zudem jedes Modul bis inklusive des 3. Semesters Voraussetzung für ein Projektthema sein.","Unbenotetes Testat oder Vortrag zu den Inhalten des Vorlesungsteils als Voraussetzung zur Prüfungszulassung Prüfungsleistungen: Ausarbeitung in Form einer entwickelten Software, Ausarbeitungen und Präsentationen der geforderten Projektergebnisse.",Null,Null,Null);

Insert into Modul Value("SWT","Softwaretechnik","Prof. Jürgen Znotka","Prof. Jürgen Znotka","Deutsch","Wintersemester",6,180,null,null,"Algorithmen und Datenstrukturen, Einführung in die Programmierung, Objektorientierte Programmierung, Grundlagen der Mathematik für Informatiker,","Klausur",Null,Null,Null);

Insert into Modul Value("TGI","Technische Grundlagen der Informatik","Prof. Dr. Detlef Mansel","Prof. Dr. Detlef Mansel","Deutsch","Wintersemester",5,150,null,null,null,"Klausur",Null,Null,Null);

Insert into Modul Value("TENI","Technisches Englisch für Informatiker","Dr. Petra Iking","Bernd Winkelräth","Englisch","",5,150,null,null,"Fortgeschrittene Englischkenntnisse auf dem Niveau der Jahrgangsstufe 11/12 ; ggf. zusätzlich erfolgreich abgeschlossener Auffrischungskurs Englisch bzw. Teilnahme am „English Support Programme (ESP)“ des Sprachenzentrums ","Klausur",Null,Null,Null);

Insert into Modul Value("THI","Theoretische Informatik","Prof. Dr. Ulrike Griefahn","Prof. Dr. Ulrike Griefahn","Deutsch","Sommersemester",6,180,null,null,"Einführung in die Programmierung, Logik und diskrete Strukturen","Klausur",Null,Null,Null);

Insert into Modul Value("BKV","Betrieb komplexer verteilter Systeme","Prof. Dr. Andreas Cramer","Prof. Dr. Andreas Cramer","Deutsch","Sommersemester",6,180,null,null,"Betriebssysteme, Rechnernetze","Klausur",Null,Null,Null);

Insert into Modul Value("BWIN","Betriebswirtschaftslehre für Informatiker","Prof. Dr. Siegbert Kern, Prof. Dr. Henning Ahlf","Prof. Dr. Siegbert Kern, Prof. Dr. Henning Ahlf","Deutsch","",6,160,null,null,"","Die Teilnehmer der Veranstaltung nehmen am Planspiel und den dafür erforderlichen Präsenzterminen teil. Jeder Teilnehmer erläutert in Form einer Präsentation die getroffenen Unternehmensentscheidungen und deren Auswirkungen. Prüfungsleistung: Die erfolgreiche Teilnahme am Planspiel und die Präsentation werden als Prüfungsleistung bewertet.",Null,Null,Null);

Insert into Modul Value("ITS","Grundlagen der IT-Sicherheit","Prof. Dr. (TU NN) Norbert Pohlmann","Prof. Dr. (TU NN) Norbert Pohlmann","Deutsch","Wintersemester",6,180,null,"Erfolgreich absolviertes Praktikum",null,"Klausur",Null,Null,Null);

Insert into Modul Value("ITR","IT-Recht","Studiengangsbeauftragte/r Wirtschaftsinformatik","Lehrbeauftragte/r","Deutsch","Wintersemester",6,180,null,null,null,"Klausur",Null,Null,Null);

Insert into Modul Value("KBE","Komponentenbasierte Softwareentwicklung","Prof. Jürgen Znotka","Prof. Jürgen Znotka","Deutsch","Wintersemester, nach Bedarf",6,150,null,null,"","Klausur",Null,Null,Null);

Insert into Modul Value("KI","Künstliche Intelligenz","Prof. Dr. Wolfram Conen","Prof. Dr. Wolfram Conen","Deutsch","Sommersemester, unregelmäßig",6,180,null,null,"Logik und diskrete Strukturen, Algorithmen und Datenstrukturen, Einführung in die Programmierung, Objektorientierte Programmierung","Klausur",Null,Null,Null);

Insert into Modul Value("MOC","Mobile Computin","Prof. Dr. Detlef Mansel","Prof. Dr. Detlef Mansel","Deutsch","Sommersemester, unregelmäßig",6,180,null,null,"Rechnernetze","Klausur",Null,Null,Null);

Insert into Modul Value("MRO","Mobile Robotik","Prof. Dr. Hartmut Surmann","Prof. Dr. Hartmut Surmann","Deutsch","Wintersemester",6,180,null,null,null,"Klausur",Null,Null,Null);

Insert into Modul Value("OPC","Objektorientierte Programmierung mit C++","Studiengangsbeauftragte/r Informatik","Prof. Dr. Reinhard Wierich oder Lehrbeauftragte/r","Deutsch","Wintersemester, unregelmäßig",6,180,null,"Erfolgreich absolviertes Praktikum","Einführung in die Programmierung, Objektorientierte Programmierung, Prozedurale Programmierung","Klausur",Null,Null,Null);

Insert into Modul Value("PAP","Parallele Programmierung","Prof. Dr. Hartmut Surmann","Prof. Dr. Hartmut Surmann","Deutsch","Sommersemester",6,180,null,null,"Algorithmen und Datenstrukturen, Einführung in die Programmierung, Objektorientierte Programmierung, Prozedurale Programmierung, Grundlagen der Mathematik für Informatiker","Klausur",Null,Null,Null);

Insert into Modul Value("PRAX","Practical Security Attacks and Exploitation","Prof. Dr. Christian Dietrich","Prof. Dr. Christian Dietrich","Deutsch","",6,180,null,null,"Grundlegende IT-Sicherheitskenntnisse","Klausur",Null,Null,Null);

Insert into Modul Value("SWD","Software Design","Prof. Jürgen Znotka","Prof. Jürgen Znotka","Deutsch","Sommersemester, nach Bedarf",6,150,null,null,"Softwaretechnik, Datenbanken, Internet-Datenbanken,GUI-Programmierung","Klausur",Null,Null,Null);

Insert into Modul Value("MET","Medientechnik","Prof. Dr. Ekkehard Schrey","Prof. Dr. Ekkehard Schrey","Deutsch","Wintersemester",6,180,null,null,"Grundlagen der Mathematik für Informatiker, Mathematik für Medieninformatiker, bzw. Informatiker Technische Grundlagen der Informatik, Algorithmen und Datenstrukturen, Einführung in die Programmierung´ ","Klausur",Null,Null,Null);

Insert into Modul Value("MBE","Modellbasierter Entwurf von Regelsystemen","Prof. Dr. Ekkehard Schrey","Prof. Dr. Ekkehard Schrey","Deutsch","Wintersemester",6,180,null,null,"Grundlagen der Mathematik für Informatiker, Mathematik für Informatiker, Technische Grundlagen der Informatik, Algorithmen und Datenstrukturen, Einführung in die Programmierung, Einführung in die Systemtheorie","Klausur",Null,Null,Null);

Insert into Modul Value("SYT","Systemtheorie","Prof. Dr. Ekkehard Schrey","Prof. Dr. Ekkehard Schrey","Deutsch","Sommersemester",6,180,null,null,"Grundlagen der Mathematik für Informatiker, Mathematik für Medieninformatiker","Klausur",Null,Null,Null);

Insert into Modul Value("ZDR","Zeitdiskrete Regelsysteme","Prof. Dr. Ekkehard Schrey","Prof. Dr. Ekkehard Schrey","Deutsch","Wintersemester",6,180,null,null,"Grundlagen der Mathematik für Informatiker, Mathematik für Informatiker, Technische Grundlagen der Informatik, Algorithmen und Datenstrukturen, Einführung in die Programmierung, Einführung in die Systemtheorie","Klausur",Null,Null,Null);

Insert Into Studiengang Value("PI", "Praktische Informatik", "Westfählische Hochschule Gelsenkirchen","Bachelor",6,"Wintersemester");
Insert Into Studiengang Value("TI", "Technische Informatik", "Westfählische Hochschule Gelsenkirchen","Bachelor",6,"Wintersemester");

Insert Into Pflicht Value("PI", "LDS",1);
Insert Into Pflicht Value("PI", "EPR",1);
Insert Into Pflicht Value("PI", "GMI",1);
Insert Into Pflicht Value("PI", "TGI",1);
Insert Into Pflicht Value("PI", "TENI",1);

Insert Into Pflicht Value("TI", "LDS",1);
Insert Into Pflicht Value("TI", "EPR",1);
Insert Into Pflicht Value("TI", "GMI",1);
Insert Into Pflicht Value("TI", "TGI",1);
Insert Into Pflicht Value("TI", "TENI",1);

Insert Into Pflicht Value("PI", "ADS",2);
Insert Into Pflicht Value("PI", "OPR",2);
Insert Into Pflicht Value("PI", "MIN",2);
Insert Into Pflicht Value("PI", "THI",2);
Insert Into Pflicht Value("PI", "REN",2);

Insert Into Pflicht Value("PI", "DBA",3);
Insert Into Pflicht Value("PI", "SWT",3);
Insert Into Pflicht Value("PI", "MCI",3);
Insert Into Pflicht Value("PI", "BSY",3);
Insert Into Pflicht Value("PI", "INS",3);

Insert Into Pflicht Value("PI", "IDB",4);
Insert Into Pflicht Value("PI", "INP",4);
Insert Into Pflicht Value("PI", "SPIN",4);

Insert Into Pflicht Value("PI", "PPR",5);
Insert Into Pflicht Value("PI", "SPIN",5);

Insert Into Pflicht Value("PI", "BAIN",6);
Insert Into Pflicht Value("PI", "PXP",6);
Insert Into Pflicht Value("PI", "KBIN",6);


Insert Into Wahlpflicht Value("PI", "KI",4);
Insert Into Wahlpflicht Value("PI", "BKV",4);

INSERT INTO Benutzer Value("Test123", 12345678, "TestV", "TestN", 404, Null, Null, Null, Null, "PI");

Insert Into Ziel Value("Test1", "ADS", "Test123");
Insert Into Ziel Value("Test2", "MIN", "Test123");
Insert Into Ziel Value("Test3", "OPR", "Test123");
Insert Into Ziel Value("Test4", "THI", "Test123");
Insert Into Ziel Value("Test5", "REN", "Test123");

Insert Into ModulZiel Value("Test1", "ADS", 2, "Test123", "ADS");
Insert Into ModulZiel Value("Test2", "MIN", 2, "Test123", "MIN");
Insert Into ModulZiel Value("Test3", "OPR", 2, "Test123", "OPR");
Insert Into ModulZiel Value("Test4", "THI", 2, "Test123", "THI");
Insert Into ModulZiel Value("Test5", "REN", 2, "Test123", "REN");

Insert Into Pruefung Value("PID1", 1, '2023-09-04 12:00:00', "EPR" );
Insert Into Pruefung Value("PID2", 1, '2023-09-03 12:00:00', "GMI" );
Insert Into Pruefung Value("PID3", 1, '2023-09-02 12:00:00', "LDS" );
Insert Into Pruefung Value("PID4", 2, '2023-09-02 12:00:00', "GMI" );



Insert Into Note Value("PID1", "Test123", 3.0, "Bestanden", 1);
Insert Into Note Value("PID2", "Test123", 5.0, "Nicht Bestanden", 1);
Insert Into Note Value("PID3", "Test123", 5.0, "Nicht Bestanden", 1);
Insert Into Note Value("PID4", "Test123", 2.0, "Bestanden", 2);