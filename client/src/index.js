import ListItem from './ListItem';

const app = {
    list: document.querySelector('.app__list'),
    input: document.querySelector('.app__input')
};

app.input.addEventListener('input', (e) => {
    const reqText = e.target.value.trim().toLowerCase();

    fetch('/search/?text=' + reqText)
    .then((res) => res.json())
    .then((data) => {
        app.list.innerHTML = '';
        data.forEach((d) => {
            const li = new ListItem(d, reqText);
            app.list.appendChild(li.getNode());
        });
    });
});
