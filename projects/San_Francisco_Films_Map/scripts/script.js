
// INITIALIZE MAP
var map = L.map('map',{
    zoomControl: false,
    zoomSnap: 0,
    wheelDebounceTime: 100,
    zoomDelta:0.5,
    wheelPxPerZoomLevel:80,
    scrollWheelZoom: false
    }).setView([37.76, -122.48], 12.5);
map.scrollWheelZoom = true;

//POSITION ZOOM BUTTONS: TOP RIGHT
L.control.zoom({
    position:'topright',
}).addTo(map);

//SET BOUNDS
var bayAreaBounds = [
    [36.8, -123.3],
    [38.6, -121.5]
];
map.setMaxBounds(bayAreaBounds);

//TILE LAYER
L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png?api_key=8ff5f85d-e7f5-44fa-90bd-df95edd37619', {
  minZoom: 10,
  attribution: '&copy; <a href="https://stadiamaps.com/" target="_blank">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>',
}).addTo(map);

//MARKER SYMBOLOGY
var defaultMarkerOptions = {
    radius: 3,
    fillColor: "#e6409e", //purplish
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
//HIGHLIGHTED MARKER SYMBOLOGY
var highlightMarkerOptions = {
    radius: 5,
    fillColor: "#ffde21", //yellowish
    color: "#000",
    weight: 2,
    opacity: 1,
    fillOpacity: 1
};
var transparentMarkerOptions = {
    radius: 3,
    fillColor: "#8c2760", //dark purple
    color: "#000",
    weight: 1,
    opacity: 0.3,
    fillOpacity: 0.3
};

var otherMarkerOptions = {
    radius: 3,
    fillColor: "#ff199b", //bright pink
    color: "#bfa719",
    weight: 1,
    opacity: 1,
    fillOpacity: 1
};
//CREATE VARIABLES
var highlightedLayer = null;
var highlightedLayer2 = null;
var popUpLayer = null;
var popupContent;
var popup;

var geojsonData;
var namesData;
var titleLayer;

var markers = {};
var titlePoints = [];
//FILTER VARIABLES
var uniqueDirectors = new Set();
var uniqueProdCompanies = new Set();
var uniqueDistributors = new Set();
var uniqueWriters = new Set();
var uniqueGenres = new Set();
var uniqueStars = new Set();

var selectedDirector = null;
var selectedProdCompany = null;
var selectedDistributor = null;
var selectedWriter = null;
var selectedGenre = null;
var selectedStar = null;


var uniqueDirectorsSelected = new Set();
var uniqueProdCompaniesSelected = new Set();
var uniqueDistributorsSelected = new Set();
var uniqueWritersSelected = new Set();
var uniqueGenresSelected = new Set();
var uniqueStarsSelected = new Set();

//USED TO ADD FILTER
var filterIndexing = new Set();

//SLIDE SHOW VARIABLES
var slideIndex = 1;
var timer = null;

//SLIDE SHOW FUNCTIONS
function clickNextButton() {
    document.querySelector('.next').click();
}

function plusSlides(n) {
  clearTimeout(timer);
  showSlides(slideIndex += n);
  highlightedLayer.bindPopup(popup).openPopup();
  console.log(popup);
}

function showSlides(n) {
  map.closePopup();

  var i;
  var slides = document.getElementsByClassName("slide");
  if (n==undefined){n = ++slideIndex}
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
  }
  slides[slideIndex-1].style.display = "block";
  timer = setTimeout(showSlides, 8000);
  resetHighlight();
  console.log(n)
  switch (n) {
      case 1:
      case 16:
          highlightedLayer = markers[1844];
          popupContent = "<img src='images/tt0062765/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 2:
          highlightedLayer = markers[1];
          popupContent = "<img src='images/tt0055972/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 3:
          highlightedLayer = markers[638];
          popupContent = "<img src='images/tt0052357/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 4:
          highlightedLayer = markers[1557];
          popupContent = "<img src='images/tt7374948/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 5:
          highlightedLayer = markers[428];
          popupContent = "<img src='images/tt0083728/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 6:
          highlightedLayer = markers[1520];
          popupContent = "<img src='images/tt0067185/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 7:
          highlightedLayer = markers[2077];
          popupContent = "<img src='images/tt0071607/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 8:
          highlightedLayer = markers[525];
          popupContent = "<img src='images/tt0043660/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 9:
          highlightedLayer = markers[1887];
          popupContent = "<img src='images/tt0077745/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 10:
          highlightedLayer = markers[1757];
          popupContent = "<img src='images/tt0050815/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 11:
          highlightedLayer = markers[19];
          popupContent = "<img src='images/tt0454921/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 12:
          highlightedLayer = markers[1854];
          popupContent = "<img src='images/tt0092007/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 13:
          highlightedLayer = markers[737];
          popupContent = "<img src='images/tt0062765/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 14:
          highlightedLayer = markers[1885];
          popupContent = "<img src='images/tt0071360/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      case 15:
      case 0:
          highlightedLayer = markers[370];
          popupContent = "<img src='images/tt0051866/Image_1.jpg' alt='Image 1' width='150'>";
          break;
      default:
          popupContent = "<img src='images/tt0043660/Image_1.jpg' alt='Image 1' width='150'>";
  }

  popup = new L.Popup({"autoPan":false,"autoClose": false, "closeOnClick": null, "offset": [0, 20], closeButton: false});
  popup.setContent(popupContent);
  highlightedLayer.bindPopup(popup).openPopup();
  highlightedLayer.setStyle(highlightMarkerOptions);
  highlightedLayer.bringToFront();
}

