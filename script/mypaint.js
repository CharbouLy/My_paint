$(document).ready(function() {

    var painting = false;
    var started = false;
    var canvas = $("#canvas");
    var cursorX, cursorY;
    var context = canvas[0].getContext('2d');

    context.lineJoin = 'round';
    context.lineCap = 'round';

    $('#crayon').click(function () {

        canvas.unbind();
        // souris enfoncer sur le canvas, je dessine painting a true :
        canvas.mousedown(function (e) {
            painting = true;
        });

        // je lache le click j'arrete de dessiner :
        canvas.mouseup(function () {
            painting = false;
            started = false;
        });

        // Mouvement de la souris sur le canvas :
        canvas.mousemove(function (e) {
            // Si je suis en train de dessiner (click souris enfoncer) :
            if (painting) {
                // Set Coordonnees de la souris :
                cursorX = (e.pageX - this.offsetLeft) - 10; // 10 = décalage du curseur
                cursorY = (e.pageY - this.offsetTop) - 10;
                // Dessine une ligne :
                drawLine();
            }
        });
        // Fonction qui dessine une ligne :
        function drawLine() {
            // Si c'est le debut, j'initialise
            if (!started) {
                // Je place mon curseur pour la premiere fois :
                context.beginPath();
                context.moveTo(cursorX, cursorY);
                started = true;
            }
            // Sinon je dessine
            else {
                var color_choice = document.getElementById('color_choice').value;
                var size_choice = document.getElementById('size_choice').value;
                context.lineTo(cursorX, cursorY);
                context.strokeStyle = color_choice;
                context.lineWidth = size_choice;
                context.stroke();
            }
        }
    });

    $('#trait').click(function () {
        canvas.unbind();
        var click = true;
        canvas.click(function (e) {
            if (click === true) {
                painting = false;
                cursorX = (e.pageX - this.offsetLeft);
                cursorY = (e.pageY - this.offsetTop);
                context.beginPath();
                context.moveTo(cursorX, cursorY);
                click = false;
            }
            else {
                click = true;
                cursorX2 = (e.pageX - this.offsetLeft);
                cursorY2 = (e.pageY - this.offsetTop);
                context.lineTo(cursorX2, cursorY2);
                context.strokeStyle = document.getElementById('color_choice').value;
                context.lineWidth = document.getElementById('size_choice').value;
                context.stroke();
                context.closePath();
            }
        });
    });

    $('#rectangle').click(function () {
        canvas.unbind();
        var click = true;
        canvas.click(function (e) {
            if (click === true) {
                cursorX = (e.pageX - this.offsetLeft);
                cursorY = (e.pageY - this.offsetTop);
                context.beginPath();
                click = false;
            }
            else {
                click = true;
                cursorX2 = (e.pageX - this.offsetLeft);
                cursorY2 = (e.pageY - this.offsetTop);

                context.rect(cursorX, cursorY, cursorX2 - cursorX, cursorY2 - cursorY);
                if (document.getElementById('rempli').checked) {

                    context.fillStyle = document.getElementById('rempli_choice').value;
                    context.fill();
                }
                context.strokeStyle = document.getElementById('color_choice').value;
                context.lineWidth = document.getElementById('size_choice').value;
                context.stroke();
            }
        });

    });

    $('#cercle').click(function () {
        canvas.unbind();
        var click = true;
        canvas.click(function (e) {
            if (click === true) {
                cursorX = (e.pageX - this.offsetLeft);
                cursorY = (e.pageY - this.offsetTop);
                context.beginPath();
                click = false;
            }
            else {
                click = true;
                cursorX2 = (e.pageX - this.offsetLeft);
                cursorY2 = (e.pageY - this.offsetTop);
                var value = Math.sqrt((cursorX2 - cursorX) * (cursorX2 - cursorX) + (cursorY2 - cursorY) * (cursorY2 - cursorY));

                context.arc(cursorX, cursorY, value, 0, 2 * Math.PI);
                if (document.getElementById('rempli').checked) {

                    context.fillStyle = document.getElementById('rempli_choice').value;
                    context.fill();
                }
                context.strokeStyle = document.getElementById('color_choice').value;
                context.lineWidth = document.getElementById('size_choice').value;
                context.stroke();
            }

        });
    });

    $('#gomme').click(function () {
        canvas.unbind();
        canvas.mousedown(function (e) {
            painting = true;
        });

        canvas.mouseup(function () {
            painting = false;
            started = false;
        });

        canvas.mousemove(function (e) {
            if (painting) {
                cursorX = (e.pageX - this.offsetLeft) - 10;
                cursorY = (e.pageY - this.offsetTop) - 10;
                drawLine();
            }
        });
        function drawLine() {
            if (!started) {
                context.beginPath();
                context.moveTo(cursorX, cursorY);
                started = true;
            }
            else {
                var size_choice = document.getElementById('size_choice').value;
                context.clearRect(cursorX,cursorY, size_choice, size_choice);
            }
        }
    });

    $('#clear').click(function () {
        context.clearRect(0,0, canvas.width(), canvas.height());
    });
});