// Get references to the tbody element, input field and buttons
var $tbody = document.querySelector("tbody");
var $dateInput = document.querySelector("#date");
var $cityInput = document.querySelector("#city");
var $stateInput = document.querySelector("#state");
var $shapeInput = document.querySelector("#shape");
var $searchBtn = document.querySelector("#search");
var $nextBtn = document.querySelector("#next");
var $prevBtn = document.querySelector("#prev");


// set filteredAddresses to ufo data initially
var filteredAddresses = dataSet;


// Declare variables for pagination
var startingIndex = 0;
var resultsPerPage = 20;


// renderTable renders the filteredAddresses to the tbody
function renderTable() {
    $tbody.innerHTML = "";
    // Set the value of endingIndex to startingIndex + resultsPerPage
    var endingIndex = startingIndex + resultsPerPage;
    // Get a section of the addressData array to render
    var addressSubset = filteredAddresses.slice(startingIndex, endingIndex);
    
    for (var i = 0; i < addressSubset.length; i++) {
        // Get get the current address object and its fields
        var address = addressSubset[i];
        var fields = Object.keys(address);
        // Create a new row in the tbody, set the index to be i + startingIndex
        var $row = $tbody.insertRow(i);
        for (var j = 0; j < fields.length; j++) {
            // For every field in the ufodata object, create a new cell and 
            // set its inner text to be the current value at the current ufodata's field
            var field = fields[j];
            var $cell = $row.insertCell(j);
            $cell.innerText = address[field];
        }
    }
};


// Add an event listener to the nextButton, call paginationNextBtnClick when clicked
$nextBtn.addEventListener("click", paginationNextBtnClick);

function paginationNextBtnClick() {
    // Increase startingIndex by resultPerPage and render results for the next section of the table
    startingIndex += resultsPerPage;
    renderTable();

    // Check to see if there are any more results to render
    if (startingIndex + resultsPerPage >= filteredAddresses.length) {
        $nextBtn.classList.add("disabled");
        $nextBtn.innerText = "All Results Loaded";
        $nextBtn.removeEventListener("click", paginationNextBtnClick);
    }
}

// Add an event listener to the prevButton, call paginationPrevBtnClick when clicked
$prevBtn.addEventListener("click", paginationPrevBtnClick);

function paginationPrevBtnClick() {
    // Decrease startingIndex by resultPerPage and render results for the next section of the table
    startingIndex -= resultsPerPage;
    renderTable();

    // Check to see if there are any more results to render
    if (startingIndex - resultsPerPage < 0) {
        $prevBtn.classList.add("disabled");
        $prevBtn.innerText = "All Results Loaded";
        $prevBtn.removeEventListener("click", paginationPrevBtnClick);
    }
}



// Add an event listener to the searchButton, call handleSearchButtonClick when clicked
$searchBtn.addEventListener("click", handleSearchButtonClick);

function handleSearchButtonClick() {
    // Format the user's search by removing leading and trailing whitespace, lowercase the string
    var filterDate = $dateInput.value.trim();
    var filterCity = $cityInput.value.trim().toLowerCase();
    var filterState = $stateInput.value.trim().toLowerCase();
    var filterShape = $shapeInput.value.trim().toLowerCase();

    // default the inputs
    //if (filterDate == '') {
    //    filterDate = '1/1/2010'
    //};

    // Set filteredAddresses to an array of all addresses whose "state" matches the filter
    // The substring() method returns the part of the string between the start and end indexes, 
    // or to the end of the string.
    filteredAddresses = dataSet.filter(function(address) {
    var ufoDate = address.datetime;
    var addressCity = address.city.substring(0, filterCity.length).toLowerCase();
    var addressState = address.state.substring(0, filterState.length).toLowerCase();
    var addressShape = address.shape.substring(0, filterShape.length).toLowerCase();
    
    // default the inputs

    // If Date is not inout, check the other 3 fields
    if (filterDate == '') {
        if (addressState === filterState && addressCity === filterCity && addressShape === filterShape){
            return true;
        } 
        else {
            return false;
        }
    }

    // If City is not inout, check the other 3 fields
    if (filterCity == '') {
        if (addressState === filterState && ufoDate === filterDate && addressShape === filterShape){
            return true;
        } 
        else {
            return false;
        }
    }

    // If State is not inout, check the other 3 fields
    if (filterState == '') {
        if (addressCity === filterCity && ufoDate === filterDate && addressShape === filterShape){
            return true;
        } 
        else {
            return false;
        }
    }

    // When all the 4 fields are input
    if (filterShape == '') {
        if (addressCity === filterCity && ufoDate === filterDate && addressState === filterState){
            return true;
        } 
        else {
            return false;
        }
    }

    if (addressState === filterState && addressCity === filterCity && addressShape === filterShape &&
          ufoDate === filterDate){
        return true;
      } 
    else {
        return false;
      }
    });
    renderTable();
}

// Render the table for the first time on page load
renderTable();    

