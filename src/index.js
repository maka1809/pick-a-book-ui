import helper from "./helper";


$(document).ready(() => {
    
  fetchData();

  $('.modal-trigger').leanModal();
  $( "#sortable" ).sortable();
  $( "#sortable" ).disableSelection();

  document.getElementById('modalForm').addEventListener('submit', postBook);
  document.getElementById('modalEdit').addEventListener('submit', updateComponent);

  /** 
   * GET: all available book items
  */
  function fetchData() {
    fetch('http://localhost:8080/')
    .then(res => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then(data => {
      helper.addComponent(data)
    })
    .catch(err => {
      console.log('error occured')
    });
  }

  /**
   * POST: create a new book item
   */
  function postBook(event){
    event.preventDefault();

    let pic = $('#fileToUpload');
    const imgValidation = helper.imgValidation(pic);

    if (imgValidation == false) {
      console.log('Image type not allowed');
      return;
    }
    
    let description = $('#description');
    let title = $('#title');

    let formData = new FormData();
    formData.append('book', pic[0].files[0]);
    formData.append('description', description.val());
    formData.append('title', title.val());  
    
    fetch('http://localhost:8080/create', {
      method: 'POST',
      body: formData
    })    
    .then(res => {
      if (!res.ok) {
        throw new Error();
      }
      return res.json();
    })
    .then(data => {
      helper.addComponent(data);
      $('#modal1').closeModal();
    })
    .catch(err =>
      console.log('Error on creating element occured')
    );
  }

  /**
   * PUT: update book item
   */
  function updateComponent(event) {
    event.preventDefault();

    let id = $('#modalEdit1').data('datac');  
    let pic = $('#fileToUploadEdit');
    let description = $('#descriptionEdit');

    const imgValidation = helper.imgValidation(pic);
    if (imgValidation == false) {
      console.log('Image type not allowed');
      return;
    }

    let formData = new FormData();
    formData.append('book', pic[0].files[0]);
    formData.append('description', description.val());

    fetch(`http://localhost:8080/${id}/update`, {
      method: 'PUT',
      body: formData
    })
    .then(res => {
      if (!res.ok) {
          throw new Error();
      }
      return res.json();
    })
    .then(res => {
      console.log('Success:', res)
      helper.updateComponent(res, id)
      $('#modalEdit1').closeModal();
    })
    .catch(err =>
      console.log('error on creating occured')
    );
  }

})
