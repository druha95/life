/***************************************************************/
/***************************************************************/
/********************** Game "Life" ****************************/
/***************************************************************/
/******************************************* Sharshakova Daria */
/************************************************** IASA DA-51 */

#include <iostream>
#include <vector>
using namespace std;
#define N 3
#define X 50
#define Y 50
int xCord[] = {3,3,4};
int yCord[] = {2,3,4};


typedef struct {
    int x;
    int y;
}coordinates;

class Cell {
private:
    coordinates cellCord;
    coordinates neighbours[8];
    bool status;

public:
    Cell(){
        cellCord.x = 0;
        cellCord.y = 0;
        for(int i = 0; i < 8; i++){
            neighbours[i].x = 0;
            neighbours[i].y = 0;
        }
        status = false;
    };
    void setCord(int xCord, int yCord){
        cellCord.x = xCord;
        cellCord.y = yCord;
        int counter = 0;
        for (int i = cellCord.x - 1; i < cellCord.x + 2; i++) {
            for (int j = cellCord.y - 1; j < cellCord.y + 2; j++) {
                if (i == cellCord.x && j == cellCord.y) {
                    continue;
                }
                neighbours[counter].x = i;
                neighbours[counter].y = j;
                counter++;
            }
        }
    }
    coordinates getCord(void){
        return cellCord;
    }
    void setStatus(bool cellStatus){
        status = cellStatus;
    }
    bool getStatus(void){
        return status;
    }
    coordinates* findNeighbours(void){
        return neighbours;
    }
};

struct aliveCell{
    Cell cell;
    aliveCell *next;
};

void Print(aliveCell *begin){
    aliveCell *print = begin;
    while(print){
        cout << print->cell.getCord().x;
        cout << print->cell.getCord().y;
        print = print->next;
    }
    cout << "NULL\n";
}

class Life {
private:
    vector <Cell> cellsToBeBorn;
    vector <Cell> cellsToDie;
    vector <Cell> aliveCells;
public:
    Life(){
        cellsToBeBorn.reserve(10);
        cellsToDie.reserve(10);
        aliveCells.reserve(10);
    }
    void setCells(aliveCell *begin) {
        aliveCell *cellToSet = begin;
        while (cellToSet){
            aliveCells.push_back(cellToSet->cell);
            cellToSet = cellToSet->next;
        }
    }

    void newGeneration(vector<vector<Cell>> area, aliveCell **begin) {
        int numOfLiveNeighboursForCell = 0, numOfLiveNeighboursForNeighbour = 0;
        for (int alive = 0; alive < aliveCells.size(); alive++) {
            for (int i = 0; i < aliveCells.size(); i++) {
                if (aliveCells[alive].getCord().x != aliveCells[i].getCord().x
                        || aliveCells[alive].getCord().y != aliveCells[i].getCord().y) {
                    for (int j = 0; j < 8; j++) {
                        if (aliveCells[i].getCord().x == aliveCells[alive].findNeighbours()[j].x
                                && aliveCells[i].getCord().y == aliveCells[alive].findNeighbours()[j].y) {
                            numOfLiveNeighboursForCell++;
                        }
                    }
                }
                else continue;
            }
            if (numOfLiveNeighboursForCell > 3 || numOfLiveNeighboursForCell < 2) {
                cellsToDie.push_back(aliveCells[alive]);
                aliveCell *oldCell = *begin;
                while(oldCell){
                    if(oldCell->cell.getCord().x == aliveCells[alive].getCord().x
                       && oldCell->cell.getCord().y == aliveCells[alive].getCord().y){
                        oldCell = oldCell->next;
                        delete(oldCell);
                    }
                    else oldCell = oldCell->next;
                }
            }
            numOfLiveNeighboursForCell = 0;

            for (int i = 0; i < 8; i++) {
                for (int j = 0; j < 8; j++) {
                    for (int k = 0; k < aliveCells.size(); k++) {
                        if (area[aliveCells[alive].findNeighbours()[i].x][aliveCells[alive].findNeighbours()[i].y].findNeighbours()[j].x == aliveCells[k].getCord().x
                            && area[aliveCells[alive].findNeighbours()[i].x][aliveCells[alive].findNeighbours()[i].y].findNeighbours()[j].y == aliveCells[k].getCord().y) {
                            numOfLiveNeighboursForNeighbour++;
                        }
                    }
                }
                if (numOfLiveNeighboursForNeighbour == 3) {
                    for (int j = 0; j < cellsToBeBorn.size(); j++) {
                        for (int k = 0; k < 8; k++) {
                            if (aliveCells[alive].findNeighbours()[k].x != cellsToBeBorn[j].getCord().x
                                    && aliveCells[alive].findNeighbours()[k].y != cellsToBeBorn[j].getCord().y) {
                                cellsToBeBorn.push_back(area[aliveCells[alive].findNeighbours()[i].x][aliveCells[alive].findNeighbours()[i].y]);
                                aliveCell *newCell = new aliveCell;
                                newCell->cell = area[aliveCells[alive].findNeighbours()[i].x][aliveCells[alive].findNeighbours()[i].y];
                                newCell->next = *begin;
                                *begin = newCell;
                            }
                        }
                    }
                }
                numOfLiveNeighboursForNeighbour = 0;
            }
        }

    }
    vector<Cell> getCellsToBeBorn(void) {
        return cellsToBeBorn;
    };
    vector<Cell> getCellsToDie(void) {
        return cellsToDie;
    }
};


int main() {
    vector< vector<Cell> > area(X, vector<Cell>(Y));
    for(int i = 0; i < X; i++){
        for(int j = 0; j < Y; j++){
            Cell field;
            area[i][j] = field;
        }
    }

    aliveCell *begin = new aliveCell;
    aliveCell *end = begin;
    for (int i = 0; i < N; i++){
        area[xCord[i]][yCord[i]].setStatus(true);
        end->cell.setCord(xCord[i], yCord[i]);
        end->cell.setStatus(true);
        if(i != N - 1) {
            end->next = new aliveCell;
            end = end->next;
        }
        end->next = NULL;
    }
    Life life;
    life.setCells(begin);
    life.newGeneration(area, &begin);
    Print(begin);

    return 0;
}