//POPULATE DROP DOWNS DYNAMICALLY
function populateDropdown(dropdownId, dataSet, savedValue) {
    const dropdown = document.getElementById(dropdownId);
    const sortedData = Array.from(dataSet).sort();
    dropdown.length = 0;
    const option = document.createElement("option");
    option.value = '';
    if (dropdownId == "directorFilter"){
        option.text = 'Select Director';
        dropdown.appendChild(option);
    } else if (dropdownId == "prodCompanyFilter"){
        option.text = 'Select Production Company';
        dropdown.appendChild(option);
    } else if (dropdownId == "distributorFilter"){
        option.text = 'Select Distributor';
        dropdown.appendChild(option);
    } else if (dropdownId == "writerFilter"){
        option.text = 'Select Writer';
        dropdown.appendChild(option);
    } else if (dropdownId == "genreFilter"){
        option.text = 'Select Genre';
        dropdown.appendChild(option);
    } else if (dropdownId == "starFilter"){
        option.text = 'Select Actor/Actress';
        dropdown.appendChild(option);
    }
    //console.log(dropdownId, dataSet, savedValue, dropdown)
    dropdown.appendChild(option);
    sortedData.forEach(function(item) {
        const option = document.createElement("option");
        option.value = item;
        option.text = item;
        dropdown.appendChild(option);
    });
    if (savedValue) {
        dropdown.value = savedValue;
    }
}

// POPULATE ALL DROP DOWNS
function populateDropDowns() {
    populateDropdown("directorFilter", uniqueDirectors, selectedDirector);
    populateDropdown("prodCompanyFilter", uniqueProdCompanies, selectedProdCompany);
    populateDropdown("distributorFilter", uniqueDistributors, selectedDistributor);
    populateDropdown("writerFilter", uniqueWriters, selectedWriter);
    populateDropdown("genreFilter", uniqueGenres, selectedGenre);
    populateDropdown("starFilter", uniqueStars, selectedStar);
}

// FILTER MARKERS FUNCTIONS
function filterMarkers(director, prodCompany, distributor, writer, genre, star) {
    uniqueProdCompaniesSelected.clear();
    uniqueDirectorsSelected.clear();
    uniqueDistributorsSelected.clear();
    uniqueWritersSelected.clear();
    uniqueGenresSelected.clear();
    uniqueStarsSelected.clear()

    // CLEAR EXISTING BEFORE ADDING LAYER
    map.eachLayer(function(layer) {
        if (layer instanceof L.CircleMarker) {
            map.removeLayer(layer);
        }
    });
    // ADD FILTERED MARKERS
    L.geoJSON(geojsonData, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, defaultMarkerOptions);
        },
        filter: function(feature) {
            // SHOW ALL IF NONE SELECTED
            if (!director && !prodCompany && !distributor && !writer && !genre && !star) return true;

            let matchesDirector = true;
            let matchesProdCompany = true;
            let matchesDistributor = true;
            let matchesWriter = true;
            let matchesGenre = true;
            let matchesStar = true;

            if (director) {
                matchesDirector = feature.properties.director1_name === director || feature.properties.director2_name === director;
            }
            if (prodCompany) {
                matchesProdCompany = feature.properties["Production Company"] === prodCompany;
            }
            if (distributor) {
                matchesDistributor = feature.properties.Distributor === distributor;
            }
            if (writer) {
                matchesWriter = feature.properties.writer1_name === writer ||
                                feature.properties.writer2_name === writer ||
                                feature.properties.writer3_name === writer;
            }
            if (genre) {
                if (feature.properties.genres){
                    matchesGenre = feature.properties.genres.includes(genre);
                } else {
                    matchesGenre = false;
                }
            }
            if (star) {
                matchesStar = feature['properties']['Actor 1'] === star ||
                    feature['properties']['Actor 2'] === star ||
                    feature['properties']['Actor 3'] === star;
                console.log(star)
            }
            // SHOW POINTS WITH ALL FILTERS APPLIED
            return matchesDirector && matchesProdCompany && matchesDistributor && matchesWriter && matchesGenre && matchesStar;
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                markers[feature.properties.unique_id] = layer;
            }
            if (feature.properties.director1_name) {
                uniqueDirectorsSelected.add(feature.properties.director1_name);
            }
            if (feature.properties.director2_name) {
                uniqueDirectorsSelected.add(feature.properties.director2_name);
            }
            uniqueProdCompaniesSelected.add(feature.properties["Production Company"]);
            uniqueDistributorsSelected.add(feature.properties.Distributor);
            if (feature.properties.writer1_name) {
                uniqueWritersSelected.add(feature.properties.writer1_name);
            }
            if (feature.properties.writer2_name) {
                uniqueWritersSelected.add(feature.properties.writer2_name);
            }
            if (feature.properties.writer3_name) {
                uniqueWritersSelected.add(feature.properties.writer3_name);
            }
            if (feature.properties.genres) {
                let genres = feature.properties.genres
                genres = genres.split(',')
                genres.forEach(function (item, index){
                uniqueGenresSelected.add(item.trim())
                })
            }
            if (feature['properties']['Actor 1']) {
                uniqueStarsSelected.add(feature['properties']['Actor 1']);
            }
            if (feature['properties']['Actor 2']) {
                uniqueWritersSelected.add(feature['properties']['Actor 2']);
            }
            if (feature['properties']['Actor 3']) {
                uniqueWritersSelected.add(feature['properties']['Actor 3']);
            }
            // ADD CLICK TO HIGHLIGHT AND UPDATE SIDE PANEL
            layer.on('click', function () {
                titlePoints = [];
                resetHighlight();
                resetTransparency();
                transparentNonMatchingMarkers(layer.feature.properties.Title);
                highlightedLayer = layer;
                layer.setStyle(highlightMarkerOptions);
                console.log(markers)
                reloadFilteredLayer(titlePoints)
                var coords = feature.geometry.coordinates;
                var properties = feature.properties;
                updateSidePanel(properties, coords, namesData);
            });
        }
    }).addTo(map);

    // UPDATE DROPDOWNS DYNAMICALLY
    populateDropdown("prodCompanyFilter", uniqueProdCompaniesSelected, selectedProdCompany);
    populateDropdown("directorFilter", uniqueDirectorsSelected, selectedDirector);
    populateDropdown("distributorFilter", uniqueDistributorsSelected, selectedDistributor);
    populateDropdown("writerFilter", uniqueWritersSelected, selectedWriter);
    populateDropdown("genreFilter", uniqueGenresSelected, selectedGenre);
    populateDropdown("starFilter", uniqueStarsSelected, selectedStar);
}

