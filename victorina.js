const vopros = document.querySelector('.quiz_vopros');
const otvet = document.querySelector('.quiz_otvet');
const allOtvet = document.querySelectorAll('.all')
const end = document.getElementById('#end_modal');
const scoreAll = document.querySelector('.score');
const buttonTry = document.querySelector('.tryA');

const otvetOne = otvet.querySelector('.option1'),
    otvetTwo = otvet.querySelector('.option2'),
    otvetThere = otvet.querySelector('.option3'),
    otvetFo = otvet.querySelector('.option4');

const numberVopros = document.querySelector('.number_quiz'),
    numberAll = document.querySelector('.number_all');

const buttonNext = document.querySelector('.next');

let score = 0;
let index_page = 0;
let index_vopros;

const quiz = [
    {
        vopros: "Как называется самый маленький океан?",
        otvet: [
            "Индийский океан",
            "Северный Ледовитый океан",
            "Тихий океан",
            "Атлантический океан",
        ],
        pravilno: 1,
    },
    {
        vopros: "Какая единственная страна граничит с Великобританией?",
        otvet: [
            "Швеция",
            "Германия",
            "Австрия",
            "Ирландия",
        ],
        pravilno: 3,
    },
    {
        vopros: "Где находится “Испанская лестница”?",
        otvet: [
            "Италия",
            "Бразилия",
            "Испания",
            "Австрия",
        ],
        pravilno: 0,
    },
    {
        vopros: "Какой самый большой остров в мире?",
        otvet: [
            "Исландия",
            "Финляндия",
            "Гренландия",
            "Ирландия",
        ],
        pravilno: 2,
    },
    {
        vopros: "Что является столицей Австралии?",
        otvet: [
            "Канберра",
            "Аделаида",
            "Сидней",
            "Мельбурн",
        ],
        pravilno: 0,
    },
    {
        vopros: "Кто был первым человеком, побывавшим на Луне?",
        otvet: [
            "Джеймс Б. Ирвин",
            "Пит Конрад",
            "Алан Шепард",
            "Нил Армстрон",
        ],
        pravilno: 3,
    },
    {
        vopros: "Кто был первым человеком, увидевшим луны Юпитера?",
        otvet: [
            "Галилео Галилей",
            "Альберт Эйнштейн",
            "Исаак Ньютон",
            "Николай Коперник",
        ],
        pravilno: 0,
    },
    {
        vopros: "Из какого вещества состоят ногти?",
        otvet: [
            "Серотонин",
            "Эпидермис",
            "Меланин",
            "Кератин",
        ],
        pravilno: 3,
    },
    {
        vopros: "Какая планета находится ближе всего к Солнцу?",
        otvet: [
            "Земля",
            "Марс",
            "Меркурий",
            "Венера",
        ],
        pravilno: 2,
    },
    {
        vopros: "Как долго длилась Столетняя война?",
        otvet: [
            "116 лет",
            "100 лет",
            "50 лет",
            "101 год",
        ],
        pravilno: 0,
    },

]

numberAll.innerHTML = quiz.length;

const load = () => {
    vopros.innerHTML = quiz[index_vopros].vopros;
    otvetOne.innerHTML = quiz[index_vopros].otvet[0];
    otvetTwo.innerHTML = quiz[index_vopros].otvet[1];
    otvetThere.innerHTML = quiz[index_vopros].otvet[2];
    otvetFo.innerHTML = quiz[index_vopros].otvet[3];

    numberVopros.innerHTML = index_page +1;
    index_page++;
}

const proideno = [];

const randomVopros = () => {
    randomNumber = Math.floor(Math.random() * quiz.length);
    randomChek = false;

    if (index_page == quiz.length) {
        quizOver();
    } else {
        if (proideno.length > 0) {
            proideno.forEach(item => {
                if (item == randomNumber){
                randomChek = true;
                }
            });
            if (randomChek) {
                randomVopros();
            } else {
                index_vopros = randomNumber;
                load();
                proideno.push(index_vopros);
            }
        };
        if (proideno == 0) {
            index_vopros = randomNumber;
            load();
            proideno.push(index_vopros);
        }
    };
};

const chekOtvet = el => {
    if(el.target.id == quiz[index_vopros].pravilno) {
        el.target.classList.add('like');
        score++;
    } else {
        el.target.classList.add('dis');
    }
    disabled();
}

const disabled = () => {
    allOtvet.forEach(item => {
        item.classList.add('disabled');
        if(item.id == quiz[index_vopros].pravilno) {
            item.classList.add('like');
        }
    })
}

const removeClass = () => {
    allOtvet.forEach(item => {
        item.classList.remove('like', 'dis', 'disabled')
    })
}
const lenght = () => {
    quiz.forEach(() =>{
        const div = document.createElement('div');
        lenght_quiz.appendChild(div);
    })
}

const validate = () => {
    if(!allOtvet[0].classList.contains('disabled')) {
        alert('Выбери вариант ответа!')
    } else {
        randomVopros();
        removeClass();
    }
}

buttonNext.addEventListener('click', validate);

for(option of allOtvet) {
    option.addEventListener('click', e => chekOtvet(e))
}

const quizOver = () => {
    document.querySelector('.end_modal').classList.add('activ');
    scoreAll.innerHTML = score;
}

const tryAgain = () => {
    window.location.reload();
}

buttonTry.addEventListener('click', tryAgain);

window.addEventListener('load', () => {
    randomVopros();
    lenght();
})