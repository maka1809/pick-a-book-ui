const helper = {
  imgValidation: function(pic) {
    const extention = (/\.(gif|jpg|jpeg|tiff|png)$/i).test(pic[0].files[0].name);
    return extention ? true : false;
  },
  addComponent: function(books) {
    const markup = ` 
        ${books.map(book => 
            `<div class="col s12 m6 l3 ui-state-default ui-sortable-handle">           
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
                        <a class="delete" data-datac="${book.id}">DELETE</a>
                    </div>
                </div>            
            </div>`
        ).join('')}
    `;

    const bookCatalog = document.querySelector('.row-parent');
    bookCatalog.innerHTML += markup;

    $('.edit').click(e => {
      let id = $(e.currentTarget).data('datac');

      let html_att = document.getElementById('modalEdit1');
      html_att.setAttribute('data-datac', id);
    });

    $('.modal-trigger').leanModal();
  },
  updateComponent: function(book, id) {
    book.map(b => {
      $(`#desc_${id}`).attr('text', b.description);
      $(`#img_${id}`).attr('src', b.image);
    })
  }
}

export default helper