function resetHighlight() {
    if (highlightedLayer) {
        highlightedLayer.setStyle(defaultMarkerOptions);
        highlightedLayer = null;
    }
}

// UPDATE HOME SIDE PANEL FUNCTION
function sidePanelHome() {
    var sidePanel = document.getElementById('sidePanel');
    var root = "https://github.com/NCMSiegfried/NCMSiegfried.github.io/blob/main/projects/San_Francisco_Films_Map/images/_HomePanelImages/"
    var tail = "?raw=true"
    sidePanel.innerHTML = `
        <div id="svg-container" style="width: 100%; height: auto;">
            <object type="image/svg+xml" data="assets/svg/side_panel_title.svg" style="width: 100%; height: auto;"></object>
        </div>
        <hr style="border: none; height: 1px; background: black;">
        </br>
        <div class="slideShowContainer">
            <div class="slide fade">
                <div class="numbertext">1 / 15</div>
                <img id="homeImage" src="${root}BullitChaseIMG.jpg${tail}" alt="Image 1" onclick="ExpandImage('${root}BullitChaseIMG.jpg${tail}')">
                </br>
                <strong>Bullit, 1968</strong>
                <p>The best ever car chase scene? Debatable.</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">2 / 15</div>
                <img id="homeImage" src="${root}ExperimentInTerror_FishermansWharf.jpeg${tail}" alt="Image 2" onclick="ExpandImage('${root}ExperimentInTerror_FishermansWharf.jpeg${tail}')">
                </br>
                <strong>Experiment in Terror, 1962</strong>
                <p>Blake Edward's thriller noir showing Fisherman's Wharf and Pier 49 back when it was actually used for fishing.</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">3 / 15</div>
                <img id="homeImage" src="${root}Vertigo_Fort_Point.jpg${tail}" alt="Image 3" onclick="ExpandImage('${root}Vertigo_Fort_Point.jpg${tail}')">
                </br>
                <strong>Vertigo, 1958</strong>
                <p>James Stewart Heroically lifting Kim Novak out from the San Francisco Bay Waters.</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">4 / 15</div>
                <img id="homeImage" src="${root}AlwaysBeMyMaybe_Pier7.png${tail}" alt="Image 4" onclick="ExpandImage('${root}AlwaysBeMyMaybe_Pier7.png${tail}')">
                </br>
                <strong>Always Be My Maybe, 2019</strong>
                <p>Ali Wong and Randall Park star in this romance... Maybe?</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">5 / 15</div>
                <img id="homeImage" src="${root}ChanIsMissing.png${tail}" alt="Image 5" onclick="ExpandImage('${root}ChanIsMissing.png${tail}')">
                </br>
                <strong>Chan is Missing, 1982</strong>
                <p>This Imperial Palace Restaurant (Previously the Golden Dragon Restaurant) has a had a gang-related shooting killing 5 and injuring 11 (1977), was temporarilly shut down in 2006 for health code violations, and currently holds a 2.9 star rating on Google.</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">6 / 15</div>
                <img id="homeImage" src="${root}HaroldMaude_SutroBaths.png${tail}" alt="Image 6" onclick="ExpandImage('${root}HaroldMaude_SutroBaths.png${tail}')">
                </br>
                <strong>Harold and Maude, 1971</strong>
                <p>"Crazy parasite! Commie Bastard! Get the hell out of here!" - Harold</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">7 / 15</div>
                <img id="homeImage" src="${root}HERBIERIDESAGAINIMG.jpg${tail}" alt="Image 7" onclick="ExpandImage('${root}HERBIERIDESAGAINIMG.jpg${tail}')">
                </br>
                <strong>Herbie Rides Again, 1974</strong>
                <p>Mrs.Steinmetz taking her shortcut to Vern's Market while Mr.Hawk's henchmen follow closely behind, on foot.</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">8 / 15</div>
                <img id="homeImage" src="${root}houseOnTelegraphHill.jpeg${tail}" alt="Image 8" onclick="ExpandImage('${root}houseOnTelegraphHill.jpeg${tail}')">
                </br>
                <strong>House on Telegraph Hill, 1951</strong>
                <p>The base of Coit Tower - one of the best views of the City?</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">9 / 15</div>
                <img id="homeImage" src="${root}InvasionOfTheBodySnatchers_DeptofHealth.png${tail}" alt="Image 9" onclick="ExpandImage('${root}InvasionOfTheBodySnatchers_DeptofHealth.png${tail}')">
                </br>
                <strong>Invasion of the Body Snatchers, 1978</strong>
                <p>Brooke Adams going into the Department of Public Health building before the Aliens start replacing people's bodies.</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">10 / 15</div>
                <img id="homeImage" src="${root}PalJoey_SprecklesMansion.jpeg${tail}" alt="Image 10" onclick="ExpandImage('${root}PalJoey_SprecklesMansion.jpeg${tail}')">
                </br>
                <strong>Pal Joey, 1957</strong>
                <p>Frank Sinatra and Kim Novak's stroll up Pacific Heights.</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">11 / 15</div>
                <img id="homeImage" src="${root}PursuitofHappyness_GlenParkSubway.png${tail}" alt="Image 11" onclick="ExpandImage('${root}PursuitofHappyness_GlenParkSubway.png${tail}')">
                </br>
                <strong>The Pursuit of Happyness, 2006</strong>
                <p>Known for its brutalist architecture: Glen Park Subway Station.</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">12 / 15</div>
                <img id="homeImage" src="${root}StarTrekGoldenGateBridge.png${tail}" alt="Image 12" onclick="ExpandImage('${root}StarTrekGoldenGateBridge.png${tail}')">
                </br>
                <strong>Star Trek IV: The Voyage Home, 1986</strong>
                <p>Spock (Leonard Nimoy) and Kirk (William Shatner) travel back in time to save humanity and locate humpback whales.</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">13 / 15</div>
                <img id="homeImage" src="${root}STEVEMCQUEEN_TaylorSt.jpg${tail}" alt="Image 13" onclick="ExpandImage('${root}STEVEMCQUEEN_TaylorSt.jpg${tail}')">
                </br>
                <strong>Bullit, 1968</strong>
                <p>A popular area on Nob Hill which include film locations for San Andreas (2015), Hereafter (2010), and The Wedding Planner (2001).</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">14 / 15</div>
                <img id="homeImage" src="${root}TheConversation_FinancialDistrict.jpg${tail}" alt="Image 14" onclick="ExpandImage('${root}TheConversation_FinancialDistrict.jpg${tail}')">
                </br>
                <strong>The Conversation, 1974</strong>
                <p>Harry Caul (Gene Hackman) and Martin Stett (Harrison Ford) overlooking the Financial District.</p>
            </div>
            <div class="slide fade">
                <div class="numbertext">15 / 15</div>
                <img id="homeImage" src="${root}TheLineUpWarMemoralOpera.jpeg${tail}" alt="Image 15" onclick="ExpandImage('${root}TheLineUpWarMemoralOpera.jpeg${tail}')">
                </br>
                <strong>The Lineup, 1958</strong>
                <p>Lieutenant Guthrie using a police call box back in the day.</p>
            </div>
            <a class="prev" id="prev" onclick="plusSlides(-1)">&#10094;</a>
            <a class="next" id="next" onclick="plusSlides(1)">&#10095;</a>

        <div id="slider"></div>

        </div>
        </br>
        <p style="color: white;">Click on any marker to view film details.</p>
        <p style="color: white;">Or add a filter:</p>
        <div id="filterContainer">
            <select class= "dropdown hidden" id="directorFilter">
            </select>

            <select class= "dropdown hidden" id="prodCompanyFilter">
            </select>
            <select class= "dropdown hidden" id="distributorFilter">
            </select>
            <select class= "dropdown hidden" id="writerFilter">
            </select>
            <select class= "dropdown hidden" id="genreFilter">
            </select>
            <select class= "dropdown hidden" id="starFilter">
            </select>
        </div>
        <div id="filterSelectorContainer">
            <br/>
            <select class="dropdown" id="filterSelector">
                <option value="">--Add Filter--</option>
                <option value="directorFilter">Director</option>
                <option value="prodCompanyFilter">Production Company</option>
                <option value="distributorFilter">Distributor</option>
                <option value="writerFilter">Writer</option>
                <option value="genreFilter">Genre</option>
                <option value="starFilter">Actor/Actress</option>
            </select>
        </div>
        <br/>
        <button id="reset-filter">
            Reset Filter
        </button>
    `;
    populateDropDowns();
    document.getElementById('directorFilter').addEventListener('change', function() {
        selectedDirector = this.value;
        filterMarkers(selectedDirector, selectedProdCompany, selectedDistributor, selectedWriter, selectedGenre, selectedStar);
    });
    document.getElementById('prodCompanyFilter').addEventListener('change', function() {
        selectedProdCompany = this.value;
        filterMarkers(selectedDirector, selectedProdCompany, selectedDistributor, selectedWriter, selectedGenre, selectedStar);
    });
    document.getElementById('distributorFilter').addEventListener('change', function() {
        selectedDistributor = this.value;
        filterMarkers(selectedDirector, selectedProdCompany, selectedDistributor, selectedWriter, selectedGenre, selectedStar);
    });
    document.getElementById('writerFilter').addEventListener('change', function() {
        selectedWriter = this.value;
        filterMarkers(selectedDirector, selectedProdCompany, selectedDistributor, selectedWriter, selectedGenre, selectedStar);
    });
    document.getElementById('genreFilter').addEventListener('change', function() {
        selectedGenre = this.value;
        filterMarkers(selectedDirector, selectedProdCompany, selectedDistributor, selectedWriter, selectedGenre, selectedStar);
    });
    document.getElementById('starFilter').addEventListener('change', function() {
        selectedStar = this.value;
        filterMarkers(selectedDirector, selectedProdCompany, selectedDistributor, selectedWriter, selectedGenre, selectedStar);
    });
    document.getElementById('reset-filter').addEventListener('click', function() {
        selectedDirector = null;
        selectedProdCompany = null;
        selectedDistributor = null;
        selectedWriter = null;
        selectedGenre = null;
        selectedStar = null;
        populateDropDowns();
        markers = {}
        filterMarkers(selectedDirector, selectedProdCompany, selectedDistributor, selectedWriter, selectedGenre, selectedStar);
    });
    if (selectedDirector || selectedProdCompany || selectedDistributor || selectedWriter || selectedGenre || selectedStar){
        filterMarkers(selectedDirector, selectedProdCompany, selectedDistributor, selectedWriter, selectedGenre, selectedStar);
    };
    if (filterIndexing.size > 0) {
        filterIndexing.forEach((val) => {
          const dropdown = document.getElementById(val);
          document.getElementById(val).style.display = 'block';
          document.getElementById('filterContainer').appendChild(dropdown);
          document.getElementById('filterSelector').querySelector(`option[value="${val}"]`).remove();
        });
    }
    document.getElementById('filterSelector').addEventListener('change', function() {
        const selectedValue = this.value;
        const selectedDropdown = document.getElementById(selectedValue);
        //SHOW FILTER, APPEND TO FILTER CONTAINER DIV SO SHOWS ON BOTTOM
        document.getElementById(selectedValue).style.display = 'block';
        document.getElementById('filterContainer').appendChild(selectedDropdown);
        // RELOAD FILTERS WHEN GOING BACK TO HOME
        filterIndexing.add(selectedValue);
        // REMOVE SELECTED FILTER FROM FILTER SELECTOR
        this.querySelector(`option[value="${selectedValue}"]`).remove();
    });
    clearTimeout(timer);
    showSlides(slideIndex);
    resetTransparency();
    if (titleLayer) {
        map.removeLayer(titleLayer);
    }
}

