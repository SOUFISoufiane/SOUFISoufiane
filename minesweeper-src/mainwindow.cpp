#include "mainwindow.h"
#include "ui_mainwindow.h"

#include <cstdlib>
#include <ctime>
#include <QMessageBox>

#include <QPainter>
#include <QBrush>
#include <QMouseEvent>
#include <QPaintEvent>
#include <qpainter.h>
#include <QWidget>
#include "Tile.h"

MainWindow::MainWindow(QWidget *parent)
    : QMainWindow(parent)
    , ui(new Ui::MainWindow)
{
    ui->setupUi(this);
    width = 30;
    nCols = nRows = 10;
    X = Y = 20;
    C = R = 0;
    xPos = yPos = 0;

    resizeMatrix();
    plantBombs();
    srand((unsigned)time(0));
    tileSurroundingBombsState();

    //Var de la directory des fichiers QPix
    QString path = "C:/Users/e121596/Documents/Pers/Demineur_Projet_S3/Demineur_Projet_S32/QPix/";

    explodedImg.load(path + "bombed.png");
    flagImg.load(path + "flag.png");
    bombImg.load(path + "bomb.png");

}

MainWindow::~MainWindow()
{
    delete ui;
}


// Gestion du dessin
void MainWindow::paintEvent(QPaintEvent* p){

    //Définition de la toile (MainWindow) de dessin pour le painter
    QPainter painter(this);

    //Définition des outils du dessin et ses popriétes
    QBrush brush1 (QColor(169, 169, 169)); //brush de dessin gris en premier
    QBrush brush2 (QColor(214, 210, 210)); //brush de dessin gris clair apres left click
    //QBrush brush3 (QColor(255, 0, 0));     //brush de dessin rouge apres right click, mais ca sera changé par image flag
    //QBrush brush4 (QColor(0, 255, 255));   //brush de dessin de la case si elle as une bombe
    //QBrush brush5 (QColor(255, 0,255));    //brush de dessin de la tuile si la bombe est activée
    QPen pen1(Qt::black);        //pen de dessin des bords autours la tuile

    //Gestion dessin du demineur, tuile par tuile
    for(int r = 0; r < nRows; ++r){
        for(int c = 0 ; c < nCols ; ++c){

            // Gestion des coordonees de chaque tuile
            X = width * c;
            Y = width * r;

            painter.setPen(pen1);

            //Définition de l outil choisis pour dessiner par rap au type de click ou pour la premiere window

            if(M[r][c].tileState == 0 /*&& M[j][i].isFlagged == false*/){ //premier dessin des tuiles

                painter.setBrush(brush1); //premier dessin de la tuile si une bombe existe
                painter.drawRect(X, Y, width, width);

                //if(M[r][c].isBomb == true) painter.setBrush(brush4); //premier dessin de la tile si une bombe n'existe pas

            }else if(M[r][c].tileState == 1 && M[r][c].isFlagged != true){ //Gestion du dessin quand la tuile est clicker gauche

                if(M[r][c].isBomb == false){
                    painter.setBrush(brush2); //dessin en gris quand la tuile n'as pas de bomb
                    painter.drawRect(X, Y, width, width);
                }
                else if(M[r][c].isBomb == true){
                    painter.drawPixmap(X, Y, width, width, explodedImg); //painter.setBrush(brush5); //dessin quand la tuile as une bomb
                    //painter.drawRect(X, Y, width, width);
                }

            }else if(M[r][c].tileState == 2){ //Gestion de dessin quand la tuile est flagged (click droit)

                painter.setBrush(brush1);
                painter.drawRect(X, Y, width, width);

                painter.drawPixmap(X, Y, width, width, flagImg);

                /*if( M[r][c].isBomb == false && M[r][c].isFlagged == true )painter.setBrush(brush3); //dessin quand on clique droit pour flagger et la tuile ne contient pas de bombe
                else if( M[r][c].isBomb == true && M[r][c].isFlagged == true)painter.setBrush(brush3); //dessin quand on clique droit pour flagger et la tuile contient une bombe
                else if(M[r][c].isBomb == true && M[r][c].isFlagged != true)painter.setBrush(brush4); //dessin quand on click droit pour deflagger et la tuile contien une bombe
                */
            }




            // Gestion du dessin du nombre si la tuile est revelé et c'est pas 0 bombs
            if (M[r][c].tileState == 1 && M[r][c].tileBombCount != "0") {

                int val = M[r][c].tileBombCount.toInt();
                QPen penNumber;

                //Choix de la couleur du pen par rap au nombre de bombes
                switch(val){
                case 1: penNumber.setColor(Qt::blue); break;
                case 2: penNumber.setColor(Qt::darkGreen); break;
                case 3: penNumber.setColor(Qt::red); break;
                case 4: penNumber.setColor(Qt::magenta); break;
                case 5: penNumber.setColor(Qt::yellow); break;
                case 6: penNumber.setColor(Qt::cyan); break;
                case 7: penNumber.setColor(Qt::black); break;
                case 8: penNumber.setColor(Qt::gray); break;
                }

                painter.setPen(penNumber);
                painter.drawText(X, Y, width, width, Qt::AlignCenter, M[r][c].tileBombCount);
            }
        }
    }
}



