const form = document.getElementById("data-form");
const btnn = document.getElementById("submit");
const tableBody = document.querySelector("#data-table tbody");
const toastLiveExample = document.getElementById("liveToast");
const toastLiveExample1 = document.getElementById("liveToast1");
const toastLiveExample2 = document.getElementById("liveToast2");
const toastLiveExample3 = document.getElementById("liveToast3");
const toastLiveExample4 = document.getElementById("liveToast4");
const label = document.getElementById("exampleModalLabel");
let chunkSize = 10;
const exportButton = document.getElementById("export");


exportButton.addEventListener("click", function () {
  const visibleRows = Array.from(rows).filter((row) => row.style.display !== "none");

  if (visibleRows.length === 0) {
    alert("No data to export.");
    return;
  }

  const table = document.getElementById("data-table");
  const ws = XLSX.utils.table_to_sheet(table);

  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const blob = new Blob([s2ab(XLSX.write(wb, { bookType: "xlsx", type: "binary" }))], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "table_data.xlsx";
  link.click();
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample4);

  toastBootstrap.show();
});

function s2ab(s) {
  const buf = new ArrayBuffer(s.length);
  const view = new Uint8Array(buf);
  for (let i = 0; i < s.length; i++) {
    view[i] = s.charCodeAt(i) & 0xff;
  }
  return buf;
}

const deleteSelectedButton = document.getElementById("del");
deleteSelectedButton.addEventListener("click", function () {
  const selectedRows = document.querySelectorAll(".row-checkbox:checked");
  if (selectedRows.length > 0 && confirm("Do you really want to delete selected rows?")) {
    selectedRows.forEach((row) => {
      tableBody.removeChild(row.closest("tr"));
      const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample3);

      toastBootstrap.show();
      var r=tableBody.rows.length;
        var counter= document.getElementById('count-rows');
        counter.innerText= "Total Number of rows: "+ r;
    });
  } else {
    alert("Nothing to delete");
  }
});

var personal = document.getElementById("person");
var educationn = document.getElementById("educationn");
var professional = document.getElementById("profession");

btnn.addEventListener("click", function (event) {
  event.preventDefault();

  
  const nameInput = document.getElementById("name");
  const ageInput = document.getElementById("age");
  const eduInput = document.getElementById("education");
  const desiInput = document.getElementById("designation");

  const name = nameInput.value;
  const age = ageInput.value;
  const edu = eduInput.value;
  const desi = desiInput.value;

  if (name && age && edu && desi) {
    const newRow = tableBody.insertRow();
    const ch = newRow.insertCell();
    const nameCell = newRow.insertCell();
    const ageCell = newRow.insertCell();
    const eduCell = newRow.insertCell();
    const desiCell = newRow.insertCell();
    const editDeleteCell = newRow.insertCell();

    ch.innerHTML = `<input type="checkbox" class="row-checkbox"  >`;
    nameCell.textContent = name;
    ageCell.textContent = age;
    eduCell.textContent = edu;
    desiCell.textContent = desi;
    editDeleteCell.innerHTML =
      '<button class="edit-button">Edit</button> <button class="delete-button">Delete</button> <button class="view-button" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>';

    nameInput.value = "";
    ageInput.value = "";
    eduInput.value = "";
    desiInput.value = "";

    var r=tableBody.rows.length;
    var counter= document.getElementById('count-rows');
    counter.innerText= "Total Number of rows: "+ r;

    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);

    toastBootstrap.show();

  } else {
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample1);

    toastBootstrap.show();
   

  }
});

tableBody.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-button")) {
    if (confirm("Do you really want to delete?")) {
      const row = event.target.closest("tr");

      if (row) {
        tableBody.removeChild(row);
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample3);

        toastBootstrap.show();
        var r=tableBody.rows.length;
        var counter= document.getElementById('count-rows');
        counter.innerText= "Total Number of rows: "+ r;
      }
    }
  } else if (event.target.classList.contains("edit-button")) {
    const row = event.target.closest("tr");

    if (row) {
      const nameCell = row.cells[1];
      const ageCell = row.cells[2];
      const eduCell = row.cells[3];
      const desiCell = row.cells[4];
      const editDeleteCell = row.cells[5];

      const nameInput = document.createElement("input");
      nameInput.value = nameCell.textContent;
      nameCell.textContent = "";
      nameCell.appendChild(nameInput);

      const ageInput = document.createElement("input");
      ageInput.value = ageCell.textContent;
      ageCell.textContent = "";
      ageCell.appendChild(ageInput);

      const eduInput = document.createElement("input");
      eduInput.value = eduCell.textContent;
      eduCell.textContent = "";
      eduCell.appendChild(eduInput);

      const desiInput = document.createElement("input");
      desiInput.value = desiCell.textContent;
      desiCell.textContent = "";
      desiCell.appendChild(desiInput);

      const saveButton = document.createElement("button");
      saveButton.textContent = "Save";
      saveButton.classList.add("save-button");
      editDeleteCell.innerHTML = "";
      editDeleteCell.appendChild(saveButton);

      saveButton.addEventListener("click", function () {
        nameCell.textContent = nameInput.value;
        ageCell.textContent = ageInput.value;
        eduCell.textContent = eduInput.value;
        desiCell.textContent = desiInput.value;
        editDeleteCell.innerHTML =
          '<button class="edit-button">Edit</button> <button class="delete-button">Delete</button> <button class="view-button" data-bs-toggle="modal" data-bs-target="#exampleModal">View</button>';
        const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample2);

        toastBootstrap.show();
      });
    }
  } else if (event.target.classList.contains("view-button")) {
    const row = event.target.closest("tr");
    if (row) {
      const name = row.cells[1].textContent;
      const age = row.cells[2].textContent;
      const edu = row.cells[3].textContent;
      const desi = row.cells[4].textContent;

      label.innerText = name;

      personal.innerHTML = ` <p>Name: ${name}</p>
      <p>Age: ${age}</p>`;

      educationn.innerHTML = `<p>Educational Details: ${edu}</p>`;

      professional.innerHTML = `<p>Professional Details: ${desi}</p>`;
    }
  }
});