function updateSidePanel(properties, coords, namesData) {
    var sidePanel = document.getElementById('sidePanel');
    sidePanel.innerHTML = `
        <button class= "back-button" id="back-button">
            <span class="arrow"></span> Back
        </button>
        <p><a href="https://www.imdb.com/title/${properties.tconst}/" target= "_blank" rel="noopener noreferrer">
            <img id= "selectedImage" src="images/${properties.tconst}/Image_1.jpg"/>
        </a></p>
        <table>
            <thead>
                <tr>
                    <th class="th-text th-header" scope="col" style= "color:#F5F5F5; font-size:150%; background-color: #707070" colspan="2"><div style= "border: 2px solid #505050;margin: -5pt;">${properties.Title || ''}</div></th>
                </tr>
            </thead>
            <tbody id="detailsTableBody">
            </tbody>
        </table>
        <div class="MoreInfoButton">
            <button id="MoreInfoButton">More Information</button>
        </div>
    `;
    appendMovieTable(properties);
    // DIRECTOR AND ACTOR LINKS
    document.querySelectorAll('.director-link').forEach(function(element) {
        element.addEventListener('click', function() {
            var nconst = this.getAttribute('data-nconst');
            showNameDetails(properties, coords, nconst, namesData);
        });
    });
    document.querySelectorAll('.actor-link').forEach(function(element) {
        element.addEventListener('click', function() {
            var nconst = this.getAttribute('data-nconst');
            showNameDetails(properties, coords, nconst, namesData);
        });
    });

    // MORE INFORMATION BUTTON
    document.getElementById('MoreInfoButton').addEventListener('click', function() {
        // HIDE BUTTON WHEN CLICKED
        this.style.display = 'none';
        // SHOW ADDITION DETAILS WHEN CLICKED
        showMoreDetails(properties, coords, namesData);
    });

    // BACK BUTTON
    document.getElementById('back-button').addEventListener('click', function() {
        map.closePopup();
        sidePanelHome();
        resetHighlight();
    });
}

