$('.show-modal').click(function(event) {
    event.preventDefault();

    var url = $(this).attr('href'); //mengambil route create untuk menampilkan form
    $.ajax({
        url: url, //url dari route di simpan dari attribut href ke variabel url
        dataType: 'html', //data yang dikeluarkan berupa html / form input berupa tag html
        success: function (response) {
            $('#modal-body').html(response);
        }
    });

    $('#modal').modal('show');
});

$('#modal-btn-save').click(function(event) {
    event.preventDefault();

    var form = $('#modal-body form'), //seleksi form yang digunakan
        url = form.attr('action'), //mengambil nilai action dari form yang dipilih
        method = 'POST'; //menentukan method HTTP yang akan digunakan
    
    form.find('.help-block').remove(); //mencari element yang memiliki class "help-block" dan menghapusnya jika ada
    form.find('.form-group').removeClass('has-error'); //mencari element yang memiliki class "form-group" dan menghapus class "has-error" saja jika ada

    $.ajax({
        url:url,
        method: method,
        data: form.serialize(), //mengambil seluruh data dari form dengan url-encode
        success: function (response) {
            $('#datatable').DataTable().ajax.reload(); //melakukan reload pada datatables dengan id tertentu jika berhasil menambahkan data
        },
        error: function (xhr) {
            var errors = xhr.responseJSON; //simpan response xhr di variabel errors
            if ($.isEmptyObject(errors) == false) { //Jika objek errors ini bukan kosong maka lakukan perulangan
                $.each(errors, function(key, value) { //lakukan perulangan dari setiap error, dan kita letakkan pada element form tertentu
                    $('#' + key) //pilih element form dengan ID yang sudah dibuat, SARAN: SAMAKAN DENGAN NAMA TABEL SERVER AGAR MUDAH UNTUK MENAMPILKAN VALIDASI PER KOLOM
                        .closest('.form-group') //cari class terdekat yang memiliki class "form-group"
                        .addClass('has-error') //tambahkan class "has-error" pada class tersebut yang sama dengan form-group
                        .append('<span class="help-block"><strong>' + value + '</strong></span>') //menambahkan element span yang berisikan pesan error yang dihasilkan dari server side
                });
            }

        }
    });
});