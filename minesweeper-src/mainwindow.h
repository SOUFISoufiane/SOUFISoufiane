#ifndef MAINWINDOW_H
#define MAINWINDOW_H

#include <QMainWindow>
#include <Tile.h>

QT_BEGIN_NAMESPACE
namespace Ui {
class MainWindow;
}
QT_END_NAMESPACE

class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    MainWindow(QWidget *parent = nullptr);
    ~MainWindow();

    void paintEvent(QPaintEvent* p); //Painting events Mgmt
    void mousePressEvent (QMouseEvent* e); //Mouse Click Mgmt

    QVector<QVector<Tile>> M; // Déclaration de la matrice des tuiles

    int width; // Var largeur et longeur de chaque tuile *carré*
    int nCols, nRows, X, Y; // Vars Colognes, lignes, position abscisse, et ordonée
    int xPos, yPos; // Vars coordonée position de la souri
    int C, R;

    QPixmap bombImg;     // Déclaration image de la bombe
    QPixmap flagImg;     // Déclaration image du flag
    QPixmap explodedImg; // Déclaration image de la bombe bombé

    void resizeMatrix(); //  Fonction de dimensionnement de la matrice
    int calcSurroundingBombs(int i, int j); // Fonction de la calculation des nombres de bombes autour de la tuile clicker
    void plantBombs(); // Fonction de plantation de mines
    void neighbourState(int i, int j); // Fonction de gestion d'états des tuiles voisines
    void tileSurroundingBombsState(); // Fonction de gestion de nombres de bombes
    void ressayerGame();
    void popupGO();


private:
    Ui::MainWindow *ui;


};
#endif // MAINWINDOW_H