function appendMovieTable(properties) {
    var tableBody = document.getElementById('detailsTableBody');

    function addRowWithSlideDown(label, value, delay, idx) {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = `<strong>${label}</strong>`;
        cell2.innerHTML = value;
        cell1.classList.add('cell1-text');
        cell2.classList.add('cell2-text');
    }
    let delay = 0;
    let idx = 0;
    if (properties['Release Year']) {
        addRowWithSlideDown("Release Year", properties['Release Year']);
    }
    if (properties['Season']) {
        addRowWithSlideDown("Season", properties['Season']);
    }
    if (properties['Episode']) {
        addRowWithSlideDown("Episode", properties['Episode']);
    }
    if (properties.director1_name) {
        var directorNames = `
            <span class="director-link" data-nconst="${properties.director1_nconst}">${properties.director1_name}</span>
            ${properties.director2_name ? `, <span class="director-link" data-nconst="${properties.director2_nconst}">${properties.director2_name}</span>` : ''}
        `;
        addRowWithSlideDown("Director(s)", directorNames);
    }
    if (properties['Actor 1']) {
        var actorNames = `
            <span class="actor-link" data-nconst="${properties.actor1nconst}">${properties['Actor 1']}</span>
            ${properties['Actor 2'] ? `, <span class="actor-link" data-nconst="${properties.actor2nconst}">${properties['Actor 2']}</span>` : ''}
            ${properties['Actor 3'] ? `, <span class="actor-link" data-nconst="${properties.actor3nconst}">${properties['Actor 3']}</span>` : ''}
        `;
        addRowWithSlideDown("Stars", actorNames);
    }
    if (properties.genres) {
        addRowWithSlideDown("Genre(s)", properties.genres);
    }
    if (properties.Locations) {
        addRowWithSlideDown("Location", properties.Locations);
    }
}

