angular.module("Life")
    .service("Neighbours", function () {
        this.find = function ($scope, x, y) {
            var neighbours = [];
            for (var i = x - 1; i < x + 2; i++) {
                for (var j = y - 1; j < y + 2; j++) {
                    if((i != x || j != y)
                        && (i != -1 && j != -1)
                        && (i != $scope.width / $scope.cellSize && j != $scope.height / $scope.cellSize)){
                        neighbours.push({
                            x: i,
                            y: j
                        });
                    }
                }
            }
            return neighbours;
        }
    })
    .service("Cells", function () {
        this.draw = function (context, img, cellSize, x, y) {
            context.drawImage(img, x * cellSize + 1, y * cellSize + 1, cellSize - 2, cellSize - 2);
        }
    })
    .service("Table", function () {
        this.draw = function (grid, cellSize) {
            var context = grid.getContext("2d");
            for (var x = 0; x <= grid.width; x += cellSize) {
                context.moveTo(x, 0);
                context.lineTo(x, grid.height);
            }
            for (var y = 0; y <= grid.height; y += cellSize) {
                context.moveTo(0, y);
                context.lineTo(grid.width, y);
            }
            context.strokeStyle = "black";
            context.stroke();
        }
    })
    .service("Generation", function (cell, fox, rabbit) {
        var statusToSet, typeToSet;
        this.new = function ($scope) {
            var aliveCells = [];

            for(var i = 0; i < $scope.width / $scope.cellSize; i++) {
                for(var j = 0; j < $scope.height / $scope.cellSize; j++) {
                        if(field[i][j].life($scope, i, j)) {
                            aliveCells.push(field[i][j]);
                        }
                }
            }
            for(var i = 0; i < $scope.width / $scope.cellSize; i++) {
                for (var j = 0; j < $scope.height / $scope.cellSize; j++) {
                    statusToSet = field[i][j].nstatus;
                    typeToSet = field[i][j].ntype;
                    switch (typeToSet){
                        case "cell" :
                            field[i][j] = cell.create();
                            break;
                        case "rabbit" :
                            field[i][j] = rabbit.create();
                            break;
                        case "fox" :
                            field[i][j] = fox.create();
                            break;
                    }
                    field[i][j].status = statusToSet;
                }
            }
        return aliveCells;
        }
    });