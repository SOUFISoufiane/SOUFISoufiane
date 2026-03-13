#ifndef TILE_H
#define TILE_H

#include <QMainWindow>
using namespace std;

// Declaration de la classe Tile qui regroupe les membres

class Tile {

public:
    int iPic; // Déclaration des 5 images de 0 à 4
    int nSurroundingBombs; // Nombre possible est de 0 à 8
    bool isBomb; // Vrai si la tuile contient une bombe
    bool isClicked; // Vrai si la case est clické
    bool isFlagged; // Vrai si la flag est posée
    int tileState; //decl. de la var qui enregistre l'etat de la tuile 0 = cacher 1 = revealed 2 = drapeau
    QString tileBombCount; //decl. de la var qui enregistre combien de bombes autour, et a son tour c'est le nombre qui s'affiche dessus

    // Constructeur :
    Tile() : iPic(0), nSurroundingBombs(0), isBomb(false), isClicked(false), isFlagged(false), tileState(0){}
    // Destructor :
    ~Tile(){}

    // fonction de gestion des swap de flag
    void flagSwap();

};

#endif // TILE_H
