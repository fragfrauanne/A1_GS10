const tasks = [
    { question: "der Kopf + maskulin", answer: "sein Kopf" },
    { question: "die Hand + feminin", answer: "ihre Hand" },
    { question: "der Bauch + maskulin", answer: "sein Bauch" },
    { question: "die Ohren + feminin", answer: "ihre Ohren" },
    { question: "das Bein + feminin", answer: "ihr Bein" },
    { question: "die Augen + maskulin", answer: "seine Augen" },
    { question: "der Fuß + maskulin", answer: "sein Fuß" },
    { question: "der Hals + maskulin", answer: "sein Hals" },
    { question: "der Rücken + feminin", answer: "ihr Rücken" },
    { question: "der Zahn + feminin", answer: "ihr Zahn" },
    { question: "die Hand + maskulin", answer: "seine Hand" },
    { question: "das Auge + feminin", answer: "ihr Auge" },
    { question: "der Arm + maskulin", answer: "sein Arm" },
    { question: "das Knie + maskulin", answer: "sein Knie" },
    { question: "der Hals + feminin", answer: "ihr Hals" },
    { question: "die Nase + maskulin", answer: "seine Nase" },
    { question: "die Brust + maskulin", answer: "seine Brust" },
    { question: "der Kopf + feminin", answer: "ihr Kopf" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);