var num = document.getElementById("entry");
num.addEventListener("change", function () {
  var table = document.getElementById("data-table").getElementsByTagName("tbody")[0];
  var rows = table.getElementsByTagName("tr");
  var chunkSize = parseInt(num.value);
  var currentPage = 0;

  function showPage(page) {
    var start = page * chunkSize;
    var end = start + chunkSize;
    var r = rows.length;
    var counter = document.getElementById("count-rows");
    counter.innerText = "Total Number of rows: " + r;
    for (var i = 0; i < rows.length; i++) {
      if (i >= start && i < end) {
        rows[i].style.display = "";
      } else {
        rows[i].style.display = "none";
      }
    }
  }

  document.getElementById("prevButton").addEventListener("click", function () {
    if (currentPage > 0) {
      currentPage--;
      showPage(currentPage);
    }
  });

  document.getElementById("nextButton").addEventListener("click", function () {
    if (currentPage < Math.ceil(rows.length / chunkSize) - 1) {
      currentPage++;
      showPage(currentPage);
      
    }
  });
  showPage(currentPage);
  // updatePageNumbers(chunkSize);
});

function sortTableByNameDec() {
  var sortedRows = Array.from(rows).slice(0);
  sortedRows.sort(function (a, b) {
    var nameA = a.cells[1].textContent.trim().toUpperCase();
    var nameB = b.cells[1].textContent.trim().toUpperCase();
    return nameB.localeCompare(nameA);
  });

  for (var i = 0; i < sortedRows.length; i++) {
    tableBody.appendChild(sortedRows[i]);
  }
}

function sortTableByNameAsc() {
  var sortedRows = Array.from(rows).slice(0);
  sortedRows.sort(function (a, b) {
    var nameA = a.cells[1].textContent.trim().toUpperCase();
    var nameB = b.cells[1].textContent.trim().toUpperCase();
    return nameA.localeCompare(nameB);
  });

  for (var i = 0; i < sortedRows.length; i++) {
    tableBody.appendChild(sortedRows[i]);
  }
}

var sortButton = document.getElementById("sort");
sortButton.addEventListener("change", function () {
  var selectedOption = sortButton.value;

  if (selectedOption === "atz") {
    sortTableByNameAsc();
  } else if (selectedOption === "zta") {
    sortTableByNameDec();
  }
});

var searchInput = document.getElementById("searchInput");
var rows = tableBody.getElementsByTagName("tr");

searchInput.addEventListener("input", function () {
  var searchText = searchInput.value.trim().toUpperCase();

  for (var i = 0; i < rows.length; i++) {
    var name = rows[i].cells[1].textContent.trim().toUpperCase();
    var age = rows[i].cells[2].textContent.trim().toUpperCase();
    var edu = rows[i].cells[3].textContent.trim().toUpperCase();
    var desi = rows[i].cells[4].textContent.trim().toUpperCase();

    if (
      name.includes(searchText) ||
      age.includes(searchText) ||
      edu.includes(searchText) ||
      desi.includes(searchText)
    ) {
      rows[i].style.display = "";
      // showPage(currentPage);
      var r=tableBody.rows.length;
      var counter= document.getElementById('count-rows');
      
      counter.innerText= "Total Number of rows: "+ rows.length;
    } else {
      rows[i].style.display = "none";
    }
  }
});

// function updatePageNumbers() {
//   var totalPages = Math.ceil(rows.length / chunkSize);
//   var pageNumbersContainer = document.getElementById("pageNumbers");

//   pageNumbersContainer.innerText = "";

//   for (var i = 0; i < totalPages; i++) {
//     var pageNumber = i + 1;
//     var pageNumberButton = document.createElement("button");
//     pageNumberButton.innerText = pageNumber;
//     pageNumberButton.classList.add("page-number");

//     pageNumberButton.addEventListener("click", function () {
//       var clickedPage = parseInt(this.textContent) - 1;
//       currentPage = clickedPage; // Update the currentPage variable
//       showPage(currentPage);
//     });

//     pageNumbersContainer.appendChild(pageNumberButton);
//   }
// }

// showPage(currentPage);
// updatePageNumbers(chunkSize);