function showMoreDetails(properties, coords, namesData) {
    var testing = properties.director1_nconst;
    console.log("Additional data loaded:", testing);
    console.log("Additional data loaded:", properties);

    var tableBody = document.getElementById('detailsTableBody');

    // FUNCTION TO ADD NEW ROW
    function addRowWithSlideDown(label, value, delay, idx) {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = `<strong>${label}</strong>`;
        cell2.innerHTML = value;
        cell1.classList.add('cell1-text');
        cell2.classList.add('cell2-text');
    }
    let delay = 0;
    let idx = 0;

    if (properties['Production Company']) {
        addRowWithSlideDown("Production Company", properties['Production Company']);
    }

    if (properties.Distributor) {
        addRowWithSlideDown("Distributor", properties.Distributor);
    }

    if (properties.run_time) {
        addRowWithSlideDown("Run Time", properties.run_time + " minutes");
    }

    if (properties.avg_rating) {
        addRowWithSlideDown("Average IMDB Rating", properties.avg_rating);
    }

    if (properties.numVotes_comma) {
        addRowWithSlideDown("Number of IMDB Votes", properties.numVotes_comma);
    }

    if (properties.writer1_name) {
        var writerNames = `
            <span class="writer-link" data-nconst="${properties.writer1_nconst}">${properties.writer1_name}</span>
            ${properties.writer2_name ? `, <span class="writer-link" data-nconst="${properties.writer2_nconst}">${properties.writer2_name}</span>` : ''}
            ${properties.writer3_name ? `, <span class="writer-link" data-nconst="${properties.writer3_nconst}">${properties.writer3_name}</span>` : ''}
        `;
        addRowWithSlideDown("Writer(s)", writerNames);
    }

    // ADD LINKS TO WRITERS
    document.querySelectorAll('.writer-link').forEach(function(element) {
        element.addEventListener('click', function() {
            var nconst = this.getAttribute('data-nconst');
            showNameDetails(properties, coords, nconst, namesData);
        });
    });

    // BACK BUTTON EVENT LISTENER
    document.getElementById('back-button').addEventListener('click', function() {
        sidePanelHome();
        resetHighlight();
    });
}


