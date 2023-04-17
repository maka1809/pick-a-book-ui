import { HOST_URL } from '../config';

const helper = {
  books: [],
  imgValidation: function (pic) {
    const extention = /\.(gif|jpg|jpeg|tiff|png)$/i.test(pic[0].files[0].name);
    return extention ? true : false;
  },
  addComponent: function (books) {
    const markup = ` 
        ${books
          .map(
            (book) =>
              `<div class="col s12 m6 l3 ui-state-default ui-sortable-handle" id="component_${book.id}">           
                <div class="card">
                    <div class="card-image">
                        <img id="img_${book.id}" src="${book.image}">
                        <span class="card-title">${book.title}</span>
                    </div>
                    <div class="card-content">
                        <p id="desc_${book.id}">${book.description}</p>
                    </div>
                    <div class="card-action">
                        <a class="edit waves-effect waves-light btn modal-trigger" data-datac="${book.id}" href="#modalEdit1">EDIT</a>
                        <a class="delete waves-effect waves-light btn" id="delete" data-datac="${book.id}">DELETE</a>
                    </div>
                </div>            
            </div>`,
          )
          .join('')}
    `;

    const bookCatalog = document.querySelector('.row-parent');
    bookCatalog.innerHTML += markup;

    $('.edit').click((e) => {
      let id = $(e.currentTarget).data('datac');

      let html_att = document.getElementById('modalEdit1');
      html_att.setAttribute('data-datac', id);
    });

    $('.delete').click((e) => {
      let id = $(e.currentTarget).data('datac');
      this.deleteComponent(id);
    });

    $('.modal-trigger').leanModal();
  },
  updateComponent: function (book, id) {
    book.map((b) => {
      $(`#desc_${id}`).text(b.description);
      $(`#img_${id}`).attr('src', b.image);
    });
  },
  deleteComponent: function (id) {
    fetch(HOST_URL + `books/${id}`, {
      method: 'DELETE',
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error();
        }

        $(`#component_${id}`).remove();
        this.decreaseCounter(id);
        Materialize.toast('Card removed!', 3000);
      })
      .catch((err) => this.notification('We could not processed your request. Please try again.'));
  },
  counter: function (data) {
    data.map((d) => {
      this.books.push(d);
    });
    this.setCounter();
  },
  decreaseCounter: function (id) {
    let index = this.books.findIndex((p) => p.id == id);
    this.books.splice(index, 1);
    this.setCounter();
  },
  setCounter: function () {
    $('#counter').text('Available books: ' + this.books.length);
  },
  notification: function (msg) {
    $('#msg').text(msg);
    $('#notification').openModal();
  },
};

export default helper;
