let selectedMovie = "";
let selectedSeats = [];

// Movie selection
function selectMovie(movieName, card) {
    selectedMovie = movieName;

    document.getElementById("selectedMovie").innerHTML =
        "Selected Movie: " + movieName;

    document.querySelectorAll(".movie-card").forEach(movie => {
        movie.classList.remove("movie-selected");
    });

    card.classList.add("movie-selected");
}

// Seat selection
function selectSeat(seat) {
    let ticketCount = Number(document.getElementById("ticketCount").value);

    if (!ticketCount) {
        alert("Enter number of tickets first");
        return;
    }

    let seatName = seat.innerText;

    // Remove seat if already selected
    if (selectedSeats.includes(seatName)) {
        selectedSeats = selectedSeats.filter(s => s !== seatName);
        seat.classList.remove("selected");
        return;
    }

    // Limit seat selection
    if (selectedSeats.length >= ticketCount) {
        alert("You can select only " + ticketCount + " seats");
        return;
    }

    selectedSeats.push(seatName);
    seat.classList.add("selected");
}

// Booking
function bookTicket() {
    let customerName = document.getElementById("customerName").value;
    let age = document.getElementById("age").value;
    let ticketCount = Number(document.getElementById("ticketCount").value);
    let date = document.getElementById("date").value;
    let time = document.getElementById("time").value;
    let payment = document.getElementById("payment").value;
    let coupon = document.getElementById("coupon").value;

    if (
        customerName === "" ||
        age === "" ||
        selectedMovie === "" ||
        date === ""
    ) {
        alert("Please fill all details");
        return;
    }

    if (selectedSeats.length !== ticketCount) {
        alert("Please select exactly " + ticketCount + " seats");
        return;
    }

    let seatSelected =
        document.querySelector('input[name="seatType"]:checked');

    if (!seatSelected) {
        alert("Please select seat type");
        return;
    }

    let seatType = seatSelected.value;
    let price = 200;

    // Price by seat type
    if (seatType === "Silver") {
        price = 200;
    } else if (seatType === "Gold") {
        price = 300;
    } else if (seatType === "Platinum") {
        price = 500;
    }

    // Age discount
    if (age < 12) {
        price -= 50;
    }

    let total = price * ticketCount;

    // GST 18%
    total += total * 0.18 *ticketCount;

    // Coupon
    if (coupon === "SAVE50") {
        total -= 50;
    }

    document.getElementById("ticket").innerHTML =
        "<h2>MOVIE TICKET</h2>" +
        "Name: " + customerName + "<br>" +
        "Age: " + age + "<br>" +
        "Movie: " + selectedMovie + "<br>" +
        "Seats: " + selectedSeats.join(", ") + "<br>" +
        "Seat Type: " + seatType + "<br>" +
        "Tickets: " + ticketCount + "<br>" +
        "Date: " + date + "<br>" +
        "Time: " + time + "<br>" +
        "Payment: " + payment + "<br>" +
        "Total: ₹" + total.toFixed(2);

    alert("Booking Confirmed!");
}

// Download Ticket
function downloadTicket() {
    let ticketText = document.getElementById("ticket").innerText;

    if (ticketText === "") {
        alert("Book ticket first");
        return;
    }

    let blob = new Blob([ticketText], { type: "text/plain" });
    let link = document.createElement("a");

    link.href = URL.createObjectURL(blob);
    link.download = "movie_ticket.txt";
    link.click();
}