function appendNameTable(nconst, namesData) {
    var tableBody = document.getElementById('detailsTableBody');
    if (namesData[nconst].birthYear && namesData[nconst].birthYear !== 'null') {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "<strong>Born</strong>";
        cell2.innerHTML = namesData[nconst].birthYear;
        cell1.classList.add('cell1-text');
        cell2.classList.add('cell2-text');
    }
    if (namesData[nconst].deathYear && namesData[nconst].deathYear !== 'null') {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "<strong>Death</strong>";
        cell2.innerHTML = namesData[nconst].deathYear;
        cell1.classList.add('cell1-text');
        cell2.classList.add('cell2-text');
    }
    if (namesData[nconst].primaryProfession && namesData[nconst].primaryProfession !== 'null') {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "<strong>Primary Professions</strong>";
        cell2.innerHTML = namesData[nconst].primaryProfession;
        cell1.classList.add('cell1-text');
        cell2.classList.add('cell2-text');
    }
    if (namesData[nconst].KnowForTitleNames && namesData[nconst].primaryProfession !== 'null') {
        var row = tableBody.insertRow();
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        cell1.innerHTML = "<strong>Notable Works:</strong>";
        cell2.innerHTML = namesData[nconst].KnowForTitleNames;
        cell1.classList.add('cell1-text');
        cell2.classList.add('cell2-text');
    }
}

function showNameDetails(properties, coords, nconst, namesData) {
    // CHECK IF NCONST EXISTS
    if (namesData[nconst]) {
        var sidePanel = document.getElementById('sidePanel');
        sidePanel.innerHTML = `
            <button class= "back-button" id="back-button">
                <span class="arrow"></span> Back
            </button>
            <p><a href="https://www.imdb.com/name/${nconst}/" target= "_blank" rel="noopener noreferrer">
                <img id="selectedImage" src="images/${nconst}/Image_1.jpg"/>
            </a></p>
            <table>
                <thead>
                    <tr>
                        <th class="th-text th-header" scope="col" style= "color:#F5F5F5; font-size:150%; background-color: #707070" colspan="2"><div style= "border: 2px solid #505050;margin: -5pt;">${namesData[nconst].primaryName}</div></th>
                    </tr>
                </thead>
                <tbody id="detailsTableBody">
                </tbody>
            </table>
        `;
        appendNameTable(nconst, namesData);

        // BACK BUTTON EVENT LISTENER
        document.getElementById('back-button').addEventListener('click', function() {
            updateSidePanel(properties, coords, namesData);
            document.getElementById( 'MoreInfoButton' ).style.display = 'none';
            showMoreDetails(properties, coords, namesData);
        });
    } else {
        console.error("Director details not found for nconst:", nconst);
    }
}
// LOAD NAMES DATA JSON
$.getJSON("https://raw.githubusercontent.com/NCMSiegfried/NCMSiegfried.github.io/refs/heads/main/projects/San_Francisco_Films_Map/data/Names.json", function(data) {
    namesData = data;
    console.log("Additional data loaded:", namesData);
}).fail(function(jqXHR, textStatus, errorThrown) {
    console.error('Error loading JSON: ' + textStatus, errorThrown);
});

