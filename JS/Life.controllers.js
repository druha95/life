angular.module("Life")
    .controller("Main", function ($scope, Neighbours, Cells, Table, Generation, $interval, cell, rabbit, fox) {

        $scope.cellSize = 20;
        $scope.width = 200;
        $scope.height = 200;
        $scope.runDescriptor = null;


        for(var i = 0; i < $scope.width/$scope.cellSize; i++) {
            field[i] = [];
            for(var j = 0; j < $scope.height/$scope.cellSize; j++) {
                field[i][j] = cell.create();
            }
        }
        var generation = ["initial"];
        var mimimi = new Image;
        mimimi.src = "images/mimimi.png";
        var arrrrr = new Image;
        arrrrr.src = "images/arrrrr.png";
        var images = {
            mimimi: mimimi,
            arrrrr: arrrrr
        };
        var grid = document.getElementById("canvas");
        grid.width = $scope.width;
        grid.height = $scope.height;
        var cellsField = document.getElementById("cells");
        cellsField.width = $scope.width;
        cellsField.height = $scope.height;
        var cellsContext = cellsField.getContext("2d");

        Table.draw(grid, $scope.cellSize);

        $scope.run = function() {
            if(!$scope.runDescriptor) {
                $scope.random();
                $scope.runDescriptor = $interval(function () {
                    if(generation.length != 0){
                        cellsContext.clearRect(0, 0, grid.width, grid.height);
                        generation = Generation.new($scope);
                        for(var i = 0; i < $scope.width / $scope.cellSize; i++) {
                            for (var j = 0; j < $scope.height / $scope.cellSize; j++) {
                                if(field[i][j].status){
                                    if(field[i][j].type == "rabbit"){
                                        Cells.draw(cellsContext, images.mimimi,  $scope.cellSize, i, j);
                                    }
                                    else
                                        Cells.draw(cellsContext, images.arrrrr,  $scope.cellSize, i, j);
                                }
                            }
                        }
                    }
                    else {
                        cellsContext.clearRect(0, 0, grid.width, grid.height);
                    }
                }, 1000)
            }
        };
        $scope.random = function () {
            var x, y, number;
            for(var i = 0; i < $scope.width / $scope.cellSize;) {
                number = Math.floor(Math.random() * 4);
                i += number;
                for(var j = 0; j < $scope.height / $scope.cellSize;) {
                    number = Math.floor(Math.random() * 4);
                    j += number;
                    x = Math.floor(Math.random() * $scope.width/$scope.cellSize);
                    y = Math.floor(Math.random() * $scope.height/$scope.cellSize);
                    if(!field[x][y].status){
                        field[x][y] = rabbit.create();
                        field[x][y].status = true;
                        Cells.draw(cellsContext, images.mimimi,  $scope.cellSize, x, y);
                    }
                }
            }
        };
        $scope.change = function () {
            if($scope.cellSize !== null && $scope.width !== null && $scope.height !== null) {
                grid.width = $scope.width;
                grid.height = $scope.height;
                cellsField.width = $scope.width;
                cellsField.height = $scope.height;
                Table.draw(grid, $scope.cellSize);
                cellsContext.clearRect(0, 0, grid.width, grid.height);

                for(var i = 0; i < $scope.width / $scope.cellSize; i++) {
                    if(field[i] == undefined) {
                        field[i] = [];
                        for (var j = 0; j < $scope.height / $scope.cellSize; j++) {
                            field[i][j] = cell.create();
                        }
                    }
                    for (var j = 0; j < $scope.height / $scope.cellSize; j++) {
                        if(field[i][j] == undefined) {
                            field[i][j] = cell.create();
                        }
                    }
                }

                for(var i = 0; i < $scope.width / $scope.cellSize; i++) {
                    for (var j = 0; j < $scope.height / $scope.cellSize; j++) {
                        if(field[i][j].status){
                            if(field[i][j].type == "rabbit"){
                                Cells.draw(cellsContext, images.mimimi,  $scope.cellSize, i, j);
                            }
                            else
                                Cells.draw(cellsContext, images.arrrrr,  $scope.cellSize, i, j);
                        }
                    }
                }
            }
        };
        cellsField.onclick = function(e) {
            var x = (e.pageX - cellsField.offsetLeft) / $scope.cellSize | 0;
            var y = (e.pageY - cellsField.offsetTop)  / $scope.cellSize | 0;
            cellsContext.clearRect(x * $scope.cellSize + 1, y * $scope.cellSize + 1, $scope.cellSize - 2, $scope.cellSize - 2);
            Cells.draw(cellsContext, images.arrrrr,  $scope.cellSize, x, y);
            field[x][y] = fox.create();
            field[x][y].status = true;
        };
    });