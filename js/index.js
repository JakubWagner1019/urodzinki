const list = document.getElementById("ludziki");
let personData = [
    //w javascripcie okazuje sie ze w dacie miesiac to wartosc 0-11, nie 1-12 ....
    {
        name: "Marka",
        birthday: new Date(1997, 0, 27) // 27 Jan 1997
    },
    {
        name: "Marcina",
        birthday: new Date(1996, 11, 24) // 24 Dec 1996
    },
    {
        name: "Rafała",
        birthday: new Date(1996, 8, 10) // 10 Sep 1996
    },
    {
        name: "Patryka",
        birthday: new Date(1996, 2, 7) // 7 Mar 1996
    },
    {
        name: "Kuby",
        birthday: new Date(1996, 10, 25) // 25 Nov 1996
    },
    {
        name: "Matiego",
        birthday: new Date(1996, 1, 2) // 2 Feb 1996
    },
]

function getNextBDay(today, birthday) {
    let thisYearBirthday;
    if (birthday.getMonth() > today.getMonth() || (birthday.getMonth() === today.getMonth() && birthday.getDate() >= today.getDate())) {
        thisYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());
    } else {
        thisYearBirthday = new Date(today.getFullYear() + 1, birthday.getMonth(), birthday.getDate());
    }
    let millisecDiff = thisYearBirthday.getTime() - today.getTime();
    let daysDiff = Math.floor(millisecDiff / (1000 * 60 * 60 * 24));
    let yearDiff = thisYearBirthday.getFullYear() - birthday.getFullYear();
    return {
        daysUntil: daysDiff,
        age: yearDiff
    };
}

function main() {
    let now = new Date(Date.now());
    let today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    personData.sort(function (a, b) {
        return getNextBDay(today, a.birthday).daysUntil - getNextBDay(today, b.birthday).daysUntil;
    })
    for (let i = 0; i < personData.length; i++) {
        let li = document.createElement("li");
        let currentPerson = personData[i];
        let nextBDay = getNextBDay(today, currentPerson.birthday);
        if (nextBDay.daysUntil === 0) {
            if (currentPerson.name === "Marcina") {
                document.getElementById("marcinVideo").style.display = "block";
            } else if (currentPerson.name === "Kuby") {
                document.getElementById("kubaVideo").style.display = "block";
            } else if (currentPerson.name === "Marka") {
                document.body.style.backgroundImage = "url(\"kefirki.jpg\")";
                document.body.style.backgroundSize = "70%";
            }
            li.innerHTML =
                `${nextBDay.age} urodziny ` +
                `<span title='${currentPerson.birthday.toLocaleDateString("pl-PL")}'>${currentPerson.name}</span>` +
                ` są właśnie dzisiaj! Ramiona w górę!`;
        } else if (nextBDay.daysUntil <= 10) {
            li.innerHTML =
                `Do ${nextBDay.age} urodzin ` +
                `<span title='${currentPerson.birthday.toLocaleDateString("pl-PL")}'>${currentPerson.name}</span>` +
                ` pozostało już tylko ${nextBDay.daysUntil} dni.`;
        } else {
            li.innerHTML =
                `Do ${nextBDay.age} urodzin ` +
                `<span title='${currentPerson.birthday.toLocaleDateString("pl-PL")}'>${currentPerson.name}</span>` +
                ` pozostało ${nextBDay.daysUntil} dni.`;
        }
        list.appendChild(li);
    }
}

main();
