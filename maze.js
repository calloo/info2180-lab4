"use strict";

function turnRed(obj, boundaries){

    // checks if the game has started then turns all boundaries to red and output that user lost
    if (boundaries['isStart']){
        obj.classList.add("youlose");

        //loops over each boundary and colors it red
        for(let boundary of boundaries['boundaries']){
            if (boundary !== obj){
                boundary.classList.add("youlose");
            }
        }

        //sets the status to lost and informs that all boundaries are red
        document.getElementById("status").innerHTML = "You lose";
        boundaries['isRed'] = true;
    }

}

function reset_color(boundaries) {
    //resets the color of the boundaries
    for(let boundary of boundaries['boundaries']){
        boundary.classList.remove("youlose");
    }
    //resets the heading and informs that the color is back to default
    document.getElementById("status").innerHTML = "Move your mouse over the \"S\" to begin.";
    boundaries['isRed'] = false;
}

function main() {
    let elements = document.getElementById("maze");
    // state variable
    let boundaries = {'isRed': false, 'isStart': false, 'boundaries': []};

    //iterates over child of the maze id tag and adds event listener for the boundaries
    for(let element of elements.children){
            //checks if the element is a boundary and adds listener
            if (element.hasAttribute("class") && element.className.indexOf("boundary") !== -1){

                boundaries['boundaries'].push(element);
                element.addEventListener("mouseover", function () { turnRed(element, boundaries)});
            }
    }

    let startTag = document.getElementById("start");
    let endTag = document.getElementById("end");

    //resets boundaries' color to default when start is clicked
    startTag.addEventListener("click", function () { reset_color(boundaries)});
    //indicate that the game has started when the mouse moves over the start tag
    startTag.addEventListener("mouseover", function () {
        startTag.style.cursor = "default";
        boundaries['isStart'] = true;
    });

    //add listener to check if the user wins
    endTag.addEventListener("mouseover", function () {
        endTag.style.cursor = "default";
        //outputs that the user has won only if the boundaries aren't red and that the game has started
        if (!boundaries['isRed'] && boundaries['isStart']){
            document.getElementById("status").innerHTML = "You win";
            boundaries['isStart'] = false;
        }
    });

    //add listener to check if the user started the game and is trying to cheat by going around the maze id element
    //if true then the user will lose
    elements.addEventListener("mouseleave", function () {
        turnRed(boundaries['boundaries'][0], boundaries);
    });


}

window.onload = main;
