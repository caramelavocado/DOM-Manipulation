// On load: hide BOTH menus so the buttons "make them appear"
window.addEventListener("DOMContentLoaded", () => {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  if (filterForm) filterForm.style.display = "none";
  if (newForm) newForm.style.display = "none";

  // Apply filters once on load (in case you change defaults)
  filterArticles();
});

// Show Filter menu, hide Add menu
function showFilter() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  if (filterForm) filterForm.style.display = "block";
  if (newForm) newForm.style.display = "none";
}

// Show Add menu, hide Filter menu
function showAddNew() {
  const filterForm = document.getElementById("filterContent");
  const newForm = document.getElementById("newContent");

  if (newForm) newForm.style.display = "flex";   // your CSS uses flex-direction column
  if (filterForm) filterForm.style.display = "none";
}

// Hide/show article cards based on checkboxes
function filterArticles() {
  const showOpinion = document.getElementById("opinionCheckbox").checked;
  const showRecipe = document.getElementById("recipeCheckbox").checked;
  const showUpdate = document.getElementById("updateCheckbox").checked;

  document.querySelectorAll("#articleList article.opinion").forEach(a => {
    a.style.display = showOpinion ? "" : "none";
  });

  document.querySelectorAll("#articleList article.recipe").forEach(a => {
    a.style.display = showRecipe ? "" : "none";
  });

  document.querySelectorAll("#articleList article.update").forEach(a => {
    a.style.display = showUpdate ? "" : "none";
  });
}

// Add a new article card (with the same classes/styles as your existing ones)
function addNewArticle() {
  const titleInput = document.getElementById("inputHeader");
  const textInput = document.getElementById("inputArticle");

  const title = titleInput.value.trim();
  const text = textInput.value.trim();

  // Determine type from your radios (they have ids, not values)
  let typeClass = "";
  let typeLabel = "";

  if (document.getElementById("opinionRadio").checked) {
    typeClass = "opinion";
    typeLabel = "Opinion";
  } else if (document.getElementById("recipeRadio").checked) {
    typeClass = "recipe";
    typeLabel = "Recipe";
  } else if (document.getElementById("lifeRadio").checked) {
    typeClass = "update";     // Life Update maps to your "update" class
    typeLabel = "Update";
  }

  // Simple validation
  if (!title || !text || !typeClass) {
    alert("Please enter a Title, select a Type, and enter Text.");
    return;
  }

  const articleList = document.getElementById("articleList");

  // Create new <article> and match your existing structure:
  // <article class="opinion|recipe|update">
  //   <span class="marker">Opinion</span>
  //   <h2>Title</h2>
  //   <p>Text</p>
  //   <p><a href="moreDetails.html">Read more...</a></p>
  // </article>

  const newArticle = document.createElement("article");
  newArticle.classList.add(typeClass);

  const marker = document.createElement("span");
  marker.classList.add("marker");
  marker.textContent = typeLabel;

  const h2 = document.createElement("h2");
  h2.textContent = title;

  const pText = document.createElement("p");
  pText.textContent = text;

  const pLink = document.createElement("p");
  const link = document.createElement("a");
  link.href = "moreDetails.html";
  link.textContent = "Read more...";
  pLink.appendChild(link);

  newArticle.appendChild(marker);
  newArticle.appendChild(h2);
  newArticle.appendChild(pText);
  newArticle.appendChild(pLink);

  articleList.appendChild(newArticle);

  // Clear inputs
  titleInput.value = "";
  textInput.value = "";
  document.getElementById("opinionRadio").checked = false;
  document.getElementById("recipeRadio").checked = false;
  document.getElementById("lifeRadio").checked = false;

  // Apply filters so the new article obeys current checkbox settings
  filterArticles();
}