// Gestion du dimensionnement de la matrice
void MainWindow::resizeMatrix(){

    M.resize(nRows);
    for(int r = 0; r < nRows ; ++r){
        M[r].resize(nCols);
    }

}

// Gestion des clicks de la souri
void MainWindow::mousePressEvent(QMouseEvent* e){


    // Enregistrement de la position de la souri quand clicked
    xPos = e->pos().x();
    yPos = e->pos().y();

    //Convertir la position en indice
    int c = C = xPos / width; //indice cols
    int r = R = yPos / width; //indice lines

    if (r < nRows && c < nCols && c >= 0 && r >= 0){ //Gestion des clicks hors zone

        //gestion de l'etat de la tuile apres click
        if(e->button() == Qt::LeftButton && M[r][c].isFlagged != true){

            if (M[r][c].isBomb == true) {

                M[r][c].tileState = 1;

                repaint();

                MainWindow::popupGO();

            }
            else {
                MainWindow::neighbourState(r, c);
            }

        }else if (e->button() == Qt::RightButton && M[r][c].tileState != 1){

            M[r][c].tileState = 2;

            M[r][c].flagSwap();

            if(M[r][c].isFlagged == false) M[r][c].tileState = 0;

        }


        /*Affichage de la valeur du isFlagged pour debuggage en cour...
        if(M[r][c].isFlagged == true){
            ui->label->setText("FLAGGED");
        }else{ui->label->setText("NOT FLAGGED");}*/
    }


    update();
}


//Gestion de status des tuiles voisins pour l'effet domino
void MainWindow::neighbourState(int j, int i){

    // Gestion des bordures
    if (j < 0 || j >= nRows || i < 0 || i >= nCols) return;

    // Condition pour que la fonction s'arrête quand la tuile en question n'est pas caché
    if (M[j][i].tileState == 1 || M[j][i].tileState == 2) return;

    //Changement de status des tuiles voisines à revelead
    M[j][i].tileState = 1;

    //Gestion de l'effect domino
    if (M[j][i].tileBombCount == "0") {
                for (int r = j-1; r <= j+1; r++) {
                    for (int c = i-1; c <= i+1; c++) {
                       neighbourState(r, c);
                    }
                }
            }

    /*for(int e = 1; e < nCols; ++e){
        for(int r = j-e; r <= j+e; r++){
            for(int c = i-e; c <= i+e; c++){
                if ( r >= 0 && c >= 0 && r < nRows && c < nCols){
                    if(M[r][c].isBomb == false){ M[r][c].tileState = 1;}
                }
            }
        }
    }*/
}


// Gestion du status des tuiles autour la bombe
void MainWindow::tileSurroundingBombsState(){

    for(int r = 0; r < nRows; r++){
        for(int c = 0; c < nCols; c++){

            if ( r >= 0 && c >= 0 && r < nRows && c < nCols){
              if (M[r][c].isBomb == false){
                   int count = calcSurroundingBombs(c, r);
                   M[r][c].tileBombCount = QString::number(count);
                }
            }
        }
    }

}




// Gestion du calcul des bombes autour la tuile clicker
int MainWindow::calcSurroundingBombs(int i, int j){
    int bombCount = 0;

    for(int r = j-1; r <= j+1; r++)
        for(int c = i-1; c <= i+1; c++)

            if ( r >= 0 && c >= 0 && r < nRows && c < nCols){
                if(M[r][c].isBomb == true) bombCount++;
             }

    return bombCount;
}


//Gestion de plantation des bombes
void MainWindow::plantBombs(){

    for(int r = 0; r < nRows; r++){
        for(int c = 0; c < nCols; c++){

    //Random number generation
    int N = (rand()%10)+1;

    if(N == 3 || N == 10)M[r][c].isBomb = true;
    else M[r][c].isBomb = false;

        }

    }
}

//Gestion du popup GAME OVER quand bombed
void MainWindow::popupGO(){

    QMessageBox msgBox;

    msgBox.setWindowTitle("LOST");
    msgBox.setText("BOOM t'es mort!!");

    msgBox.exec();

}
