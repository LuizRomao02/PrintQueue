$(document).ready(function() {

    document.getElementById("submit_button").disabled = true;

    const fileSubmit = document.getElementById("submit_button");
    const fileElem = document.getElementById("file");
    const fileListPrint = document.getElementById("fileListPrint");
    const fileListName = document.getElementById("fileListName");
    const fileListSize = document.getElementById("fileListSize");
    const fileListType = document.getElementById("fileListType");
    const fileListModified = document.getElementById("fileListModified");

    $('#div_show_execute_new').show();
    $('#div_row_success').hide();
    $('#div_row_error').hide();
    $('#div_row_priting').hide();
    $('#div_show_priting').hide();
    $('#div_danger_priting').hide();
    max_size_file = 500000;

    $("input:file").change(function() {
        const fileInput = $(this);

        if (fileInput.get(0).files.length) {
            const fileSize = fileInput.get(0).files[0].size;
            if (fileSize > max_size_file) {
                alertErrorShow('O tamanho do seu arquivo é maior que ' + max_size_file + ' KB');
                document.getElementById("submit_button").disabled = true;
                return false;
            } else {
                document.getElementById("submit_button").disabled = false;
                alertSuccessShow();
                return false;
            }
        } else {
            alertErrorShow('Você tem que escolher um arquivo');
            return false;
        }
    });

    fileElem.addEventListener("change", handleFiles, false);

    function handleFiles() {
        if (!this.files.length) {

            fileListPrint.innerHTML = "<p>Arquivo não selecionado!</p>";
            fileListName.innerHTML = "<p>Arquivo não selecionado!</p>";
            fileListSize.innerHTML = "<p>Arquivo não selecionado!</p>";
            fileListType.innerHTML = "<p>Arquivo não selecionado!</p>";
            fileListPrint.innerHTML = "<p>Arquivo não selecionado!</p>";
            fileListModified.innerHTML = "<p>Arquivo não selecionado!</p>";
            document.getElementById("submit_button").disabled = true;

        }
        if (this.files.length) {

            fileListPrint.innerHTML = "";
            const list1 = document.createElement("ul");
            fileListPrint.appendChild(list1);

            for (let i = 0; i < this.files.length; i++) {
                const li1 = document.createElement("li");
                li1.style.listStyle = "none"
                li1.style.marginTop = "5%"
                list1.appendChild(li1);

                const img = document.createElement("img");
                img.src = URL.createObjectURL(this.files[i]);
                img.width = 90;
                img.height = 90;
                img.onload = function() {
                    URL.revokeObjectURL(this.src);
                }
                li1.appendChild(img);
            }

            fileListName.innerHTML = "";
            const list2 = document.createElement("ul");
            fileListName.appendChild(list2);

            for (let i = 0; i < this.files.length; i++) {
                const li2 = document.createElement("li");
                li2.style.listStyle = "none"
                list2.appendChild(li2);
                const info = document.createElement("span");
                info.innerHTML = this.files[i].name;
                li2.appendChild(info);
            }

            fileListSize.innerHTML = "";
            const list3 = document.createElement("ul");
            fileListSize.appendChild(list3);

            for (let i = 0; i < this.files.length; i++) {
                const li3 = document.createElement("li");
                li3.style.listStyle = "none"
                list3.appendChild(li3);
                const info = document.createElement("span");
                info.innerHTML = this.files[i].size + " bytes";
                li3.appendChild(info);
            }

            fileListType.innerHTML = "";
            const list4 = document.createElement("ul");
            fileListType.appendChild(list4);

            for (let i = 0; i < this.files.length; i++) {
                const li4 = document.createElement("li");
                li4.style.listStyle = "none"
                list4.appendChild(li4);
                const info = document.createElement("span");
                info.innerHTML = this.files[i].type;
                li4.appendChild(info);
            }

            fileListModified.innerHTML = "";
            const list5 = document.createElement("ul");
            fileListModified.appendChild(list5);

            for (let i = 0; i < this.files.length; i++) {
                const li5 = document.createElement("li");
                li5.style.listStyle = "none"
                list5.appendChild(li5);
                const info = document.createElement("span");
                info.innerHTML = this.files[i].lastModifiedDate;
                li5.appendChild(info);
            }
        }
    }

    fileSubmit.addEventListener("click", function(e) {

        e.preventDefault();

        const fileInput = $('#file');
        const form = $('form')[0];
        const formData = new FormData(form);

        $.ajax({
            url: 'enviar.php',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
        })

        if (fileInput.get(0).files.length) {

            alertPritingShow();
            setTimeout(function() {
                alertPritinSuccessShow()
                $(fileListPrint).empty();
                $(fileListName).empty();
                $(fileListSize).empty();
                $(fileListType).empty();
                $(fileListModified).empty();
            }, 5000);
            return false;
        } else {
            alertErrorShow('Você tem que escolher um arquivo');
            return false;
        }
    });
});


function alertErrorShow(message) {
    $('#div_show_execute_new').hide();
    $('#div_row_success').hide();
    $('#div_row_priting').hide();
    $('#div_show_priting').hide();
    $('#div_danger_priting').hide();
    $('#div_alert_span_error').html(message);
    $('#div_row_error').show();
}

function alertSuccessShow(message) {
    $('#div_show_execute_new').hide();
    $('#div_row_error').hide();
    $('#div_row_priting').hide();
    $('#div_show_priting').hide();
    $('#div_danger_priting').hide();
    $('#div_alert_span_success').html(message);
    $('#div_row_success').show();
}

function alertPritingShow(message) {
    $('#div_show_execute_new').hide();
    $('#div_row_error').hide();
    $('#div_row_success').hide();
    $('#div_show_priting').hide();
    $('#div_danger_priting').hide();
    $('#div_alert_span_printing').html(message);
    $('#div_row_priting').show();
}

function alertPritinSuccessShow(message) {
    $('#div_show_execute_new').show();
    $('#div_row_error').hide();
    $('#div_row_success').hide();
    $('#div_row_priting').hide();
    $('#div_danger_priting').hide();
    $('#div_alert_show_printing').html(message);
    $('#div_show_priting').show();
}

function alertPritinDangerShow(message) {
    $('#div_show_execute_new').hide();
    $('#div_row_error').hide();
    $('#div_row_success').hide();
    $('#div_row_priting').hide();
    $('#div_show_priting').hide();
    $('#div_alert_show_printing').html(message);
    $('#div_danger_priting').show();
}