angular.module("Life")
 .service("emptyCell", function () {
        function EmptyCell() {}
        EmptyCell.prototype = {
            life: function () {}
        };
        EmptyCell.prototype.constructor = EmptyCell;

        function create() {
            return new EmptyCell();
        }
        return {
            create: create,
            EmptyCell: EmptyCell
        }
    })
    .service("cell", function (Neighbours, emptyCell) {
        function Cell() {}
        Cell.prototype = {
            life: function ($scope, x, y) {
                var neighbours = Neighbours.find($scope, x, y);
                var counterOfLiveNeighboursRabbits = 0;
                var counterOfLiveNeighboursFoxes = 0;
                for (var i = 0; i < neighbours.length; i++) {
                    if (field[neighbours[i].x][neighbours[i].y].status
                        && field[neighbours[i].x][neighbours[i].y].type == "rabbit") {
                        counterOfLiveNeighboursRabbits++;
                    }
                    if (field[neighbours[i].x][neighbours[i].y].status
                        && field[neighbours[i].x][neighbours[i].y].type == "fox") {
                        counterOfLiveNeighboursFoxes++;
                    }
                }
                if (counterOfLiveNeighboursRabbits == 3) {
                    this.ntype = "rabbit";
                    this.nstatus = true;
                    return true;
                }
                else if (counterOfLiveNeighboursFoxes == 3) {
                    this.ntype = "fox";
                    this.nstatus = true;
                    return true;
                }
                else {
                    this.ntype = "cell";
                    this.nstatus = false;
                    return false;
                }
            }
        };
        Cell.prototype.constructor = Cell;

        function create() {
            return new Cell();
        }
        return {
            create: create,
            Cell: Cell
        }
    })
    .service("rabbit", function (Neighbours, emptyCell) {

        function Rabbit() {
            this.status = false;
            this.ntype = "rabbit",
            this.nstatus = false,
            this.type = "rabbit";
        }
        Rabbit.prototype = Object.create(emptyCell.EmptyCell.prototype);
        Rabbit.prototype.constructor = Rabbit;
        Rabbit.prototype.life = function ($scope, x, y) {
            var neighbours = Neighbours.find($scope, x, y);
            var counterOfLiveNeighbours = 0;
            for (var i = 0; i < neighbours.length; i++) {
                if (field[neighbours[i].x][neighbours[i].y].status
                    && field[neighbours[i].x][neighbours[i].y].type == "rabbit") {
                    counterOfLiveNeighbours++;
                }
            }
            if (counterOfLiveNeighbours == 3) {
                this.ntype = "rabbit";
                this.nstatus = true;
                return true;
            }
            else if (counterOfLiveNeighbours == 2 && this.status == true) {
                this.ntype = "rabbit";
                this.nstatus = true;
                return true;
            }
            else {
                this.ntype = "cell";
                this.nstatus = false;
                return false;
            }
        };

        function create() {
            return new Rabbit();
        }

        return {
            create: create
        }

    })
    .service("fox", function (Neighbours, emptyCell) {
        function Fox() {
            this.status = false;
            this.ntype = "fox",
            this.nstatus = false,
            this.type = "fox";
        }
        Fox.prototype = Object.create(emptyCell.EmptyCell.prototype);
        Fox.prototype.constructor = Fox;
        Fox.prototype.life = function ($scope, x, y) {
            var neighbours = Neighbours.find($scope, x, y);
            var counterOfLiveNeighbours = 0;
            for (var i = 0; i < neighbours.length; i++) {

                if (field[neighbours[i].x][neighbours[i].y].status
                    && field[neighbours[i].x][neighbours[i].y].type == "rabbit") {
                    field[neighbours[i].x][neighbours[i].y].nstatus = false;
                }
                if (field[neighbours[i].x][neighbours[i].y].status
                    && field[neighbours[i].x][neighbours[i].y].type == "fox") {
                    counterOfLiveNeighbours++;
                }
            }
            if (counterOfLiveNeighbours == 3) {
                this.ntype = "fox";
                this.nstatus = true;
                return true;
            }
            else if (counterOfLiveNeighbours == 2 && this.status == true) {
                this.ntype = "fox";
                this.nstatus = true;
                return true;
            }
            else {
                this.ntype = "cell";
                this.nstatus = false;
                return false;
            }
        };

        function create() {
            return new Fox();
        }

        return {
            create: create
        }
    });