// LOAD GEOJSON
$.getJSON("data/data.geojson", function(data) {
    geojsonData = data;

    var geojsonLayer = L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng, defaultMarkerOptions);
        },
        onEachFeature: function (feature, layer) {
            if (feature.properties) {
                markers[feature.properties.unique_id] = layer;
            }
            if (feature.properties.director1_name) {
                uniqueDirectors.add(feature.properties.director1_name);
            }
            if (feature.properties.director2_name) {
                uniqueDirectors.add(feature.properties.director2_name);
            }
            if (feature["properties"]["Production Company"]) {
                uniqueProdCompanies.add(feature["properties"]["Production Company"]);
            }
            if (feature.properties.Distributor) {
                uniqueDistributors.add(feature.properties.Distributor);
            }
            if (feature.properties.writer1_name) {
                uniqueWriters.add(feature.properties.writer1_name);
            }
            if (feature.properties.writer2_name) {
                uniqueWriters.add(feature.properties.writer2_name);
            }
            if (feature.properties.writer3_name) {
                uniqueWriters.add(feature.properties.writer3_name);
            }
            if (feature.properties.genres) {
                let genres = feature.properties.genres
                genres = genres.split(',')
                genres.forEach(function (item, index){
                uniqueGenres.add(item.trim())
                })
            }
            if (feature["properties"]["Actor 1"]) {
                uniqueStars.add(feature["properties"]["Actor 1"]);
            }
            if (feature["properties"]["Actor 2"]) {
                uniqueStars.add(feature["properties"]["Actor 2"]);
            }
            if (feature["properties"]["Actor 3"]) {
                uniqueStars.add(feature["properties"]["Actor 3"]);
            }
            // ADD EVENT LISTENER TO EACH FEATURE
            layer.on('click', function () {
                titlePoints = [];
                map.closePopup();
                resetHighlight();
                resetTransparency();
                transparentNonMatchingMarkers(layer.feature.properties.Title);
                highlightedLayer = layer;
                layer.setStyle(highlightMarkerOptions);
                console.log(titlePoints)
                reloadFilteredLayer(titlePoints)
                var coords = feature.geometry.coordinates;
                var properties = feature.properties;
                // UPDATE SIDE PANEL WHEN POINT IS CLICKED
                updateSidePanel(properties, coords, namesData);
            });
        }
    }).addTo(map);
    sidePanelHome();
}).fail(function() {
    console.error('Error loading GeoJSON file');
});
//TURNS OTHER POINTS WITHOUT MATCHING TITLE TRANSPARENT AND SAVES POINTS WITH MATCHING TITLE IN "titlePoints" array
function transparentNonMatchingMarkers(title) {
    for (const key in markers) {
        if (markers[key].feature.properties.Title !== title) {
        markers[key].setStyle(transparentMarkerOptions); // Highlight matching markers
        } else {
        titlePoints.push(markers[key])
        }
    };
}
// Function to reload a new layer with the filtered points
function reloadFilteredLayer(titlePoints) {
    // Remove existing filtered layer if present
    if (titleLayer) {
        map.removeLayer(titleLayer);
    }

    // Create a new layer group for the filtered points
    titleLayer = L.layerGroup(
        titlePoints.map(marker => {
            const markerId = marker.feature.properties.unique_id;
            const isSelected = markerId === highlightedLayer.feature.properties.unique_id;
            const circleMarker = L.circleMarker(marker.getLatLng(), otherMarkerOptions);
            // If point is the selected point, automatically have it symbolized with the highlightMarkerOptions
            if (isSelected) {
                highlightedLayer2 = circleMarker;
                highlightedLayer2.setStyle(highlightMarkerOptions);
                highlightedLayer2.bringToFront();
                console.log(highlightedLayer2)

            }
            // Add event listener
            circleMarker.on('click', () => {
                console.log(highlightedLayer2)
                highlightedLayer2.setStyle(otherMarkerOptions);
                resetHighlight();
                highlightedLayer2 = circleMarker;
                const coords = marker.getLatLng();
                const properties = marker.feature.properties;
                updateSidePanel(properties, coords, namesData);
                circleMarker.setStyle(highlightMarkerOptions);
                circleMarker.bringToFront();
            });

            return circleMarker;
        })
    );

    // Add the new layer to the map
    titleLayer.addTo(map);
}
//RESET TRANSPARENT LAYER
function resetTransparency() {
    for (const key in markers) {
        markers[key].setStyle(defaultMarkerOptions);
    };
}
//EXPAND SLIDESHOW IMAGE
function ExpandImage(imgsrc) {
  //document.getElementById("expandImage").style.display = 'block';
  const imageContainer = document.getElementById("expandImage");
  imageContainer.style.display = 'block';

  // Remove any existing content
  imageContainer.innerHTML = "";

  // Create a new image element
  const img = document.createElement("img");
  img.src = imgsrc; // Set the image source to the selected file
  // Create a close button
  const closeButton = document.createElement("button");
  closeButton.innerHTML = "&times;"; // "×" symbol
  closeButton.className = "closeButton";
  closeButton.onclick = () => {
    imageContainer.style.display = 'none';
  };
  // Append the image to the container
  imageContainer.appendChild(img);
  imageContainer.appendChild(closeButton);
}

function exitExpansion(){
  const imageContainer = document.getElementById("expandImage");
  imageContainer.style.display = 'none';
}

// PREVENT MAP CLICKS WHEN OVER SIDE PANEL
document.getElementById('sidePanel').addEventListener('mouseover', function(event) {
    map.dragging.disable();
    map.doubleClickZoom.disable();
    map.touchZoom.disable();
});
// ENABLE MAP CLICKS WHEN NOT ON SIDE PANEL
document.getElementById('sidePanel').addEventListener('mouseout', function(event) {
    map.dragging.enable();
    map.doubleClickZoom.enable();
    map.touchZoom.enable();
//    map.scrollWheelZoom.enable() //FIX
});

// PREVENT MAP CLICKS WHEN OVER SIDE PANEL
document.getElementById('expandImage').addEventListener('mouseover', function(event) {
    map.dragging.disable();
    map.doubleClickZoom.disable();
    map.touchZoom.disable();
});
// ENABLE MAP CLICKS WHEN NOT ON SIDE PANEL
document.getElementById('expandImage').addEventListener('mouseout', function(event) {
    map.dragging.enable();
    map.doubleClickZoom.enable();
    map.touchZoom.enable();
//    map.scrollWheelZoom.enable() //FIX
});